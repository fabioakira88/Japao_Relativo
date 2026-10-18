(() => {
  const form = document.getElementById("oni-search");
  if (!form) return;
  const input = document.getElementById("oni-query");
  const cards = [...document.querySelectorAll(".oni-result")];
  const filters = [...document.querySelectorAll(".oni-filters button")];
  const more = document.getElementById("oni-more");
  const status = document.getElementById("oni-status");
  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const params = new URL(location.href).searchParams;
  let topic = filters.some((b) => b.dataset.topic === params.get("tema"))
    ? params.get("tema")
    : "todos";
  let limit = 12;
  input.value = params.get("q") || "";
  const index = cards.map((card) => ({
    card,
    text: normalize(card.dataset.search),
  }));
  function render(updateURL = true) {
    const terms = normalize(input.value).trim().split(/\s+/).filter(Boolean);
    const matched = index.filter(
      ({ card, text }) =>
        (topic === "todos" || card.dataset.topic === topic) &&
        terms.every((t) => text.includes(t)),
    );
    const visible = new Set(matched.slice(0, limit).map((r) => r.card));
    cards.forEach((card) => (card.hidden = !visible.has(card)));
    filters.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.topic === topic)),
    );
    status.textContent =
      matched.length +
      (matched.length === 1
        ? " matéria encontrada."
        : " matérias encontradas.") +
      " Exibindo " +
      Math.min(limit, matched.length) +
      ".";
    more.hidden = matched.length <= limit;
    document.getElementById("oni-empty").hidden = !!matched.length;
    if (updateURL) {
      const url = new URL(location.href);
      if (topic === "todos") url.searchParams.delete("tema");
      else url.searchParams.set("tema", topic);
      if (input.value.trim()) url.searchParams.set("q", input.value.trim());
      else url.searchParams.delete("q");
      history.replaceState(null, "", url);
    }
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    limit = 12;
    render();
  });
  input.addEventListener("input", () => {
    limit = 12;
    render();
  });
  filters.forEach((button) =>
    button.addEventListener("click", () => {
      topic = button.dataset.topic;
      limit = 12;
      render();
    }),
  );
  more.addEventListener("click", () => {
    const previousLimit = limit;
    limit += 12;
    render();
    // The next visible article receives focus before the trigger can disappear.
    const visible = cards.filter((card) => !card.hidden);
    const next = visible[previousLimit]?.querySelector("h3 a");
    if (next) next.focus({ preventScroll: true });
  });
  render(false);
})();
