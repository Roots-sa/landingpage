import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { userData, messages, timestamp } = await request.json()

    if (!userData || !messages) {
      return NextResponse.json(
        { error: 'Datos del usuario y mensajes requeridos' },
        { status: 400 }
      )
    }

    // Verificar que la API key esté configurada
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY no está configurada')
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      )
    }

    // Formatear el historial del chat
    const chatHistory = messages.map((msg: any) => {
      const sender = msg.isUser ? 'Usuario' : 'Bot'
      const time = new Date(msg.timestamp).toLocaleString('es-ES')
      return `[${time}] ${sender}: ${msg.text}`
    }).join('\n')

    // Configurar el email con SendGrid
    const msg = {
      to: process.env.ADMIN_EMAIL || 'admin@roots.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@roots.com',
      subject: `Nueva conversación de chatbot - ${userData.name || 'Usuario'} (${new Date().toLocaleDateString('es-ES')})`,
      text: `
Resumen de Conversación - Chatbot Roots
=====================================

Datos del Usuario:
- Nombre: ${userData.name || 'No proporcionado'}
- Email: ${userData.email || 'No proporcionado'}
- WhatsApp: ${userData.whatsapp || 'No proporcionado'}
- Fecha: ${new Date(timestamp).toLocaleString('es-ES')}

Historial de la Conversación:
${chatHistory}

---
Este email fue generado automáticamente por el chatbot de Roots.
Para más información, visita nuestro sitio web.
            `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #CCFF00 0%, #B8E600 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #000000; margin: 0; font-size: 24px; font-weight: bold;">
              🤖 Resumen de Conversación - Chatbot Roots
            </h2>
          </div>
          
          <div style="padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #CCFF00;">
              <h3 style="color: #374151; margin-top: 0; font-size: 18px;">👤 Datos del Usuario:</h3>
              <p style="margin: 8px 0; font-size: 16px;"><strong>Nombre:</strong> ${userData.name || 'No proporcionado'}</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${userData.email || 'no-email'}" style="color: #CCFF00; text-decoration: none;">${userData.email || 'No proporcionado'}</a></p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>WhatsApp:</strong> <a href="https://wa.me/${(userData.whatsapp || '').replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none;">${userData.whatsapp || 'No proporcionado'}</a></p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>Fecha:</strong> ${new Date(timestamp).toLocaleString('es-ES')}</p>
            </div>

            <div style="background-color: #ffffff; border: 2px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0; font-size: 18px;">💬 Historial de la Conversación:</h3>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 3px solid #CCFF00; font-family: monospace; white-space: pre-line; font-size: 14px; line-height: 1.6;">${chatHistory}</div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${userData.email || 'admin@roots.com'}" style="background-color: #CCFF00; color: #000000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 5px;">
                📧 Enviar Email
              </a>
              ${userData.whatsapp ? `<a href="https://wa.me/${(userData.whatsapp || '').replace(/[^0-9]/g, '')}" style="background-color: #25D366; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 0 5px;">
                💬 Contactar por WhatsApp
              </a>` : ''}
            </div>
          </div>

          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              🤖 Este email fue generado automáticamente por el chatbot de Roots.
            </p>
          </div>
        </div>
            `
    }

    // Enviar el email con SendGrid
    await sgMail.send(msg)

    return NextResponse.json({
      success: true,
      message: 'Email enviado correctamente'
    })

  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json(
      { error: 'Error al enviar el email' },
      { status: 500 }
    )
  }
}
