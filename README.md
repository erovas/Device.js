# Device.js
Helpy small library, to get some device features, such as the different widths, heights, orientation, full screen, mobile or desktop, height of the navigation bar, etc.

## Compatibility
- Works with all modern browsers from IE9 +

## How to use?

This library must be loaded in such a way that the "body" of the document is available, either by loading the library as "defer" or "module".

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

 Or following the same scheme that is in the index.html of this repository.

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

| Method / Property       | Description                                                                                             |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| `isMobile`               | true if the device is mobile or tablet type |
| `isTablet`               | true if the device is a tablet |
| `isDesktop`              | true if the device is a desktop |
| `isSafeConnection`  | true if the connection is HTTPS or FILE protocol |
| `isFullScreen`| true if the device is in full screen mode |
| `isLandscape`| true if the device is in landscape screen mode |
| `isPortrait`| true if the device is in portrait screen mode |
| `orientation`| returns an object of the form { angle: 0º, type: 'landscape-primary' } where "angle" is the angle of the browser, "type" the orientation type name |
| `addressBarSize`| returns an object of the form { width, height } which are the numerical values in pixels of the browser's address bar |
| `scrollBarWidth` | returns a number that is the width in pixels of the browser scroll bar |
| `pixelRatio` | returns the pixel ratio of the browser |
| `resolution` | returns an object of the form { width, height } which are the numerical values in pixels of the real resolution of the device screen |
| `screenViewport` | returns an object of the form { width, height } which are the numerical values in pixels that the browser has |
| `innerViewport` | returns an object of the form { width, height } which are the numerical values in pixels that the browser has to render content |
| `outerViewport` | returns an object of the form { width, height } which are the numerical values in pixels of which the browser is currently occupying |
| `clientViewport` | returns an object of the form { width, height } which are the numerical values in pixels of which is the rendered size that the user can see on the screen |
| `availViewport` | returns an object of the form { width, height } which are the numerical values in pixels which is the viewport available for rendering |
| `vh` | returns a numeric value that is 1% of the height of the innerViewport |
| `vW` | returns a numeric value that is 1% of the width of the innerViewport |
| `aspectRatio` | returns a numeric value that is the current aspect ratio of the screen |
| `screenSize` | (experimental - DO NOT use) returns an object of the form {width, height, diagonal}, which are an estimate in inches of the width, height and diagonal of the device's physical screen respectively |
| `openFullScreen()` | method that puts the browser in full screen |
| `closeFullScreen()` | method exits the browser full screen |
| `fullScreen()` | toggle method that puts or leaves the browser full screen |
| `workers`| returns a number that is the number of workers that the device has |


## Authors

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## Licencia

This project is licensed under the BSD 3-Clause License - see the [LICENSE](https://github.com/erovas/Device.js/blob/main/LICENSE) file for details.

# Spanish - Español

# Device.js
Pequeña librería de ayuda, para obtener algunas características del dispositivo, como los diferentes anchos, altos, orientación, pantalla completa, móvil o escritorio, alto de la barra de navegación, etc

## Compatibilidad
- Funciona con todos los navegadores modernos desde IE9+

## ¿Cómo utilizarlo?

Esta librería debe ser cargada de modo tal que el "body" del documento esté disponible, ya sea cargando la librería como "defer" ó "module".

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
| `isLandscape`| true si el dispositivo está en modo pantalla landscape |
| `isPortrait`| true si el dispositivo está en modo pantalla portrait |
| `orientation`| devuelve un objeto de la forma { angle: 0º, type: 'landscape-primary' } en donde "angle" es el angulo que tiene el navegador, "type" el nombre de tipo de orientación |
| `addressBarSize`| devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles de la barra de direcciones del navegador |
| `scrollBarWidth` | devuelve un numero que es el ancho en pixeles de la scroll bar del browser |
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
| `openFullScreen()` | método que pone en pantalla completa el navegador |
| `closeFullScreen()` | método que sale de la pantalla completa el navegador |
| `fullScreen()` | método toggle que pone o sale de la pantalla completa el navegador |
| `workers`| devuelve un numero que es la cantidad de workers que posee el dispositivo |


## Autores

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## Licencia

Este proyecto está licenciado bajo Licencia BSD 3-Clause - ver el archivo [LICENCIA](https://github.com/erovas/Device.js/blob/main/LICENSE) para mas detalles.