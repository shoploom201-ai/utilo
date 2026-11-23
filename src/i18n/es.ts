import type { Dict } from './en';

const es: Dict = {
  langName: 'Español',
  defaultCountry: 'ES',
  tagline: 'Calculadoras de impuestos y herramientas de imagen gratuitas que funcionan en tu navegador.',
  nav: { home: 'Inicio', language: 'Idioma' },
  footer: { about: 'Acerca de', privacy: 'Política de privacidad', contact: 'Contacto', note: 'Todas las herramientas son gratuitas.' },
  home: {
    title: 'Calculadoras de impuestos y herramientas de imagen gratis',
    intro: 'Herramientas rápidas y privadas para el día a día. Sin registro ni subidas: todo se procesa en tu dispositivo.',
    categories: { tax: 'Calculadoras de impuestos', finance: 'Calculadoras financieras', image: 'Herramientas de imagen' },
  },
  common: {
    privacyNote: 'Todo funciona dentro de tu navegador. Tus cifras y archivos nunca salen de tu dispositivo.',
    howTo: 'Cómo se usa',
    faq: 'Preguntas frecuentes',
    lastReviewed: 'Tipos revisados por última vez',
  },
  tools: {
    'vat-calculator': {
      name: 'Calculadora de IVA',
      short: 'Suma o quita el IVA, GST o impuesto al consumo en 17 países.',
      metaDescription:
        'Calculadora de IVA gratis: añade o quita el IVA de cualquier importe con los tipos general y reducidos de España, México, la UE, Japón, Corea y más.',
      ui: {
        country: 'País',
        rate: 'Tipo de impuesto',
        standard: 'General',
        reduced: 'Reducido',
        amount: 'Importe',
        mode: 'Cálculo',
        add: 'Añadir IVA (base → total)',
        remove: 'Quitar IVA (total → base)',
        net: 'Base imponible',
        tax: 'IVA',
        gross: 'Total con IVA',
        disclaimer:
          'Solo para estimaciones. Las reglas varían según el producto o servicio; consulta a la autoridad tributaria de tu país antes de declarar.',
      },
      howTo: [
        'Elige el país y el tipo de impuesto que corresponde a tu producto.',
        'Introduce el importe.',
        'Indica si el importe no incluye el impuesto (añadir) o ya lo incluye (quitar). El resultado se actualiza al instante.',
      ],
      faq: [
        { q: '¿Cómo se quita el IVA de un precio?', a: 'Divide el total entre 1 más el tipo. Con un 21 % de IVA, 121 ÷ 1,21 = 100 de base, así que el IVA es 21.' },
        { q: '¿Cuándo se usa el tipo reducido?', a: 'En España, el 10 % se aplica, por ejemplo, a la hostelería y el 4 % a productos básicos como el pan o los libros.' },
        { q: '¿Qué diferencia hay entre IVA y GST?', a: 'Son el mismo tipo de impuesto al consumo. Australia, Nueva Zelanda y Singapur lo llaman GST.' },
      ],
    },
    'loan-calculator': {
      name: 'Calculadora de préstamos',
      short: 'Cuota mensual, intereses totales y cuadro de amortización de cualquier préstamo.',
      metaDescription:
        'Calculadora de préstamos gratis: calcula la cuota mensual, los intereses totales y el cuadro de amortización de una hipoteca, un préstamo personal o de coche. Compara el sistema francés, el alemán y el pago al vencimiento.',
      ui: {
        amount: 'Importe del préstamo',
        rate: 'Interés anual (%)',
        years: 'Plazo (años)',
        method: 'Sistema de amortización',
        annuity: 'Cuota constante (francés)',
        equalPrincipal: 'Amortización constante (alemán)',
        bullet: 'Solo intereses, capital al final',
        payment: 'Cuota mensual',
        totalInterest: 'Intereses totales',
        totalPaid: 'Total a pagar',
        schedule: 'Cuadro de amortización mensual',
        month: 'Mes',
        principal: 'Capital',
        interest: 'Intereses',
        balance: 'Pendiente',
        disclaimer: 'Solo orientativo. No incluye comisiones, seguros ni cambios de tipo; las cifras de tu banco pueden ser distintas.',
      },
      howTo: [
        'Introduce el importe, el interés anual y el plazo en años.',
        'Cambia el sistema de amortización para comparar la cuota y los intereses totales.',
        'Abre el cuadro de amortización para ver cuánto capital e interés pagas cada mes.',
      ],
      faq: [
        { q: '¿Qué diferencia hay entre los sistemas de amortización?', a: 'En el sistema francés pagas la misma cuota cada mes. En el alemán devuelves el mismo capital cada mes, así que la cuota empieza más alta y baja con el tiempo. Con solo intereses pagas los intereses y devuelves todo el capital al final.' },
        { q: '¿Qué sistema genera menos intereses?', a: 'Normalmente el alemán, porque la deuda baja más rápido. Pagar solo intereses es lo más caro, ya que el capital sigue pendiente hasta el final.' },
        { q: '¿Incluye comisiones y seguros?', a: 'No. Se usa un tipo fijo y no se tienen en cuenta comisiones, seguros ni cambios de tipo, así que el resultado es orientativo.' },
      ],
    },
    'image-compressor': {
      name: 'Compresor y conversor de imágenes',
      short: 'Reduce, redimensiona y convierte imágenes a WebP, JPEG o PNG sin subirlas.',
      metaDescription:
        'Compresor de imágenes gratis: reduce el peso, cambia el tamaño y convierte fotos a WebP, JPEG o PNG en tu navegador. Sin subir archivos ni registrarte, varias a la vez.',
      ui: {
        choose: 'Elige imágenes o arrástralas aquí',
        format: 'Formato de salida',
        quality: 'Calidad',
        maxWidth: 'Ancho máximo (px)',
        keepSize: 'Tamaño original',
        original: 'Original',
        result: 'Resultado',
        download: 'Descargar',
        smaller: 'menos',
        larger: 'más',
        error: 'No se pudo leer esta imagen.',
        pngNote: 'PNG no tiene pérdida, así que la calidad no se aplica.',
      },
      howTo: [
        'Elige una o varias imágenes, o arrástralas al recuadro.',
        'Escoge el formato y la calidad. WebP suele dar los archivos más pequeños.',
        'Si quieres, fija un ancho máximo y descarga cada resultado.',
      ],
      faq: [
        { q: '¿Se suben mis imágenes a un servidor?', a: 'No. La compresión ocurre en tu navegador, así que tus fotos se quedan en tu dispositivo.' },
        { q: '¿Qué formato elijo?', a: 'WebP para páginas web, JPEG para fotos que se abran en cualquier sitio y PNG para capturas o imágenes con transparencia.' },
        { q: '¿Por qué el archivo pesa más?', a: 'Puede que la imagen ya estuviera bien comprimida. Prueba con menos calidad, un ancho menor u otro formato.' },
      ],
    },
  },
  pages: {
    about: {
      title: 'Acerca de',
      body: [
        '{site} es una colección de pequeñas herramientas gratuitas para tareas cotidianas, como calcular el IVA o preparar imágenes para la web.',
        'Todas las herramientas funcionan en tu navegador. No pedimos registro y nunca vemos las cifras ni los archivos que usas.',
        'Los tipos de impuesto se comprueban con fuentes oficiales y la fecha de revisión aparece en cada calculadora. Los resultados son orientativos y no constituyen asesoramiento fiscal.',
      ],
    },
    privacy: {
      title: 'Política de privacidad',
      body: [
        'Última actualización: 2026-11-23.',
        'Las herramientas de {site} no recogen datos personales. Los cálculos y el procesamiento de imágenes se hacen en tu navegador y los archivos nunca se suben.',
        'Usamos Google AdSense para mostrar anuncios. Google y sus socios utilizan cookies para mostrar anuncios basados en tus visitas anteriores a este y otros sitios web.',
        'Puedes desactivar la publicidad personalizada en https://www.google.com/settings/ads y obtener más información en https://policies.google.com/technologies/ads.',
        'Nuestro proveedor de alojamiento puede registrar información técnica básica, como la dirección IP y el tipo de navegador, por motivos de seguridad.',
        'Si tienes preguntas sobre esta política, escríbenos a {email}.',
      ],
    },
    contact: {
      title: 'Contacto',
      body: [
        '¿Has encontrado un tipo de impuesto incorrecto, un error o tienes una idea para una nueva herramienta? Nos encantará saberlo.',
        'Correo: {email}',
        'Solemos responder en unos pocos días laborables.',
      ],
    },
  },
};

export default es;
