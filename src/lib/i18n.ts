export type Lang = "es" | "en";

export const copy = {
  es: {
    presents: "Caley Insurance presenta",
    envelopeHeadline: "Estás invitado a una noche especial",
    envelopeSub: "Una celebración elegante por nuestro 8.º aniversario.",
    openBtn: "Abrir invitación",

    heroEyebrow: "8.º Aniversario",
    heroTitle1: "Caley Insurance cumple 8 años",
    heroTitle2: "Y queremos celebrarlo contigo",
    heroPara: "Una noche especial llena de música, premios, sorpresas, comida, alegría y agradecimiento por todos los que han sido parte de nuestra historia.",
    rsvpBtn: "Confirmar asistencia",
    detailsBtn: "Ver detalles del evento",

    detailsTitle: "Detalles del evento",
    dateL: "Fecha", timeL: "Hora", placeL: "Lugar", dressL: "Código de vestimenta",
    soon: "Próximamente",
    dress: "Elegante / Semi-formal",
    detailsNote: "Muy pronto compartiremos todos los detalles oficiales de esta gran celebración.",

    expectTitle: "Lo que te espera",
    cards: [
      { t: "Música", d: "Disfruta una noche con música, energía y momentos especiales." },
      { t: "Comida", d: "Una experiencia pensada para compartir, celebrar y disfrutar." },
      { t: "Premios", d: "Rifas, premios y sorpresas durante la celebración." },
      { t: "Sorpresas", d: "Momentos inesperados para hacer la noche inolvidable." },
      { t: "Familia Caley", d: "Una celebración para nuestro equipo, clientes, amigos y comunidad." },
      { t: "Celebración", d: "8 años de historia, crecimiento y confianza." },
    ],

    prizesTitle: "Premios, rifas y grandes sorpresas",
    prizesSub: "Durante la noche estaremos celebrando con premios especiales y momentos pensados para agradecer a quienes han sido parte de nuestra historia.",
    prizes: ["Premios especiales", "Rifas durante la noche", "Sorpresas para invitados", "Reconocimientos"],
    comingSoon: "Muy pronto",

    storyTitle: "8 años creciendo juntos",
    storySub: "Esta celebración no es solo por un aniversario. Es por cada persona que confió, apoyó y formó parte del camino de Caley Insurance.",
    timeline: [
      { t: "El comienzo", d: "Un sueño que empezó con visión, esfuerzo y compromiso." },
      { t: "Crecimiento", d: "Años de trabajo, aprendizaje y expansión." },
      { t: "Comunidad", d: "Clientes, amigos y familias que han confiado en nosotros." },
      { t: "Hoy celebramos", d: "8 años de historia y una nueva etapa por delante." },
    ],

    countdownTitle: "Falta poco para celebrar",
    days: "Días", hours: "Horas", minutes: "Minutos", seconds: "Segundos",
    started: "La celebración ha comenzado",

    rsvpTitle: "Confirma tu asistencia",
    rsvpSub: "Queremos contar contigo en esta noche tan especial.",
    nameL: "Nombre completo", phoneL: "Teléfono", guestsL: "Número de invitados", msgL: "Mensaje opcional",
    yes: "Sí, asistiré", no: "No podré asistir",
    sendBtn: "Enviar confirmación",
    thanks: "¡Gracias! Tu confirmación ha sido registrada.",

    footerH: "Gracias por ser parte de nuestra historia.",
    footerSub: "Nos vemos en la celebración del 8.º aniversario de Caley Insurance.",
    footerName: "Caley Insurance • Celebración del 8.º Aniversario",
    rights: "© 2026 Caley Insurance. Todos los derechos reservados.",
  },
  en: {
    presents: "Caley Insurance presents",
    envelopeHeadline: "You are invited to a special night",
    envelopeSub: "An elegant celebration of our 8th anniversary.",
    openBtn: "Open Invitation",

    heroEyebrow: "8th Anniversary",
    heroTitle1: "Caley Insurance turns 8",
    heroTitle2: "And we want to celebrate with you",
    heroPara: "A special night filled with music, prizes, surprises, food, joy, and gratitude for everyone who has been part of our story.",
    rsvpBtn: "Confirm Attendance",
    detailsBtn: "View Event Details",

    detailsTitle: "Event Details",
    dateL: "Date", timeL: "Time", placeL: "Location", dressL: "Dress Code",
    soon: "Coming soon",
    dress: "Elegant / Semi-formal",
    detailsNote: "We will share the official details of this special celebration soon.",

    expectTitle: "What to Expect",
    cards: [
      { t: "Music", d: "Enjoy a night filled with music, energy, and special moments." },
      { t: "Food", d: "An experience made to share, celebrate, and enjoy." },
      { t: "Prizes", d: "Raffles, prizes, and surprises throughout the celebration." },
      { t: "Surprises", d: "Unexpected moments to make the night unforgettable." },
      { t: "Caley Family", d: "A celebration for our team, clients, friends, and community." },
      { t: "Celebration", d: "8 years of history, growth, and trust." },
    ],

    prizesTitle: "Prizes, Raffles, and Big Surprises",
    prizesSub: "Throughout the night, we will celebrate with special prizes and moments created to thank everyone who has been part of our story.",
    prizes: ["Special Prizes", "Raffles Throughout the Night", "Guest Surprises", "Recognitions"],
    comingSoon: "Coming soon",

    storyTitle: "8 Years Growing Together",
    storySub: "This celebration is not just about an anniversary. It is about every person who trusted, supported, and became part of Caley Insurance's journey.",
    timeline: [
      { t: "The Beginning", d: "A dream that began with vision, effort, and commitment." },
      { t: "Growth", d: "Years of work, learning, and expansion." },
      { t: "Community", d: "Clients, friends, and families who have trusted us." },
      { t: "Today We Celebrate", d: "8 years of history and a new chapter ahead." },
    ],

    countdownTitle: "The Celebration Begins Soon",
    days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
    started: "The celebration has begun",

    rsvpTitle: "Confirm Your Attendance",
    rsvpSub: "We would love to have you with us on this special night.",
    nameL: "Full Name", phoneL: "Phone", guestsL: "Number of Guests", msgL: "Optional Message",
    yes: "Yes, I will attend", no: "I cannot attend",
    sendBtn: "Send Confirmation",
    thanks: "Thank you! Your confirmation has been recorded.",

    footerH: "Thank you for being part of our story.",
    footerSub: "See you at Caley Insurance's 8th Anniversary Celebration.",
    footerName: "Caley Insurance • 8th Anniversary Celebration",
    rights: "© 2026 Caley Insurance. All rights reserved.",
  },
};

export type Copy = (typeof copy)["es"];
