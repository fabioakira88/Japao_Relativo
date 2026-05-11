import requests
from requests.auth import HTTPBasicAuth
import json

AUTH = HTTPBasicAuth("procederfilosofico@gmail.com", "LKG2 mbly DXxA Aive gW5v Snwp")
BASE = "https://procederfilosofico.com.br/wp-json/wp/v2"

content_html = (
    "<p>Sócrates (470–399 a.C.) nunca escreveu uma única linha. Não fundou uma escola no sentido físico do termo. "
    "Não deixou tratados nem sistemas. E, ainda assim, é considerado o pilar sobre o qual toda a filosofia ocidental foi construída. Por quê?</p>"
    "<p>A resposta está no método — e na postura. Sócrates acreditava que o conhecimento verdadeiro não pode ser transmitido "
    "de fora para dentro, como se enchesse um recipiente vazio. Ele precisa ser extraído de dentro, como se puxasse à luz algo que já estava lá, adormecido.</p>"
    "<hr>"
    "<h2>O Método Maiêutico — Dar à Luz Ideias</h2>"
    "<p>A mãe de Sócrates era parteira. Ele dizia que fazia o mesmo trabalho — mas com ideias. <em>Maiêutica</em> "
    "(do grego <em>maieutikós</em>) é a arte da parteira: não criar vida, mas assistir ao nascimento do que já existe.</p>"
    "<p>No diálogo socrático, o filósofo não ensina — ele pergunta. Pergunta até que o interlocutor perceba as contradições "
    "nas próprias crenças. Pergunta até que o que parecia sólido comece a rachar. E nesse rachamento, algo de verdadeiro pode emergir.</p>"
    "<p>No <em>Mênon</em>, Sócrates demonstra isso fazendo um escravo sem instrução resolver um problema de geometria — apenas "
    "por meio de perguntas bem feitas. O argumento é claro: <strong>o conhecimento não é adquirido, é recordado</strong>. "
    "A alma já sabe; o filósofo apenas a ajuda a lembrar.</p>"
    "<hr>"
    "<h2>\\\"Só Sei que Nada Sei\\\" — A Sabedoria na Ignorância</h2>"
    "<p>O Oráculo de Delfos declarou Sócrates o homem mais sábio de Atenas. Sócrates ficou perturbado — e passou anos "
    "tentando desmentir o oráculo, entrevistando políticos, poetas e artesãos que todos afirmavam saber o que faziam.</p>"
    "<p>O que encontrou foi sempre a mesma coisa: cada especialista, ao ser questionado além de seu domínio técnico, demonstrava "
    "uma confiança inversa ao seu conhecimento real. Sabiam fazer — mas não sabiam <em>por que</em> faziam, nem <em>o que</em> "
    "estavam fazendo em sentido mais profundo.</p>"
    "<blockquote><em>\\\"Parece que sou um pouco mais sábio do que ele — porque eu pelo menos sei que não sei, enquanto ele não sabe e pensa que sabe.\\\"</em></blockquote>"
    "<p>A ignorância consciente de Sócrates não é modéstia retórica. É o ponto de partida de toda busca honesta: "
    "<strong>só pode aprender quem admite que não sabe</strong>. A certeza prematura é o fim do pensamento.</p>"
    "<hr>"
    "<h2>\\\"É Costume do Sábio Queixar-se de Si Mesmo\\\"</h2>"
    "<p>A frase que ficou famosa — <em>\\\"É costume de um tolo quando erra queixar-se do outro; é costume do sábio queixar-se de si mesmo\\\"</em> "
    "— é ao mesmo tempo ética e epistemológica.</p>"
    "<p>Ética porque transforma o erro numa oportunidade de autoconhecimento em vez de defesa. Epistemológica porque reconhece que "
    "nossa percepção do outro é sempre mais opaca do que nossa percepção de nós mesmos — e que, na maioria das situações, "
    "a causa mais provável de um resultado ruim está em nós, não fora de nós.</p>"
    "<p>O tolo atribui ao externo o que o sábio busca no interno. Não porque o mundo seja indiferente às nossas ações, mas porque "
    "<strong>o único agente que você pode efetivamente transformar é você mesmo</strong>.</p>"
    "<hr>"
    "<h2>A Morte como Ato Filosófico</h2>"
    "<p>Em 399 a.C., Sócrates foi acusado de impiedade e corrupção da juventude. Poderia ter fugido. Poderia ter se exilado. "
    "Escolheu ficar e beber a cicuta.</p>"
    "<p>Para ele, abandonar Atenas seria abandonar a própria missão — seria, no fundo, negar tudo o que havia ensinado sobre "
    "o exame da vida. Uma vida sem exame, dizia ele, não é digna de ser vivida. E enfrentar a morte sem examinar o que ela significa "
    "seria o maior dos exames falhados.</p>"
    "<p>Sócrates morreu como viveu: fazendo perguntas. Seus últimos momentos, registrados no <em>Fédon</em> de Platão, são de uma "
    "serenidade que confundiu até seus mais próximos discípulos — que choravam enquanto ele discutia a imortalidade da alma "
    "com curiosidade genuína.</p>"
)

# Escape for JS string (single quotes safe, escape double quotes and backslashes)
content_js = content_html.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

js_block = f"""<!-- wp:html -->
<script>
(function() {{
  if (typeof POSTS === 'undefined') return;
  POSTS.unshift({{
    slug: 'socrates-metodo-maieutico',
    title: 'Sócrates: A Arte de Queixar-se de Si Mesmo',
    tag: 'FILOSOFIA CLÁSSICA',
    date: '08 de Maio de 2026',
    excerpt: '\\u201cÉ costume de um tolo quando erra queixar-se do outro; é costume do sábio queixar-se de si mesmo.\\u201d Uma frase que resume todo o método socrático: a responsabilidade filosófica começa pelo autoexame.',
    thumb: 'Canva%20-%20Proceder/S%C3%B3cratespost.png',
    featured: false,
    content: `{content_js}`
  }});
}})();
</script>
<!-- /wp:html -->"""

# 1. Busca conteúdo atual da page 68
resp = requests.get(f"{BASE}/pages/68", auth=AUTH)
resp.raise_for_status()
page_data = resp.json()
current_content = page_data.get("content", {}).get("raw", "")

print(f"Conteúdo atual da page 68 ({len(current_content)} chars)")

# 2. Verifica se artigo já foi publicado
if "socrates-metodo-maieutico" in current_content:
    print("AVISO: Artigo do Sócrates já está publicado na page 68. Abortando para evitar duplicata.")
    exit(0)

# 3. Prepend novo bloco
new_content = js_block + "\n" + current_content

# 4. Publica
update = requests.post(
    f"{BASE}/pages/68",
    auth=AUTH,
    json={"content": new_content, "status": "publish"}
)
update.raise_for_status()
print(f"Publicado com sucesso! Status: {update.status_code}")
print(f"Link: {update.json().get('link', 'N/A')}")
