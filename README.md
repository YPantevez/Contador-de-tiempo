# ⏱️ Daily Average Tracker

Una aplicación web sencilla para registrar tareas diarias y calcular su tiempo promedio.
Permite agregar tareas, establecer el tiempo promedio objetivo y visualizar en tiempo real cómo se compara el promedio actual con el deseado mediante un sistema de colores que va de **verde (buen desempeño)** a **rojo (por debajo del objetivo)**.

---

## 🚀 Características

* Agregar y eliminar tareas con su tiempo individual.
* Cálculo automático del promedio actual.
* Campo para definir un **promedio deseado** (meta personal o laboral).
* Cambio de color dinámico según el desempeño:

  * 🟢 Verde → cuando estás igual o por debajo del promedio deseado.
  * 🟠 Amarillo → cuando te acercas al límite.
  * 🔴 Rojo → cuando superas el tiempo deseado.
* Diseño limpio y adaptable.

---

## 🧩 Tecnologías utilizadas

* **HTML5** — estructura base.
* **CSS3** — estilos y gradientes dinámicos.
* **JavaScript (ES6)** — lógica de cálculo y actualización del DOM.

---

## 🗂️ Estructura del proyecto

```
/
├── index.html        # Estructura principal del sitio
├── style.css         # Estilos y colores dinámicos
└── script.js         # Funcionalidad de cálculo y lógica del promedio
```

---

## ⚙️ Uso

1. Abre el archivo `index.html` en tu navegador.
2. Ingresa las tareas y sus tiempos en minutos.
3. Establece el promedio deseado en la casilla correspondiente.
4. Observa cómo cambia el color del indicador según tu desempeño.

---

## 💡 Personalización

Puedes modificar el rango de colores en `style.css` para ajustar la transición entre verde y rojo, o editar la lógica en `script.js` si deseas cambiar el umbral de colores o la unidad de medida (por ejemplo, horas o segundos).

---

## 🧠 Próximas mejoras

* Guardar los datos localmente usando `localStorage`.
* Mostrar estadísticas semanales o mensuales.
* Agregar soporte para exportar los datos a CSV.

---

## 🧑‍💻 Autor

Creado por **Yorman P.**
Proyecto personal para optimizar la gestión del tiempo diario.
