import requests
from requests.auth import HTTPBasicAuth
from pathlib import Path

DOMINIO = "https://japaorelativo.com"
AUTH = HTTPBasicAuth("procederfilosofico@gmail.com", "l5vq ChwA cFXq 9niF m58W fDhg")

POSTS = [
    {
        "title": "Haha no Hi: o Dia das Mães no Japão e a tradição dos cravos vermelhos",
        "slug": "haha-no-hi-dia-das-maes-japao-2026",
        "content": """<p>Todo segundo domingo de maio, o Japão se veste de cravos vermelhos e gratidão. O <strong>Haha no Hi</strong> (母の日) — Dia das Mães japonês — é uma celebração marcada por gestos silenciosos, presentes cuidadosamente escolhidos e um amor que raramente se diz em voz alta, mas que se sente em cada detalhe do cotidiano.</p>

<h2>O Cravo Vermelho: Símbolo de Gratidão</h2>
<p>A tradição chegou ao Japão no início do século XX, influenciada pela celebração americana do Mother's Day. Mas foi nos anos do pós-guerra que o <em>Haha no Hi</em> ganhou força real — e o cravo vermelho tornou-se seu símbolo central.</p>
<p>A flor representa amor vivo e presente. Quem tem a mãe viva presenteia com cravos vermelhos. Quem já a perdeu oferece flores brancas — um gesto que carrega, ao mesmo tempo, luto e reverência. Essa distinção simbólica é profundamente japonesa: a beleza está no detalhe que a maioria não percebe.</p>
<blockquote><p>No Japão, o amor raramente é dito — ele é demonstrado. O Haha no Hi é um dos raros momentos em que essa demonstração se torna pública, visível, quase obrigatória.</p></blockquote>

<h2>O Papel da Mãe na Família Japonesa</h2>
<p>Na cultura japonesa, a mãe ocupa um lugar singular. O conceito de <strong>kyōiku mama</strong> — a mãe devotada à educação dos filhos — ilustra bem essa posição: muitas mães japonesas organizam toda sua vida em torno do desenvolvimento acadêmico e moral das crianças. Não é raro que a mãe prepare o <em>bentō</em> com capricho quase artístico, acompanhe tarefas escolares até tarde e administre toda a logística da casa.</p>
<p>O <em>Haha no Hi</em> é, portanto, muito mais do que um dia comercial. É um momento de reconhecimento coletivo de um trabalho que opera muitas vezes invisível, mas sustenta toda a estrutura familiar japonesa.</p>

<h2>Como os Japoneses Celebram</h2>
<p>As celebrações variam do simples ao elaborado. Um bilhete escrito à mão ainda é um dos presentes mais valorizados — especialmente quando vem de filhos pequenos. Entre os adultos, é comum oferecer flores, doces artesanais ou acessórios. Restaurantes costumam ter menus especiais no dia.</p>
<p>Nas escolas, crianças aprendem a dobrar origamis de cravos vermelhos para presentear as mães. A cultura do <em>omiyage</em> — o presente bem embrulhado, escolhido com intenção — aparece aqui em sua forma mais afetiva: não importa o valor, mas o cuidado com que foi escolhido e entregue.</p>

<h2>Uma Data Universal, Uma Expressão Única</h2>
<p>O Japão importou o conceito, mas reinventou a expressão. Onde outros países celebram com barulho e declarações efusivas, o Japão celebra com cuidado, silêncio e precisão simbólica. O cravo vermelho na lapela, o bilhete discreto na mesa da cozinha, o jantar especial preparado em silêncio — cada um desses gestos diz, à maneira japonesa, tudo o que precisa ser dito.</p>"""
    },
    {
        "title": "Natsu Basho 2026: o Torneio de Verão que paralisa o Japão em maio",
        "slug": "natsu-basho-torneio-sumo-maio-2026",
        "content": """<p>A cada maio, o bairro de Ryōgoku, em Tóquio, transforma-se no coração do Japão. Durante 15 dias, o <strong>Natsu Basho</strong> — o Torneio de Verão de Sumô — reúne os maiores lutadores do país no ringue de areia sagrada chamado <em>dohyō</em>. É um dos seis grandes torneios do ano e, para muitos, o mais emocionante de todos.</p>

<h2>O Que é o Natsu Basho</h2>
<p>Realizado sempre em maio no <strong>Ryōgoku Kokugikan</strong>, o maior ginásio de sumô do mundo com capacidade para 11.000 pessoas, o Natsu Basho é o segundo dos seis torneios anuais. Os ingressos esgotam com semanas de antecedência. Em 2026, o torneio acontece de <strong>10 a 24 de maio</strong>. Cada dia, cada vitória e cada derrota redefine o ranking — e pode determinar se um lutador sobe ou desce de divisão.</p>
<blockquote><p>O sumô não é apenas força. É estratégia, equilíbrio, timing perfeito e anos de uma disciplina que começa ainda na infância.</p></blockquote>

<h2>A Tradição Milenar do Dohyō</h2>
<p>O sumô tem mais de 1.500 anos de história. Originalmente praticado como ritual xintoísta para agradar os deuses e garantir boa colheita, a luta em areia sagrada preserva até hoje seus elementos espirituais. Antes de cada combate, os lutadores jogam sal no ringue para purificá-lo. O árbitro veste trajes da era Heian. O próprio ringue é uma área de 4,55 metros de diâmetro onde dois corpos colidem em frações de segundo.</p>
<p>Os 82 <em>kimarite</em> (técnicas de vitória) reconhecidos pela Associação Japonesa de Sumô incluem desde empurrões frontais até arremessos complexos que exigem anos de treinamento. Um combate pode durar dois segundos ou quatro minutos — ambos igualmente válidos e igualmente fascinantes.</p>

<h2>As Divisões e os Grandes Nomes</h2>
<p>O sumô profissional tem seis divisões. A mais alta, <strong>Makuuchi</strong>, é composta por 42 lutadores, com os yokozuna no topo — título máximo, concedido apenas a quem demonstra excelência técnica e <em>hinkaku</em> (dignidade) de forma consistente. Lutadores mongóis dominaram a cena por décadas, mas jovens japoneses como Atamifuji e Onosho começam a desafiar essa supremacia com entusiasmo crescente do público.</p>

<h2>Como Assistir ao Natsu Basho</h2>
<p>Para quem está no Japão em maio, o Kokugikan vende ingressos online e nas bilheterias. Para quem está fora, o <strong>NHK World</strong> transmite os combates ao vivo com comentários em inglês. O canal oficial no YouTube do Nihon Sumo Kyokai publica os vídeos dos combates principais diariamente. Cada empurrão, cada queda, cada segundo no dohyō revela algo novo sobre um esporte que, quanto mais se conhece, mais fascinante se torna.</p>"""
    },
    {
        "title": "Aoi Matsuri: a procissão imperial que atravessa 1.500 anos em Kyoto",
        "slug": "aoi-matsuri-kyoto-festival-heian-2026",
        "content": """<p>Em 15 de maio de cada ano, mais de 500 pessoas vestidas com trajes da era Heian percorrem as ruas de Kyoto numa procissão silenciosa e solene. O <strong>Aoi Matsuri</strong> (葵祭) é considerado um dos três grandes festivais de Kyoto e um dos mais antigos do Japão. Sua origem remonta ao século VI.</p>

<h2>Origens no Século VI: Uma Catástrofe que Criou uma Tradição</h2>
<p>A história do Aoi Matsuri começa com uma catástrofe. Durante o reinado do Imperador Kinmei (538–571), o Japão foi atingido por fortes tempestades e epidemias que destruíram as colheitas. Um oráculo indicou que o mal decorria da fúria dos deuses Kamo — os deuses protetores de Kyoto.</p>
<p>Por ordem imperial, foram realizados rituais elaborados nos dois Santuários Kamo (Shimogamo e Kamigamo) para apaziguar as divindades. As cerimônias funcionaram — e o festival passou a ser realizado anualmente por mais de 1.500 anos, interrompido apenas em períodos de guerra civil.</p>
<blockquote><p>O Aoi Matsuri é um espelho do Japão antigo, preservado com tal fidelidade que caminhar ao lado da procissão é, por alguns instantes, atravessar o tempo.</p></blockquote>

<h2>A Procissão Imperial: Rota e Ritual</h2>
<p>O coração do festival é a <strong>Ro-e no Gyoretsu</strong> — a grande procissão. Ela parte do Gosho Imperial às 10h30 e percorre aproximadamente 8 km até o Santuário Shimogamo, onde realiza cerimônias, antes de continuar para o Santuário Kamigamo no final da tarde.</p>
<p>São 511 participantes, incluindo cavaleiros, músicos tocando instrumentos da era Heian e a figura central: a <strong>Saio-Dai</strong>, que representa a sacerdotisa imperial e viaja em um palanquim decorado com folhas de hollyhock — a planta <em>aoi</em> que dá nome ao festival.</p>

<h2>Trajes Heian e o Detalhe que Ninguém Esquece</h2>
<p>Todos os participantes usam vestimentas autênticas da corte Heian (794–1185), reproduzidas com precisão a partir de registros históricos. As mulheres usam o <em>junihitoe</em> — literalmente "doze camadas" — um kimono formal com sobreposições de cores graduadas que indicam status na corte. Os homens vestem trajes igualmente elaborados com chapéus lacados.</p>
<p>As folhas de <em>aoi</em> decoram os trajes, os cavalos e os palanquins. Segundo a crença, essa planta protege contra maus espíritos e catástrofes naturais — uma herança do mito fundador que se repete há 15 séculos.</p>

<h2>Como Assistir em 2026</h2>
<p>O festival acontece em 15 de maio, com a procissão saindo do Gosho Imperial às 10h30. O percurso passa por áreas públicas onde qualquer pessoa pode assistir gratuitamente. As áreas próximas ao Santuário Shimogamo são as mais concorridas por volta do meio-dia. Um dos festivais mais antigos do mundo — e um dos mais silenciosos. Essa contradição é pura essência japonesa.</p>"""
    }
]


