function dv_rolloutManager(handlersDefsArray, baseHandler) {
    this.handle = function () {
        var errorsArr = [];

        var handler = chooseEvaluationHandler(handlersDefsArray);
        if (handler) {
            var errorObj = handleSpecificHandler(handler);
            if (errorObj === null)
                return errorsArr;
            else {
                handler.onFailure();
                errorsArr.push(errorObj);
            }
        }

        var errorObjHandler = handleSpecificHandler(baseHandler);
        if (errorObjHandler) {
            errorObjHandler['dvp_isLostImp'] = 1;
            errorsArr.push(errorObjHandler);
        }
        return errorsArr;
    }

    function handleSpecificHandler(handler) {
        var url;
        var errorObj = null;

        try {
            url = handler.createRequest();
            if (url) {
                if (!handler.sendRequest(url))
                    errorObj = createAndGetError('sendRequest failed.', url, handler.getVersion(), handler.getVersionParamName(), handler.dv_script);
            }
            else
                errorObj = createAndGetError('createRequest failed.', url, handler.getVersion(), handler.getVersionParamName(), handler.dv_script);
        }
        catch (e) {
            errorObj = createAndGetError(e.name + ': ' + e.message, url, handler.getVersion(), handler.getVersionParamName(), (handler ? handler.dv_script : null));
        }

        return errorObj;
    }

    function createAndGetError(error, url, ver, versionParamName, dv_script) {
        var errorObj = {};
        errorObj[versionParamName] = ver;
        errorObj['dvp_jsErrMsg'] = encodeURIComponent(error);
        if (dv_script && dv_script.parentElement && dv_script.parentElement.tagName && dv_script.parentElement.tagName == 'HEAD')
            errorObj['dvp_isOnHead'] = '1';
        if (url)
            errorObj['dvp_jsErrUrl'] = url;
        return errorObj;
    }

    function chooseEvaluationHandler(handlersArray) {
        var config = window._dv_win.dv_config;
        var index = 0;
        var isEvaluationVersionChosen = false;
        if (config.handlerVersionSpecific) {
            for (var i = 0; i < handlersArray.length; i++) {
                if (handlersArray[i].handler.getVersion() == config.handlerVersionSpecific) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }
        else if (config.handlerVersionByTimeIntervalMinutes) {
            var date = config.handlerVersionByTimeInputDate || new Date();
            var hour = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            index = Math.floor(((hour * 60) + minutes) / config.handlerVersionByTimeIntervalMinutes) % (handlersArray.length + 1);
            if (index != handlersArray.length) //This allows a scenario where no evaluation version is chosen
                isEvaluationVersionChosen = true;
        }
        else {
            var rand = config.handlerVersionRandom || (Math.random() * 100);
            for (var i = 0; i < handlersArray.length; i++) {
                if (rand >= handlersArray[i].minRate && rand < handlersArray[i].maxRate) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }

        if (isEvaluationVersionChosen == true && handlersArray[index].handler.isApplicable())
            return handlersArray[index].handler;
        else
            return null;
    }    
}

function dv_GetParam(url, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null)
        return null;
    else
        return results[1];
}

function dv_SendErrorImp(serverUrl, errorsArr) {

    for (var j = 0; j < errorsArr.length; j++) {
        var errorQueryString = '';
        var errorObj = errorsArr[j];
        for (key in errorObj) {
            if (errorObj.hasOwnProperty(key)) {
                if (key.indexOf('dvp_jsErrUrl') == -1) {
                    errorQueryString += '&' + key + '=' + errorObj[key];
                }
                else {
                    var params = ['ctx', 'cmp', 'plc', 'sid'];
                    for (var i = 0; i < params.length; i++) {
                        var pvalue = dv_GetParam(errorObj[key], params[i]);
                        if (pvalue) {
                            errorQueryString += '&dvp_js' + params[i] + '=' + pvalue;
                        }
                    }
                }
            }
        }

        var windowProtocol = 'http:';
        var sslFlag = '&ssl=0';
        if (window.location.protocol === 'https:') {
            windowProtocol = 'https:';
            sslFlag = '&ssl=1';
        }
        var errorImp = windowProtocol + '//' + serverUrl + sslFlag + errorQueryString;
        dv_sendRequest(errorImp);
    }
}

function dv_sendRequest(url) {
    document.write('<scr' + 'ipt language="javascript" src="' + url + '"></scr' + 'ipt>');
}

function dv_GetRnd() {
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 16);
}

