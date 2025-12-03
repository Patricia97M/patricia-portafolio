# 📧 Configuración del Formulario de Contacto con Formspree

## Pasos para configurar Formspree:

### 1. Crear cuenta en Formspree
1. Ve a [formspree.io](https://formspree.io/)
2. Regístrate con tu email
3. Verifica tu cuenta

### 2. Crear un nuevo formulario
1. En el dashboard, haz clic en "New Form"
2. Ingresa tu email: `patriciamonares97@gmail.com`
3. Dale un nombre al formulario: "Contacto Portafolio"
4. Copia el **Form ID** que se genera (ejemplo: `xpzgkqbo`)

### 3. Actualizar el código
En `src/pages/contact.astro`, reemplaza `YOUR_FORM_ID` con tu Form ID real:

```astro
<form
  action="https://formspree.io/f/TU_FORM_ID_AQUI"
  method="POST"
>
```

### 4. Configurar redirección (opcional)
En el dashboard de Formspree:
1. Ve a Settings → Redirects
2. Añade: `https://tudominio.com/gracias`

### 5. Personalizar notificaciones
En Settings → Email Notifications:
- Personaliza el subject del email
- Configura autorespuestas si quieres

## Plan gratuito de Formspree:
- ✅ 50 envíos por mes
- ✅ Protección anti-spam
- ✅ Notificaciones por email
- ✅ Redirecciones personalizadas

## Alternativas si necesitas más envíos:
1. **EmailJS** - 200 emails/mes gratis
2. **Netlify Forms** - 100 envíos/mes gratis
3. **getform.io** - 50 envíos/mes gratis

## Después del despliegue:
1. Prueba el formulario en producción
2. Verifica que lleguen los emails
3. Configura filtros en Gmail si es necesario

## Archivos relacionados:
- `src/pages/contact.astro` - Formulario principal
- `src/pages/gracias.astro` - Página de agradecimiento
- `netlify.toml` - Configuración para Netlify (si usas Netlify)