def publicar_posts():
    print("Publicando 3 posts como rascunho no WordPress...\n")

    for post in POSTS:
        r = requests.post(
            f"{DOMINIO}/wp-json/wp/v2/posts",
            json={
                "title":   post["title"],
                "content": post["content"],
                "status":  "draft",
                "slug":    post["slug"],
            },
            auth=AUTH,
            timeout=30,
        )
        if r.status_code in (200, 201):
            data = r.json()
            print(f"  ✓ {post['title'][:65]}")
            print(f"    ID {data['id']} | Rascunho salvo")
        else:
            print(f"  ✗ Erro {r.status_code}: {r.text[:200]}")
        print()


def atualizar_portal():
    print("Atualizando portal com os 3 novos artigos...\n")

    html_content = Path("japaorelativo.html").read_bytes()

    r = requests.get(
        f"{DOMINIO}/wp-json/wp/v2/media?search=portal&per_page=5",
        auth=AUTH, timeout=20
    )
    existing = [m for m in (r.json() if r.status_code == 200 else [])
                if "portal.html" in m.get("source_url", "")]

    if existing:
        media_id = existing[0]["id"]
        resp = requests.post(
            f"{DOMINIO}/wp-json/wp/v2/media/{media_id}",
            headers={"Content-Disposition": 'attachment; filename="portal.html"',
                     "Content-Type": "text/html"},
            data=html_content,
            auth=AUTH, timeout=60
        )
    else:
        resp = requests.post(
            f"{DOMINIO}/wp-json/wp/v2/media",
            headers={"Content-Disposition": 'attachment; filename="portal.html"',
                     "Content-Type": "text/html"},
            data=html_content,
            auth=AUTH, timeout=60
        )

    if resp.status_code in (200, 201):
        url = resp.json().get("source_url", "")
        print(f"  ✓ Portal atualizado: {url}")
    else:
        print(f"  ✗ Erro {resp.status_code}: {resp.text[:150]}")


if __name__ == "__main__":
    publicar_posts()
    atualizar_portal()
    print("\n✓ Concluído! 3 rascunhos criados + portal atualizado.")
    print(f"  Painel WP: {DOMINIO}/wp-admin/edit.php")
