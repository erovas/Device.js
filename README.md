# Device.js
Device.js is a JavaScript library to detect device, viewport, and browser information using plain JavaScript.

## Compatibility
- Works with all modern browsers from IE9+.

## How to use it?

Import the Device.js JavaScript library wherever you want into the document before using it.

``` html
<script src="Device.min.js"></script>
<script>
    console.log(Device.isMobile);
</script>
```

or

``` html
<script defer src="Device.min.js"></script>
<script defer src="otherScript.js"></script>
```

or

``` html
<script type="module" src="Device.min.js"></script>
<script type="module" src="otherScript.js"></script>
```

or

``` html
<script type="module">
    import "Device.min.js";
    console.log(Device.isMobile);
</script>
```

## API

| Property       | Description                                                                                             |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| `isMobile`               | true if the device is mobile or tablet type |
| `isTablet`               | true if the device is a tablet |
| `isDesktop`              | true if the device is a desktop |
| `isSafeConnection`  | true if the connection is HTTPS or FILE protocol |
| `isFullScreen`| true if the device is in full screen mode |
| `isLandscape`| true if the device is in landscape screen mode |
| `isPortrait`| true if the device is in portrait screen mode |
| `isTouchScreen`| true if the device has touch screen |
| `isDarkMode`| true if the device browser is in Dark mode |
| `isLightMode`| true if the device browser is in Light mode |
| `orientation`| returns an object of the form { angle: 0º, type: 'landscape-primary' } where "angle" is the angle of the browser, "type" the orientation type name |
| `addressBar`| returns an object of the form { width, height } which are the numerical values in pixels of the browser's address bar |
| `scrollBar` | returns an object of the form { X: { width, height, position, maxPosition }, Y:{ width, height, position, maxPosition } } all of them in pixels |
| `pixelRatio` | returns the pixel ratio of the browser |
| `resolution` | returns an object of the form { width, height } which are the numerical values in pixels of the real resolution of the device screen |
| `screenViewport` | returns an object of the form { width, height } which are the numerical values in pixels that the browser has |
| `innerViewport` | returns an object of the form { width, height } which are the numerical values in pixels that the browser has to render content |
| `outerViewport` | returns an object of the form { width, height } which are the numerical values in pixels of which the browser is currently occupying |
| `clientViewport` | returns an object of the form { width, height } which are the numerical values in pixels of which is the rendered size that the user can see on the screen |
| `availViewport` | returns an object of the form { width, height } which are the numerical values in pixels which is the viewport available for rendering |
| `vh` | returns a numeric value that is 1% of the height of the innerViewport |
| `vW` | returns a numeric value that is 1% of the width of the innerViewport |
| `workers`| returns a number that is the number of workers that the device has |
| `touchPoints`| returns a number that is the number touch points the device has |
| `OS` | returns an object of the form { name, version } which are the name and version of operating system |
| `browser` | returns an object of the form { name, major, version } which are the name and version of browser |
| `CPU`| returns a number that is the CPU architecture |

## Changelog

Version 1.2.3 - new property

Added
- isLightMode

Version 1.2.2 - new property, accurate polyfill

Added:
- isDarkMode

Polyfill:
- orientation

Version 1.2.0 - new properties

Added:
- isTouchScreen
- touchPoints
- CPU
- OS
- browser

Deleted:
- screenSize

You can find the Version 1.1.0 in 'old-version-1.1.0' folder in this repository.


Version 1.1.0 - Refactoring

Deleted:
- openFullScreen()
- closeFullScreen()
- fullScreen()
- aspectRatio

Modified:
-addressBarSize TO addressBar
-scrollBarWidth TO scrollBar

You can find the Version 1.0.0 in 'old-version' folder in this repository.

## Demo

https://erovas.github.io/Device.js/

