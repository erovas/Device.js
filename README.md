# Device.js
Pequeña librería de ayuda, para obtener algunas características del dispositivo, como los diferentes anchos, altos, orientación, pantalla completa, móvil o escritorio, alto de la barra de navegación, etc

## Compatibilidad
- Funciona con todos los navegadores modernos desde IE9+

## ¿Cómo utilizarlo?

Esta librería debe ser cargada de modo tal que el "body" del documento esté disponible, ya sea cargando la librería como "defer", "module".

``` html
<script defer src="Device.min.js"></script>
<script defer>
    console.log(Device.isMobile);
</script>
```

``` html
<script type="module" src="Device.min.js"></script>
<script type="module" src="otherScript.js"></script>
```

``` html
<script type="module">
    import "Device.min.js";
    console.log(Device.isMobile);
</script>
```

 O siguiendo el mismo esquema que está en el index.html de este repositorio.

``` html
<head>
    <script src="Device.min.js"></script>
</head>
<body>
    <script>
        console.log(Device.isMobile);
    </script>
</body>

```

## API

| Método / Propiedad       | Descripción                                                                                             |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| `isMobile`               | true si el dispositivo es de tipo móvil o tablet |
| `isTablet`               | true si el dispositivo es de tipo tablet |
| `isDesktop`              | true si el dispositivo es de tipo escritorio |
| `isSafeConnection`  | true si la conexión es de protocolo HTTPS o FILE |
| `isFullScreen`| true si el dispositivo está en modo pantalla completa |
| `orientation`| devuelve un objeto de la forma { angle: 0º, type: 'landscape-primary' } en donde "angle" es el angulo que tiene el navegador, "type" el nombre de tipo de orientación |
| `addressBarSize`| devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles de la barra de direcciones del navegador |
| `pixelRatio` | devuelve el pixel ratio del navegador |
| `resolution` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles de la resolución real de la pantalla del dispositivo |
| `screenViewport` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles del cual el navegador dispone |
| `innerViewport` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles del cual el navegador dispone para renderizar contenido |
| `outerViewport` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles del cual el navegador está ocupando actualmente |
| `clientViewport` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles del cual es el tamaño renderizado que el usuario puede observar en pantalla |
| `availViewport` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles el cual es el viewport disponible para renderizar |
| `vh` | devuelve un valor numerico que es el 1% del alto del innerViewport |
| `vW` | devuelve un valor numerico que es el 1% del ancho del innerViewport |
| `aspectRatio` | devuelve un valor numerico que es la relación de aspecto actual de la pantalla |
| `screenSize` | (experimental - NO utilizar) devuelve un objeto de la forma { width, height, diagonal }, que son un estima en pulgadas del ancho, alto y diagonal de la pantalla fisica del dispositivo respectivamente |
| `openFullScreen()` | metodo que pone en pantalla completa el navegador |
| `closeFullScreen()` | metodo que pone sale de la pantalla completa el navegador |
| `fullScreen()` | metodo toggle que pone o sale de la pantalla completa el navegador |


## Autores

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## Licencia

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details