/* ==========================================================================
   Invitación XV Años · Daiana Angelite
   ========================================================================== */

/* ═══════════════════════════════════════════════════════════════════════════
   ⬇⬇⬇  LO ÚNICO QUE HAY QUE CAMBIAR ESTÁ AQUÍ ABAJO  ⬇⬇⬇
   ═══════════════════════════════════════════════════════════════════════════ */

var CONFIG = {

  // ── FECHA DE LOS XV AÑOS ────────────────────────────────────────────────
  // Orden: (año, mes, día, hora, minuto)
  // ¡OJO! Los meses van de 0 a 11:
  //   enero=0  febrero=1  marzo=2   abril=3   mayo=4     junio=5
  //   julio=6  agosto=7   septiembre=8  octubre=9  noviembre=10  diciembre=11
  //
  // 28 de noviembre de 2026, 5:00 PM (hora de la misa)
  // noviembre = 10
  fecha: new Date(2026, 10, 28, 17, 0),

  // ── NÚMERO PARA CONFIRMAR ASISTENCIA ────────────────────────────────────
  // +52 33 3338 6885  →  52 + los 10 dígitos, sin espacios ni guiones
  whatsapp: '523333386885'

};

/* ═══════════════════════════════════════════════════════════════════════════
   ⬆⬆⬆  DE AQUÍ PARA ABAJO NO HACE FALTA TOCAR NADA  ⬆⬆⬆
   ═══════════════════════════════════════════════════════════════════════════ */


/* --------------------------------------------- escribir la fecha en la página */
(function () {
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
               'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles',
              'jueves', 'viernes', 'sábado'];

  var f = CONFIG.fecha;
  var dia = f.getDate();
  var mes = MESES[f.getMonth()];
  var anio = f.getFullYear();

  var formatos = {
    larga:   dia + ' de ' + mes + ' de ' + anio,
    corta:   ('0' + dia).slice(-2) + ' · ' + mes + ' · ' + anio,
    diaSemana: DIAS[f.getDay()]
  };

  Object.keys(formatos).forEach(function (clave) {
    document.querySelectorAll('[data-fecha="' + clave + '"]').forEach(function (el) {
      el.textContent = formatos[clave];
    });
  });
})();

/* ------------------------------------------ armar el enlace de confirmación */
(function () {
  var enlace = document.getElementById('btn-confirmar');
  if (!enlace) return;

  var texto = 'Hola, confirmo mi asistencia a los XV años de Daiana';
  enlace.href = 'https://wa.me/' + CONFIG.whatsapp +
                '?text=' + encodeURIComponent(texto);
})();

/* ------------------------------------------------------------------ música */
(function () {
  var audio  = document.getElementById('audio-invitacion');
  var boton  = document.getElementById('btn-musica');
  var estado = document.getElementById('musica-estado');

  if (!audio || !boton) return;

  audio.volume = 0.6;

  function pintar(sonando) {
    boton.classList.toggle('sonando', sonando);
    boton.setAttribute('aria-pressed', sonando ? 'true' : 'false');
    boton.setAttribute('aria-label', sonando ? 'Pausar la música' : 'Reproducir la música');
    estado.textContent = sonando ? 'Sonando' : 'Toca para escuchar';
    estado.classList.toggle('activo', sonando);
  }

  boton.addEventListener('click', function () {
    if (audio.paused) {
      // El navegador puede negarse si no viene de un toque del usuario
      var intento = audio.play();
      if (intento && intento.catch) {
        intento.catch(function () {
          estado.textContent = 'No se pudo reproducir';
        });
      }
    } else {
      audio.pause();
    }
  });

  // La clase sigue al audio, no al clic: así queda bien aunque
  // la reproducción falle o el sistema la interrumpa (una llamada, por ejemplo)
  audio.addEventListener('play',  function () { pintar(true); });
  audio.addEventListener('pause', function () { pintar(false); });

  pintar(false);
})();

/* --------------------------------------------- aparición suave al bajar */
(function () {
  var elementos = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elementos.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  // threshold 0 + rootMargin negativo: la sección aparece en cuanto su borde
  // superior entra 60px en pantalla. Con secciones altas, esperar a que se vea
  // un 15% dejaba huecos en blanco al bajar rápido en el celular.
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  elementos.forEach(function (el) { observador.observe(el); });
})();

/* ------------------------------------------------------- cuenta regresiva */
(function () {
  var destino = CONFIG.fecha.getTime();

  var grid  = document.getElementById('contador');
  var aviso = document.getElementById('contador-llego');
  var elDias  = document.getElementById('c-dias');
  var elHoras = document.getElementById('c-horas');
  var elMin   = document.getElementById('c-min');
  var elSeg   = document.getElementById('c-seg');

  if (!grid) return;

  function dosDigitos(n) { return String(n).padStart(2, '0'); }

  // Escribe el valor y, si cambió, le da un latido dorado
  function poner(el, valor) {
    if (el.textContent === valor) return;
    el.textContent = valor;
    el.classList.remove('late');
    void el.offsetWidth;          // reinicia la animación
    el.classList.add('late');
  }

  function actualizar() {
    var restante = destino - Date.now();

    if (restante <= 0) {
      grid.style.display = 'none';
      aviso.style.display = 'block';
      clearInterval(intervalo);
      return;
    }

    poner(elDias,  dosDigitos(Math.floor(restante / 86400000)));
    poner(elHoras, dosDigitos(Math.floor((restante % 86400000) / 3600000)));
    poner(elMin,   dosDigitos(Math.floor((restante % 3600000) / 60000)));
    poner(elSeg,   dosDigitos(Math.floor((restante % 60000) / 1000)));
  }

  actualizar();
  var intervalo = setInterval(actualizar, 1000);
})();
