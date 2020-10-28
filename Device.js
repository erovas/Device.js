/*
 * Device.js v1.0.0
 * Pequeña librería de ayuda, para obtener algunas características del dispositivo, como los diferentes 
 * anchos, altos, orientación, pantalla completa, móvil o escritorio, alto de la barra de navegación, etc.
 * [Back-compatibility: IE9+]
 * (c) 2020 Emanuel Rojas Vásquez
 * MIT License
 * https://github.com/erovas/Device.js
 */
Object.defineProperty(window, 'Device', {
    value: (function(document) {

        // "div" de referencia
        var div = document.createElement('div');
        div.style.position = "absolute";
        div.style.zIndex = "-1";
        div.style.height = "100vh";
        div.style.width = "100vw";
        div.style.top = "0";
        div.style.left = "0";

        var inserted = null;

        // Anti rebote, por si se utiliza varios metodos que requieran usar el "div" de referencia
        var debounced = function() {
            if(inserted)
                clearTimeout(inserted);
            
            document.body.appendChild(div);
            
            inserted = setTimeout(function() {
                document.body.removeChild(div);
            }, 100);
        }

        var Device = {}
    
        Object.defineProperties(Device, {
    
            'isMobile': {
                get: function(){
                    const first = screen.availHeight === screen.height && screen.availWidth === screen.width && window.outerHeight - window.innerHeight === 0;
                    return first ||  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                }
            },
            'isTablet': {
                get: function(){
                    return this.isMobile && Math.min(screen.width, screen.height) > 425;
                }
            },
            'isDesktop': {
                get: function(){
                    return !this.isMobile;
                }
            },
            'isSafeConnection': {
                get: function(){
                    var protocol = location.protocol;
                    return protocol === 'https:' || protocol === 'file:';
                }
            },
            'isFullScreen': {
                get: function(){
                    return (window.innerHeight >= screen.height || window.innerHeight === screen.height - 1) && window.innerWidth === screen.width;
                }
            },
            'orientation': {
                get: function(){
                    if(screen.orientation)
                        return screen.orientation;

                    //polyfill para IE y EDGE no chromiun
                    var orientation = { 
                        angle: 0,
                        type: 'landscape-primary'
                    }

                    if(screen.height > screen.width){
                        orientation.angle = 90;
                        orientation.type = 'portrait-primary';
                    }

                    return orientation;
                }
            },
            'addressBarSize': {
                get: function(){
                    if(this.isMobile){
                        debounced();
                        //return div.offsetHeight - document.documentElement.clientHeight;
                        var height = div.offsetHeight - window.outerHeight;
                        //Corrección para navegador de Xiaomi
                        height = height < 0? height * -1 : height;
                        
                        if(this.isFullScreen)
                            height = 0;

                        return {
                            width: screen.width,
                            height: height
                        }
                    }
                        
                    //isDesktop
                    var availHeight = screen.availHeight;
                            
                    //alto que tiene la ventana del browser actualmente
                    var browserHeight = window.outerHeight;
        
                    //browserHeight no puede ser mas alto que el alto disponible
                    if(browserHeight > availHeight) 
                        browserHeight = availHeight;

                    var height = browserHeight - window.innerHeight;

                    if(this.isFullScreen)
                        height = 0;
        
                    return {
                        width: window.outerWidth,
                        height: height
                    }
                }
            },
            'pixelRatio': {
                get: function(){
                    return window.devicePixelRatio || 1;
                }
            },
            'resolution': {
                get: function(){
                    var dpr = this.pixelRatio;
                    return {
                        width: (screen.width * dpr) | 0,
                        height: (screen.height * dpr) | 0
                    }
                }
            },
            'screenViewport': {
                get: function(){
                    return {
                        width: screen.width,
                        height: screen.height
                    }
                }
            },
            'innerViewport': {
                get: function(){
                    if(this.isDesktop)
                        return {
                            width: window.innerWidth,
                            height: window.innerHeight
                        };

                    // "isMobile"
                    debounced();
                    return {
                        width: div.offsetWidth,
                        height: div.offsetHeight
                    }
                }
            },
            'outerViewport': {
                get: function(){
                    return {
                        width: window.outerWidth,
                        height: window.outerHeight
                    }
                }
            },
            'clientViewport': {
                get: function(){
                    var doc = document.documentElement;
                    return {
                        width: doc.clientWidth,
                        height: doc.clientHeight
                    }
                }
            },
            'availViewport': {
                get: function(){
                    return {
                        width: screen.availWidth,
                        height: screen.availHeight
                    }
                }
            },
            'vh': {
                get: function(){
                    if(this.isDesktop)
                        return window.innerHeight / 100;

                    // "isMobile"
                    debounced();
                    //return div.offsetHeight / 100;
                    return parseFloat(window.getComputedStyle(div).height) / 100;
                }
            },
            'vw': {
                get: function(){
                    if(this.isDesktop)
                        return  window.innerWidth / 100;

                    // "isMobile"
                    debounced();
                    //return  div.offsetWidth / 100;
                    return parseFloat(window.getComputedStyle(div).width) / 100;
                }
            },
            'aspectRatio': {
                get: function(){
                    return ((screen.width / screen.height) * 1000 | 0) / 1000;
                }
            },
            'screenSize': {
                get: function(){
                    var Div = document.createElement('div');
                    Div.style.position = "absolute";
                    Div.style.zIndex = "-1";
                    Div.style.height = "1in";
                    //Div.style.width = "1in";
                    if(this.isMobile)
                        Div.style.width = "4.15cm";  //prueba   //numero magico
                    else
                        Div.style.width = "3.725cm";  //prueba   //numero magico
                    Div.style.top = "0";
                    Div.style.left = "0";
                    //Div.style.border = "1px solid"

                    document.body.appendChild(Div);
                    
                    // 1 pulgada = X pixeles
                    var dpr = this.pixelRatio;
                    var in1 = parseFloat(window.getComputedStyle(Div).width) * dpr;

                    var widthPx = screen.width * dpr;
                    var heightPx = screen.height * dpr;

                    var realWidth = widthPx / in1;
                    var realHeight = heightPx / in1;
                    var hypotenuse = Math.sqrt(realWidth*realWidth + realHeight*realHeight);

                    //setTimeout(() => { Div.remove(); }, 100);
                    setTimeout(function() { 
                        //Div.remove(); 
                        document.body.removeChild(Div);
                    }, 100);
                    
                    return {
                        width: Math.floor(realWidth * 100) / 100,
                        height: Math.floor(realHeight * 100) / 100,
                        diagonal: Math.floor(hypotenuse * 100) / 100
                    }
                }
            },
            'openFullScreen': {
                value: function() {
                    var elem = document.documentElement;

                    if (elem.requestFullscreen)
                        elem.requestFullscreen();
                    else if (elem.mozRequestFullScreen) /* Firefox */
                        elem.mozRequestFullScreen();
                    else if (elem.webkitRequestFullscreen) /* Chrome, Safari and Opera */
                        elem.webkitRequestFullscreen();
                    else if (elem.msRequestFullscreen) /* IE/Edge */
                        elem.msRequestFullscreen();
                },
                writable: false
            },
            'closeFullScreen': {
                value: function(){
                    var doc = document;
                    if (doc.exitFullscreen)
                        doc.exitFullscreen();
                    else if (doc.mozCancelFullScreen) /* Firefox */
                        doc.mozCancelFullScreen();
                    else if (doc.webkitExitFullscreen) /* Chrome, Safari and Opera */
                        doc.webkitExitFullscreen();
                    else if (doc.msExitFullscreen) /* IE/Edge */
                        doc.msExitFullscreen();
                },
                writable: false
            },
            'fullScreen': {
                get: function(){
                    var that = this;

                    return function(){
                        if(that.isFullScreen)
                            that.closeFullScreen();
                        else
                            that.openFullScreen();
                    }
                }
            }
        });

        return Device;

    })(document),
    writable: false
});

if(!Device.isSafeConnection)
    console.error('this is not a secure connection (https or file)');