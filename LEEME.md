# Invitación XV Años · Daiana Angelite

Invitación digital, estilo **vaquero formal** en tonos rojo vino, crema y dorado.
Sin fotografías: el diseño se sostiene con tipografía y ornamentos dibujados.

---

## ⚠️ DOS COSAS PENDIENTES

Las dos están juntas, al principio de `js/animaciones.js`:

### 1. La fecha de los XV años

```js
fecha: new Date(2027, 2, 14, 17, 0),
//              año  mes día hora minuto
```

**Los meses van de 0 a 11**, no de 1 a 12:

| Mes | Número | | Mes | Número |
|---|---|---|---|---|
| enero | 0 | | julio | 6 |
| febrero | 1 | | agosto | 7 |
| marzo | 2 | | septiembre | 8 |
| abril | 3 | | octubre | 9 |
| mayo | 4 | | noviembre | 10 |
| junio | 5 | | diciembre | 11 |

Ejemplo: **9 de octubre de 2026 a las 5:00 PM** → `new Date(2026, 9, 9, 17, 0)`

Con eso se actualizan solas **tres cosas**: la fecha de la portada, la del pie
de página y la cuenta regresiva.

### 2. El número para confirmar asistencia

```js
whatsapp: '5213312345678'
```

Va **52** adelante y luego los 10 dígitos, sin espacios, guiones ni paréntesis.

---

## Cómo está organizada la carpeta

```
Invitacion Daiana/
│
├── index.html          ← La invitación. Ábrela con doble clic.
│
├── css/
│   └── estilos.css     ← Colores, tipografías y diseño
│
└── js/
    └── animaciones.js  ← ⚠️ AQUÍ van la fecha y el teléfono
```

---

## Qué lleva la invitación

1. **Portada** — sombrero vaquero dibujado, marco dorado, nombre y fecha
2. **Mensaje** — el texto de agradecimiento
3. **Mi familia** — papás y padrinos
4. **Itinerario** — misa 5:00 PM y recepción 7:00 PM, con botones a Google Maps
5. **Cuenta regresiva** — llega a cero a la hora de la misa
6. **Código de vestimenta** — formal vaquero, con el aviso del color rojo
7. **Confirmar asistencia** — botón de WhatsApp
8. **Cierre**

---

## Cómo cambiar otras cosas

| Qué | Dónde |
|---|---|
| Nombres de papás y padrinos | `index.html`, sección `3 · PADRES Y PADRINOS` |
| Horarios y direcciones | `index.html`, sección `4 · ITINERARIO` |
| El texto del mensaje | `index.html`, sección `2 · MENSAJE` |
| Los colores | `css/estilos.css`, bloque `:root` de hasta arriba |

### La paleta

```css
--vino:   #6e1220   /* rojo vino del fondo */
--rojo:   #a41e2b   /* rojo de los botones */
--crema:  #f8f1e3   /* papel crema */
--dorado: #bf9540   /* dorado de los adornos */
```

---

## Notas

- Probada en pantallas de 320px a 430px de ancho (iPhone SE hasta los Android
  grandes). No hay barras laterales ni espacios en blanco.
- Las animaciones respetan `prefers-reduced-motion` para quien tenga activada
  la opción de reducir movimiento en su celular.
- Las tipografías (Rye, Cormorant Garamond y Jost) se cargan de Google Fonts,
  así que hace falta internet para que se vean tal cual.
