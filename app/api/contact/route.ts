import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()

    const tipo = data.get('tipo') as string
    const nombre = data.get('nombre') as string
    const contacto = data.get('contacto_preferido') as string
    const whatsapp = data.get('whatsapp') as string
    const correo = data.get('correo') as string
    const instagram = data.get('instagram') as string

    // Tattoo fields
    const artista = data.get('artista') as string
    const descripcion = data.get('descripcion') as string
    const estilo = data.get('estilo') as string
    const area = data.get('area') as string
    const tamano = data.get('tamano') as string

    // Piercing fields
    const especialista = data.get('especialista') as string
    const tipo_piercing = data.get('tipo_piercing') as string
    const zona = data.get('zona') as string
    const consulta = data.get('consulta') as string

    // File attachments
    const files = data.getAll('referencias') as File[]
    const attachments = await Promise.all(
      files
        .filter((f) => f && f.size > 0)
        .map(async (file) => ({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        }))
    )

    const contactoInfo = contacto === 'WhatsApp'
      ? `WhatsApp: ${whatsapp}`
      : contacto === 'Correo'
      ? `Correo: ${correo}`
      : `Instagram: ${instagram}`

    const rows = tipo === 'tatuaje'
      ? `
        <tr><td style="padding:6px 0;color:#888;font-size:13px;">Artista</td><td style="padding:6px 0 6px 16px;font-size:13px;">${artista || 'Sin preferencia'}</td></tr>
        <tr><td style="padding:6px 0;color:#888;font-size:13px;">Descripción</td><td style="padding:6px 0 6px 16px;font-size:13px;">${descripcion || '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#888;font-size:13px;">Estilo</td><td style="padding:6px 0 6px 16px;font-size:13px;">${estilo || '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#888;font-size:13px;">Área</td><td style="padding:6px 0 6px 16px;font-size:13px;">${area || '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#888;font-size:13px;">Tamaño</td><td style="padding:6px 0 6px 16px;font-size:13px;">${tamano}</td></tr>
      `
      : `
        <tr><td style="padding:6px 0;color:#888;font-size:13px;">Especialista</td><td style="padding:6px 0 6px 16px;font-size:13px;">${especialista || 'Sin preferencia'}</td></tr>
        <tr><td style="padding:6px 0;color:#888;font-size:13px;">Tipo de piercing</td><td style="padding:6px 0 6px 16px;font-size:13px;">${tipo_piercing || '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#888;font-size:13px;">Zona</td><td style="padding:6px 0 6px 16px;font-size:13px;">${zona || '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#888;font-size:13px;">Consulta</td><td style="padding:6px 0 6px 16px;font-size:13px;">${consulta || '—'}</td></tr>
      `

    const html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#fff;padding:32px;">
        <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#aaa;margin:0 0 8px;">Soul's Anchor</p>
        <h2 style="font-size:22px;margin:0 0 24px;color:#111;">Nueva solicitud de cita · ${tipo === 'tatuaje' ? 'Tatuaje' : 'Piercing'}</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#888;font-size:13px;">Nombre</td><td style="padding:6px 0 6px 16px;font-size:13px;">${nombre}</td></tr>
          <tr><td style="padding:6px 0;color:#888;font-size:13px;">Contacto</td><td style="padding:6px 0 6px 16px;font-size:13px;">${contactoInfo}</td></tr>
          ${rows}
        </table>
        ${attachments.length > 0 ? `<p style="font-size:12px;color:#888;margin-top:24px;">${attachments.length} imagen(es) adjunta(s).</p>` : ''}
      </div>
    `

    await transporter.sendMail({
      from: `"Soul's Anchor" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Nueva cita · ${tipo === 'tatuaje' ? 'Tatuaje' : 'Piercing'} · ${nombre}`,
      html,
      attachments,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Error al enviar' }, { status: 500 })
  }
}
