import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json()

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Todos los campos son requeridos' },
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

        // Configurar el email con SendGrid
        const msg = {
            to: process.env.ADMIN_EMAIL || 'admin@roots.com',
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@roots.com',
            subject: `Nuevo mensaje de contacto - ${name} (${new Date().toLocaleDateString('es-ES')})`,
            text: `
Nuevo mensaje de contacto - Sitio Web Roots
==========================================

Datos del contacto:
- Nombre: ${name}
- Email: ${email}
- Fecha: ${new Date().toLocaleString('es-ES')}

Mensaje:
${message}

---
Este mensaje fue enviado desde el formulario de contacto del sitio web de Roots.
            `,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #CCFF00 0%, #B8E600 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #000000; margin: 0; font-size: 24px; font-weight: bold;">
              🌱 Nuevo mensaje de contacto - Roots
            </h2>
          </div>
          
          <div style="padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #CCFF00;">
              <h3 style="color: #374151; margin-top: 0; font-size: 18px;">📋 Datos del contacto:</h3>
              <p style="margin: 8px 0; font-size: 16px;"><strong>👤 Nombre:</strong> ${name}</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #CCFF00; text-decoration: none;">${email}</a></p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>📅 Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
            </div>

            <div style="background-color: #ffffff; border: 2px solid #e5e7eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0; font-size: 18px;">💬 Mensaje:</h3>
              <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 3px solid #CCFF00;">
                <p style="white-space: pre-line; margin: 0; font-size: 16px; line-height: 1.6;">${message}</p>
              </div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}" style="background-color: #CCFF00; color: #000000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                📧 Responder a ${name}
              </a>
            </div>
          </div>

          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              🌱 Este mensaje fue enviado desde el formulario de contacto del sitio web de Roots.
            </p>
          </div>
        </div>
            `
        }

        // Enviar el email con SendGrid
        await sgMail.send(msg)

        return NextResponse.json({
            success: true,
            message: 'Mensaje enviado correctamente'
        })

    } catch (error) {
        console.error('Error enviando mensaje de contacto:', error)
        return NextResponse.json(
            { error: 'Error al enviar el mensaje' },
            { status: 500 }
        )
    }
}
