const fs = require("fs");
const path = require("path");

const SITE_DIR = path.join(__dirname, "..", "SITE");
const ALLOWED_REMOTE_IMAGE_HOSTS = new Set(["s4.anilist.co"]);
const MALFORMED_REMOTE_RE = /japaorelativo\.com\/https?:\/\//i;
const HTTP_ANILIST_RE = /http:\/\/s4\.anilist\.co\//i;
const IMAGE_EXT_RE = /\.(png|jpe?g|webp|avif|gif|svg)(?:[?#][^\s"'<>)]*)?$/i;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(filePath, files);
    else files.push(filePath);
  }
  return files;
}

function isRemoteImageUrl(value) {
  if (!/^https?:\/\//i.test(value)) return false;
  if (/^https?:\/\/s4\.anilist\.co\/file\/anilistcdn\/media\/anime\/cover\//i.test(value)) return true;
  return IMAGE_EXT_RE.test(value.split("?")[0].split("#")[0]);
}

function collectRemoteImageUrls(text) {
  const urls = [];
  const attrRe = /\b(?:src|poster|content)=["'](https?:\/\/[^"']+)["']/gi;
  const jsonImageRe = /"image"\s*:\s*"((?:https?:\/\/)[^"]+)"/gi;
  let match;

  while ((match = attrRe.exec(text))) {
    if (isRemoteImageUrl(match[1])) urls.push(match[1]);
  }
  while ((match = jsonImageRe.exec(text))) {
    if (isRemoteImageUrl(match[1])) urls.push(match[1]);
  }
  return urls;
}

function collectLocalAssetRefs(file, text) {
  const refs = [];
  const attrRe = /\b(?:src|href|poster)=["']([^"']+)["']/gi;
  const cssUrlRe = /url\(([^)]+)\)/gi;
  let match;

  function add(rawValue) {
    const raw = String(rawValue || "").trim().replace(/^["']|["']$/g, "");
    if (!raw || raw.startsWith("#") || raw.startsWith("data:")) return;
    if (/^(https?:)?\/\//i.test(raw) || /^(mailto|tel):/i.test(raw)) return;
    if (raw.includes("${") || raw.includes("{{")) return;
    const clean = raw.split("#")[0].split("?")[0];
    if (!IMAGE_EXT_RE.test(clean) && !/\.(css|js|json|mp3|wav|woff2?|ttf|ico)$/i.test(clean)) return;
    const target = path.normalize(clean.startsWith("/")
      ? path.join(SITE_DIR, clean.replace(/^\/+/, ""))
      : path.join(path.dirname(file), clean));
    refs.push({ raw, target });
  }

  while ((match = attrRe.exec(text))) add(match[1]);
  while ((match = cssUrlRe.exec(text))) add(match[1]);
  return refs;
}

const errors = [];
const checkedFiles = walk(SITE_DIR).filter((file) => /\.(html|css|js)$/i.test(file));

for (const file of checkedFiles) {
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(path.join(__dirname, ".."), file);

  if (MALFORMED_REMOTE_RE.test(text)) {
    errors.push(`${rel}: malformed remote URL contains japaorelativo.com/https://`);
  }

  if (HTTP_ANILIST_RE.test(text)) {
    errors.push(`${rel}: AniList URL must use https`);
  }

  for (const url of collectRemoteImageUrls(text)) {
    const host = new URL(url).hostname;
    if (host !== "japaorelativo.com" && !ALLOWED_REMOTE_IMAGE_HOSTS.has(host)) {
      errors.push(`${rel}: remote image host is not allowlisted: ${url}`);
    }
  }

  for (const ref of collectLocalAssetRefs(file, text)) {
    if (!fs.existsSync(ref.target)) {
      errors.push(`${rel}: missing local asset ${ref.raw}`);
    }
  }
}

if (errors.length) {
  console.error(`JR asset validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`JR asset validation passed: ${checkedFiles.length} files checked.`);
