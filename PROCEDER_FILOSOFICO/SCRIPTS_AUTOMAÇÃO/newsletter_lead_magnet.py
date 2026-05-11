import requests
from requests.auth import HTTPBasicAuth

AUTH = HTTPBasicAuth('procederfilosofico@gmail.com', 'LKG2 mbly DXxA Aive gW5v Snwp')
BASE = 'https://procederfilosofico.com.br/wp-json/wp/v2'

# ── Substitua pela URL do PDF do Epicteto depois de subir ──
PDF_URL = 'https://procederfilosofico.com.br/wp-content/uploads/2026/05/manual-epicteto.pdf'

JS_BLOCK = """<!-- wp:html -->
<script>
(function() {
  // ── Lead Magnet: Newsletter + Download PDF ─────────────────
  if (typeof window.__procederNewsletterInjected !== 'undefined') return;
  window.__procederNewsletterInjected = true;

  const PDF_URL = '""" + PDF_URL + """';

  function triggerDownload(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Manual-de-Epicteto-Proceder-Filosofico.pdf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 100);
  }

  function validateEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }

  function injectForm() {
    const existing = document.getElementById('proceder-newsletter');
    if (existing) return;

    const section = document.createElement('section');
    section.id = 'proceder-newsletter';
    section.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #060D1E 0%, #0d1930 100%);
        border: 1px solid rgba(201,168,76,0.20);
        border-radius: 12px;
        padding: 56px 40px;
        max-width: 680px;
        margin: 64px auto;
        text-align: center;
        font-family: 'Lato', sans-serif;
        position: relative;
        overflow: hidden;
      ">
        <div style="
          position:absolute; top:0; left:0; right:0; height:3px;
          background: linear-gradient(90deg, #C9A84C, #D4B96B, #C9A84C);
        "></div>
        <p style="
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #C9A84C;
          text-transform: uppercase;
          margin: 0 0 16px;
        ">Biblioteca Proceder</p>
        <h2 style="
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 4vw, 34px);
          color: #ffffff;
          font-weight: 700;
          line-height: 1.25;
          margin: 0 0 14px;
        ">Manual de Epicteto</h2>
        <p style="
          font-size: 16px;
          color: rgba(255,255,255,0.60);
          line-height: 1.7;
          margin: 0 0 32px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        ">Assine a newsletter e receba gratuitamente o <strong style="color:rgba(255,255,255,0.85);">Enchiridion</strong> — o guia prático do estoicismo de Epicteto, traduzido e comentado.</p>

        <div id="nl-form-wrap" style="display:flex; gap:12px; max-width:460px; margin:0 auto 12px; flex-wrap:wrap; justify-content:center;">
          <input
            type="email"
            id="nl-email"
            placeholder="seu@email.com"
            autocomplete="email"
            style="
              flex:1; min-width:220px;
              background: rgba(255,255,255,0.06);
              border: 1px solid rgba(201,168,76,0.30);
              border-radius: 6px;
              padding: 14px 18px;
              font-size: 15px;
              color: #ffffff;
              outline: none;
              font-family: 'Lato', sans-serif;
              transition: border-color 0.2s;
            "
            onfocus="this.style.borderColor='rgba(201,168,76,0.70)'"
            onblur="this.style.borderColor='rgba(201,168,76,0.30)'"
          />
          <button
            id="nl-btn"
            onclick="window.__procederSubmit(event)"
            style="
              background: #C9A84C;
              color: #060D1E;
              border: none;
              border-radius: 6px;
              padding: 14px 28px;
              font-size: 14px;
              font-weight: 700;
              letter-spacing: 0.06em;
              text-transform: uppercase;
              cursor: pointer;
              font-family: 'Lato', sans-serif;
              transition: background 0.2s, transform 0.15s;
              white-space: nowrap;
            "
            onmouseover="this.style.background='#D4B96B'"
            onmouseout="this.style.background='#C9A84C'"
          >Baixar PDF →</button>
        </div>
        <p id="nl-error" style="color:#ff6b6b; font-size:13px; margin:4px 0 0; display:none; min-height:18px;">
          Digite um e-mail válido para continuar.
        </p>

        <div id="nl-success" style="display:none; animation: nlFadeIn 0.4s ease;">
          <div style="font-size: 36px; margin-bottom: 12px;">✓</div>
          <p style="color: #C9A84C; font-size: 17px; font-weight: 600; margin: 0 0 6px;">Download iniciado!</p>
          <p style="color: rgba(255,255,255,0.55); font-size: 14px; margin: 0;">
            Bem-vindo à biblioteca Proceder. O PDF abre em segundos.
          </p>
        </div>

        <p style="font-size: 12px; color: rgba(255,255,255,0.25); margin: 20px 0 0;">
          Sem spam. Apenas filosofia.
        </p>
      </div>
      <style>
        @keyframes nlFadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        #nl-email::placeholder { color: rgba(255,255,255,0.30); }
      </style>
    `;

    // Insere antes do footer ou no final do body
    const footer = document.querySelector('.footer, footer, #footer');
    if (footer) {
      footer.parentNode.insertBefore(section, footer);
    } else {
      document.body.appendChild(section);
    }
  }

  window.__procederSubmit = function(e) {
    e.preventDefault();
    const emailEl = document.getElementById('nl-email');
    const errorEl = document.getElementById('nl-error');
    const successEl = document.getElementById('nl-success');
    const formWrap = document.getElementById('nl-form-wrap');
    const btn = document.getElementById('nl-btn');

    const email = emailEl ? emailEl.value.trim() : '';

    if (!validateEmail(email)) {
      if (errorEl) errorEl.style.display = 'block';
      if (emailEl) emailEl.focus();
      return;
    }

    if (errorEl) errorEl.style.display = 'none';
    if (btn) btn.disabled = true;

    // Download imediato (mesmo event handler = sem bloqueio de pop-up)
    triggerDownload(PDF_URL);

    // Mostra sucesso
    setTimeout(function() {
      if (formWrap) formWrap.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
    }, 300);

    // Aqui você pode adicionar integração com Mailchimp/EmailJS se quiser
    // fetch('https://sua-api.com/subscribe', { method:'POST', body: JSON.stringify({email}) })
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectForm);
  } else {
    injectForm();
  }
})();
</script>
<!-- /wp:html -->"""

# ── Busca page 68 com context=edit ──────────────────────────
print("[1] Buscando page 68...")
r0 = requests.get(f'{BASE}/pages/68', auth=AUTH, params={'context': 'edit'})
current_raw = r0.json().get('content', {}).get('raw', '')
print(f'  raw: {len(current_raw)} chars')

if 'proceder-newsletter' in current_raw:
    print('  AVISO: formulário já injetado. Abortando.')
    exit(0)

# Injeta ao final (depois dos artigos, antes do conteúdo base)
new_content = current_raw + '\n' + JS_BLOCK

print("[2] Injetando formulário de newsletter...")
resp = requests.post(
    f'{BASE}/pages/68',
    auth=AUTH,
    json={'content': new_content, 'status': 'publish'}
)
print(f'  Status: {resp.status_code}')
if resp.ok:
    print('  ✓ Formulário de newsletter injetado!')
    print()
    print('  PRÓXIMO PASSO:')
    print(f'  Substitua PDF_URL no script pela URL real do PDF do Epicteto')
else:
    print(resp.text[:300])
