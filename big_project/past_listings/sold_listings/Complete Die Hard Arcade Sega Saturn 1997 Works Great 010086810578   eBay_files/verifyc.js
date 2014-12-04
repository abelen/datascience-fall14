setTimeout(function(){
    'use strict';
    try{
        var stringifyFunc = null;
		if(window.JSON){
			stringifyFunc = window.JSON.stringify;
		} else {
			if(window.parent && window.parent.JSON){
				stringifyFunc = window.parent.JSON.stringify;
			}
		}
		if(!stringifyFunc){
			return;
		}
        var msg = {
            action: 'notifyBrandShieldAdEntityInformation',
            bsAdEntityInformation: {
                brandShieldId:'5454adda31e44d03aae4c365e055762a',
                comparisonItems:[{name : 'cmp', value : 2386095},{name : 'plmt', value : 2386152}]
            }
        };
        var msgString = stringifyFunc(msg);
        var bst2tWin = null;

        var findAndSendMessage = function() {
            if (!bst2tWin) {
                var frame = document.getElementById('bst2t_1415526474835240');
                if (frame) {
                    bst2tWin = frame.contentWindow;
                }
            }

            if (bst2tWin) {
                bst2tWin.postMessage(msgString, '*');
            }
        };

        findAndSendMessage();
        setTimeout(findAndSendMessage, 50);
        setTimeout(findAndSendMessage, 500);
    } catch(err){}
}, 10);var impId = '5454adda31e44d03aae4c365e055762a';var dvObj = $dvbsr;var isTpImp = dvObj == window.$dv;var rtnName = isTpImp ? 'ImpressionServed' : 'BeforeDecisionRender';var eventStr = isTpImp ? 'event' : 'bsevent'; var contextWin = isTpImp ? parent : window;dvObj.pubSub.subscribe(rtnName, impId, 'AADID_RTN', function () {try {function dvsg(){function w(c){function d(c){for(var b='',d,e=7;0<=e;e--)d=c>>>4*e&15,b+=d.toString(16);return b}if(null==c||''==c)return'';for(var g=[1518500249,1859775393,2400959708,3395469782],c=c+String.fromCharCode(128),l=Math.ceil((c.length/4+2)/16),m=Array(l),e=0;e<l;e++){m[e]=Array(16);for(var f=0;16>f;f++)m[e][f]=c.charCodeAt(64*e+4*f)<<24|c.charCodeAt(64*e+4*f+1)<<16|c.charCodeAt(64*e+4*f+2)<<8|c.charCodeAt(64*e+4*f+3)}m[l-1][14]=8*(c.length-1)/Math.pow(2,32);m[l-1][14]=Math.floor(m[l-1][14]);m[l-1][15]=8*(c.length-1)&4294967295;for(var c=1732584193,f=4023233417,p=2562383102,q=271733878,r=3285377520,h=Array(80),n,i,j,k,s,e=0;e<l;e++){for(var b=0;16>b;b++)h[b]=m[e][b];for(b=16;80>b;b++)h[b]=(h[b-3]^h[b-8]^h[b-14]^h[b-16])<<1|(h[b-3]^h[b-8]^h[b-14]^h[b-16])>>>31;n=c;i=f;j=p;k=q;s=r;for(b=0;80>b;b++){var t=Math.floor(b/20),o;a:{switch(t){case 0:o=i&j^~i&k;break a;case 1:o=i^j^k;break a;case 2:o=i&j^i&k^j&k;break a;case 3:o=i^j^k;break a}o=void 0}t=(n<<5|n>>>27)+o+s+g[t]+h[b]&4294967295;s=k;k=j;j=i<<30|i>>>2;i=n;n=t}c=c+n&4294967295;f=f+i&4294967295;p=p+j&4294967295;q=q+k&4294967295;r=r+s&4294967295}return d(c)+d(f)+d(p)+d(q)+d(r)}function x(){var c=contextWin.document.createElement('canvas');if(c.getContext&&c.getContext('2d')){var d=c.getContext('2d');d.textBaseline='top';d.font='14px \'Arial\'';d.textBaseline='alphabetic';d.fillStyle='#f60';d.fillRect(0,0,62,20);d.fillStyle='#069';d.fillText('!image!',2,15);d.fillStyle='rgba(102, 204, 0, 0.7)';d.fillText('!image!',4,17);return c.toDataURL()}return null}try{var g=[];g.push(['tz',(new Date).getTimezoneOffset()]);var u;try{u=!!window.sessionStorage}catch(y){u=!0}g.push(['hss',u?'1':'0']);var v;try{v=!!window.localStorage}catch(z){v=!0}g.push(['hls',v?'1':'0']);g.push(['odb',typeof window.openDatabase||'']);g.push(['cpu',navigator.cpuClass||'']);g.push(['pf',navigator.platform||'']);g.push(['dnt',navigator.doNotTrack||'']);g.push(['canv',x()]);return w(g.join('=!!!='))}catch(A){return''}};var url = dvObj.tags[impId].protocol + '/' + '/' + (dvObj.tags[impId].ServerPublicDns || dvObj.tags[impId].serverPublicDns) + '/' + eventStr + '.gif?impid=' + impId + '&aadid=' + dvsg();dvObj.domUtilities.addImage(url, dvObj.tags[impId].tagElement.parentNode);} catch (e) {};});


try{__tagObject_callback_800810104701({ImpressionID:"5454adda31e44d03aae4c365e055762a", ServerPublicDns:"tps602.doubleverify.com"});}catch(e){}
try{$dvbsr.pubSub.publish('BeforeDecisionRender', "5454adda31e44d03aae4c365e055762a");}catch(e){}
try{__verify_callback_800810104701({
ResultID:2,
Passback:"",
AdWidth:728,
AdHeight:90});}catch(e){}
try{$dvbsr.pubSub.publish('AfterDecisionRender', "5454adda31e44d03aae4c365e055762a");}catch(e){}