function doesBrowserSupportHTML5Push() {
    "use strict";
    return typeof window.parent.postMessage === 'function' && window.JSON;
}
    

function dvBsrType() {
    'use strict';
    var that = this;


    this.pubSub = new function () {

        var subscribers = [];

        this.subscribe = function(eventName, uid, actionName, func) {
            if (!subscribers[eventName + uid])
                subscribers[eventName + uid] = [];
            subscribers[eventName + uid].push({ Func: func, ActionName: actionName });
        };

        this.publish = function (eventName, uid) {
            var actionsResults = [];
            if (eventName && uid && subscribers[eventName + uid] instanceof Array)
                for (var i = 0; i < subscribers[eventName + uid].length; i++) {
                    var funcObject = subscribers[eventName + uid][i];
                    if (funcObject && funcObject.Func && typeof funcObject.Func == "function" && funcObject.ActionName) {
                        var isSucceeded = runSafely(function () {
                            return funcObject.Func(uid);
                        });
                        actionsResults.push(encodeURIComponent(funcObject.ActionName) + '=' + (isSucceeded ? '1' : '0'));
                    }
                }
            return actionsResults.join('&');
        };
    };

    this.domUtilities = new function () {

        this.addImage = function (url, parentElement) {
            var image = parentElement.ownerDocument.createElement("img");
            image.width = 0;
            image.height = 0;
            image.style.display = 'none';
            image.src = appendCacheBuster(url);
            parentElement.insertBefore(image, parentElement.firstChild);
        };

        this.addScriptResource = function (url, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.src = appendCacheBuster(url);
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addScriptCode = function (srcCode, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.innerHTML = srcCode;
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addHtml = function(srcHtml, parentElement) {
            var divElem = parentElement.ownerDocument.createElement("div");
            divElem.style = "display: inline";
            divElem.innerHTML = srcHtml;
            parentElement.insertBefore(divElem, parentElement.firstChild);
        };
    };

    this.resolveMacros = function (str, tag) {
        var viewabilityData = tag.getViewabilityData();
        var viewabilityBuckets = viewabilityData && viewabilityData.buckets ? viewabilityData.buckets : {};
        var upperCaseObj = objectsToUpperCase(tag, viewabilityData, viewabilityBuckets);
        var newStr = str.replace('[DV_PROTOCOL]', upperCaseObj.DV_PROTOCOL);
        newStr = newStr.replace('[PROTOCOL]', upperCaseObj.PROTOCOL);
        newStr = newStr.replace(/\[(.*?)\]/g, function (match, p1) {
            var value = upperCaseObj[p1];
            if (value === undefined || value === null)
                value = '[' + p1 + ']';
            return encodeURIComponent(value);
        });
        return newStr;
    };

    this.settings = new function () {
    };

    this.tagsType = function () { };

    this.tagsPrototype = function () {
        this.add = function(tagKey, obj) {
            if (!that.tags[tagKey])
                that.tags[tagKey] = new that.tag();
            for (var key in obj)
                that.tags[tagKey][key] = obj[key];
        };
    };

    this.tagsType.prototype = new this.tagsPrototype();
    this.tagsType.prototype.constructor = this.tags;
    this.tags = new this.tagsType();

    this.tag = function () { }
    this.tagPrototype = function () {
        this.set = function (obj) {
            for (var key in obj)
                this[key] = obj[key];
        };
        
        this.getViewabilityData = function () {
        };
    };

    this.tag.prototype = new this.tagPrototype();
    this.tag.prototype.constructor = this.tag;


    this.getTagObjectByService = function (serviceName) {
    
        for (var impressionId in this.tags) {
            if (typeof this.tags[impressionId] === 'object'
                && this.tags[impressionId].services
                && this.tags[impressionId].services[serviceName]
                && !this.tags[impressionId].services[serviceName].isProcessed) {
                this.tags[impressionId].services[serviceName].isProcessed = true;
                return this.tags[impressionId];
            }
        }
        

        return null;
    };

    this.addService = function (impressionId, serviceName, paramsObject) {

        if (!impressionId || !serviceName)
            return;

        if (!this.tags[impressionId])
            return;
        else {
            if (!this.tags[impressionId].services)
                this.tags[impressionId].services = { };

            this.tags[impressionId].services[serviceName] = {
                params: paramsObject,
                isProcessed: false
            };
        }
    };

    this.Enums = {
        BrowserId: { Others: 0, IE: 1, Firefox: 2, Chrome: 3, Opera: 4, Safari: 5 },
        TrafficScenario: { OnPage: 1, SameDomain: 2, CrossDomain: 128 }
    };

    this.CommonData = {};

    var runSafely = function (action) {
        try {
            var ret = action();
            return ret !== undefined ? ret : true;
        } catch (e) { return false; }
    };

    var objectsToUpperCase = function () {
        var upperCaseObj = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    upperCaseObj[key.toUpperCase()] = obj[key];
                }
            }
        }
        return upperCaseObj;
    };

    var appendCacheBuster = function (url) {
        if (url !== undefined && url !== null && url.match("^http") == "http") {
            if (url.indexOf('?') !== -1) {
                if (url.slice(-1) == '&')
                    url += 'cbust=' + dv_GetRnd();
                else
                    url += '&cbust=' + dv_GetRnd();
            }
            else
                url += '?cbust=' + dv_GetRnd();
        }
        return url;
    };

 
}

