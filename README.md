
# Prueba Practica Frontend

Esta es la solucion a una prueba para frontend de Apok.


## Objetivos de la prueba

El objetivo general de la prueba es implementar un cliente móvil que permita la navegación y operaciones a través de un árbol de nodos, proveniente de un
API REST, dicho objetivo fue cumplido satisfactoriamente.

* Se implemento un cliente HTTP para el consumo de la api.
* Se implemento una interfaz de navegación sencilla.

## Requerimientos funcionales

* Al inicio se muestran todos los nodos padres (raiz) y a partir de alli se puede navegar hacia los hijos haciendo clicks.
* Se puede cambiar el idioma del campo title, siempre y cuando el nodo tenga traducciones disponibles.
* Se pueden crear nodos y se puede seleccionar que traducciones del Title se quieren añadir.
* Se pueden eliminar nodos que no tengan hijos.

## Requerimientos tecnicos

* El cliente fue implementado siguiendo las mejores practicas. Para asegurar esto se utilizo  TypeScript, Eslint y Prettier.
* Los errores fueron gestionados apropiadamente con bloques "try-catch" a nivel de llamada de API, las cuales fueron realizadas con Axios por facilidad de tipado de respuestas y deteccion de errores 400 y 500.
* El diseño es simple y facil de utilizar.
* Se utilizo React
* Se utilizo Git para el control de versiones.
* La solucion es responsive.
## Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/InfVlad/PruebaApok.git
```

Ir al directorio del proyecto

```bash
  cd PruebaApok
```

Instalar las dependencias

```bash
  npm install
```

Iniciar el servidor

```bash
  npm run dev
```


## Tecnologias utilizadas

Para el desarrollo del este proyecto se utilizaron las siguientes tecnologias:

* TypeScript: codigo mas robusto y confiable.
* React: creacion de la UI.
* TailwindCSS: manejo de estilos.
* Axios: manejo de llamadas de API.
* Auto-animate: animaciones agradables a la vista y sencillas de implementar.
* React-hot-toast: alertas y anuncios que mejoran la experiencia de usuario.
* Prettier: codigo limpio y ordenado.
* Eslint: advertencias o errores en caso de usar malas practicas.