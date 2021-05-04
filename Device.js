/*!
 * Device.js v1.1.0
 * [Back-compatibility: IE9+]
 * Copyright (c) 2021, Emanuel Rojas Vásquez
 * BSD 3-Clause License
 * https://github.com/erovas/Device.js
 */
(function(window, document){

    var DEVICE = 'Device';

    if(window[DEVICE])
        return console.error(DEVICE + '.js has already been defined');

    var HEAD = document.head;

    var DIV_REFERENCE = document.createElement('div');
    DIV_REFERENCE.style.cssText = 'height:10vh;width:10vw;border:0;padding:0';
    HEAD.appendChild(DIV_REFERENCE);

    var SCREEN = screen;
    var ONE_HUNDRED = 100;
    var DOC_ELEMENT = document.documentElement;
    var IS_APPLE = /iPad Simulator|iPhone Simulator|iPod Simulator|iPad|iPhone|iPod/i.test(navigator.platform) || /Mac/i.test(navigator.userAgent);
    var IS_XIAOMI = /XiaoMi|MiuiBrowser/i.test(navigator.userAgent); //Android
    var IS_FIREFOX_ANDROID = /Firefox/i.test(navigator.userAgent);

    window[DEVICE] = {

    //#region "isSomething"

        get isFullScreen(){
            return (innerHeight >= SCREEN.height || innerHeight == SCREEN.height - 1) && innerWidth == SCREEN.width;
        },

        get isSafeConnection(){
            var protocol = location.protocol;
            return protocol == 'https:' || protocol == 'file:';
        },

        get isMobile(){
            var userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            var trick = SCREEN.availHeight == SCREEN.height && SCREEN.availWidth == SCREEN.width && outerHeight - innerHeight == 0 && !this.isFullScreen;
            return userAgent || trick;
        },

        get isTablet(){
            return this.isMobile && Math.min(SCREEN.width, SCREEN.height) > 425; //px
        },

        get isDesktop(){
            return !this.isMobile;
        },

        get isLandscape(){
            if(IS_APPLE){
                var cvp = this.clientViewport;
                return cvp.width > cvp.height;
            }
            return SCREEN.width > SCREEN.height;
        },

        get isPortrait(){
            return !this.isLandscape;
        },

    //#endregion

    //#region "viewports"

        get resolution(){
            var dpr = this.pixelRatio;
            return { width: (SCREEN.width * dpr) | 0, height: (SCREEN.height * dpr) | 0 }
        },

        get screenViewport(){
            return this.isMobile && this.isLandscape && IS_APPLE? 
                { width: SCREEN.height, height: SCREEN.width } 
                : 
                { width: SCREEN.width, height: SCREEN.height }
        },

        get innerViewport(){
            return this.isMobile? 
                (
                    IS_XIAOMI?
                    this.outerViewport
                    :
                    {
                        width: Math.round(parseFloat(getComputedStyle(DIV_REFERENCE).width) * 10),
                        height: Math.round(parseFloat(getComputedStyle(DIV_REFERENCE).height) * 10)
                    }
                )
                :
                { width: innerWidth, height: innerHeight }
        },

        get outerViewport(){
            return { width: outerWidth, height: outerHeight }
        },

        get clientViewport(){
            return { width: DOC_ELEMENT.clientWidth, height: DOC_ELEMENT.clientHeight }
        },

        get availViewport(){
            return this.isMobile && this.isLandscape && IS_APPLE? 
                { width: SCREEN.availHeight, height: SCREEN.availWidth }
                :
                { width: SCREEN.availWidth, height: SCREEN.availHeight }
        },

        get vh(){
            return this.isMobile? this.innerViewport.height / ONE_HUNDRED : innerHeight / ONE_HUNDRED
        },

        get vw(){
            return this.isMobile? this.innerViewport.width / ONE_HUNDRED : innerWidth / ONE_HUNDRED
        },

    //#endregion

        get addressBar(){
            var that = this;
            var full = that.isFullScreen;
            var innerViewport = that.innerViewport;
            
            if(that.isMobile){

                var height = IS_XIAOMI || IS_FIREFOX_ANDROID || IS_APPLE?
                    innerViewport.height - innerHeight
                    :
                    innerViewport.height - outerHeight;

                return { 
                    width: that.isLandscape && IS_APPLE? SCREEN.height : SCREEN.width,
                    height: full? 0 : height 
                }
            }

            //isDesktop
            var availHeight = SCREEN.availHeight;
                            
            //alto que tiene la ventana del browser actualmente
            //browserHeight no puede ser mas alto que el alto disponible
            var browserHeight = outerHeight > availHeight? availHeight : outerHeight;

            return {
                width: innerViewport.width,
                height: full? 0 : browserHeight - innerHeight
            }
        },

        get scrollBar(){
            var mobile = this.isMobile;
            return {
                X: {
                    width: innerWidth,
                    height: mobile? 0 : innerHeight - DOC_ELEMENT.clientHeight,
                    position: DOC_ELEMENT.scrollLeft,
                    maxPosition: DOC_ELEMENT.scrollWidth - DOC_ELEMENT.clientWidth
                },

                Y: {
                    width: mobile? 0 : innerWidth - DOC_ELEMENT.clientWidth,
                    height: innerHeight,
                    position: DOC_ELEMENT.scrollTop,
                    maxPosition: DOC_ELEMENT.scrollHeight - DOC_ELEMENT.clientHeight
                }
            }
        },

        get orientation(){
            if(SCREEN.orientation)
                return SCREEN.orientation;

            //polyfill para IE, EDGE Legacy y iOS
            var mobile = this.isMobile;

            return this.isPortrait?
                { angle: mobile? 0 : 90, type: 'portrait-primary' }
                :
                { angle: mobile? 90 : 0, type: 'landscape-primary' }
        },

        get pixelRatio(){
            return window.devicePixelRatio || 1;
        },

        get workers(){
            return window.navigator.hardwareConcurrency || 2;
        },

    //#region 

        get screenSize(){
            var DIV = document.createElement('div');
            DIV.style.width = this.isMobile? '4.15cm' : '3.725cm';  //Numeros magicos

            HEAD.appendChild(DIV);

            var dpr = this.pixelRatio;
            var in_1 = parseFloat(getComputedStyle(DIV).width) * dpr;
            
            HEAD.removeChild(DIV);

            var realWidth = SCREEN.width * dpr / in_1;
            var realHeight = SCREEN.height * dpr / in_1;
            var hypotenuse = Math.sqrt(realWidth * realWidth + realHeight * realHeight);

            return {
                width: Math.floor(realWidth * ONE_HUNDRED) / ONE_HUNDRED,
                height: Math.floor(realHeight * ONE_HUNDRED) / ONE_HUNDRED,
                diagonal: Math.floor(hypotenuse * ONE_HUNDRED) / ONE_HUNDRED
            }
        }

    //#endregion

    }

})(window, document);

if(!Device.isSafeConnection)
    console.error('this is not a secure connection (https or file)');