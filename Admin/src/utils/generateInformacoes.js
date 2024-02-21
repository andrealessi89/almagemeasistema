
let signos = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
let gradosDeEscolaridad = ["Sin estudios", "Educación secundaria", "Bachillerato", "Formación Profesional", "Grado universitario", "Máster", "Doctorado"];
let religiones = ["Cristianismo", "Budismo", "Católico"];
let rasgosPositivos = ["Amable", "Cariñoso", "Compasivo", "Confiable", "Valiente", "Creativo", "Decidido", "Resiliente", "Generoso", "Honesto", "Humilde", "Humorístico", "Inspirador", "Inteligente", "Leal", "Optimista", "Paciente", "Respetuoso", "Responsable", "Sabio"];
let generosMusicales = ["Pop", "Rock", "Jazz", "Blues", "Hip Hop", "Reggaeton", "Salsa", "Bachata", "Clásica", "Country", "Electrónica", "Folk", "Heavy Metal", "Indie", "Opera", "Punk", "Rap", "Reggae", "R&B", "Samba", "Soul", "Techno", "Trance", "Tropical"];
let gustosCulinarios = ["Comida italiana", "Comida mexicana", "Comida china", "Comida japonesa", "Comida francesa", "Comida española", "Comida tailandesa", "Comida india", "Comida vegetariana", "Comida vegana", "Comida mediterránea", "Comida brasileña", "Comida peruana", "Comida griega", "Comida de mariscos", "Comida de barbacoa", "Comida rápida", "Comida kosher", "Comida halal", "Comida orgánica"];
let deportesFavoritos = ["Fútbol", "Baloncesto", "Béisbol", "Voleibol", "Tenis", "Golf", "Rugby", "Críquet", "Hockey", "Boxeo", "Natación", "Atletismo", "Ciclismo", "Esquí", "Snowboarding", "Surf", "Escalada", "Gimnasia", "Artes marciales", "Yoga"];
let percepcionRelacionIdeal = [
    "Para mí, un relación ideal se basa en la confianza y la comunicación abierta.",
    "Creo que un buen relacionamiento debe tener mucho respeto mutuo.",
    "En mi opinión, la compatibilidad y los intereses compartidos son clave para un relación duradera.",
    "Pienso que un relación ideal es aquel donde ambos pueden crecer y aprender juntos.",
    "Para mí, un relación ideal es donde ambas partes se sienten seguras y amadas.",
    "Creo que en una relación ideal, los conflictos se resuelven a través del diálogo y la comprensión mutua.",
    "Un relación ideal para mí sería aquella donde hay tanto amor como amistad.",
    "Un buen relacionamiento, para mí, es aquel donde ambas partes mantienen su individualidad.",
    "Pienso que un relación ideal es donde cada uno apoya los sueños y aspiraciones del otro.",
    "Creo que un relación ideal es aquel donde ambos se sienten libres para expresar sus sentimientos y pensamientos sin miedo al juicio.",
    "Un relación ideal para mí sería aquella donde se pueda reír juntos, incluso en los momentos difíciles.",
    "Para mí, un relación ideal es uno en el que se celebren tanto las fortalezas como las debilidades del otro.",
    "Creo que un relación ideal se trata de construir una vida juntos, pero también de disfrutar del momento.",
    "En mi opinión, un relación ideal se trata de encontrar el equilibrio entre dar y recibir.",
    "Un relación ideal para mí es aquel donde no hay necesidad de esconder nuestros errores y fallos.",
    "Creo que un relación ideal es aquel donde hay un compromiso mutuo de mejorar cada día.",
    "Para mí, un buen relacionamiento implica comprender que el amor no es sólo un sentimiento, sino una decisión consciente.",
    "Pienso que en un relación ideal, cada uno se siente motivado para ser la mejor versión de sí mismo.",
    "En mi opinión, un relación ideal es aquel donde los pequeños gestos de cariño se valoran tanto como los grandes.",
    "Para mí, un relación ideal es uno en el que hay un intercambio constante de gratitud y apreciación.",
    "Creo que un relación ideal es aquel en el que el amor es una fuente de inspiración y fortaleza.",
    "Para mí, un buen relacionamiento es aquel en el que cada uno se siente valorado y respetado.",
    "Creo que un relación ideal es aquel donde se puede ser completamente uno mismo sin miedo al rechazo.",
    "Un relación ideal para mí es aquel en el que cada pequeño desacuerdo no se convierte en un gran problema.",
    "Pienso que en un relación ideal, cada uno puede tener su propio espacio y tiempo para sí mismo cuando lo necesite.",
    "En mi opinión, un buen relacionamiento es aquel en el que las partes trabajan juntas para superar los obstáculos y desafíos que se presenten.",
    "Creo que un relación ideal es aquel en el que cada uno está comprometido a mantener viva la chispa del amor.",
    "Para mí, un relación ideal es uno en el que las partes se sienten cómodas para hablar de cualquier tema, por más difícil que sea."
];


const generateInformacoes = () => {
    const randomize = array => array[Math.floor(Math.random() * array.length)];

    return {
        signo: randomize(signos),
        gradosDeEscolaridad: randomize(gradosDeEscolaridad),
        religion: randomize(religiones),
        rasgosPositivos: randomize(rasgosPositivos),
        generosMusicales: randomize(generosMusicales),
        gustosCulinarios: randomize(gustosCulinarios),
        deportesFavoritos: randomize(deportesFavoritos),
        percepcionRelacionIdeal: randomize(percepcionRelacionIdeal),
    }
}