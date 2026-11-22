// 1. MODO OSCURO
const btnOscuro = document.getElementById('btn-modo-oscuro');
const body = document.body;

if (localStorage.getItem('tema') === 'oscuro') {
    body.classList.add('modo-oscuro');
}

btnOscuro.addEventListener('click', () => {
    body.classList.toggle('modo-oscuro');
    const esOscuro = body.classList.contains('modo-oscuro');
    localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
});

// 2. CERRAR AJUSTES AUTOMÁTICAMENTE AL CERRAR OPCIONES
const menuOpciones = document.querySelector('.menu-desplegable');
const menuAjustes = document.querySelector('aside details:last-of-type');

menuOpciones.addEventListener('toggle', () => {
    if (!menuOpciones.open) {
        menuAjustes.open = false;
    }
});

// 3. BARRA DE BÚSQUEDA CON OPCIONES DESPLEGABLES
const contenedorBuscador = document.querySelector('.buscador');
const formularioBuscador = document.querySelector('.buscador form');
const inputBuscador = document.querySelector('.buscador input');
const iconoLupa = document.querySelector('.buscador .icono');

if (contenedorBuscador && formularioBuscador && inputBuscador) {
    // Creamos la caja desplegable justo debajo de tu barra blanca
    const listaResultados = document.createElement('div');
    listaResultados.className = 'resultados-busqueda';
    contenedorBuscador.appendChild(listaResultados);

    // Tus opciones de búsqueda (puedes ir agregando más líneas aquí)
    const catalogoBusquedas = [
        // --- PÁGINA PRINCIPAL (index.html) ---
        { titulo: 'Página Principal / Inicio', seccion: 'Inicio', url: 'index.html', palabras: 'inicio portada principal home' },
        { titulo: 'Anuncios y Novedades', seccion: 'Inicio', url: 'index.html', palabras: 'anuncios noticias imagenes fotos' },
        { titulo: 'Reloj y Frases del Plantel', seccion: 'Inicio', url: 'index.html', palabras: 'reloj hora fecha frases lema' },

        // --- INSTITUCIÓN (institucion.html) ---
        { titulo: 'CECyTEM Plantel Chalco', seccion: 'Institución', url: 'institucion.html', palabras: 'institucion plantel chalco bienvenida historia bivalente' },
        { titulo: 'Oferta Educativa y Carrera', seccion: 'Institución', url: 'institucion.html', palabras: 'oferta educativa carrera diseño grafico digital instalaciones' },
        { titulo: 'Misión, Visión y Valores', seccion: 'Institución', url: 'institucion.html', palabras: 'mision vision valores filosofia' },
        { titulo: 'Ubicación y Google Maps', seccion: 'Institución', url: 'institucion.html', palabras: 'ubicacion mapa direccion llegar villas chalco' },
        { titulo: 'Contacto, Teléfono y Redes', seccion: 'Institución', url: 'institucion.html', palabras: 'contacto telefono whatsapp facebook gmail correo' },

        // --- INFORMACIÓN ESCOLAR (informacion.html) ---
        { titulo: 'Información Escolar y Alumnos', seccion: 'Alumnos', url: 'informacion.html', palabras: 'informacion escolar alumnos portal' },
        { titulo: 'Beca Universal Benito Juárez', seccion: 'Alumnos', url: 'informacion.html', palabras: 'beca becas benito juarez apoyo pago tarjeta' },
        { titulo: 'Calendario Escolar Oficial', seccion: 'Alumnos', url: 'informacion.html', palabras: 'calendario escolar fechas vacaciones examenes semestre' },

        // --- SUBPÁGINAS DE ALUMNOS (eventos.html y avisos.html) ---
        { titulo: 'Eventos y Video Comercial', seccion: 'Eventos', url: 'eventos.html', palabras: 'eventos actividades carteles video comercial multimedia' },
        { titulo: 'Avisos y Documentos Oficiales', seccion: 'Avisos', url: 'avisos.html', palabras: 'avisos comunicados oficios documentos pdf descargar' },

        // --- HERRAMIENTAS DIGITALES (herramientas.html) ---
        { titulo: 'Herramientas Digitales y Bibliotecas', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'herramientas bibliotecas programas recursos enlaces' },
        { titulo: 'Diccionario RAE', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'diccionario rae palabras ortografia definicion' },
        { titulo: 'Google Académico', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'google academico scholar tesis libros investigar' },
        { titulo: 'Generador de Citas APA 7', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'apa citas bibliografia scribbr referencias' },
        { titulo: 'GeoGebra (Matemáticas)', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'geogebra matematicas graficas algebra geometria' },
        { titulo: 'Photopea (Editor tipo Photoshop)', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'photopea photoshop editar fotos capas psd arte' },
        { titulo: 'Remove.bg (Quitar fondo)', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'remove bg quitar borrar fondo imagen' },
        { titulo: 'Coolors (Paletas de colores)', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'coolors colores paleta diseño arte' },
        { titulo: 'Krita (Ilustración y Pintura)', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'krita dibujar pintar ilustracion comic arte' },
        { titulo: 'Canva (Infografías y Carteles)', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'canva infografias carteles presentaciones plantillas' },
        { titulo: 'Microsoft 365 (Word, PowerPoint, Excel)', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'office microsoft word powerpoint excel diapositivas ofimatica' },
        { titulo: 'GoConqr (Mapas Mentales)', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'goconqr mapas mentales esquemas fichas estudio' },
        { titulo: 'iLovePDF (Convertir y unir PDF)', seccion: 'Herramientas', url: 'herramientas.html', palabras: 'ilovepdf pdf convertir unir comprimir word' }
    ];

    // Muestra opciones al escribir cada letra
    inputBuscador.addEventListener('input', () => {
        const texto = inputBuscador.value.toLowerCase().trim();
        listaResultados.innerHTML = '';

        if (texto === '') {
            listaResultados.classList.remove('activo');
            return;
        }

        const coincidencias = catalogoBusquedas.filter(item =>
            item.titulo.toLowerCase().includes(texto) ||
            item.palabras.includes(texto)
        );

        if (coincidencias.length > 0) {
            coincidencias.forEach(item => {
                const opcion = document.createElement('div');
                opcion.className = 'item-busqueda';
                opcion.innerHTML = `
                    <span class="titulo-opcion">${item.titulo}</span>
                    <span class="etiqueta-opcion">${item.seccion}</span>
                `;
                opcion.addEventListener('click', () => {
                    window.location.href = item.url;
                });
                listaResultados.appendChild(opcion);
            });
        } else {
            listaResultados.innerHTML = `<div class="sin-resultados">No encontramos resultados para "${inputBuscador.value}"</div>`;
        }

        listaResultados.classList.add('activo');
    });

    // Si presionan Enter o dan clic a la lupa, abre la primera opción sugerida
    function ejecutarBusqueda(evento) {
        evento.preventDefault();
        const primeraOpcion = listaResultados.querySelector('.item-busqueda');
        if (primeraOpcion) {
            primeraOpcion.click();
        }
    }

    formularioBuscador.addEventListener('submit', ejecutarBusqueda);

    if (iconoLupa) {
        iconoLupa.style.cursor = 'pointer';
        iconoLupa.addEventListener('click', ejecutarBusqueda);
    }

    // Cierra la lista si haces clic fuera de la barra
    document.addEventListener('click', (e) => {
        if (!contenedorBuscador.contains(e.target)) {
            listaResultados.classList.remove('activo');
        }
    });
}