function dv_baseHandler(){function m(e,c,d,a,h,b,l){var g,j,p;p=window._dv_win.dv_config&&window._dv_win.dv_config.bst2tid?window._dv_win.dv_config.bst2tid:dv_GetRnd();var q,m=window.parent.postMessage&&window.JSON,f=!0,k=!1;if("0"==dv_GetParam(e.dvparams,"t2te")||window._dv_win.dv_config&&!0==window._dv_win.dv_config.supressT2T)k=!0;if(m&&!1==k)try{k="https://cdn3.doubleverify.com/bst2tv3.html";window._dv_win&&(window._dv_win.dv_config&&window._dv_win.dv_config.bst2turl)&&(k=window._dv_win.dv_config.bst2turl);
var n="bst2t_"+p,i;if(document.createElement&&(i=document.createElement("iframe")))i.name=i.id="iframe_"+dv_GetRnd(),i.width=0,i.height=0,i.id=n,i.style.display="none",i.src=k;q=i;if(window._dv_win.document.body)window._dv_win.document.body.insertBefore(q,window._dv_win.document.body.firstChild),f=!0;else{var u=0,v=function(){if(window._dv_win.document.body)try{window._dv_win.document.body.insertBefore(q,window._dv_win.document.body.firstChild)}catch(a){}else u++,150>u&&setTimeout(v,20)};setTimeout(v,
20);f=!1}}catch(E){}k=e.rand;i="__verify_callback_"+k;k="__tagObject_callback_"+k;window[i]=function(a){try{if(void 0==a.ResultID)document.write(1!=a?e.tagsrc:e.altsrc);else switch(a.ResultID){case 1:a.Passback?document.write(decodeURIComponent(a.Passback)):document.write(e.altsrc);break;case 2:case 3:document.write(e.tagsrc)}}catch(b){}};var w="http:",x="http:",y="0";"https"==window._dv_win.location.toString().match("^https")&&(w="https:","https"==l.src.match("^https")&&(x="https:",y="1"));window[k]=
function(a){try{var b={};b.protocol=w;b.ssl=y;b.dv_protocol=x;b.serverPublicDns=a.ServerPublicDns;b.tagElement=l;b.impressionId=a.ImpressionID;window._dv_win.$dvbsr.tags.add(a.ImpressionID,b)}catch(c){}};void 0==e.dvregion&&(e.dvregion=0);var n="http:",z="0";"https"==window.location.toString().match("^https")&&(n="https:",z="1");try{for(var r=d,s=0;10>s&&r!=window.top;)s++,r=r.parent;d.depth=s;var A=C(d);j="&aUrl="+encodeURIComponent(A.url);g="&aUrlD="+A.depth;var B=d.depth+a;h&&d.depth--}catch(F){g=
j=B=d.depth=""}d=(window._dv_win&&window._dv_win.dv_config&&window._dv_win.dv_config.verifyJSCURL?dvConfig.verifyJSCURL+"?":n+"//rtb"+e.dvregion+".doubleverify.com/verifyc.js?")+e.dvparams+"&num=5&srcurlD="+d.depth+"&callback="+i+"&jsTagObjCallback="+k+"&ssl="+z+"&refD="+B+"&htmlmsging="+(m?"1":"0")+"&guid="+p;c="dv_url="+encodeURIComponent(c);if(!1==f||b)d=d+("&dvp_isBodyExistOnLoad="+(f?"1":"0"))+("&dvp_isOnHead="+(b?"1":"0"));if((b=window[t("=@42E:@?")][t("2?46DE@C~C:8:?D")])&&0<b.length){f=[];
f[0]=window.location.protocol+"//"+window.location.hostname;for(a=0;a<b.length;a++)f[a+1]=b[a];b=f.reverse().join(",")}else b=null;b&&(c+="&ancChain="+encodeURIComponent(b));if(!1==/MSIE (\d+\.\d+);/.test(navigator.userAgent)||7<new Number(RegExp.$1)||2E3>=j.length+g.length+d.length)d+=g,c+=j;if(void 0!=window._dv_win.$dvbsr.CommonData.BrowserId&&void 0!=window._dv_win.$dvbsr.CommonData.BrowserVersion&&void 0!=window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent)b=window._dv_win.$dvbsr.CommonData.BrowserId,
g=window._dv_win.$dvbsr.CommonData.BrowserVersion,j=window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent;else{b=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7",verRegex:"(MSIE |rv:)"},{id:2,brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",
verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}];j=0;g="";a=navigator.userAgent;for(f=0;f<b.length;f++)if(null!=a.match(RegExp(b[f].brRegex))){j=b[f].id;if(null==b[f].verRegex)break;a=a.match(RegExp(b[f].verRegex+"[0-9]*"));null!=a&&(g=a[0].match(RegExp(b[f].verRegex)),g=a[0].replace(g[0],""));break}b=f=D();g=f===j?g:"";window._dv_win.$dvbsr.CommonData.BrowserId=b;window._dv_win.$dvbsr.CommonData.BrowserVersion=g;
window._dv_win.$dvbsr.CommonData.BrowserIdFromUserAgent=j}d+="&brid="+b+"&brver="+g+"&bridua="+j;return d+"&eparams="+encodeURIComponent(t(c))}function C(e){try{if(1>=e.depth)return{url:"",depth:""};var c,d=[];d.push({win:window.top,depth:0});for(var a,h=1,b=0;0<h&&100>b;){try{if(b++,a=d.shift(),h--,0<a.win.location.toString().length&&a.win!=e)return 0==a.win.document.referrer.length||0==a.depth?{url:a.win.location,depth:a.depth}:{url:a.win.document.referrer,depth:a.depth-1}}catch(l){}c=a.win.frames.length;
for(var g=0;g<c;g++)d.push({win:a.win.frames[g],depth:a.depth+1}),h++}return{url:"",depth:""}}catch(j){return{url:"",depth:""}}}function t(e){new String;var c=new String,d,a,h;for(d=0;d<e.length;d++)h=e.charAt(d),a="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(h),0<=a&&(h="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((a+47)%94)),c+=h;return c}function D(){try{if("function"===typeof window.callPhantom)return 99;
try{if("function"===typeof window.top.callPhantom)return 99}catch(e){}if(void 0!=window.opera&&void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(!0==document.webkitHidden||!1==document.webkitHidden))return 3;if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&
void 0!=window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&void 0!=window.InstallTrigger.install)return 2;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&0<=document.documentMode||void 0!=document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject))return 1;var c=!1;try{var d=document.createElement("p");d.innerText=".";d.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";
c=void 0!=d.style.textShadow}catch(a){}return 0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&c&&void 0!=window.innerWidth&&void 0!=window.innerHeight?5:0}catch(h){return 0}}this.createRequest=function(){var e=!1,c=window,d=0,a=!1;try{for(dv_i=0;10>=dv_i;dv_i++)if(null!=c.parent&&c.parent!=c)if(0<c.parent.location.toString().length)c=c.parent,d++,e=!0;else{e=!1;break}else{0==dv_i&&(e=!0);break}}catch(h){e=!1}0==c.document.referrer.length?e=c.location:e?e=c.location:(e=
c.document.referrer,a=!0);var b=document.getElementsByTagName("script");for(dv_i in b)if(b[dv_i].src){var l=b[dv_i].src;if(l=l&&l.match(/bsredirect5(_plain)?\.js\?callback=/)?l.replace(/^.+?callback=(.+?)(&|$)/,"$1"):null)if((this.redirect=eval(l+"()"))&&!this.redirect.done)return this.redirect.done=!0,c=m(this.redirect,e,c,d,a,b[dv_i]&&b[dv_i].parentElement&&b[dv_i].parentElement.tagName&&"HEAD"===b[dv_i].parentElement.tagName,b[dv_i]),c+="&"+this.getVersionParamName()+"="+this.getVersion()}};this.isApplicable=
function(){return!0};this.onFailure=function(){};this.sendRequest=function(e){dv_sendRequest(e);return!0};if(window.debugScript&&(!window.minDebugVersion||10>=window.minDebugVersion))window.DvVerify=m,window.createRequest=this.createRequest;this.getVersionParamName=function(){return"ver"};this.getVersion=function(){return"18"}};


