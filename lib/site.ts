export const WHATSAPP_DISPLAY = '+502 3349 8563'
export const WHATSAPP_NUMBER = '50233498563'
export const whatsappLink = (text = 'Hola, quiero información para un tatuaje.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
