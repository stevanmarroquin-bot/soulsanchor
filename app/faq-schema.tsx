const faqs = [
  {
    question: '¿Cuál es su horario?',
    answer:
      'Lunes a Sábado 10am – 7pm. Domingos y feriados cerrado, pero podemos coordinar citas en horario extendido con anticipación.',
  },
  {
    question: '¿Cómo reservo mi cita?',
    answer:
      'Después de recibir una cotización, reservamos una cita con un adelanto de mínimo Q300, que es una contribución directa al costo total del tatuaje.',
  },
  {
    question: '¿Aceptan walk-ins?',
    answer: 'Sí, siempre tenemos disponibilidad.',
  },
  {
    question: '¿Cuánto cuesta un tatuaje?',
    answer:
      'El precio depende del diseño, estilo, área y tamaño. El mínimo por tatuajes pequeños y simples es de Q450.',
  },
  {
    question: '¿Qué formas de pago aceptan?',
    answer:
      'Todas. Efectivo, transferencia, tarjeta (con cuotas), PayPal y Bitcoin.',
  },
  {
    question: '¿Hacen cover-ups?',
    answer:
      'Sí, tenemos especialistas en cover ups. Adjunta fotos del tatuaje a cubrir y sé abierto a las sugerencias de los artistas.',
  },
  {
    question: '¿Tengo que llevar mi diseño?',
    answer:
      'No. Nuestro objetivo siempre es arte original personalizado. El artista diseña para ti — solo trae tu idea o referencias.',
  },
  {
    question: '¿Hacen perforaciones?',
    answer:
      'Sí. Contamos con Focho, nuestro body piercer profesional con amplia experiencia. Contáctalo en @focho_tp.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export function FAQSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}