function dv_bs5_main(dv_baseHandlerIns, dv_handlersDefs) {

    this.baseHandlerIns = dv_baseHandlerIns;
    this.handlersDefs = dv_handlersDefs;

    this.exec = function () {
        try {
            window._dv_win = (window._dv_win || window);
            window._dv_win.$dvbsr = (window._dv_win.$dvbsr || new dvBsrType());

            window._dv_win.dv_config = window._dv_win.dv_config || {};
            window._dv_win.dv_config.bsErrAddress = window._dv_win.dv_config.bsAddress || 'rtb0.doubleverify.com';
            
            var errorsArr = (new dv_rolloutManager(this.handlersDefs, this.baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0)
                dv_SendErrorImp(window._dv_win.dv_config.bsErrAddress + '/verifyc.js?ctx=818052&cmp=1619415&num=5', errorsArr);
        }
        catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.bsErrAddress + '/verifyc.js?ctx=818052&cmp=1619415&num=5&dvp_isLostImp=1', { dvp_jsErrMsg: encodeURIComponent(e) });
            } catch (e) { }
        }
    }
}

try {
    window._dv_win = window._dv_win || window;
    var dv_baseHandlerIns = new dv_baseHandler();
	

    var dv_handlersDefs = [];

    if(!window.debugScript) {
        (new dv_bs5_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
    }
} catch (e) { }