/*!
 * Device.js v1.2.3
 * [Back-compatibility: IE9+]
 * Copyright (c) 2021, Emanuel Rojas Vásquez
 * MIT License
 * https://github.com/erovas/Device.js
 */
(function(window, document){

    var DEVICE = 'Device';

    if(window[DEVICE])
        return console.error(DEVICE + '.js has already been defined');

    var DIV_REFERENCE = document.createElement('div');
    

    var SCREEN = screen;
    var ONE_HUNDRED = 100;
    var DOC_ELEMENT = document.documentElement;
    var NAVIGATOR = navigator;
    var IS_APPLE = /iP(ad Simulator|hone Simulator|od Simulator|ad|hone|od)/i.test(NAVIGATOR.platform) || /Mac/i.test(NAVIGATOR.userAgent);
    var IS_XIAOMI = /XiaoMi|MiuiBrowser/i.test(NAVIGATOR.userAgent); //Android
    var ORIENTATION_STRING = {
        a: 'portrait-primary',
        b: 'portrait-secondary',
        c: 'landscape-primary',
        d: 'landscape-secondary'
    }

    DIV_REFERENCE.style.cssText = 'height:10vh;width:10vw;border:0;padding:0';
    document.head.appendChild(DIV_REFERENCE);

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
            var userAgent = /Android|webOS|iP(hone|ad|od)|BlackBerry|IEMobile|Opera Mini/i.test(NAVIGATOR.userAgent);
            var trick = SCREEN.availHeight == SCREEN.height && SCREEN.availWidth == SCREEN.width && outerHeight - innerHeight == 0 && !this.isFullScreen;  //Detect android only
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

        get isTouchScreen(){
            return 'ontouchstart' in DOC_ELEMENT || this.touchPoints > 0;
        },

        get isDarkMode(){
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        },

        get isLightMode(){
            return !this.isDarkMode;
        },

    //#endregion

    //#region "viewports"

        get resolution(){
            var dpr = this.pixelRatio;
            var screen_vp = this.screenViewport;
            return { width: (screen_vp.width * dpr) | 0, height: (screen_vp.height * dpr) | 0 }
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

                var height = IS_XIAOMI || IS_APPLE || /Firefox/i.test(NAVIGATOR.userAgent)?
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

            
            var polyfill = window.orientation;
            var mobile = this.isMobile;
            var out = {};

            //iOS mobile and maybe another Device
            if(polyfill !== undefined){
                out.angle = polyfill;
                if(polyfill === 0)
                    out.type = mobile? ORIENTATION_STRING.a : ORIENTATION_STRING.c;
                else if(polyfill === 90)
                    out.type = mobile? ORIENTATION_STRING.c : ORIENTATION_STRING.a;
                else if(polyfill === 180)
                    out.type = mobile? ORIENTATION_STRING.b : ORIENTATION_STRING.d;
                else { // polyfill === -90, must be 270 in Android
                    out.type = mobile? ORIENTATION_STRING.d : ORIENTATION_STRING.b;
                    out.angle = 270;
                }
                    

                return out;
            }
            // Internet Explorer and old Firefox (Maybe EDGE Legacy)
            else if( (polyfill = SCREEN.msOrientation || SCREEN.mozOrientation) !== undefined ){
                out.type = polyfill;
                if(polyfill === ORIENTATION_STRING.a)
                    out.angle = 270;
                else if(polyfill === ORIENTATION_STRING.b)
                    out.angle = 90;
                else if(polyfill === ORIENTATION_STRING.c)
                    out.angle = 0;
                else
                    out.angle = 180;

                return out;
            }
            
            //Very old IE, EDGE Legacy and other
            return this.isPortrait?
                { angle: mobile? 0 : 90, type: ORIENTATION_STRING.a }
                :
                { angle: mobile? 90 : 0, type: ORIENTATION_STRING.c }
        },

        get pixelRatio(){
            return window.devicePixelRatio || 1;
        },

        get workers(){
            return NAVIGATOR.hardwareConcurrency || (IS_APPLE? 4 : 2);
        },

        get touchPoints(){
            return NAVIGATOR.maxTouchPoints || NAVIGATOR.msMaxTouchPoints || 0;
        },

    //#region 

        get CPU(){
            return /WOW64|Win64/i.test(NAVIGATOR.userAgent)? 64 : 32;
        },

        get OS(){
            var user_agent = NAVIGATOR.userAgent;
            var win = 'Windows';
            var mac = 'Mac';
            var OS_name = 'unknown';
            var OS_version = '-';
            var clientStrings = [
                {s: win + ' 10', r:/(Windows 10.0|Windows NT 10.0)/},
                {s: win + ' 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
                {s: win + ' 8', r:/(Windows 8|Windows NT 6.2)/},
                {s: win + ' 7', r:/(Windows 7|Windows NT 6.1)/},
                {s: win + ' Vista', r:/Windows NT 6.0/},
                {s: win + ' Server 2003', r:/Windows NT 5.2/},
                {s: win + ' XP', r:/(Windows NT 5.1|Windows XP)/},
                {s: win + ' 2000', r:/(Windows NT 5.0|Windows 2000)/},
                {s: win + ' ME', r:/(Win 9x 4.90|Windows ME)/},
                {s: win + ' 98', r:/(Windows 98|Win98)/},
                {s: win + ' 95', r:/(Windows 95|Win95|Windows_95)/},
                {s: win + ' NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
                {s: win + ' CE', r:/Windows CE/},
                {s: win + ' 3.11', r:/Win16/},
                {s:'Android', r:/Android/},
                {s:'Open BSD', r:/OpenBSD/},
                {s:'Sun OS', r:/SunOS/},
                {s:'Chrome OS', r:/CrOS/},
                {s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
                {s:'iOS', r:/(iP(hone|ad|od))/},
                {s: mac + ' OS X', r:/Mac OS X/},
                {s: mac + ' OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
                {s:'QNX', r:/QNX/},
                {s:'UNIX', r:/UNIX/},
                {s:'BeOS', r:/BeOS/},
                {s:'OS/2', r:/OS\/2/},
                {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
            ];

            //Obtener el nombre del OS
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(user_agent)) {
                    OS_name = cs.s;
                    break;
                }
            }

            //Obtener version del OS
            if (/Windows/.test(OS_name)) {
                OS_version = /Windows (.*)/.exec(OS_name)[1];
                OS_name = 'Windows';
            }

            switch (OS_name) {
                case  mac + ' OS':
                case  mac + ' OS X':
                case 'Android':
                    OS_version = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(user_agent)[1];
                    break;

                case 'iOS':
                    OS_version = /OS (\d+)_(\d+)_?(\d+)?/.exec(NAVIGATOR.appVersion);
                    OS_version = OS_version[1] + '.' + OS_version[2] + '.' + (OS_version[3] | 0);
                    break;
            }

            return {
                name: OS_name,
                version: OS_version
            }
        },

        get browser(){
            var user_agent = NAVIGATOR.userAgent;
            var name = 'Unknown';
            var version = '0.0.0'; 
            var major = 0;
            var verOffset;

            if(this.isMobile && IS_APPLE){

                if((verOffset = user_agent.indexOf('OPT')) > -1){
                    name = 'Opera';
                    version = user_agent.substring(verOffset + 4);
                }
                else if((verOffset = user_agent.indexOf('FxiOS')) > -1){
                    name = 'Firefox';
                    version = user_agent.substring(verOffset + 6);
                }
                else if((verOffset = user_agent.indexOf('EdgiOS')) > -1){
                    name = 'Edge';
                    version = user_agent.substring(verOffset + 7);
                }
                else if((verOffset = user_agent.indexOf('CriOS')) > -1){
                    name = 'Chrome';
                    version = user_agent.substring(verOffset + 6);
                }
                else if((verOffset = user_agent.indexOf('Version')) > -1){
                    name = 'Safari';
                    version = user_agent.substring(verOffset + 8);
                }
            }
            else {
                //Basados en chromium (desktop y android)
                if(!!window.chrome){

                    if((verOffset = user_agent.indexOf('EdgA')) > -1){  //Android
                        name = 'Edge';
                        version = user_agent.substring(verOffset + 5);
                    }
                    else if((verOffset = user_agent.indexOf('Edg')) > -1){  //Desktop edge
                        name = 'Edge';
                        version = user_agent.substring(verOffset + 4);
                    }
                    else if(!!window.opr){
                        name = 'Opera';
                        version = user_agent.substring(user_agent.indexOf('OPR') + 4);
                    }
                    else if((verOffset = user_agent.indexOf('Chrome')) > -1){
                        name = 'Chrome';
                        version = user_agent.substring(verOffset + 7);
                    }

                }
                else if(!!window.opr || !!window.opera){  //Old Opera
                    name = 'Opera';
                    version = user_agent.substring(user_agent.indexOf('Opera') + 6);
                    if((verOffset = user_agent.indexOf('Version')) > -1)
                        version = user_agent.substring(verOffset + 8);
                }
                else if(!!document.documentMode){
                    name = 'Internet Explorer';
                    if((verOffset = user_agent.indexOf('MSIE')) > -1)  // IE10 or less
                        version = user_agent.substring(verOffset + 5);
                    else  // IE11+
                        version = user_agent.substring(user_agent.indexOf('rv:') + 3);
                }
                else if(!!window.StyleMedia){
                    name = 'Edge Legacy';
                    version = user_agent.substring(user_agent.indexOf('Edge') + 5);
                }
                else if(typeof InstallTrigger !== 'undefined'){
                    name = 'Firefox';
                    version = user_agent.substring(user_agent.indexOf('Firefox') + 8);
                }
                else if((verOffset = user_agent.indexOf('MiuiBrowser')) > -1){
                    name = 'Mi Browser';
                    version = user_agent.substring(verOffset + 12);
                }
                else if((verOffset = user_agent.indexOf('Mint Browser')) > -1){
                    name = 'Mint Browser';
                    version = user_agent.substring(verOffset + 13);
                }
                else if(/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification))){
                    name = 'Safari';
                    version = user_agent.substring(user_agent.indexOf('Safari') + 7);
                    if((verOffset = user_agent.indexOf('Version')) > -1)
                        version = user_agent.substring(verOffset + 8);
                }
            }

            if((verOffset = version.indexOf(';')) > -1) version = version.substring(0, verOffset);
            if((verOffset = version.indexOf(' ')) > -1) version = version.substring(0, verOffset);
            if((verOffset = version.indexOf(')')) > -1) version = version.substring(0, verOffset);

            major = parseInt('' + version, 10);
            if(isNaN(major)){
                version = + parseFloat(NAVIGATOR.appVersion);
                major = parseInt(NAVIGATOR.appVersion, 10);
            }

            return {
                name: name,
                version: version,
                major: major
            }
        }

    //#endregion

    }

})(window, document);

if(!Device.isSafeConnection)
    console.error('this is not a secure connection (https or file)');
