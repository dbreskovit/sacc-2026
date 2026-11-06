// Dados do evento que mudam com frequência ficam aqui.
window.SACC_CONFIG = {
  formsUrl: "https://docs.google.com/forms/d/e/1FAIpQLScxb1kE6Y8KQJjxcqGcPHTwzg0vsjM39yFIE1j2UgArZVTD0Q/viewform?usp=dialog",
  // início do evento (horário de Brasília)
  eventStart: "2026-11-09T08:00:00-03:00",

  photos: {
    "Alisson Garcia": "assets/fotos/alisson-garcia.jpg",
    "Ana Maria Cavasin": "assets/fotos/ana-cavasin.jpg",
    "Artur da Motta Deters": "assets/fotos/artur-deters.png",
    "Augusto Roberto Gehrke": "assets/fotos/augusto-gehrke.jpeg",
    "Camila Munzlinger": "assets/fotos/camila-munzlinger.jpg",
    "Fernando Coelho": "assets/fotos/fernando-coelho.jpg",
    "Raquel Brombilla": "assets/fotos/raquel-brombilla.jpg",
    "Uianes Luiz Rockenbach Biondo": "assets/fotos/uianes-biondo.png",
    "William Alexandre Ferreira": "assets/fotos/william-ferreira.jpg",
  },
  pendingPeople: [],

  schedule: [
    {
      day: "Segunda", date: "09/11", place: "Salão social",
      items: [
        { time: "19:00", pause: true, title: "Credenciamento", icon: "inscricao" },
        { time: "19:15", title: "Momento cultural", note: "Cleber e Wilson" },
        { time: "19:40", title: "Abertura", note: "DG, DE, Coord. Curso e presidente DA" },
        { time: "20:00", tag: "palestra", title: "Por que eu não aprendo a programar?", people: ["Uianes Luiz Rockenbach Biondo"] },
        { time: "21:30", pause: true, title: "Coquetel de abertura" },
      ],
    },
    {
      day: "Terça", date: "10/11", place: "Salão social",
      items: [
        { time: "19:15", tag: "palestra", title: "Letramento em IA, Ética e Práticas", people: ["Fernando Coelho"] },
        { time: "20:15", tag: "palestra", title: "Empreendedorismo, blockchain, carreira", people: ["Augusto Roberto Gehrke"] },
        { time: "21:30", pause: true, title: "Coffee break" },
      ],
    },
    {
      day: "Quarta", date: "11/11", place: "Salão social",
      items: [
        {
          time: "19:15", title: "Carreira acadêmica X Carreira profissional",
          people: ["Raquel Brombilla", "Ana Maria Cavasin", "Camila Munzlinger", "Alisson Garcia", "William Alexandre Ferreira"],
        },
        { time: "21:30", pause: true, title: "Coffee break" },
      ],
    },
    {
      day: "Quinta", date: "12/11",
      items: [
        { time: "19:00", tag: "minicurso", title: "IA na prática: construindo agentes inteligentes com MCP e Python", place: "LAB 310", people: ["Raquel Brombilla"] },
        { time: "19:00", tag: "minicurso", title: "Busca semântica com o uso de LLMs no Databricks", place: "LAB 201", people: ["Camila Munzlinger"] },
        { time: "19:00", tag: "minicurso", title: "Modelagem 3D: componentes para impressão 3D", place: "LAB 205", people: ["Artur da Motta Deters"] },
        { time: "19:00", tag: "minicurso", title: "Mercado de TI: por onde começar?", place: "LAB REDES (prédio anexo)", people: ["Alisson Garcia"] },
        { time: "20:40", pause: true, title: "Coffee break", place: "Prédio de TI" },
      ],
    },
    {
      day: "Sexta", date: "13/11", place: "Prédio de TI",
      items: [
        { time: "19:00", title: "Confraternização", note: "Atividades de socialização organizadas pelo Diretório Acadêmico", icon: "intervalo" },
        { time: "20:40", pause: true, title: "Coquetel de encerramento" },
      ],
    },
  ],
};
