import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json()

        if (!message) {
            return NextResponse.json(
                { error: 'Mensaje requerido' },
                { status: 400 }
            )
        }

        const userMessage = message.toLowerCase()
        let botResponse = ''

        // Lógica de respuestas automáticas
        if (userMessage.includes('precio') || userMessage.includes('costo') || userMessage.includes('cuánto')) {
            botResponse = 'Nuestros precios varían según el proyecto. Ofrecemos MVPs desde $2,000 USD hasta soluciones empresariales completas. ¿Te gustaría que te envíe más detalles por email?'
        } else if (userMessage.includes('servicio') || userMessage.includes('qué hacen') || userMessage.includes('servicios')) {
            botResponse = 'Desarrollamos software a medida, aplicaciones web y móviles, y soluciones de innovación. Nos especializamos en MVPs funcionales y escalables. ¿Hay algún servicio específico que te interese?'
        } else if (userMessage.includes('contacto') || userMessage.includes('hablar') || userMessage.includes('reunión')) {
            botResponse = '¡Perfecto! Me encantaría conectar contigo. ¿Podrías dejarme tu nombre y email para que nuestro equipo se ponga en contacto contigo?'
        } else if (userMessage.includes('gracias') || userMessage.includes('muchas gracias')) {
            botResponse = '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?'
        } else if (userMessage.includes('hola') || userMessage.includes('buenos días') || userMessage.includes('buenas tardes')) {
            botResponse = '¡Hola! 😊 Me da mucho gusto saludarte. ¿En qué puedo ayudarte hoy?'
        } else if (userMessage.includes('adiós') || userMessage.includes('chau') || userMessage.includes('hasta luego')) {
            botResponse = '¡Hasta luego! Fue un placer ayudarte. Si necesitas algo más, aquí estaré. 👋'
        } else if (userMessage.includes('proyecto') || userMessage.includes('idea')) {
            botResponse = '¡Excelente! Nos encanta escuchar sobre nuevos proyectos. ¿Podrías contarme un poco más sobre tu idea? También me gustaría saber tu nombre y email para conectar contigo.'
        } else {
            botResponse = 'Interesante pregunta. ¿Te gustaría que te conecte con nuestro equipo para una consulta más detallada? Puedo tomar tu nombre y email.'
        }

        return NextResponse.json({ response: botResponse })
    } catch (error) {
        console.error('Error en API chat:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}
