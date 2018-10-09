## Ejercicio 1
## Buscar una aplicación de ejemplo, preferiblemente propia, y deducir qué patrón es el que usa. ¿Qué habría que hacer para evolucionar a un patrón tipo microservicios?


En este caso he decidido analizar un proyecto desarrollado en una asignatura de
tercero llamada Ingeniería de Sistemas de Información (ISI).
Aquí desarrollamos un comparador de precios de instrumentos musicales, de
forma que teníamos nuestra aplicación web en la que el usuario podía introducir el
nombre de un instrumento musical y que le comparara el precio de el mismo entre
tres webs diferentes.
Esta aplicación la desarrollamos como una aplicación con arquitectura por capas,
donde queríamos separar la lógica de negocios de la lógica de diseño.
De esta forma con la vista lógica podríamos diferenciar tres capas:

- **Interfaz de usuario.**
- **Capa de negocio.**
- **Capa de datos.**

Aunque esta aplicación quizás sea demasiado simple como para desarrollarla en una
arquitectura de microservicios, se va a intertar proponer una solución utilizando este
tipo de arquitectura. En este caso, añadiría también un “servicio de caché” en el que
se puedan almacenar las últimas consultas que haya realizado el usuario y para ello el
login del usuario correspondiente.

Por lo tanto, en esta aplicación podríamos diferenciar los siguientes servicios:
- Base de datos
- Login del usuario
- Servicio de caché.
- Generación de la comparación.

Por lo tanto, el núcleo de la aplicación sería la aplicación web con su interfaz de
usuario, con la que interactuará el usuario.
A modo de microservicios tendríamos el resto de servicios descritos, donde
incluiríamos el login del usuario, el servicio de caché, así como la obtención de los
datos de las bases de datos y la generación de los datos comparados para
representarlos en la interfaz.
