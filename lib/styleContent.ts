// SEO copy for each style page (/tatuajes/[slug]). Order of artists lives in lib/styleRanking.ts.
// A style page is only generated when it has an entry here.

export interface StyleContent {
  slug: string
  tags: string[] // portfolio tags used to pull each artist's work for this style
  h1: string
  metaTitle: string
  metaDescription: string
  intro: string[]
  whatsappText: string
  artistsHeading: string
  faqHeading: string
  altNoun: string // used in image alt text, e.g. "Tatuaje de realismo"
  faqs: { q: string; a: string }[]
}

const booking = {
  q: '¿Cómo aparto mi cita?',
  a: 'Llena el formulario de citas o escríbenos por WhatsApp. Te cotizamos, y apartas tu fecha con un adelanto mínimo de Q300 que se descuenta del total.',
}

const price = (style: string, extra = '') => ({
  q: `¿Cuánto cuesta un tatuaje ${style}?`,
  a: `Depende del tamaño, la zona del cuerpo y el nivel de detalle. Los tatuajes pequeños y sencillos en el estudio empiezan desde Q450.${extra} Te damos una cotización exacta cuando nos cuentas tu idea, el área y el tamaño.`,
})

const tattoo = (
  c: Omit<StyleContent, 'artistsHeading' | 'faqHeading' | 'altNoun' | 'whatsappText'> & { name: string },
): StyleContent => {
  const { name, ...rest } = c
  return {
    ...rest,
    whatsappText: `Hola, quiero cotizar un tatuaje ${name}.`,
    artistsHeading: `Quién tatúa ${name.replace(/^de /, '').replace(/^estilo /, '')} en el estudio`,
    faqHeading: `Antes de tu tatuaje ${name}`,
    altNoun: `Tatuaje ${name}`,
  }
}

