# PROYECTO QUIZ

## Descripción del proyecto

El proyecto Quiz se trata de una pequeña aplicación para mostrar un cuestionario de preguntas. Se presenta al usuario una serie de preguntas con un conjunto de respuestas optativas de las que sólamente una es la respuesta correcta.

### Link de GitHub
https://github.com/chente85417/RampUp

### Estructura
El proyecto consta de las siguentes partes:

- Página de entrada **index.html**: es la página de bienvenida. Simplemente consta de una imagen y un link para dar comienzo al cuestionario. Da paso a la página del quiz que es la que contiene toda la lógica.
- **quiz.html**: es la página que contiene la estructura estática de la aplicación. Sólamente contiene un formulario junto con un botón Submit para validación y evaluación. Todos los elementos que configuran las preguntas y demás elementos del cuestionario se crean dinámicamente durante la inicialización desde los archivos javascript.
- **global.js**: es el archivo javascript correspondiente a la definición de elementos globales. En este caso se encarga de contener unas clases que definen una plantilla de colores para la aplicación. La plantilla se carga con la definición de los colores desde un array. En este caso se ha utilizado una paleta de colores procedente de coolors.co. La clase está diseñada para cargar los colores y comprobar si se encuentran bien definidos.
- **quiz.js**: es el archivo principal de javascript con toda la lógica. Define una clase para encapsular el objeto quiz que se refiere al cuestionario completo. Esta clase incorpora una serie de funciones en su interfaz que se encargan de cargar el contenido del cuestionario procedente de un archivo JSON. Para ello crea un conjunto de objetos question que contiene cada una de las preguntas con el título de la pregunta, el conjunto de opciones, la respuesta correcta y la respuesta que el usuario haya seleccionado durante la ejecución. El set de funciones se encarga de generar todos los nodos del DOM necesarios e inyectarlos dentro del la etiqueta form estática del documento quiz.html. También incorpora las funciones manejadoras de los mensajes mouseenter, mouseleave, click y submit.
- **quiz.css**: es el archivo de estilos para el cuestionario. Se han transformado los input tipo radio de selección de opciones para que su aspecto sea parecido a unos botones. Para ello se ha ocultado el tag input radio mediante display none y se ha dado estilo a los label. La aplicación muestra coloreado on hover sobre las opciones para configuración laptop/desktop.

El diseño es *responsive* según los puntos de corte establecidos en el enunciado. 