## Authors

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](https://github.com/erovas/Device.js/blob/main/LICENSE) file for details.

# Spanish - Español

# Device.js
Device.js es una libreria JavaScript para detectar el dispositivo, viewport e informacion del browser usando vanilla JavaScript.

## Compatibilidad
- Funciona con todos los navegadores modernos desde IE9+.

## ¿Cómo utilizarlo?
Importar la libreria Device.js en cualquier parte dentro del documento antes de utilizarlo.

``` html
<script src="Device.min.js"></script>
<script>
    console.log(Device.isMobile);
</script>
```

or

``` html
<script defer src="Device.min.js"></script>
<script defer src="otherScript.js"></script>
```

or

``` html
<script type="module" src="Device.min.js"></script>
<script type="module" src="otherScript.js"></script>
```

or

``` html
<script type="module">
    import "Device.min.js";
    console.log(Device.isMobile);
</script>
```

## API

| Propiedad       | Descripción                                                                                             |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| `isMobile`               | true si el dispositivo es de tipo móvil o tablet |
| `isTablet`               | true si el dispositivo es de tipo tablet |
| `isDesktop`              | true si el dispositivo es de tipo escritorio |
| `isSafeConnection`  | true si la conexión es de protocolo HTTPS o FILE |
| `isFullScreen`| true si el dispositivo está en modo pantalla completa |
| `isLandscape`| true si el dispositivo está en modo pantalla landscape |
| `isPortrait`| true si el dispositivo está en modo pantalla portrait |
| `isTouchScreen`| true si el dispositivo tiene una pantalla tactil |
| `isDarkMode`| true si el browser del dispositivo está en modo oscuro |
| `isLightMode`| true si el browser del dispositivo está en modo claro |
| `orientation`| devuelve un objeto de la forma { angle: 0º, type: 'landscape-primary' } en donde "angle" es el angulo que tiene el navegador, "type" el nombre de tipo de orientación |
| `addressBar`| devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles de la barra de direcciones del navegador |
| `scrollBar` | devuelve un objeto de la forma { X: { width, height, position, maxPosition }, Y:{ width, height, position, maxPosition } } todos ellos en píxeles|
| `pixelRatio` | devuelve el pixel ratio del navegador |
| `resolution` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles de la resolución real de la pantalla del dispositivo |
| `screenViewport` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles del cual el navegador dispone |
| `innerViewport` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles del cual el navegador dispone para renderizar contenido |
| `outerViewport` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles del cual el navegador está ocupando actualmente |
| `clientViewport` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles del cual es el tamaño renderizado que el usuario puede observar en pantalla |
| `availViewport` | devuelve un objeto de la forma { width, height } el cual son los valores numericos en pixeles el cual es el viewport disponible para renderizar |
| `vh` | devuelve un valor numerico que es el 1% del alto del innerViewport |
| `vW` | devuelve un valor numerico que es el 1% del ancho del innerViewport |
| `workers`| devuelve un numero que es la cantidad de workers que posee el dispositivo |
| `touchPoints`| devuelve un numero que es la cantidad de puntos tactiles que posee el dispositivo |
| `OS` | devuelve un objeto de la forma { name, version } el cual es el nombre y version del sistema operativo |
| `browser` | devuelve un objeto de la forma { name, major, version } el cual es el nombre y version del navegador |
| `CPU`| devuelve un numero que es la arquitectura del CPU |

## Registro de cambios

Version 1.2.3 - nueva propiedad

Added
- isLightMode

Version 1.2.2 - nueva propiedad, polyfill preciso

Agregado:
- isDarkMode

Polyfill:
- orientation

Version 1.2.0 - nuevas propiedades

Agregado:
- isTouchScreen
- touchPoints
- CPU
- OS
- browser

Eliminado:
- screenSize

Puede encontrar la Versión 1.1.0 en la carpeta 'old-version-1.1.0' en este repositorio.

Version 1.1.0 - Refactorzación

Eliminado:

- openFullScreen()
- closeFullScreen()
- fullScreen()
- aspectRatio

Modificado:
- addressBarSize A addressBar
- scrollBarWidth A scrollBar

Puede encontrar la Versión 1.0.0 en la carpeta 'old-version' en este repositorio.

## Demo

https://erovas.github.io/Device.js/

## Autores

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## Licencia

Este proyecto está licenciado bajo Licencia BSD 3-Clause - ver el archivo [LICENCIA](https://github.com/erovas/Device.js/blob/main/LICENSE) para mas detalles.