export const styleContent: StyleContent[] = [
  tattoo({
    slug: 'realismo',
    name: 'de realismo',
    tags: ['realismo'],
    h1: 'Tatuajes de realismo en Guatemala',
    metaTitle: "Tatuajes de Realismo en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Tatuajes de realismo en black and gray y a color en Zona 10, Ciudad de Guatemala. Retratos, animales y piezas personalizadas por artistas especializados. Agenda tu cita.',
    intro: [
      'El realismo busca que un tatuaje se vea como una fotografía o una pintura sobre la piel: retratos, animales, rostros, esculturas y escenas con luz, sombra y profundidad reales.',
      'Es uno de los estilos más exigentes que existen. Necesita años de práctica, un buen manejo de los grises o del color y un diseño pensado para la parte del cuerpo donde va. Por eso en Soul’s Anchor trabajamos el realismo con artistas que lo tienen como especialidad.',
    ],
    faqs: [
      price('de realismo', ' Las piezas de realismo suelen requerir más tiempo que otros estilos.'),
      {
        q: '¿Black and gray o a color?',
        a: 'El black and gray trabaja con negros y grises diluidos y envejece de forma muy estable. El color da más impacto, pero requiere más cuidado al sol. Tu artista te recomienda la opción que mejor funciona para tu diseño y tu tono de piel.',
      },
      {
        q: '¿Cuántas sesiones necesita un tatuaje de realismo?',
        a: 'Una pieza pequeña o mediana puede hacerse en una sesión. Piezas grandes como un brazo, una espalda o un retrato con fondo pueden necesitar varias sesiones. Lo definimos contigo al cotizar.',
      },
      {
        q: '¿Puedo llevar una foto para un retrato?',
        a: 'Sí. Lo ideal es una foto nítida, bien iluminada y en buena resolución. Tu artista la revisa contigo y, si hace falta, ajusta el diseño para que el resultado se vea bien en la piel.',
      },
      booking,
    ],
  }),
  tattoo({
    slug: 'black-and-gray',
    name: 'black and gray',
    tags: ['realismo', 'black-and-gray'],
    h1: 'Tatuajes black and gray en Guatemala',
    metaTitle: "Tatuajes Black and Gray en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Tatuajes black and gray en Zona 10, Ciudad de Guatemala. Sombras suaves, contraste y profundidad en retratos, religioso, animales y piezas personalizadas. Agenda tu cita.',
    intro: [
      'El black and gray se trabaja solo con tinta negra y sus diluciones. Con eso se construyen sombras suaves, degradados y contraste para dar volumen y profundidad sin usar color.',
      'Es un estilo clásico que funciona muy bien en retratos, imágenes religiosas, animales, estatuas y composiciones grandes. Bien hecho, envejece con elegancia y se mantiene legible por muchos años.',
    ],
    faqs: [
      price('black and gray'),
      {
        q: '¿Qué diferencia hay entre black and gray y blackwork?',
        a: 'El black and gray usa grises y degradados para crear sombras y realismo. El blackwork usa negro sólido, con áreas llenas y contrastes fuertes, sin tantas transiciones de gris.',
      },
      {
        q: '¿Un black and gray se borra con el tiempo?',
        a: 'Todos los tatuajes se suavizan un poco con los años, pero un black and gray con buen contraste se mantiene legible. Proteger el tatuaje del sol es lo que más ayuda a conservarlo.',
      },
      booking,
    ],
  }),
  tattoo({
    slug: 'linea-fina',
    name: 'de línea fina',
    tags: ['linea-fina'],
    h1: 'Tatuajes de línea fina en Guatemala',
    metaTitle: "Tatuajes de Línea Fina (Fine Line) en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Tatuajes de línea fina o fine line en Zona 10, Ciudad de Guatemala. Diseños delicados, minimalistas y detallados por artistas especializados. Agenda tu cita.',
    intro: [
      'La línea fina, o fine line, usa agujas muy delgadas para lograr trazos delicados y precisos. Es ideal para diseños minimalistas, letras, flores, símbolos y piezas pequeñas con mucho detalle.',
      'Parece sencillo, pero exige mucha precisión: una línea fina mal hecha se nota de inmediato. Por eso conviene hacerlo con artistas que dominan la técnica y saben qué tamaño necesita cada diseño para verse bien con el tiempo.',
    ],
    faqs: [
      price('de línea fina', ' Muchos diseños de línea fina son pequeños, así que suelen estar cerca de ese mínimo.'),
      {
        q: '¿La línea fina dura?',
        a: 'Sí, cuando se hace con buena técnica y el tamaño correcto. Las líneas muy finas en diseños muy pequeños pueden suavizarse más con los años, por eso tu artista te puede sugerir ajustar un poco el tamaño o el grosor.',
      },
      {
        q: '¿Duele más un tatuaje de línea fina?',
        a: 'No necesariamente. Suelen ser sesiones cortas. El dolor depende más de la zona del cuerpo que del estilo.',
      },
      booking,
    ],
  }),
  tattoo({
    slug: 'tradicional',
    name: 'tradicional',
    tags: ['tradicional'],
    h1: 'Tatuajes tradicionales en Guatemala',
    metaTitle: "Tatuajes Tradicionales (Old School) en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Tatuajes tradicionales u old school en Zona 10, Ciudad de Guatemala. Líneas gruesas, colores sólidos y diseños clásicos que duran. Agenda tu cita.',
    intro: [
      'El tatuaje tradicional, también conocido como old school o American traditional, se reconoce por sus líneas gruesas, colores sólidos y una paleta limitada. Anclas, golondrinas, rosas, dagas, panteras y calaveras son algunos de sus clásicos.',
      'Es uno de los estilos que mejor envejece: sus contornos fuertes y colores planos se mantienen legibles por décadas. Nuestros artistas lo trabajan tanto en flash clásico como en diseños personalizados.',
    ],
    faqs: [
      price('tradicional'),
      {
        q: '¿Puedo elegir un diseño de flash?',
        a: 'Sí. Puedes elegir un flash del artista o pedir un diseño personalizado en estilo tradicional. Pregúntale a tu artista por los diseños que tiene disponibles.',
      },
      {
        q: '¿Por qué se dice que el tradicional dura más?',
        a: 'Porque usa líneas gruesas y colores sólidos con buen contraste. Aunque la piel cambie con los años, el diseño sigue leyéndose bien.',
      },
      booking,
    ],
  }),
  tattoo({
    slug: 'neo-tradicional',
    name: 'neo tradicional',
    tags: ['neo-traditional'],
    h1: 'Tatuajes neo tradicionales en Guatemala',
    metaTitle: "Tatuajes Neo Tradicionales en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Tatuajes neo tradicionales en Zona 10, Ciudad de Guatemala. Líneas fuertes, color intenso y más detalle e ilustración. Diseños personalizados. Agenda tu cita.',
    intro: [
      'El neo tradicional toma las bases del tatuaje tradicional, líneas fuertes y buena lectura, y les suma más detalle, más profundidad y una paleta de color más amplia.',
      'Es un estilo muy ilustrativo: retratos de mujeres, animales, flores, ornamentos y composiciones con mucho carácter. Funciona muy bien en piezas medianas y grandes.',
    ],
    faqs: [
      price('neo tradicional', ' Las piezas neo tradicionales suelen ser medianas o grandes por su nivel de detalle.'),
      {
        q: '¿Qué diferencia hay entre tradicional y neo tradicional?',
        a: 'El tradicional usa una paleta limitada y diseños más simples. El neo tradicional mantiene las líneas fuertes, pero agrega más detalle, degradados y una gama de colores más amplia.',
      },
      booking,
    ],
  }),
  tattoo({
    slug: 'neo-japones',
    name: 'neo japonés',
    tags: ['neo-japanese'],
    h1: 'Tatuajes neo japoneses en Guatemala',
    metaTitle: "Tatuajes Neo Japoneses en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Tatuajes neo japoneses en Zona 10, Ciudad de Guatemala. Dragones, koi, máscaras y flores con composición japonesa y un enfoque moderno. Agenda tu cita.',
    intro: [
      'El neo japonés parte de la tradición del tatuaje japonés, dragones, peces koi, máscaras hannya, tigres, flores de cerezo y olas, y la reinterpreta con un enfoque más moderno en color, contraste y detalle.',
      'Es un estilo pensado para fluir con el cuerpo, por eso brilla en piezas grandes como brazos, piernas, pecho y espalda. Cada diseño se compone a la medida de la zona donde va.',
    ],
    faqs: [
      price('neo japonés', ' La mayoría de piezas neo japonesas son grandes y se trabajan en varias sesiones.'),
      {
        q: '¿Puedo hacerme una manga neo japonesa?',
        a: 'Sí. Es uno de los estilos que mejor funciona en mangas. Se diseña la pieza completa desde el inicio y se avanza por sesiones.',
      },
      booking,
    ],
  }),
  tattoo({
    slug: 'ilustrativo',
    name: 'ilustrativo',
    tags: ['ilustrativo'],
    h1: 'Tatuajes ilustrativos en Guatemala',
    metaTitle: "Tatuajes Ilustrativos en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Tatuajes ilustrativos en Zona 10, Ciudad de Guatemala. Diseños originales que parecen sacados de un libro o un cómic, a color o en negro. Agenda tu cita.',
    intro: [
      'El estilo ilustrativo lleva el lenguaje del dibujo a la piel: piezas que parecen sacadas de un libro ilustrado, un grabado o un cómic. Combina línea, sombra y color con mucha libertad.',
      'Es el estilo ideal si buscas un diseño único y personalizado. Cada artista le pone su propia mano, por eso vale la pena revisar el trabajo de cada uno y elegir el que más conecta con tu idea.',
    ],
    faqs: [
      price('ilustrativo'),
      {
        q: '¿Puedo llevar mi propia idea o dibujo?',
        a: 'Sí. Lleva tus referencias o tu boceto y tu artista lo adapta para que funcione como tatuaje en la zona que elegiste.',
      },
      booking,
    ],
  }),
  tattoo({
    slug: 'color',
    name: 'a color',
    tags: ['color'],
    h1: 'Tatuajes a color en Guatemala',
    metaTitle: "Tatuajes a Color en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Tatuajes a color en Zona 10, Ciudad de Guatemala. Color sólido, vibrante y bien saturado en ilustrativo, neo tradicional, realismo y más. Agenda tu cita.',
    intro: [
      'Un buen tatuaje a color necesita técnica para saturar bien la piel, elegir la paleta correcta y mantener contraste para que el diseño se siga leyendo con los años.',
      'En el estudio trabajamos el color en distintos estilos: ilustrativo, neo tradicional, neo japonés, realismo y kawaii. Revisa el trabajo de cada artista para encontrar el que va con tu idea.',
    ],
    faqs: [
      price('a color', ' El color suele requerir más tiempo de trabajo que el negro.'),
      {
        q: '¿El color se desvanece?',
        a: 'Todos los tatuajes se suavizan con los años, y el color es más sensible al sol. Con bloqueador y buen cuidado, un tatuaje a color bien saturado se mantiene vivo por mucho tiempo.',
      },
      {
        q: '¿El color funciona en piel morena?',
        a: 'Sí. Tu artista elige la paleta y el contraste pensando en tu tono de piel para que el resultado se vea bien.',
      },
      booking,
    ],
  }),
  tattoo({
    slug: 'blackwork',
    name: 'blackwork',
    tags: ['blackwork'],
    h1: 'Tatuajes blackwork en Guatemala',
    metaTitle: "Tatuajes Blackwork en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Tatuajes blackwork en Zona 10, Ciudad de Guatemala. Negro sólido, contraste fuerte y diseños con carácter. Agenda tu cita con artistas especializados.',
    intro: [
      'El blackwork se trabaja con tinta negra sólida: áreas llenas, contrastes fuertes y diseños gráficos que se leen desde lejos. Va desde lo ornamental y geométrico hasta lo ilustrativo y oscuro.',
      'Es un estilo con mucha presencia y muy buena duración. También es una opción muy usada para cubrir tatuajes viejos.',
    ],
    faqs: [
      price('blackwork'),
      {
        q: '¿Qué diferencia hay entre blackwork y black and gray?',
        a: 'El blackwork usa negro sólido y contrastes marcados. El black and gray usa grises y degradados para crear sombras suaves y volumen.',
      },
      booking,
    ],
  }),
  tattoo({
    slug: 'anime',
    name: 'de anime',
    tags: ['anime'],
    h1: 'Tatuajes de anime en Guatemala',
    metaTitle: "Tatuajes de Anime en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Tatuajes de anime y manga en Zona 10, Ciudad de Guatemala. Personajes y escenas de tus series favoritas, a color o en negro. Agenda tu cita.',
    intro: [
      'Los tatuajes de anime llevan a la piel personajes, escenas y símbolos de tus series y mangas favoritos. Pueden hacerse en línea limpia estilo manga, en blackwork o a todo color.',
      'Lo importante es respetar el estilo de dibujo original y adaptarlo bien a la zona del cuerpo. Nuestros artistas lo trabajan con diseños personalizados, no copias planas de una imagen.',
    ],
    faqs: [
      price('de anime'),
      {
        q: '¿Puedo combinar varios personajes en un tatuaje?',
        a: 'Sí. Tu artista puede armar una composición con varios personajes o escenas para que funcione como una sola pieza.',
      },
      booking,
    ],
  }),
  tattoo({
    slug: 'cover-up',
    name: 'cover up',
    tags: ['cover-up'],
    h1: 'Cover up de tatuajes en Guatemala',
    metaTitle: "Cover Up de Tatuajes en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Cover up en Zona 10, Ciudad de Guatemala. Cubrimos tatuajes viejos o que ya no te gustan con un diseño nuevo. Evaluación y cotización personalizada.',
    intro: [
      'Un cover up es un tatuaje nuevo diseñado para cubrir uno anterior. Es la opción para ese tatuaje viejo, desvanecido o que simplemente ya no te representa.',
      'No cualquier diseño cubre cualquier tatuaje: hay que estudiar el tamaño, la saturación y los colores del tatuaje original para elegir una composición que lo esconda de verdad. Por eso cada cover up empieza con una evaluación.',
    ],
    faqs: [
      price('cover up', ' Un cover up suele ser más grande y más oscuro que el tatuaje original.'),
      {
        q: '¿Se puede cubrir cualquier tatuaje?',
        a: 'Casi siempre hay una opción, pero depende del tamaño y qué tan oscuro es el tatuaje original. Envíanos una foto y tu artista te dice qué es posible.',
      },
      {
        q: '¿Necesito láser antes del cover up?',
        a: 'No siempre. En tatuajes muy oscuros o muy grandes, unas sesiones de láser para aclararlo pueden dar más libertad de diseño. Tu artista te lo recomienda si hace falta.',
      },
      booking,
    ],
  }),
  {
    slug: 'piercing',
    tags: ['oreja', 'nariz', 'ceja', 'labio', 'ombligo'],
    h1: 'Piercing en Guatemala, Zona 10',
    metaTitle: "Piercing en Guatemala, Zona 10 | Soul's Anchor",
    metaDescription:
      'Piercing profesional en Zona 10, Ciudad de Guatemala. Oreja, nariz, ceja, labio y ombligo, con joyería de calidad y atención personalizada. Agenda tu cita.',
    intro: [
      'En Soul’s Anchor hacemos perforaciones de oreja, nariz, ceja, labio y ombligo con un perforador profesional y una especialista en joyería.',
      'Un buen piercing empieza por revisar tu anatomía, elegir la joyería adecuada y explicarte cómo cuidarlo para que sane bien. Te acompañamos en todo el proceso.',
    ],
    whatsappText: 'Hola, quiero información para un piercing.',
    artistsHeading: 'Nuestro equipo de piercing',
    faqHeading: 'Antes de tu piercing',
    altNoun: 'Piercing',
    faqs: [
      {
        q: '¿Qué piercings hacen?',
        a: 'Oreja (lóbulo, hélix, tragus, conch y más), nariz, ceja, labio y ombligo. Si buscas uno que no aparece aquí, pregúntanos por WhatsApp.',
      },
      {
        q: '¿Cuánto tarda en sanar un piercing?',
        a: 'Depende de la zona. Un lóbulo puede sanar en pocas semanas, mientras que los cartílagos pueden tardar varios meses. Te explicamos los tiempos y cuidados de tu piercing en la cita.',
      },
      {
        q: '¿Puedo llegar sin cita?',
        a: 'Sí, aceptamos walk-ins según disponibilidad. Para asegurar tu espacio, lo mejor es agendar por el formulario o por WhatsApp.',
      },
    ],
  },
]

export function getStyleContent(slug: string) {
  return styleContent.find(s => s.slug === slug)
}
