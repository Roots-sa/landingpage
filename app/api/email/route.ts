import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
    try {
        const { userData, messages, timestamp } = await request.json()

        if (!userData || !messages) {
            return NextResponse.json(
                { error: 'Datos del usuario y mensajes requeridos' },
                { status: 400 }
            )
        }

        // Configuración del transporter (usando valores dummy para desarrollo)
        const transporter = nodemailer.createTransporter({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER || 'test@example.com',
                pass: process.env.EMAIL_PASS || 'test-password'
            }
        })

        // Formatear el historial del chat
        const chatHistory = messages.map((msg: any) => {
            const sender = msg.isUser ? 'Usuario' : 'Bot'
            const time = new Date(msg.timestamp).toLocaleString('es-ES')
            return `[${time}] ${sender}: ${msg.text}`
        }).join('\n')

        // Contenido del email
        const emailContent = `
Resumen de Conversación - Chatbot Roots
=====================================

Datos del Usuario:
- Nombre: ${userData.name || 'No proporcionado'}
- Email: ${userData.email || 'No proporcionado'}
- Fecha: ${new Date(timestamp).toLocaleString('es-ES')}

Historial de la Conversación:
${chatHistory}

---
Este email fue generado automáticamente por el chatbot de Roots.
Para más información, visita nuestro sitio web.
    `

        // Configurar el email
        const mailOptions = {
            from: process.env.EMAIL_USER || 'test@example.com',
            to: process.env.ADMIN_EMAIL || 'admin@roots.com',
            subject: `Nueva conversación de chatbot - ${userData.name || 'Usuario'} (${new Date().toLocaleDateString('es-ES')})`,
            text: emailContent,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Resumen de Conversación - Chatbot Roots</h2>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Datos del Usuario:</h3>
            <p><strong>Nombre:</strong> ${userData.name || 'No proporcionado'}</p>
            <p><strong>Email:</strong> ${userData.email || 'No proporcionado'}</p>
            <p><strong>Fecha:</strong> ${new Date(timestamp).toLocaleString('es-ES')}</p>
          </div>

          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Historial de la Conversación:</h3>
            <div style="background-color: #f9fafb; padding: 10px; border-radius: 4px; font-family: monospace; white-space: pre-line;">${chatHistory}</div>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; text-align: center;">
            Este email fue generado automáticamente por el chatbot de Roots.<br>
            Para más información, visita nuestro sitio web.
          </p>
        </div>
      `
        }

        // Enviar el email
        await transporter.sendMail(mailOptions)

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
