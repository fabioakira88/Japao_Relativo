(function () {
  "use strict";

  const courses = [
    {
      id: "ar-condicionado",
      slug: "ar-condicionado",
      title: "Higienização de Ar-Condicionado no Japão",
      eyebrow: "Guia Prático · Casa e trabalho",
      level: "MVP inicial",
      duration: "8 min",
      status: "available",
      description: "Aprenda os fundamentos para entender a higienização de ar-condicionado em residências japonesas.",
      introduction: "Um guia introdutório em cards para quem quer diferenciar limpeza simples, higienização interna e preparação básica antes de qualquer serviço.",
      freeCards: [
        {
          id: "ar-001",
          title: "O que é higienização de ar-condicionado",
          subtitle: "Mais do que tirar poeira visível.",
          content: "Higienizar um ar-condicionado significa remover sujeira acumulada, reduzir mau cheiro e cuidar das partes internas por onde o ar circula. No Japão, onde muitos apartamentos usam o aparelho durante verão úmido e inverno frio, essa manutenção ajuda a manter o ambiente mais confortável.",
          takeaway: "Higienização não é apenas aparência: envolve ar, umidade, odor e uso frequente."
        },
        {
          id: "ar-002",
          title: "Filtro limpo não significa aparelho higienizado",
          subtitle: "A diferença que muitos iniciantes confundem.",
          content: "A limpeza do filtro é uma tarefa simples e regular. Já a higienização interna considera partes como entrada de ar, aletas, saída de vento e áreas onde sujeira e umidade podem se acumular. Um filtro limpo ajuda, mas não resolve sozinho o interior do aparelho.",
          takeaway: "Filtro é manutenção básica. Higienização interna é um cuidado mais completo."
        },
        {
          id: "ar-003",
          title: "Equipamentos básicos necessários",
          subtitle: "Antes de qualquer procedimento, vem a preparação.",
          content: "Luvas, máscara, panos, pulverizador, escova macia e proteção para o entorno são itens básicos para começar com segurança. Também é importante desligar o aparelho e observar o modelo antes de tocar em partes internas.",
          takeaway: "O primeiro equipamento é método: observar, proteger e só depois limpar."
        }
      ],
      premiumTeasers: [
        { id: "ar-premium-004", title: "Preparação do ambiente" },
        { id: "ar-premium-005", title: "Proteção da parede e móveis" },
        { id: "ar-premium-006", title: "Limpeza da evaporadora" },
        { id: "ar-premium-007", title: "Uso de produtos" },
        { id: "ar-premium-008", title: "Secagem e teste final" }
      ],
      quiz: [
        {
          id: "ar-quiz-001",
          question: "Qual é a melhor definição de higienização?",
          options: [
            { id: "a", text: "Apenas passar pano na parte externa." },
            { id: "b", text: "Cuidar da sujeira e odor nas áreas por onde o ar circula." },
            { id: "c", text: "Trocar o aparelho por um modelo novo." },
            { id: "d", text: "Usar o ar-condicionado na temperatura mínima." }
          ],
          correctAnswer: "b",
          explanation: "A higienização considera circulação de ar, acúmulo interno, odor e umidade."
        },
        {
          id: "ar-quiz-002",
          question: "Limpar o filtro resolve toda a higienização interna?",
          options: [
            { id: "a", text: "Sim, o filtro é a única parte importante." },
            { id: "b", text: "Não, o filtro é só uma parte da manutenção." },
            { id: "c", text: "Sim, desde que seja lavado com água quente." },
            { id: "d", text: "Não, porque filtro nunca deve ser limpo." }
          ],
          correctAnswer: "b",
          explanation: "O filtro ajuda muito, mas a sujeira também pode estar em outras áreas internas."
        },
        {
          id: "ar-quiz-003",
          question: "Qual atitude vem antes de iniciar qualquer limpeza?",
          options: [
            { id: "a", text: "Ligar o aparelho no modo mais forte." },
            { id: "b", text: "Aplicar produto sem observar o modelo." },
            { id: "c", text: "Desligar o aparelho e proteger o entorno." },
            { id: "d", text: "Remover peças internas sem preparação." }
          ],
          correctAnswer: "c",
          explanation: "Segurança e proteção do ambiente vêm antes do procedimento."
        }
      ]
    }
  ];

  if (typeof window !== "undefined") {
    window.JR_COURSES = courses;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = courses;
  }
})();
