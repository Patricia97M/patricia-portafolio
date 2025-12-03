import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Solo permitir POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: name, email, message' 
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Email inválido' 
      });
    }

    // Enviar email usando Resend
    const emailData = await resend.emails.send({
      from: 'contacto@tudominio.com', // Necesitarás verificar un dominio en Resend
      to: 'patriciamonares97@gmail.com',
      subject: subject || `Nuevo mensaje de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nuevo mensaje desde tu portafolio</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">Información del contacto:</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subject || 'Sin asunto'}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">Mensaje:</h3>
            <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
            <p>Este mensaje fue enviado desde tu portafolio web.</p>
            <p>Puedes responder directamente a: <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
          </div>
        </div>
      `,
      // También enviar una copia en texto plano
      text: `
Nuevo mensaje desde tu portafolio

Información del contacto:
Nombre: ${name}
Email: ${email}
Asunto: ${subject || 'Sin asunto'}

Mensaje:
${message}

---
Este mensaje fue enviado desde tu portafolio web.
Puedes responder directamente a: ${email}
      `
    });

    console.log('Email enviado:', emailData);

    // Respuesta exitosa
    res.status(200).json({ 
      success: true, 
      message: 'Email enviado correctamente',
      id: emailData.id 
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    
    res.status(500).json({ 
      error: 'Error interno del servidor', 
      details: error.message 
    });
  }
}