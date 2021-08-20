/*!
 * Author: Emanuel Rojas Vásquez
 *  https://github.com/erovas
 */
(function(window, document){

    var DEV = window.Device;
    var BODY = document.body;
    var px = 'px';
    

    function throttled(callback, delay) {
        delay = delay || 50;
        var fire = null; 
        var last = null;
        
        return function() {
            var ctx = this; 
            var args = arguments;
            
            if(!last){ 
                callback.apply(ctx, args); 
                last = Date.now(); 
            } 
            else {
                clearTimeout(fire);
                
                fire = setTimeout(function() { 
                    if((Date.now() - last) >= delay){ 
                        callback.apply(ctx, args); 
                        last = Date.now(); 
                    } 
                }, delay - (Date.now() - last));
            }
        }
    }

    function setScrollbar(){
        scrollBarXWidth.innerText = DEV.scrollBar.X.width + px;
        scrollBarYWidth.innerText = DEV.scrollBar.Y.width + px;
        scrollBarXHeight.innerText = DEV.scrollBar.X.height + px;
        scrollBarYHeight.innerText = DEV.scrollBar.Y.height + px;
        scrollBarXPosition.innerText = ( ((DEV.scrollBar.X.position * 100) | 0) / 100 ) + px;
        scrollBarYPosition.innerText = ( ((DEV.scrollBar.Y.position * 100) | 0) / 100 ) + px;
        scrollBarXMaxPosition.innerText = DEV.scrollBar.X.maxPosition + px;
        scrollBarYMaxPosition.innerText = DEV.scrollBar.Y.maxPosition + px;
    }

    function setResize(){

        //#region OS

        var OS = DEV.OS;
        OSName.innerText = OS.name;
        OSVersion.innerText = OS.version;

        //#endregion

        //#region browser

        var browser = DEV.browser;
        browserName.innerText = browser.name;
        browserMajor.innerText = browser.major;
        browserVersion.innerText = browser.version;

        //#endregion

        //#region CPU

        CPU.innerText = DEV.CPU + ' bit';

        //#endregion

        //#region Type

        isMobile.innerText = DEV.isMobile;
        isTablet.innerText = DEV.isTablet;
        isDesktop.innerText = DEV.isDesktop;    

        //#endregion

        //#region Viewports

        wresolution.innerText = DEV.resolution.width + px;
        hresolution.innerText = DEV.resolution.height + px;
        wscreenViewport.innerText = DEV.screenViewport.width + px;
        hscreenViewport.innerText = DEV.screenViewport.height + px;
        winnerViewport.innerText = DEV.innerViewport.width + px;
        hinnerViewport.innerText = DEV.innerViewport.height + px;
        wouterViewport.innerText = DEV.outerViewport.width + px;
        houterViewport.innerText = DEV.outerViewport.height + px;
        wclientViewport.innerText = DEV.clientViewport.width + px;
        hclientViewport.innerText = DEV.clientViewport.height + px;
        wavailViewport.innerText = DEV.availViewport.width + px;
        havailViewport.innerText = DEV.availViewport.height + px;
        vw.innerText = DEV.vw + px;
        vh.innerText = DEV.vh + px;

        //#endregion

        //#region addressBar

        waddressBarSize.innerText = DEV.addressBar.width + px;
        haddressBarSize.innerText = DEV.addressBar.height + px;

        //#endregion

        //#region scrollBar

        setScrollbar();

        //#endregion

        //#region orientation

        angle.innerText = DEV.orientation.angle + 'º';
        type.innerText = DEV.orientation.type;

        //#endregion

        //#region Miscelaneous

        isDark.innerText = DEV.isDarkMode;
        isLight.innerText = DEV.isLightMode;
        isSafe.innerText = DEV.isSafeConnection;
        isFullScreen.innerText = DEV.isFullScreen;
        isPortrait.innerText = DEV.isPortrait;
        isLandscape.innerText = DEV.isLandscape;
        isTouchScreen.innerText = DEV.isTouchScreen;
        touchPoints.innerText = DEV.touchPoints;
        pixelRatio.innerText = DEV.pixelRatio;
        workers.innerText = DEV.workers;

        //#endregion

    }

    setResize();

    var inserted = null;

    var debounced = function() {
        if(inserted)
            clearTimeout(inserted);
        
        inserted = setTimeout(function() { setResize(); }, 150);
    }

    window.onresize = debounced;
    window.onscroll = throttled(setScrollbar);

    checkScrollX.onchange = function(){
        if(checkScrollX.checked)
            BODY.style.width = '3000px';
        else
            BODY.style.width = '';

        setScrollbar();
    }

    checkScrollY.onchange = function(){
        if(checkScrollY.checked)
            BODY.style.height = '2000px';
        else
            BODY.style.height = '';

        setScrollbar();
    }

})(window, document);