// ************************** WebyClip Insert **************************

/*!
 * Joseph Myer's md5() algorithm wrapped in a self-invoked function to prevent
 * global namespace polution, modified to hash unicode characters as UTF-8.
 *
 * Copyright 1999-2010, Joseph Myers, Paul Johnston, Greg Holt, Will Bond <will@wbond.net>
 * http://www.myersdaily.org/joseph/javascript/md5-text.html
 * http://pajhome.org.uk/crypt/md5
 *
 * Released under the BSD license
 * http://www.opensource.org/licenses/bsd-license
 */
(function() {
    function md5cycle(x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];

        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);

        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);

        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);

        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);
    }

    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }

    function ff(a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function gg(a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function hh(a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function ii(a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    function md51(s) {
        // Converts the string to UTF-8 "bytes" when necessary
        if (/[\x80-\xFF]/.test(s)) {
            s = unescape(encodeURI(s));
        }
        txt = '';
        var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
        for (i = 64; i <= s.length; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < s.length; i++)
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i++)
                tail[i] = 0;
        }
        tail[14] = n * 8;
        md5cycle(state, tail);
        return state;
    }

    function md5blk(s) { /* I figured global was faster.   */
        var md5blks = [], i; /* Andy King said do it this way. */
        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) +
                    (s.charCodeAt(i + 1) << 8) +
                    (s.charCodeAt(i + 2) << 16) +
                    (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    var hex_chr = '0123456789abcdef'.split('');

    function rhex(n) {
        var s = '', j = 0;
        for (; j < 4; j++)
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
                    hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
    }

    function hex(x) {
        for (var i = 0; i < x.length; i++)
            x[i] = rhex(x[i]);
        return x.join('');
    }

    md5 = function(s) {
        return hex(md51(s));
    }

    /* this function is much faster, so if possible we use it. Some IEs are the
     only ones I know of that need the idiotic second function, generated by an
     if clause.  */
    function add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
    }

    if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
        function add32(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
    }
})();

(function() {

    // firebug
    if (document.location.href.indexOf('webyclip_debug') != -1 || document.location.hash.indexOf('webyclip_debug') != -1) {
        (function(F, i, r, e, b, u, g, L, I, T, E) {
            if (F.getElementById(b))
                return;
            E = F[i + 'NS'] && F.documentElement.namespaceURI;
            E = E ? F[i + 'NS'](E, 'script') : F[i]('script');
            E[r]('id', b);
            E[r]('src', I + g + T);
            E[r](b, u);
            (F[e]('head')[0] || F[e]('body')[0]).appendChild(E);
            E = new Image;
            E[r]('src', I + L);
        })(document, 'createElement', 'setAttribute', 'getElementsByTagName', 'FirebugLite', '4', 'firebug-lite.js', 'releases/lite/latest/skin/xp/sprite.png', 'https://getfirebug.com/', '#startOpened');
    }

    function wbDebug(msg) {
        setTimeout(function() {
            try {
                window.console && console.log(msg);
            } catch (err) {
            }
        }, 0);
    }

    String.prototype.startsWith = function(str) {
        return (this.match("^" + str) == str);
    };

    var JSON = JSON || {};
    // implement JSON.stringify serialization
    JSON.stringify = JSON.stringify || function(obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string")
                obj = '"' + obj + '"';
            return String(obj);
        }
        else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n];
                t = typeof (v);
                if (t == "string")
                    v = '"' + v + '"';
                else if (t == "object" && v !== null)
                    v = JSON.stringify(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };

    // Localize jQuery variable
    var webyclipProtocol = 'http';

    // current version
    var webyclipPluginVersion = 12090;

    if (window.location.origin === null || typeof (window.location.origin) === 'undefined') {
        window.webyclipOrigin = window.location.protocol + "//" + window.location.hostname;
    }
    else {
        window.webyclipOrigin = window.location.origin;
    }


    if (window.location.protocol.toLowerCase() == 'https:') {
        webyclipProtocol = 'https';
    }

    var currentCustomer = '00000000-0000-0000-0000-000000000000';

    if (typeof webyclipCustomer != 'undefined') {
        currentCustomer = webyclipCustomer;
    }

    var currentSiteKey = null;

    if (typeof webyclipSiteKey != 'undefined') {
        currentSiteKey = webyclipSiteKey;
    }

    var currentSite = null;

    if (typeof webyclipSite != 'undefined') {
        currentSite = webyclipSite;
    }

    var currentProfile = null;

    if (typeof webyclipProfile != 'undefined') {
        currentProfile = webyclipProfile;
    }
    if (typeof webyclipAnalyticsData == 'undefined') {
        webyclipAnalyticsData = "";
    }
    if (typeof webyclipSkipScriptRettrival == 'undefined') {
        webyclipSkipScriptRettrival = false;
    }
    if (typeof (webyclipProductCategory) == 'undefined') {
        webyclipProductCategory = null;
    }
    if (typeof (webyclipIsOwnerPage) == 'undefined') {
        webyclipIsOwnerPage = false;
    }
    if (typeof (webyclipIsDeleteFeature) == 'undefined') {
        webyclipIsDeleteFeature = false;
    }

    if (typeof (webyclipHasPrivateVideos) == 'undefined') {
        webyclipHasPrivateVideos = false;
    }
    if (typeof (webyclipIsABTesting) == 'undefined') {
        webyclipIsABTesting = false;
    }
    if (typeof (webyclipABGroup) == 'undefined') {
        webyclipABGroup = null;
    }
    if (typeof (webyclipProductSubCategory) == 'undefined') {
        webyclipProductSubCategory = null;
    }
    if (typeof (webyclipProductExternalId) == 'undefined') {
        webyclipProductExternalId = null;
    }
    if (typeof (webyclipSearchString) == 'undefined') {
        webyclipSearchString = null;
    }
    if (typeof (webyclipAliasName) == 'undefined') {
        webyclipAliasName = null;
    }
    if (typeof (webyclipKeyword1) == 'undefined') {
        webyclipKeyword1 = null;
    }

    if (typeof (webyclipKeyword2) == 'undefined') {
        webyclipKeyword2 = null;
    }

    if (typeof (webyclipKeyword3) == 'undefined') {
        webyclipKeyword3 = null;
    }

    if (typeof (webyclipKeyword4) == 'undefined') {
        webyclipKeyword4 = null;
    }

    if (typeof (webyclipKeyword5) == 'undefined') {
        webyclipKeyword5 = null;
    }

    if (typeof (webyclipShowAnyway) == 'undefined') {
        webyclipShowAnyway = true;
    }
    
    if (typeof(needToSimulateSponsored) == 'undefined') {
        needToSimulateSponsored = false;
    }

    if (typeof (webyclipBlockProcessing) == 'undefined') {
        webyclipBlockProcessing = false;
    }
    if (typeof (webyclipUILocale) == 'undefined') {
        webyclipUILocale = 'EN';
    }

    var webyclipUIStrings = [];
    webyclipUIStrings['EN'] = [];
    webyclipUIStrings['EN']['tell_us_more'] = 'Tell us more about why do you want to report this video:';
    webyclipUIStrings['EN']['no_reason'] = 'You must provide a reason for the report.';
    webyclipUIStrings['EN']['does_not_match_product'] = 'Video doesn\'t match product';
    webyclipUIStrings['EN']['inaccurate_or_misleading'] = 'Video is inaccurate or misleading';
    webyclipUIStrings['EN']['infringes_my_rights'] = 'Video infringes my rights:';
    webyclipUIStrings['EN']['trademark_infringement'] = 'Trademark infringement';
    webyclipUIStrings['EN']['copyright_infringement'] = 'Copyright infringement';
    webyclipUIStrings['EN']['related_to_music'] = 'Related to music';
    webyclipUIStrings['EN']['related_to_visual_content'] = 'Related to visual content';
    webyclipUIStrings['EN']['related_to_both_music_and_visual_content'] = 'Related to both music and visual content';
    webyclipUIStrings['EN']['other_ip_rights'] = 'Other IP rights';
    webyclipUIStrings['EN']['poor_quality'] = 'Video is of poor quality';
    webyclipUIStrings['EN']['offensive_or_inappropriate'] = 'Video is offensive or inappropriate';
    webyclipUIStrings['EN']['other'] = 'Other';
    webyclipUIStrings['EN']['send'] = 'Send';
    webyclipUIStrings['EN']['cancel'] = 'Cancel';
    webyclipUIStrings['EN']['please_wait'] = 'Please wait...';
    webyclipUIStrings['EN']['remove_video_title'] = 'Remove video from your listing:';
    webyclipUIStrings['EN']['remove_selected_video'] = 'Remove the selected video';
    webyclipUIStrings['EN']['remove_all_videos'] = 'Remove all videos - Disable video review for this listing';
    webyclipUIStrings['EN']['no_new_videos'] = 'New Videos will not be added to this listing in the future';
    webyclipUIStrings['EN']['remove_request_submitted'] = 'Your video removal request has been submitted. The video will disappear from your listing within 15 minutes.';
    webyclipUIStrings['EN']['login_to_remove'] = 'To remove the video from your listing please log in and click the trash can icon that will appear on the video';
    webyclipUIStrings['EN']['ok'] = 'OK';
    webyclipUIStrings['DE'] = [];
    webyclipUIStrings['DE']['tell_us_more'] = 'Teilen Sie uns bitte mit, warum Sie dieses Video melden wollen:';
    webyclipUIStrings['DE']['no_reason'] = 'Sie müssen einen Grund für den Bericht bereitstellen.';
    webyclipUIStrings['DE']['does_not_match_product'] = 'Der Inhalt des Videos passt nicht zu diesem Produkt';
    webyclipUIStrings['DE']['inaccurate_or_misleading'] = 'Der Inhalt des Videos ist ungenau oder irreführend';
    webyclipUIStrings['DE']['infringes_my_rights'] = 'Das Video bzw. sein Inhalt verletzt meine Rechte:';
    webyclipUIStrings['DE']['trademark_infringement'] = 'Markenrechte';
    webyclipUIStrings['DE']['copyright_infringement'] = 'Urheberrechte';
    webyclipUIStrings['DE']['related_to_music'] = 'wegen der Musik';
    webyclipUIStrings['DE']['related_to_visual_content'] = 'wegen dem visuellem Inhalt';
    webyclipUIStrings['DE']['related_to_both_music_and_visual_content'] = 'wegen beidem, der Musik und dem visuellem Inhalt';
    webyclipUIStrings['DE']['other_ip_rights'] = 'Verletzung anderen geistigen Eigentums';
    webyclipUIStrings['DE']['poor_quality'] = 'Das Video hat schlechte Qualität';
    webyclipUIStrings['DE']['offensive_or_inappropriate'] = 'Der Inhalt des Video ist beleidigend oder unangemessen';
    webyclipUIStrings['DE']['other'] = 'Andere Gründe';
    webyclipUIStrings['DE']['send'] = 'Senden';
    webyclipUIStrings['DE']['cancel'] = 'Abbrechen';
    webyclipUIStrings['DE']['please_wait'] = 'Bitte warten Sie ...';
    webyclipUIStrings['DE']['remove_video_title'] = 'Das Video von Ihrem Angebot entfernen:';
    webyclipUIStrings['DE']['remove_selected_video'] = 'Das ausgewählte Video entfernen.';
    webyclipUIStrings['DE']['remove_all_videos'] = 'Alle Videos entfernen. – Videorezession für dieses Angebot deaktivieren.';
    webyclipUIStrings['DE']['no_new_videos'] = 'In Zukunft werden keine weiteren Videos zu diesem Angebot hinzugefügt.';
    webyclipUIStrings['DE']['remove_request_submitted'] = 'Ihr Antrag auf Videoentfernung wurde abgeschickt. Das Video wird innerhalb der nächsten 15 Minuten von Ihrem Angebot gelöscht.';
    webyclipUIStrings['DE']['login_to_remove'] = 'Um das Video von Ihrem Angebot zu entfernen, loggen Sie sich bitte ein und klicken Sie dann auf das Papierkorb-Symbol, welches auf dem Video erscheint.';
    webyclipUIStrings['DE']['ok'] = 'OK';

    var showLink = [false, false, false, false, false, false, false, false, false, false];
    var isAbTest = [false, false, false, false, false, false, false, false, false, false];
    var hasLinkToShow = [];
    var productName = [];
    var productCategory = [];
    var productSubCategory = [];
    var productExternalId = [];
    var playedMediaDuration = [];
    var brandName = [];
    var modelName = [];
    var apiMode = null;
    var showBuyNow = false;
    var productId = [];
    var siteId = null;
    var lastMediaShown = null;
    var currentSession = null;
    var searchString = [];
    var aliasName = [];
    var keyword1 = [];
    var keyword2 = [];
    var keyword3 = [];
    var keyword4 = [];
    var keyword5 = [];
    var useEmbedded = [];
    var useDisclaimer = [];
    var embeddedWidth = [];
    var embeddedHeight = [];

    var linkText = ['Video by WebyClip', 'Video by WebyClip', 'Video by WebyClip', 'Video by WebyClip', 'Video by WebyClip', 'Video by WebyClip', 'Video by WebyClip', 'Video by WebyClip', 'Video by WebyClip', 'Video by WebyClip'];

    var webyclipRoot = 'www.webyclip.com/a';

    if (typeof (webyclipRootOverride) != 'undefined') {
        webyclipRoot = webyclipRootOverride;
    }

    if (typeof (webyclipForceVerticalThumbnails) == 'undefined') {
        webyclipForceVerticalThumbnails = false;
    }
    if (typeof (webyclipWidgetMode) == 'undefined') {
        webyclipWidgetMode = "commerce";
    }
    if (typeof (webyclipContentTitle) == 'undefined') {
        webyclipContentTitle = null;
    }
    if (typeof (webyclipProduct) == 'undefined') {
        if (webyclipWidgetMode == "commerce") {
            webyclipProduct = null;
        }
        else if (webyclipWidgetMode == "content") {
            //hack to have content tile as product name
            webyclipProduct = webyclipContentTitle;
        }
    }
    if (typeof (webyclipContentOpenDirection) == 'undefined') {
        webyclipContentOpenDirection = "U"; //could be one of N E S W
    }
    if (typeof (webyclipContentMarkerPosition) == 'undefined') {
        webyclipContentMarkerPosition = "S-E"
    }
    if (typeof (webyclipBrand) == 'undefined') {
        webyclipBrand = null;
    }
    if (typeof (webyclipModel) == 'undefined') {
        webyclipModel = null;
    }

    if (typeof (webyclipEnableShare) == 'undefined') {
        webyclipEnableShare = false;
    }
    if (typeof (webyclipCustomShareLink) == 'undefined') {
        webyclipCustomShareLink = null;
    }
    if (typeof (webyclipCustomShareTitle) == 'undefined') {
        webyclipCustomShareTitle = null;
    }
    if (typeof (webyclipCustomShareCaption) == 'undefined') {
        webyclipCustomShareCaption = null;
    }
    if (typeof (webyclipCustomShareDescription) == 'undefined') {
        webyclipCustomShareDescription = null;
    }
    if (typeof (webyclipIsDirectShareLink) == 'undefined') {
        webyclipIsDirectShareLink = false;
    }

    var webyclipBaseUrl = webyclipProtocol + '://' + webyclipRoot;
    window.webyclipBaseUrl = webyclipBaseUrl;
    var webyclipCdnCodeBaseUrl = webyclipProtocol + '://' + ((webyclipProtocol == 'http') ? 'code.webyclip.com' : '6bf746ad5bc91a240a3d-1d8fbdf7ecdc2b67730d7c561f0d1dfd.ssl.cf2.rackcdn.com');
    window.webyclipCdnCodeBaseUrl = webyclipCdnCodeBaseUrl;
    var webyclipCdnCodeBaseSslUrl = 'https://6bf746ad5bc91a240a3d-1d8fbdf7ecdc2b67730d7c561f0d1dfd.ssl.cf2.rackcdn.com';
    var currentLocale = 'en-US';
    var currentLinkHtml = [linkText, linkText, linkText, linkText, linkText, linkText, linkText, linkText, linkText, linkText];
    var carouselHtml = ['', '', '', '', '', '', '', '', '', ''];
    var currentOverlay = null;
    var currentReportOverlay = null;
    var currentRemoveOverlay = null;
    /** ****** Load jQuery if not present ******** */

    function loadScript(url, callback) {
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", url);

        var loaded = false;

        scriptTag.onload = function() {
            if (!loaded) {
                loaded = true;
                callback();
            }
        };

        // Same thing but for IE. NOTE: Modern IE versions fire this TWICE!
        scriptTag.onreadystatechange = function() {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                if (!loaded) {
                    loaded = true;
                    callback();
                }
            }
        };

        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
    }

// jQuery script
    if (window.webyclipOrigin.indexOf(".ebay.") != -1 && typeof (jQuery) !== 'undefined' && jQuery("div.iti-act-num").text().trim() != "") {
        loadScript((webyclipCdnCodeBaseUrl + "/jquery.tools.only.min.js"), function() {
            main(jQuery)
        });
    }
    else {
        loadScript((webyclipCdnCodeBaseUrl + "/jquery.tools.min.js"), scriptLoadHandler);
    }

//loadScript( webyclipCdnCodeBaseUrl + "/jquery.tools.min.js", scriptLoadHandler);

    /******* Called once jQuery has loaded ***** */
    function scriptLoadHandler() {
        $mjk = jQuery.noConflict();
        wbDebug("VERSION:" + $mjk.fn.jquery);

        // Call our main function
        main($mjk);
    }

    /******** Our main function ********/

    function main($) {

        (function($, document, undefined) {
            var pluses = /\+/g;
            function raw(s) {
                return s;
            }
            function decoded(s) {
                return decodeURIComponent(s.replace(pluses, ' '));
            }
            var config = $.cookie = function(key, value, options) {
                // write
                if (value !== undefined) {
                    options = $.extend({}, config.defaults, options);
                    if (value === null) {
                        options.expires = -1;
                    }
                    if (typeof options.expires === 'number') {
                        var days = options.expires, t = options.expires = new Date();
                        t.setDate(t.getDate() + days);
                    }
                    value = config.json ? JSON.stringify(value) : String(value);
                    return (document.cookie = [
                        encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                        options.path ? '; path=' + options.path : '',
                        options.domain ? '; domain=' + options.domain : '',
                        options.secure ? '; secure' : ''
                    ].join(''));
                }
                // read
                var decode = config.raw ? raw : decoded;
                var cookies = document.cookie.split('; ');
                for (var i = 0, l = cookies.length; i < l; i++) {
                    var parts = cookies[i].split('=');
                    if (decode(parts.shift()) === key) {
                        var cookie = decode(parts.join('='));
                        return config.json ? JSON.parse(cookie) : cookie;
                    }
                }
                return null;
            };
            config.defaults = {};
            $.removeCookie = function(key, options) {
                if ($.cookie(key) !== null) {
                    $.cookie(key, null, options);
                    return true;
                }
                return false;
            };
        })($, document);
        var flashPlayedMediaDuration = function(prodIndex) {
            for (var key in playedMediaDuration[prodIndex]) {
                if (key === 'length' || !playedMediaDuration[prodIndex].hasOwnProperty(key))
                    continue;
                var value = playedMediaDuration[prodIndex][key];
                postAnalyticsMessageNG(prodIndex, JSON.stringify({
                    "messageType": "event",
                    "eventName": "playDuration",
                    "eventData": {
                        "mediaId": key,
                        "mediaSourceId": value.mediaSourceId,
                        "mediaSourceKey": value.mediaSourceKey,
                        "sponsoredMedia": ((typeof(value.sponsoredMedia) != "undefined")? value.sponsoredMedia : false),
                        "duration": value.count
                    }
                }));
            }
            playedMediaDuration[prodIndex] = [];
        };
        var postAnalyticsMessageNG = function(prodIndex, message) {
            setTimeout(function() {
                if (window.webyclipAnalyticsNGIframe[prodIndex]) {
                    $('#webyclipAnalyticsNG' + prodIndex)[0].contentWindow.postMessage(message, webyclipCdnCodeBaseSslUrl);
                }
                else {
                    postAnalyticsMessageNG(prodIndex, message);
                }
            }, 100);
        };
        var getYTEmbededIframeHtml = function(width, height, vid, mediaId, origin, prodIndex, productId, commandBar, disclaimerIndex, additionalHeight, isPrivate, isSponsored) {
	    if (isPrivate) {
		additionalHeight += 40;
	    }
	    return '<iframe id="YTEmbedded' + prodIndex + '" src="' + webyclipCdnCodeBaseUrl + '/YTEmbedded.html?_w=' + width + '&_h=' + height + '&_vid=' + vid + '&_mid=' + mediaId + '&origin=' + origin + '&_pi=' + prodIndex + '&_pid=' + productId + '&_cb=' + commandBar + '&_di=' + disclaimerIndex + '&_ui=' + webyclipUILocale + '&_ipm=' + (typeof(isPrivate) != 'undefined' && isPrivate) + '&_ism=' + (typeof(isSponsored) != 'undefined' && isSponsored) + '&_iop=' + (typeof(webyclipIsDeleteFeature) != 'undefined' && webyclipIsDeleteFeature) + '" frameborder="0" allowfullscreen="1" width="' + width + '" height="' + (height + additionalHeight) + '" scrolling="no"></iframe>';
	    //return '<iframe id="YTEmbedded' + prodIndex + '" src="http://localhost/webyclip/YTEmbedded.html?_w=' + width + '&_h=' + height + '&_vid=' + vid + '&_mid=' + mediaId + '&origin=' + origin + '&_pi=' + prodIndex + '&_pid=' + productId + '&_cb=' + commandBar + '&_di=' + disclaimerIndex + '&_ui=' + webyclipUILocale + '&_ipm=' + (typeof(isPrivate) != 'undefined' && isPrivate) + '&_iop=' + (typeof(webyclipIsOwnerPage) != 'undefined' && webyclipIsOwnerPage) + '" frameborder="0" allowfullscreen="1" width="' + width + '" height="' + (height + additionalHeight) + '" scrolling="no"></iframe>';
        };
        window.getYTEmbededIframeHtml = getYTEmbededIframeHtml;
        var YTEmbededMessageListener = function(event) {
            //if (event.origin !== webyclipCdnCodeBaseUrl)
            //    return;
            var messageObj = $.parseJSON(event.data) || {};
            if (messageObj.name === 'EmbeddedPlayDuration' && typeof (messageObj.prodIndex) !== 'undefined') {
                postAnalyticsMessageNG(messageObj.prodIndex, JSON.stringify({
                    "messageType": "event",
                    "eventName": "playEmbeddedDuration",
                    "eventData": {
                        "mediaId": messageObj.mediaId,
                        "mediaSourceId": messageObj.mediaSourceId,
                        "mediaSourceKey": messageObj.mediaSourceKey,
                        "sponsoredMedia": ((typeof(messageObj.sponsoredMedia) != "undefined")? messageObj.sponsoredMedia : false),
                        "duration": messageObj.value
                    }
                }));
            }
            if (messageObj.name === 'EmbeddedPlayClick' && typeof (messageObj.prodIndex) !== 'undefined') {
                postAnalyticsMessageNG(messageObj.prodIndex, JSON.stringify({
                    "messageType": "event",
                    "eventName": "EmbeddedLinkClicked",
                    "eventData": {
                        "mediaId": messageObj.mediaId,
                        "mediaSourceId": messageObj.mediaSourceId,
                        "mediaSourceKey": messageObj.mediaSourceKey
                    }
                }));
            }
            if (messageObj.name === 'Social' && typeof (messageObj.prodIndex) !== 'undefined') {
                var req = $.ajax({
                    dataType: 'jsonp',
                    jsonpCallback: 'webyclip_social_' + messageObj.prodIndex + '_' + messageObj.socialAction,
                    url: webyclipBaseUrl + '/webyclip.php?_m=social' +
                            encodeIf('socialAction', messageObj.socialAction) +
                            encodeIf('sguid', webyclipSiteKey) +
                            encodeIf('sess', webyclipData[messageObj.prodIndex].data.session) +
                            encodeIf('_pid', webyclipData[messageObj.prodIndex].data._pid) +
                            encodeIf('_c', (document.charset || document.characterSet)) +
                            encodeIf('_srcu', window.location) +
                            encodeIf('_cdn', ((typeof webyclipCdnPrefixUrl != 'undefined') ? '1' : '0')) +
                            encodeIf('previousState', messageObj.previousState) +
                            encodeIf('_mid', messageObj.mediaId) +
                            encodeIf('_sid', messageObj.sourceId) +
                            encodeIf('_sk', messageObj.sourceKey),
                    timeout: 30000
                });
                req.done(function(data, textStatus, jqXHR) {
                });
                req.fail(function(jqXHR, textStatus, errorThrown) {
                });
            }
            if (messageObj.name === 'ReportAbuse' && typeof (messageObj.prodIndex) !== 'undefined') {
                ensureReportOverlay(messageObj.prodIndex,
                        function() {
                            if (window.currentGlobalReportOverlay == null || !window.currentGlobalReportOverlay.isOpened()) {
                                return;
                            }

                            var mediaId = messageObj.mediaId || null;
                            var prodIndex = (typeof (messageObj.prodIndex) !== 'undefined') ? messageObj.prodIndex : null;


                            var reason = $("#webyclipAbuseComments").val();
                            var reasonCode = $("#webyclipAbuseComments").val();

                            if (reason == 'other') {
                                reason = reason + ': ' + $('#opt6_suboptions textarea').val();
                            }
                            $("#webyclipReportAbuseValidation").hide();
                            if (reason.trim() == '' || reason.trim() == 'other:') {
                                $("#webyclipReportAbuseValidation").show();
                                return;
                            }
                            $("#webyclipSubmitAbuse").css("color", "gray").css("cursor", "default");
                            $("#webyclipCancelAbuse").css("color", "gray").css("cursor", "default");
                            $("#webyclipLoadingAbuse").show();

                            postAnalyticsMessageNG(prodIndex, JSON.stringify({
                                "messageType": "event",
                                "eventName": "reportAbuse",
                                "eventData": {
                                    "mediaId": mediaId,
                                    "mediaSourceId": messageObj.mediaSourceId,
                                    "mediaSourceKey": messageObj.mediaSourceKey,
                                    "reasonCode": reasonCode,
                                    "embedded": true
                                }
                            }));

                            $.getJSON(webyclipBaseUrl + '/webyclip.php?_m=report_abuse&callback=?' +
                                    encodeIf('sguid', webyclipSiteKey) +
                                    encodeIf('sess', webyclipData[messageObj.prodIndex].data.session) +
                                    encodeIf('_pid', webyclipData[messageObj.prodIndex].data._pid) +
                                    encodeIf('_c', (document.charset || document.characterSet)) +
                                    encodeIf('_srcu', window.location) +
                                    encodeIf('_cdn', ((typeof webyclipCdnPrefixUrl != 'undefined') ? '1' : '0')) +
                                    encodeIf('_mid', messageObj.mediaId) +
                                    encodeIf('why_abusive', reason) +
				    encodeIf('_p3', productExternalId[messageObj.prodIndex]) +
				    encodeIf('_p5', webyclipAnalyticsData),
                                    function(data) {
                                        $("#webyclipSubmitAbuse").css("color", "#3C5897").css("cursor", "auto");
                                        $("#webyclipCancelAbuse").css("color", "#3C5897").css("cursor", "auto");
                                        $("#webyclipLoadingAbuse").hide();
                                        window.currentGlobalReportOverlay.close();
                                    }
                            );
                        },
                        function() {
                            if (window.currentGlobalReportOverlay != null && window.currentGlobalReportOverlay.isOpened()) {
                                window.currentGlobalReportOverlay.close();
                            }
                        });
                // use fixed layout when not in quirks mode
                var useFixedLayout = $.support.boxModel;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    useFixedLayout = false;
                }

                $('#webyclipReportOverlay').overlay(
                        {
                            fixed: useFixedLayout,
                            onBeforeLoad: function() {
                                window.currentGlobalReportOverlay = this;
                            },
                            load: true
                        }).load();
                $(document).mouseup(function(e) {
                    if (typeof (window.currentGlobalReportOverlay) !== 'undefined' && currentGlobalReportOverlay != null && currentGlobalReportOverlay.isOpened()) {
                        var container = $("#webyclipReportOverlay");
                        if (container.has(e.target).length === 0) {
                            currentGlobalReportOverlay.close();
                        }
                    }
                });
            } else if (messageObj.name === 'MediaLikeAdded') {
                postAnalyticsMessageNG(messageObj.prodIndex, JSON.stringify({
                    "messageType": "event",
                    "eventName": "MediaLikeAdded",
                    "eventData": {
                        "mediaId": messageObj.mediaId,
                        "mediaSourceId": messageObj.mediaSourceId,
                        "mediaSourceKey": messageObj.mediaSourceKey,
                        "embedded": messageObj.embedded
                    }
                }));

            } else if (messageObj.name === 'MediaLikeRemoved') {
                postAnalyticsMessageNG(messageObj.prodIndex, JSON.stringify({
                    "messageType": "event",
                    "eventName": "MediaLikeRemoved",
                    "eventData": {
                        "mediaId": messageObj.mediaId,
                        "mediaSourceId": messageObj.mediaSourceId,
                        "mediaSourceKey": messageObj.mediaSourceKey,
                        "embedded": messageObj.embedded
                    }
                }));

            } else if (messageObj.name === 'MediaDislikeAdded') {
                postAnalyticsMessageNG(messageObj.prodIndex, JSON.stringify({
                    "messageType": "event",
                    "eventName": "MediaDislikeAdded",
                    "eventData": {
                        "mediaId": messageObj.mediaId,
                        "mediaSourceId": messageObj.mediaSourceId,
                        "mediaSourceKey": messageObj.mediaSourceKey,
                        "embedded": messageObj.embedded
                    }
                }));

            } else if (messageObj.name === 'MediaDislikeRemoved') {
                postAnalyticsMessageNG(messageObj.prodIndex, JSON.stringify({
                    "messageType": "event",
                    "eventName": "MediaDislikeRemoved",
                    "eventData": {
                        "mediaId": messageObj.mediaId,
                        "mediaSourceId": messageObj.mediaSourceId,
                        "mediaSourceKey": messageObj.mediaSourceKey,
                        "embedded": messageObj.embedded
                    }
                }));

            } else if (messageObj.name === 'RemoveMedia') {
                var callCdn = (typeof webyclipCdnPrefixUrl != 'undefined' && !window.webyclipLogin);
                var p3 = productExternalId[messageObj.prodIndex];
                var p5 = webyclipAnalyticsData.toLowerCase();
                showRemoveMediaOverlay(messageObj.prodIndex, messageObj.mediaId, p3, p5, callCdn);
            }
        };
        window.YTEmbededMessageListener = YTEmbededMessageListener;
        var registerToYTEmbededMessages = function() {
            if (window.addEventListener) {
                removeEventListener("message", YTEmbededMessageListener, false);
                addEventListener("message", YTEmbededMessageListener, false);
            } else {
                detachEvent("onmessage", YTEmbededMessageListener);
                attachEvent("onmessage", YTEmbededMessageListener);
            }
        };
        window.registerToYTEmbededMessages = registerToYTEmbededMessages;

        var findWebyClipScriptTag = function() {
            return $("script[src*='" + webyclipRoot + "/WebyClipPlugin.js']");
        };

        var resolveVariable = function(preset, wbId, shcmeOrgId, def) {
            if (typeof (preset) != 'undefined' && preset != null) {
                return preset.replace(/^\s+|\s+$/g, '').replace(/\s+/g, " ");
            } else {

                var variable = $.trim($(wbId).text()).toLowerCase();

                if ((typeof (variable) == 'undefined' || variable == null || variable == '')) {
                    variable = $(wbId).attr('value');
                }

                if ((typeof (variable) == 'undefined' || variable == null || variable == '')) {
                    if (currentSiteKey !== "512f7ba25c0f3") {
                        variable = $.trim($(shcmeOrgId).text()).toLowerCase();
                    }
                }

                if ((typeof (variable) == 'undefined' || variable == null || variable == '')) {
                    variable = def;
                }
                if (typeof (variable) != 'undefined' && variable != null) {
                    variable = variable.replace(/^\s+|\s+$/g, '').replace(/\s+/g, " ");
                }
                return variable;
            }
        };

        var encodeIf = function(name, val) {
            if (typeof val != 'undefined' && val != null) {
                return '&' + name + '=' + encodeURIComponent(val).replace("'", "%27");
            }
            return '';
        };
        window.encodeIf = encodeIf;

        var nvl = function(val, def) {
            if (typeof val != 'undefined' && val != null) {
                return encodeURI(val);
            }
            return encodeURI(def);
        };

        var getPsvs = function(prodIndex) {
            var psvs = [];

            if (productCategory[prodIndex] != null) {
                psvs.push('"1" : "' + productCategory[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n') + '"');
            }

            if (productSubCategory[prodIndex] != null) {
                psvs.push('"2": "' + productSubCategory[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n') + '"');
            }
            if (productExternalId[prodIndex] != null) {
                psvs.push('"3": "' + productExternalId[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n') + '"');
            }

            if (psvs.length > 0) {
                return '{' + psvs.join(',') + '}';
            }

            return null;
        };

        var getSettingsInput = function(prodIndex) {
            var settingsInput = new Object();
            if (productCategory[prodIndex] != null) {
                settingsInput.c = productCategory[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n').replace(/([&])/g, '');
            }
            if (productSubCategory[prodIndex] != null) {
                settingsInput.sc = productSubCategory[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n').replace(/([&])/g, '');
            }
            if (searchString[prodIndex] != null) {
                settingsInput.ss = searchString[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n').replace(/([&])/g, '');
            }
            if (aliasName[prodIndex] != null) {
                settingsInput.an = aliasName[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n').replace(/([&])/g, '');
            }
            if (keyword1[prodIndex] != null || keyword2[prodIndex] != null || keyword3[prodIndex] != null || keyword4[prodIndex] != null || keyword5[prodIndex] != null) {
                settingsInput.k = new Array(5);
                settingsInput.k.push(
                        (keyword1[prodIndex] == null) ? null : keyword1[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n').replace(/([&])/g, ''),
                        (keyword2[prodIndex] == null) ? null : keyword2[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n').replace(/([&])/g, ''),
                        (keyword3[prodIndex] == null) ? null : keyword3[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n').replace(/([&])/g, ''),
                        (keyword4[prodIndex] == null) ? null : keyword4[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n').replace(/([&])/g, ''),
                        (keyword5[prodIndex] == null) ? null : keyword5[prodIndex].replace(/(['"])/g, '\\$1').replace(/([\n])/g, '\\n').replace(/([&])/g, '')
                        );
            }
            var res = JSON.stringify(settingsInput);
            return (res == "null") ? null : res;
        };
        var getRequestData = function(prodIndex) {
            return encodeIf('_ver', webyclipPluginVersion) + encodeIf('cguid', currentCustomer) + encodeIf('sguid', currentSiteKey) + encodeIf('_si', currentSite) + encodeIf('_pn', currentProfile) + encodeIf('_pid', productId[prodIndex]) + encodeIf('_p', productName[prodIndex])
                    + encodeIf('_br', brandName[prodIndex]) + encodeIf('_md', modelName[prodIndex]) + encodeIf('_c', document.charset || document.characterSet) + encodeIf('_pt', webyclipProtocol)
                    + encodeIf('_l', currentLocale) + encodeIf('videoId', lastMediaShown) + encodeIf('sess', currentSession) + encodeIf('abtst', isAbTest[prodIndex]) + encodeIf('_srcu', window.location)
                    + encodeIf('_psvs', getPsvs(prodIndex)) + encodeIf('_am', apiMode) + encodeIf('_sti', getSettingsInput(prodIndex)) + encodeIf('_cdn', ((typeof webyclipCdnPrefixUrl != 'undefined') ? '1' : '0'));
        };

        var postStat = function(operation, callback, el, action, prodIndex) {
            var closure = function() {
                if (callback != null) {
                    if (typeof (callback) === 'string') {
                        eval(callback);
                    } else {
                        callback();
                    }
                }
                if (el != null && action !== 'click') {
                    $(el).trigger(action);
                }
            };
            var v_dataType = 'jsonp';
            var v_async = true;
            var callTimeout = 60000;

            if (operation == 500) {
                v_dataType = 'json';
                v_async = false;
                callTimeout = 500;
            }
            var times = 1;
            var doCall = false;
            if ((!window.webyclipLogin) && (window.isCdnUsed[prodIndex]) &&
                    (typeof webyclipCdnPrefixUrl != 'undefined')) {
                var rnd = Math.floor(Math.random() * 100) + 1;

                switch (operation) {
                    case 100: //page hit
                        if (rnd == 45) { //Chance of 1 of 100
                            times = 100;
                            doCall = true;
                        }
                        break;
                    case 200: //link click
                        if (rnd % 10 == 0) {//Chance of 1 of 10
                            times = 10;
                            doCall = true;
                        }
                        break;
                    case 300: //call for action
                        if (rnd % 5 == 0) {//Chance of 1 of 5
                            times = 5;
                            doCall = true;
                        }
                        break;
                    case 400: //video play
                        if (rnd % 10 == 0) {//Chance of 1 of 10
                            times = 10;
                            doCall = true;
                        }
                        break;
                    case 500://page exit
                        if (rnd == 50) {//Chance of 1 of 100
                            times = 100;
                            doCall = true;
                        }
                        break;
                    default:
                        break;
                }
            }
            else {
                doCall = true;
                times = 1;
            }
            if (doCall) {
                $.ajax({
                    url: webyclipBaseUrl + ((v_dataType == 'json') ? '/webyclip.php?_m=stats' : '/webyclip.php?_m=stats&callback=?') + getRequestData(prodIndex) + encodeIf('operation', operation) + encodeIf('times', times) + encodeIf('link_shown', showLink[prodIndex]),
                    dataType: v_dataType,
                    timeout: callTimeout,
                    async: v_async,
                    success: function(data, status) {
                        closure();
                    },
                    error: function() {
                        closure();
                    }
                });
            }
            else {
                closure();
            }
        };

        var bypassOnClick = function(el) {
            try {
                wbDebueg("     CallForAction: Doing input element:" + el);
                var onclick = $(el).attr('onclick');
                if (onclick != null) {
                    $(el).attr('onclick', ';');
                }
                wbDebug('     CallForAction: click element: ' + el + " -->" + onclick + " onclick:" + $(el).attr('onclick') + "----->" + $(el).toString());

                $(el).click(function() {
                    wbDebug('onclick: ' + el + " -->" + onclick);
                });
            } catch (err) {
                wbDebug("ERROR:" + err);
            }
        };

        var bypassSubmmit = function(el) {
            try {
                wbDebug("     CallForAction: Doing form element:" + el);
                var onsubmit = $(el).attr('onsubmit');
                if (onsubmit != null) {
                    $(el).attr('onsubmit', ';');
                }
                wbDebug('     CallForAction: submit element: ' + el + " -->" + onsubmit + " onsubmit:" + $(el).attr('onsubmit') + "----->" + $(el).toString());

                $(el).submit(function() {
                    wbDebug('onsubmit: ' + el + " -->" + onsubmit);
                    $(el).unbind('submit');
                    return false;
                });
            } catch (err) {
                wbDebug("ERROR:" + err);
            }
        };

        var doCallForAction = function(id, prodIndex) {

            wbDebug(" CallForAction: Starting with:" + id);
            if (typeof (id) != 'undefined' && typeof (productId[prodIndex]) != 'undefined' && productId[prodIndex] != null) {
                try {
                    $(id).each(function() {
                        wbDebug('     CallForAction: checking element:' + id + ' with tag ' + this.tagName);
                        //var elType = this.tagName;
                        //if ("FORM" == elType || "form" == elType) {
                        //    bypassSubmmit(this);
                        //} else {
                        var self = this;
                        (function() {
                            var oldOnClick = self.onclick;
                            $(self).click(function() {
                                postAnalyticsMessageNG(prodIndex, JSON.stringify({
                                    "messageType": "event",
                                    "eventName": "CFA",
                                    "eventData": {
                                        "action": $(this).text().replace(/^\s+|\s+$/g, '').replace(/\s+/g, " ")
                                    }
                                }));
                                if (oldOnClick != null) {
                                    return oldOnClick();
                                }
                                return true;
                            });
                            self.onclick = null;
                        })();
                        //}
                    });
                }
                catch (err) {
                    wbDebug(err);
                }
            }
            wbDebug(" CallForAction: Done with:" + id);
        };

        var initCallForAction = function(prodIndex) {
            wbDebug("CallForAction: initCallForAction Started");
            var ourActionIds = [];
            if (typeof (window.webyclipActionIds) != 'undefined') {
                $.each(window.webyclipActionIds, function(i, id) {
                    ourActionIds.push(id);
                    wbDebug("CallForAction: Adding to ourActionIds:" + id);
                });
            }
            ourActionIds.push("*[webyclip='CallForAction']", "*[itemprop='callforaction']");
            wbDebug("CallForAction: OurActionIds:" + ourActionIds);

            $.each(ourActionIds, function(i, id) {
                doCallForAction(id, prodIndex);
            });

            wbDebug("CallForAction: initCallForAction Finished");
        };

        var getCarouselHtml = function(medias, prodIndex) {
            var $carousel = $("<ul id='wcWaterwheelCarousel" + prodIndex + "' class='jcarousel-skin-wc'></ul>");

            if (typeof medias != 'undefined' && medias != null && medias.length > 0) {
                $.each(medias, function(idx, val) {
                    var playSrc = webyclipCdnCodeBaseUrl + "/playb_120_90.png";
                    if (typeof (val.privateMedia) != 'undefined' && val.privateMedia) {
                        playSrc = webyclipCdnCodeBaseUrl + "/playb_120_902.png";
                    }
                    else if (typeof (val.sponsoredMedia) != 'undefined' && val.sponsoredMedia) {
                        playSrc = webyclipCdnCodeBaseUrl + "/playb_120_903.png";
                    }
                        var isPrivateMedia = (typeof (val.privateMedia) != 'undefined' && val.privateMedia);
                        var isSponsoredMedia = (typeof (val.sponsoredMedia) != 'undefined' && val.sponsoredMedia);
                        var excludeMediaHtml = "";
                        if (webyclipIsDeleteFeature && (!isSponsoredMedia)) {
                                excludeMediaHtml = "<span id='excludeMediaSpan'><img class='excludeMediaImg' data-media-id='" + val._id + "' data-prod-index='" + prodIndex + "' src='http://pics.ebaystatic.com/aw/pics/icon/iconTrashcan_16x16.gif' style='position: absolute; top: 70px !important; left: 0; z-index: 9999; height: 20px; width: 20px; background-color: white; cursor: pointer; border-radius: 0px 12px 0px 0px;' title='Remove this seller video'></span>";
                        }       
                        $carousel.append("<li style='position: relative;'>" + excludeMediaHtml + "<a data-role='button' id='webyclipButtonLink" + ((prodIndex * 100) + idx) + "' data-prod-index='" + prodIndex + "' data-media-index='" + idx + "' data-media-id='" + val._id + "' data-media-source-id='" + val._sourceId + "' data-media-source-key='" + val._sourceKey + "' class='webyclip-button-link' rel='#webyclipOverlay' href='#' title='" + $('<div/>').text(val._title).html().replace(/(['])/g, '&apos;') + "'><img class='wc-thumb' src='" + ((val._thumbName != null) ? val._thumbName.replace(/https?\:\/\//i, webyclipProtocol + "://") : ((val._sourceId == 100) ? (webyclipProtocol + "://i.ytimg.com/vi/" + val._sourceKey + "/default.jpg") : (webyclipProtocol + "://i.ytimg.com/"))) + "' alt=''><img src='" + playSrc + "' data-webyclip-private-media='" + (isPrivateMedia ? 'true' : 'false') + "' data-webyclip-sponsored-media='" + ((typeof (val.sponsoredMedia) != 'undefined' && val.sponsoredMedia)? 'true' : 'false') + "' style='position: absolute; top: 0; left: 0; z-index: 999;' class='wc-thumb'></a></li>");                
                });
            }
            
            return $carousel;
        };
        var initCarousel = function(profile, numberOfMedia, showAddMediaButton, $target, prodIndex) {
            var showFrameNeeded = (profile._showFrame == 1) || false;

            var numberOfThumbs = Math.min(((profile._numberOfThumbs != null && profile._numberOfThumbs > 0) ? profile._numberOfThumbs : 3), numberOfMedia);
            var windowWidth = 125 * numberOfThumbs;
            var windowHeight = 95 * numberOfThumbs;
            var targetId = $target.attr("id");
            $("head").append(
                    "<style type='text/css'>\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-container { -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; direction: ltr; -moz-border-radius: 5px; -webkit-border-radius: 5px;	border-radius: 5px; background: transparent; " + ((showFrameNeeded) ? "border: 1px solid #346F97;" : "") + "}\n\
	#" + targetId + " .jcarousel-skin-wc a img { border: none; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-container-horizontal { width: " + windowWidth + "px; padding: 8px 15px 5px 20px; }\n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-container-vertical { height: " + windowHeight + "px; padding: 15px 5px 20px 10px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-clip { overflow: hidden; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-clip-horizontal { width:  " + windowWidth + "px; height: 90px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-clip-vertical { width:  120px; height: " + windowHeight + "px; }\n\
	#" + targetId + " .wc-thumb { width: 120px; height: 90px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-item { width: 120px; height: 90px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-item-horizontal { margin-left: 0;	margin-right: 5px;}\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-item-vertical { margin-top: 5px; margin-bottom: 0px;}\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-item-placeholder { background: #fff; color: #000; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-next-horizontal { position: absolute; margin-top: 0px; top: 8px; right: 5px; width: 14px; height: 90px; cursor: pointer; background: transparent url('" + webyclipCdnCodeBaseUrl + "/next.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-next-vertical { position: absolute; margin-left: 0px; left: 10px; bottom: 5px; height: 14px; width: 120px; cursor: pointer; background: transparent url('" + webyclipCdnCodeBaseUrl + "/v-next.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-next-horizontal:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-horizontal:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-horizontal:active, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-vertical:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-vertical:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-vertical:active { background-position: 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-next-disabled-horizontal, .jcarousel-skin-wc .jcarousel-next-disabled-horizontal:hover, .jcarousel-skin-wc .jcarousel-next-disabled-horizontal:focus, .jcarousel-skin-wc .jcarousel-next-disabled-horizontal:active { cursor: default; background: transparent url('" + webyclipCdnCodeBaseUrl + "/nextd.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-next-disabled-vertical, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-disabled-vertical:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-disabled-vertical:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-disabled-vertical:active { cursor: default; background: transparent url('" + webyclipCdnCodeBaseUrl + "/v-nextd.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-prev-horizontal { position: absolute; margin-top: 0px; top: 8px; left: 5px; width: 14px; height: 90px; cursor: pointer; background: transparent url('" + webyclipCdnCodeBaseUrl + "/prev.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-prev-vertical { position: absolute; margin-left: 0px; left: 10px; top: 5px; height: 14px; width: 120px; cursor: pointer; background: transparent url('" + webyclipCdnCodeBaseUrl + "/v-prev.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-prev-horizontal:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-horizontal:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-horizontal:active, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-vertical:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-vertical:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-vertical:active { background-position: 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-horizontal, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-horizontal:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-horizontal:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-horizontal:active { cursor: default; background: transparent url('" + webyclipCdnCodeBaseUrl + "/prevd.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-vertical,\n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-vertical:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-vertical:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-vertical:active { cursor: default; background: transparent url('" + webyclipCdnCodeBaseUrl + "/v-prevd.png') no-repeat 0px 0px; }\n\
@media only screen and (min-device-width : 320px) and (max-device-width : 550px) {\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-container { -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; -o-user-select: none; direction: ltr; -moz-border-radius: 5px; -webkit-border-radius: 5px;	border-radius: 5px; background: transparent; " + ((showFrameNeeded) ? "border: 1px solid #346F97;" : "") + "}\n\
	#" + targetId + " .jcarousel-skin-wc a img { border: none; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-container-horizontal { width: " + windowWidth * 2 / 3 + "px; padding: 5px 10px 3px 13px; }\n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-container-vertical { height: " + windowHeight * 2 / 3 + "px; padding: 10px 3px 13px 5px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-clip { overflow: hidden; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-clip-horizontal { width:  " + windowWidth * 2 / 3 + "px; height: 60px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-clip-vertical { width:  80px; height: " + windowHeight * 2 / 3 + "px; }\n\
	#" + targetId + " .wc-thumb { width: 80px; height: 60px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-item { width: 80px; height: 60px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-item-horizontal { margin-left: 0;	margin-right: 3px;}\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-item-vertical { margin-top: 3px; margin-bottom: 0px;}\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-item-placeholder { background: #fff; color: #000; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-next-horizontal { position: absolute; margin-top: 0px; top: 5px; right: 3px; width: 9px; height: 60px; cursor: pointer; background: transparent url('" + webyclipCdnCodeBaseUrl + "/sp-next.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-next-vertical { position: absolute; margin-left: 0px; left: 7px; bottom: 3px; height: 9px; width: 80px; cursor: pointer; background: transparent url('" + webyclipCdnCodeBaseUrl + "/sp-v-next.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-next-horizontal:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-horizontal:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-horizontal:active, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-vertical:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-vertical:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-vertical:active { background-position: 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-next-disabled-horizontal, .jcarousel-skin-wc .jcarousel-next-disabled-horizontal:hover, .jcarousel-skin-wc .jcarousel-next-disabled-horizontal:focus, .jcarousel-skin-wc .jcarousel-next-disabled-horizontal:active { cursor: default; background: transparent url('" + webyclipCdnCodeBaseUrl + "/sp-nextd.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-next-disabled-vertical, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-disabled-vertical:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-disabled-vertical:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-next-disabled-vertical:active { cursor: default; background: transparent url('" + webyclipCdnCodeBaseUrl + "/sp-v-nextd.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-prev-horizontal { position: absolute; margin-top: 0px; top: 5px; left: 3px; width: 9px; height: 60px; cursor: pointer; background: transparent url('" + webyclipCdnCodeBaseUrl + "/sp-prev.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-prev-vertical { position: absolute; margin-left: 0px; left: 7px; top: 3px; height: 9px; width: 80px; cursor: pointer; background: transparent url('" + webyclipCdnCodeBaseUrl + "/sp-v-prev.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-prev-horizontal:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-horizontal:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-horizontal:active, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-vertical:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-vertical:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-vertical:active { background-position: 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-horizontal, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-horizontal:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-horizontal:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-horizontal:active { cursor: default; background: transparent url('" + webyclipCdnCodeBaseUrl + "/sp-prevd.png') no-repeat 0px 0px; }\n\
	#" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-vertical,\n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-vertical:hover, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-vertical:focus, \n\
           #" + targetId + " .jcarousel-skin-wc .jcarousel-prev-disabled-vertical:active { cursor: default; background: transparent url('" + webyclipCdnCodeBaseUrl + "/sp-v-prevd.png') no-repeat 0px 0px; }\n\
}\n\
</style>");
            ensureOverlay(prodIndex);
            if (profile._thumbHtmlHeader != null) {
                $target.append(profile._thumbHtmlHeader);
            }
            $target.append(carouselHtml[prodIndex]);
            if (showAddMediaButton && profile._showAddVideo) {
                var addMediaText = profile._addMediaText || '<img src="' + webyclipCdnCodeBaseUrl + '/add-media.png" style="vertical-align: top; text-decoration: none; border: 0 none;">Add Photos/Video';
                $target.append('<a class="webyclipAddMediaLink" href="javascript: void 0" style="color: #3C5897; display: block;  padding-left: 3px; padding-right: 3px; margin: 1px; font-weight: bold; text-decoration: none; cursor: auto; font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif; font-size: 12px;">' + addMediaText + '</a>');
            }
            if (window.webyclipIsOwnerPage) {
                var addPrivateMediaText = '<img src="' + webyclipCdnCodeBaseUrl + '/add-media.png" style="vertical-align: top; text-decoration: none; border: 0 none;">Add Owner Video';
                $target.append('<a class="webyclipAddPrivateMediaLink" href="javascript: void 0" style="color: #3C5897; display: block;  padding-left: 3px; padding-right: 3px; margin: 1px; font-weight: bold; text-decoration: none; cursor: auto; font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif; font-size: 12px;">' + addPrivateMediaText + '</a>');
            }
            if (profile._thumbHtmlFooter != null) {
                $target.append(profile._thumbHtmlFooter);
            }
            var configObj = {
                scroll: 1,
                rtl: false,
                setupCallback: function(instance) {
                    connectOverlayToLinks(targetId, profile);
                }
            };
            if ((webyclipWidgetMode == "content" && (webyclipContentOpenDirection == "U")) || webyclipForceVerticalThumbnails === true) {
                configObj.vertical = true;
            }
            $('#wcWaterwheelCarousel' + prodIndex).jcarousel(configObj);
            $target.find('.jcarousel-item').mouseenter(function() {
                var $playBtn = $(this).find('img').last();
                var playSrc = webyclipCdnCodeBaseUrl + "/playb_over_120_90.png";
                if ($playBtn.attr('data-webyclip-private-media') === 'true') {
                    playSrc = webyclipCdnCodeBaseUrl + "/playb_over_120_902.png";
                }
                else if ($playBtn.attr('data-webyclip-sponsored-media') === 'true') {
                    playSrc = webyclipCdnCodeBaseUrl + "/playb_over_120_903.png";
                }
                $playBtn.attr('src', playSrc);
            }).mouseleave(function() {
                var $playBtn = $(this).find('img').last();
                var playSrc = webyclipCdnCodeBaseUrl + "/playb_120_90.png";
                if ($playBtn.attr('data-webyclip-private-media') === 'true') {
                    playSrc = webyclipCdnCodeBaseUrl + "/playb_120_902.png";
                }
                else if ($playBtn.attr('data-webyclip-sponsored-media') === 'true') {
                    playSrc = webyclipCdnCodeBaseUrl + "/playb_120_903.png";
                }
                $playBtn.attr('src', playSrc);
            });

      	    $('.excludeMediaImg').click(function() {
      		      var callCdn = (typeof webyclipCdnPrefixUrl != 'undefined' && !window.webyclipLogin);
      		      var mediaId = $(this).attr('data-media-id');
      		      var prodIndex = $(this).attr('data-prod-index');
      		      var p3 = productExternalId[prodIndex];
                      var p5 = webyclipAnalyticsData.toLowerCase();

                showRemoveMediaOverlay(prodIndex, mediaId, p3, p5, callCdn);
      	    });
        };
        var showRemoveMediaOverlay = function(prodIndex, mediaId, p3, p5, callCdn) {
            ensureRemoveOverlay(prodIndex, mediaId, p3, p5);

            // use fixed layout when not in quirks mode
            var useFixedLayout = $.support.boxModel;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                useFixedLayout = false;
            }
            $('#webyclipRemoveOverlay').overlay(
                    {
                        fixed: useFixedLayout,
                        onBeforeLoad: function() {
                            window.currentGlobalRemoveOverlay = this;
                            window.currentGlobalRemoveMediaId = mediaId;
                            window.currentGlobalRemoveP5 = p5;
                        },
                        load: true
                    }).load();
            $(document).mouseup(function(e) {
                if (typeof (window.currentGlobalRemoveOverlay) !== 'undefined' && currentGlobalRemoveOverlay != null && currentGlobalRemoveOverlay.isOpened()) {
                    var container = $("#webyclipRemoveOverlay");
                    if (container.has(e.target).length === 0) {
                        currentGlobalRemoveOverlay.close();
                    }
                }
            });
        };
        var ensureReportOverlay = function(prodIndex, submitCallback, cancelCallback) {
            $("head").append(
                    "<style type='text/css'>\n\
                        #webyclipReportOverlay a.close { \n\
                            background-image:url(" + webyclipCdnCodeBaseUrl + "/close.png) !important; \n\
                            position:absolute !important; \n\
                            right:-15px !important; \n\
                            top:-15px !important; \n\
                            cursor:pointer !important; \n\
                            height:35px !important; \n\
                            width:35px !important; \n\
                            z-index: 1000 !important; \n\
                            background-position: 0% 0% !important; \n\
                            background-repeat: no-repeat !important; \n\
                            padding: 0px 0px 0px 0px !important;\n\
                        }\n\
                        .webyclipPopupOKButton {\n\
                            background-color: #0079bc;\n\
                        }\n\
                        .webyclipPopupOKButton:hover {\n\
                            background-color: #00509d;\n\
                        }\n\
                        .webyclipPopupCancelButton {\n\
                            background-color: #45aad6;\n\
                        }\n\
                        .webyclipPopupCancelButton:hover {\n\
                            background-color: #0079bc;\n\
                        }</style>");


            var reportOverlay = $("#webyclipReportOverlay");
            if (reportOverlay.length == 0) {
                reportOverlay = $(
                        "<div id='webyclipReportOverlay' style='width:500px;height:400px;display:none;z-index:10000;background-color:#FFFFFF;min-height:200px;border:1px solid #666;-moz-box-shadow:0 0 90px 5px #000;-webkit-box-shadow: 0 0 90px #000; box-shadow: 0 0 90px #000;'>\n\
                        <div id='webyclipReportAbuse' style='padding-top:30px; padding-left:30px;font-family: \"lucida grande\",tahoma,verdana,arial,sans-serif; color: #565656; font-size: 14px;height: 370px'>\n\
                            <p>" + webyclipUIStrings[webyclipUILocale]['tell_us_more'] + "</p>\n\
                            <p id='webyclipReportAbuseValidation' style='color: red;display:none;'>" + webyclipUIStrings[webyclipUILocale]['no_reason'] + "</p>\n\
                            <textarea id='webyclipAbuseComments' style='width: 400px; height: 250px;display: none;'></textarea>\n\
                            <input type='radio' name='optReport' id='opt1' data-hide-section='#opt3_suboptions,#opt6_suboptions' value='does_not_match_product'><label for='opt1'>" + webyclipUIStrings[webyclipUILocale]['does_not_match_product'] + "</label><br>\n\
                            <input type='radio' name='optReport' id='opt2' data-hide-section='#opt3_suboptions,#opt6_suboptions' value='inaccurate_or_misleading'><label for='opt2'>" + webyclipUIStrings[webyclipUILocale]['inaccurate_or_misleading'] + "</label><br>\n\
                            <input type='radio' name='optReport' id='opt3' data-hide-selection='#opt6_suboptions' data-show-section='#opt3_suboptions' value='infringes_my_rights'><label for='opt3'>" + webyclipUIStrings[webyclipUILocale]['infringes_my_rights'] + "</label><br>\n\
                            <div style='margin-left: 30px; display: none;' id='opt3_suboptions' class='subOptions'>\n\
                                <input type='radio' name='optReport3' id='opt3_1' data-hide-section='#opt3_2_suboptions' value='trademark_infringement'><label for='opt3_1'>" + webyclipUIStrings[webyclipUILocale]['trademark_infringement'] + "</label><br>\n\
                                <input type='radio' name='optReport3' id='opt3_2' data-show-section='#opt3_2_suboptions' value='copyright_infringement'><label for='opt3_2'>" + webyclipUIStrings[webyclipUILocale]['copyright_infringement'] + "</label><br>\n\
                                <div style='margin-left: 30px; display: none;' id='opt3_2_suboptions' class='subOptions'>\n\
                                    <input type='radio' name='optReport3_2' id='opt3_2_1' value='related_to_music'><label for='opt3_2_1'>" + webyclipUIStrings[webyclipUILocale]['related_to_music'] + "</label><br>\n\
                                    <input type='radio' name='optReport3_2' id='opt3_2_2' value='related_to_visual_content'><label for='opt3_2_2'>" + webyclipUIStrings[webyclipUILocale]['related_to_visual_content'] + "</label><br>\n\
                                    <input type='radio' name='optReport3_2' id='opt3_2_3' value='related_to_both_music_and_visual_content'><label for='opt3_2_3'>" + webyclipUIStrings[webyclipUILocale]['related_to_both_music_and_visual_content'] + "</label><br>\n\
                                </div>\n\
                                <input type='radio' name='optReport3' id='opt3_3' data-hide-section='#opt3_2_suboptions' value='other_ip_rights'><label for='opt3_3'>" + webyclipUIStrings[webyclipUILocale]['other_ip_rights'] + "</label><br>\n\
                            </div>\n\
                            <input type='radio' name='optReport' id='opt4' data-hide-section='#opt3_suboptions,#opt6_suboptions' value='poor_quality'><label for='opt4'>" + webyclipUIStrings[webyclipUILocale]['poor_quality'] + "</label><br>\n\
                            <input type='radio' name='optReport' id='opt5' data-hide-section='#opt3_suboptions,#opt6_suboptions' value='offensive_or_inappropriate'><label for='opt5'>" + webyclipUIStrings[webyclipUILocale]['offensive_or_inappropriate'] + "</label><br>\n\
                            <input type='radio' name='optReport' id='opt6' data-hide-section='#opt3_suboptions' data-show-section='#opt6_suboptions' value='other'><label for='opt6'>" + webyclipUIStrings[webyclipUILocale]['other'] + "</label><br>\n\
                            <div style='margin-left: 30px; display: none;' id='opt6_suboptions' class='subOptions'>\n\
                                <textarea style='width: 300px; height: 50px;'></textarea>\n\
                            </div>\n\
                            <p style='margin-top: 5px;'>\n\
                                <a href='javascript: void 0' class='webyclipPopupOKButton' id='webyclipSubmitAbuse' style='color: #3C5897; padding-left: 3px; padding-right: 3px; margin: 1px; text-decoration: none; display: inline-block; color: #fff; font-size: 12px; text-transform: uppercase; width: 76px; margin: 0px auto; height: 24px; text-align: center; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; padding-top: 10px; margin: 0;'>" + webyclipUIStrings[webyclipUILocale]['send'] + "</a>\n\
                                <img src='" + webyclipCdnCodeBaseUrl + "/loading_icon.gif' class='webyclipLinkInline'  id='webyclipLoadingAbuse' alt='" + webyclipUIStrings[webyclipUILocale]['please_wait'] + "'  title='" + webyclipUIStrings[webyclipUILocale]['please_wait'] + "'  style='color: #3C5897; font-weight: bold; padding-left: 3px; padding-right: 3px; margin: 1px; text-decoration: none;display: none;' />\n\
                                <a href='javascript: void 0' class='webyclipPopupCancelButton' id='webyclipCancelAbuse' style='color: #3C5897; padding-left: 3px; padding-right: 3px; margin: 1px; text-decoration: none; display: inline-block; color: #fff; font-size: 12px; text-transform: uppercase; width: 76px; margin: 0px auto; height: 24px; text-align: center; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; padding-top: 10px; margin: 0; '>" + webyclipUIStrings[webyclipUILocale]['cancel'] + "</a>\n\
                            </p>\n\
                            <p>\n\
                                <div id='webyclipSubmitMessage' style='display: none; font-weight: bold; color: green; margin-left: 4px;'>Your report has been submitted!</div>\n\
                            </p>\n\
                            <div style='font-weight: bold;'>\n\
                                " + webyclipUIStrings[webyclipUILocale]['login_to_remove'] + "\n\
                            </div>\n\
                        </div>\n\
                     </div>")
                        .appendTo("body");
                $("input[name^='optReport']:radio").change(function() {
                    var hideSection = $(this).attr('data-hide-section');
                    var showSection = $(this).attr('data-show-section');
                    var valSet = false;
                    if (hideSection) {
                        $(hideSection).children('input:radio').attr('checked', null);
                        $(hideSection).children('textarea').val('');
                        $(hideSection).hide();
                        $("#webyclipAbuseComments").val($(this).val());
                        valSet = true;
                    }
                    if (showSection) {
                        $(showSection).show();
                        if ($('#' + $(this).attr('id') + '_suboptions>input:radio:checked').length == 0 &&
                                $('#' + $(this).attr('id') + '_suboptions>input:radio').length > 0) {
                            $('#' + $(this).attr('id') + '_suboptions>input:radio').first().attr('checked', 'checked');
                            $("#webyclipAbuseComments").val($('#' + $(this).attr('id') + '_suboptions>input:radio').first().val());
                            valSet = true;
                        }
                    }
                    if (!valSet) {
                        $("#webyclipAbuseComments").val($(this).val());
                    }
                });
                if (typeof (submitCallback) != 'undefined') {
                    $("#webyclipSubmitAbuse").click(submitCallback);
                }
                else {
                    $("#webyclipSubmitAbuse").click(function() {
                        if (currentReportOverlay == null || !currentReportOverlay.isOpened()) {
                            return;
                        }

                        var mediaId = typeof (currentReportOverlay.getTrigger().attr('data-media-id')) !== 'undefined' ? currentReportOverlay.getTrigger().attr('data-media-id') : null;
                        var mediaSourceId = typeof (currentReportOverlay.getTrigger().attr('data-media-source-id')) !== 'undefined' ? currentReportOverlay.getTrigger().attr('data-media-source-id') : null;
                        var mediaSourceKey = typeof (currentReportOverlay.getTrigger().attr('data-media-source-key')) !== 'undefined' ? currentReportOverlay.getTrigger().attr('data-media-source-key') : null;
                        var prodIndex = typeof (currentReportOverlay.getTrigger().attr('data-prod-index')) !== 'undefined' ? currentReportOverlay.getTrigger().attr('data-prod-index') : null;


                        var reason = $("#webyclipAbuseComments").val();
                        var reasonCode = $("#webyclipAbuseComments").val();

                        if (reason == 'other') {
                            reason = reason + ': ' + $('#opt6_suboptions textarea').val();
                        }
                        $("#webyclipReportAbuseValidation").hide();
                        if (reason.trim() == '' || reason.trim() == 'other:') {
                            $("#webyclipReportAbuseValidation").show();
                            return;
                        }
                        $("#webyclipSubmitAbuse").css("color", "gray").css("cursor", "default");
                        $("#webyclipCancelAbuse").css("color", "gray").css("cursor", "default");
                        $("#webyclipLoadingAbuse").show();

                        postAnalyticsMessageNG(prodIndex, JSON.stringify({
                            "messageType": "event",
                            "eventName": "reportAbuse",
                            "eventData": {
                                "mediaId": mediaId,
                                "mediaSourceId": mediaSourceId,
                                "mediaSourceKey": mediaSourceKey,
                                "reasonCode": reasonCode,
                                "embedded": false
                            }
                        }));

                        $.getJSON(webyclipBaseUrl + '/webyclip.php?_m=report_abuse&callback=?' + getRequestData(prodIndex) + encodeIf('_mid', mediaId) + encodeIf('why_abusive', reason) + encodeIf('_p3', productExternalId[prodIndex]) + encodeIf('_p5', webyclipAnalyticsData),
                                function(data) {
                                    $("#webyclipSubmitMessage").show();
                                    $("#webyclipSubmitAbuse").css("color", "#3C5897").css("cursor", "auto");
                                    $("#webyclipCancelAbuse").css("color", "#3C5897").css("cursor", "auto");
                                    $("#webyclipLoadingAbuse").hide();
                                    setTimeout(function() {
                                        $("#webyclipSubmitMessage").hide();
                                        currentReportOverlay.close();
                                    }, 1500);
                                });
                    });
                }
                if (typeof (cancelCallback) != 'undefined') {
                    $("#webyclipCancelAbuse").click(cancelCallback);
                }
                else {
                    $("#webyclipCancelAbuse").click(function() {
                        if (currentReportOverlay != null && currentReportOverlay.isOpened()) {
                            currentReportOverlay.close();
                        }
                    });
                }
            }
        };
        window.ensureReportOverlay = ensureReportOverlay;


        var ensureRemoveOverlay = function(prodIndex, mediaId, p3, p5) {
            $("head").append(
                    "<style type='text/css'>\n\
                        #webyclipRemoveOverlay a.close { \n\
                            background-image:url(" + webyclipCdnCodeBaseUrl + "/close.png) !important; \n\
                            position:absolute !important; \n\
                            right:-15px !important; \n\
                            top:-15px !important; \n\
                            cursor:pointer !important; \n\
                            height:35px !important; \n\
                            width:35px !important; \n\
                            z-index: 1000 !important; \n\
                            background-position: 0% 0% !important; \n\
                            background-repeat: no-repeat !important; \n\
                            padding: 0px 0px 0px 0px !important;\n\
                        }\n\
                        .webyclipPopupOKButton {\n\
                            background-color: #0079bc;\n\
                        }\n\
                        .webyclipPopupOKButton:hover {\n\
                            background-color: #00509d;\n\
                        }\n\
                        .webyclipPopupCancelButton {\n\
                            background-color: #45aad6;\n\
                        }\n\
                        .webyclipPopupCancelButton:hover {\n\
                            background-color: #0079bc;\n\
                        }</style>");


            var removeOverlay = $("#webyclipRemoveOverlay");
            if (removeOverlay.length == 0) {
                removeOverlay = $(
                        "<div id='webyclipRemoveOverlay' style='width:500px;height:275px;display:none;z-index:10000;background-color:#FFFFFF;min-height:200px;border:1px solid #666;-moz-box-shadow:0 0 90px 5px #000;-webkit-box-shadow: 0 0 90px #000; box-shadow: 0 0 90px #000;'>\n\
                        <div id='webyclipRemoveSellerVideo' style='padding-top:30px; padding-left:30px;font-family: Arial,Helvetica,sans-serif; color: #565656; font-size: 14px;height: 195px'>\n\
                            <p style='margin-top: 14px; margin-bottom: 14px;'>" + webyclipUIStrings[webyclipUILocale]['remove_video_title'] + "</p>\n\
                            <table>\n\
                            <tr style='height: 20px; vertical-align: top;'><td style='width: 20px;'><input type='radio' style='display: block; margin: 0px; margin-top: 1px;' name='optRemove' id='opt1' value='remove_one' checked='true'></td><td style='padding: 0px;'><label for='opt1'>" + webyclipUIStrings[webyclipUILocale]['remove_selected_video'] + "</label></td></tr>\n\
                            <tr style='vertical-align: top;'><td style='width: 20px;'><input type='radio' style='display: block; margin: 0px; margin-top: 1px;' name='optRemove' id='opt2' value='remove_all'></td><td style='padding: 0px;'><label for='opt2'>" + webyclipUIStrings[webyclipUILocale]['remove_all_videos'] + "</label><br><span style='font-size: smaller;'>(" + webyclipUIStrings[webyclipUILocale]['no_new_videos'] + ")</span></td></tr>\n\
			    </table><br /><br /><br />\n\
                            <p style='margin-top: 5px;'>\n\
                                <a href='javascript: void 0' class='webyclipPopupOKButton' id='webyclipSubmitRemove' style='color: #3C5897; font-family: Arial,Helvetica,Sans-serif; padding-left: 3px; padding-right: 3px; margin: 1px; text-decoration: none; display: inline-block; color: #fff; font-size: 12px; text-transform: uppercase; width: 76px; margin: 0px auto; height: 24px; text-align: center; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; padding-top: 10px; margin: 0;'>" + webyclipUIStrings[webyclipUILocale]['ok'] + "</a>\n\
                                <img src='" + webyclipCdnCodeBaseUrl + "/loading_icon.gif' class='webyclipLinkInline'  id='webyclipLoadingRemove' alt='" + webyclipUIStrings[webyclipUILocale]['please_wait'] + "'  title='" + webyclipUIStrings[webyclipUILocale]['please_wait'] + "'  style='color: #3C5897; font-weight: bold; padding-left: 3px; padding-right: 3px; margin: 1px; text-decoration: none;display: none;' />\n\
                                <a href='javascript: void 0' class='webyclipPopupCancelButton' id='webyclipCancelRemove' style='color: #3C5897; font-family: Arial,Helvetica,Sans-serif; padding-left: 3px; padding-right: 3px; margin: 1px; text-decoration: none; display: inline-block; color: #fff; font-size: 12px; text-transform: uppercase; width: 76px; margin: 0px auto; height: 24px; text-align: center; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; padding-top: 10px; margin: 0; '>" + webyclipUIStrings[webyclipUILocale]['cancel'] + "</a>\n\
                            </p>\n\
                            <p style='margin-top: 14px; margin-bottom: 14px;'>\n\
                                <div id='webyclipSubmitMessage' style='display: none; font-family: Arial,Helvetica,sans-serif; color: green; margin-left: 4px;'>" + webyclipUIStrings[webyclipUILocale]['remove_request_submitted'] + "</div>\n\
                            </p>\n\
                        </div>\n\
                     </div>")
                        .appendTo("body");
			}


		    $("#webyclipSubmitRemove").unbind("click");
			$("#webyclipSubmitRemove").click(function() {
				if (window.currentGlobalRemoveOverlay == null || !window.currentGlobalRemoveOverlay.isOpened()) {
					return;
				}

				$("#webyclipSubmitRemove").css("color", "gray").css("cursor", "default");
				$("#webyclipCancelRemove").css("color", "gray").css("cursor", "default");
				$("#webyclipLoadingRemove").show();

				var removeMethod = $("input[name^='optRemove']:checked").val();

				var req = $.ajax({
				    dataType: 'jsonp',
				    jsonpCallback: 'webyclip_excludeMedia_' + webyclipAnalyticsData + '_' + mediaId,
				    url: webyclipBaseUrl + '/webyclip.php?_m=exclude_media&callback=?' + getRequestData(prodIndex) + encodeIf('_mid', mediaId) + encodeIf('_method', removeMethod) + encodeIf('_p3', p3) + encodeIf('_p5', p5),
				    timeout: 30000
				});

				req.done(function(data, textStatus, jqXHR) {
				    postAnalyticsMessageNG(prodIndex, JSON.stringify({
						"messageType": "event",
						"eventName": "SellerMediaRemoved",
						"eventData": {
							"mediaId": mediaId,
							"p5": p5
						}
				    }));

				    $("#webyclipSubmitMessage").show();
                    $("#webyclipSubmitRemove").css("color", "white").css("cursor", "auto");
                    $("#webyclipCancelRemove").css("color", "white").css("cursor", "auto");
					$("#webyclipLoadingRemove").hide();

				    setTimeout(function() {
						$("#webyclipSubmitMessage").hide();
				        if (window.currentGlobalRemoveOverlay != null && window.currentGlobalRemoveOverlay.isOpened()) {
				            window.currentGlobalRemoveOverlay.close();
				        }
					}, 7000);
				});
				req.fail(function(jqXHR, textStatus, errorThrown) {
				    alert("Unable to remove seller video! " + errorThrown);

                    $("#webyclipSubmitRemove").css("color", "white").css("cursor", "auto");
                    $("#webyclipCancelRemove").css("color", "white").css("cursor", "auto");
					$("#webyclipLoadingRemove").hide();
				});
		    });

		    $("#webyclipCancelRemove").click(function() {
				if (window.currentGlobalRemoveOverlay != null && window.currentGlobalRemoveOverlay.isOpened()) {
				    window.currentGlobalRemoveOverlay.close();
				}
		    });
        };
        window.ensureRemoveOverlay = ensureRemoveOverlay;


        var ensureOverlay = function(prodIndex) {
            $("head").append(
                    "<style type='text/css'>#webyclipOverlay a.close { background-image:url(" + webyclipCdnCodeBaseUrl
                    + "/close.png) !important; position:absolute !important; right:-15px !important; top:-15px !important; cursor:pointer !important; height:35px !important; width:35px !important; z-index: 1000 !important; background-position: 0% 0% !important; background-repeat: no-repeat !important; padding: 0px 0px 0px 0px !important;}</style>");

            var frameWidth = window.webyclipData[prodIndex].data.profile.customWidth || Math.min(720, $(window).width() - 20);
            var frameHeight = window.webyclipData[prodIndex].data.profile.customHeight || ((frameWidth == $(window).width() - 20) ? ($(window).width() - 20) * 2 / 3 : 465);
            var shadowWidth = window.webyclipData[prodIndex].data.profile._shadowWidth || 90;

            var overlay = $("#webyclipOverlay");
            if (overlay.length == 0) {
                overlay = $(
                        "<div id='webyclipOverlay' style='width:" + frameWidth + "px;height:" + frameHeight + "px;display:none;z-index:10000;background-color:#FFFFFF;min-height:200px;border:1px solid #666;-moz-box-shadow:0 0 90px 5px #000;-webkit-box-shadow: 0 0 " + shadowWidth + "px #000; box-shadow: 0 0 " + shadowWidth + "px #000;'> <div id='webyclipFrame' frameBorder='0' style='width:" + frameWidth + "px;height:" + frameHeight + "px;border-style:none;position:relative;'></div> "
                        + (showBuyNow ? "<img id='webyclipBuyNow' src='" + webyclipCdnCodeBaseUrl
                                + "/bn.png' class='buynow' style='position: absolute; top: 5px; right: 40px; cursor: pointer; width: 107px; height: 27px' border='0'></img>" : "") + "</div>")
                        .appendTo("body");
                overlay.keyup(function(e) {
                    if (e.keyCode === 27) {
                        overlay.close();
                    }
                });
            }
        };
        var connectOverlayToLinks = function(targetId, profile) {
            // use fixed layout when not in quirks mode
            var useFixedLayout = $.support.boxModel;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                useFixedLayout = false;
            }
            var useMask = profile._useMask || false;
            $('#' + targetId + ' .webyclip-button-link').overlay(
                    {
                        fixed: useFixedLayout,
                        onBeforeLoad: function() {
                            if (useMask) {
                                if ($("#wcOverlayMask").size() > 0) {
                                    $("#wcOverlayMask").show();
                                }
                                else {
                                    $("<div id='wcOverlayMask' style='position: fixed; width: 100%; heigjt: 100%; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.95; z-index: 9998; background-color: rgb(255, 255, 255);'></div>").appendTo('body');
                                }
                            }
                            currentOverlay = this;
                            var mediaId = (typeof (this.getTrigger().attr('data-media-id')) !== 'undefined') ? this.getTrigger().attr('data-media-id') : null;
                            var mediaSourceId = (typeof (this.getTrigger().attr('data-media-source-id')) !== 'undefined') ? this.getTrigger().attr('data-media-source-id') : null;
                            var mediaSourceKey = (typeof (this.getTrigger().attr('data-media-source-key')) !== 'undefined') ? this.getTrigger().attr('data-media-source-key') : null;
                            var prodIndex = (typeof (this.getTrigger().attr('data-prod-index')) !== 'undefined') ? this.getTrigger().attr('data-prod-index') : null;
                            apiMode = ((window.postMessage != null) && (typeof (window.postMessage) != "undefined")) ? "iframe" : "flash";

                            if (typeof window.webyclipLinkClickedDefined == 'undefined') {
                                window.webyclipLinkClickedDefined = true;
                            }

                            postAnalyticsMessageNG(prodIndex, JSON.stringify({
                                "messageType": "event",
                                "eventName": "LinkClicked",
                                "eventData": {
                                    "mediaId": mediaId,
                                    "mediaSourceId": mediaSourceId,
                                    "mediaSourceKey": mediaSourceKey
                                }
                            }));

                            window.webyclipIFrameLoaded = false;
                            window.webyclipIFrameLoad = function() {
                                $("#webyclipLoading").hide();
                                $("#webyclipInnerIFrame").show();
                                $("#webyclipDisclaimer").show();
                                
                                window.webyclipIFrameLoaded = true;
                            };
                            var showFrame = function(frameUrl, origin, prodIndex) {
                                var frameWidth = Math.min(720, $(window).width() - 20);
                                var frameHeight = ((frameWidth == $(window).width() - 20) ? ($(window).width() - 20) * 2 / 3 : 465);
                                frameUrl = frameUrl + encodeIf('fw', frameWidth) + encodeIf('fh', frameHeight);
                                //window.alert("s-width:" + $(window).width());
                                //window.alert("width:" + frameWidth);
                                //window.alert("height:" + frameHeight);
                                $('#webyclipFrame').html(
                                        '<div id="webyclipLoading" style="position: absolute; display: block; top:0px; left:0px; height: ' + (frameHeight + 110) / 2 + 'px; width: ' + (frameWidth + 154) / 2 + 'px;"><img style="position: absolute; bottom:0px; right: 0px; display: block;" src="' + webyclipCdnCodeBaseUrl + '/' + (window.webyclipData[prodIndex].data.profile.splashLogo || "small-logo.jpg") + '" /><img style="position: absolute;top:' + (frameHeight + 130) / 2 + 'px; left:' + (frameWidth - 43) / 2 + 'px;display: block;" src="' + webyclipCdnCodeBaseUrl + '/w-loading.gif" /></div>'
                                        + "<iframe id='webyclipInnerIFrame' frameBorder='0' onload='window.webyclipIFrameLoad()' style='background-color:#FFFFFF;width:" + (frameWidth-2) + "px;height:" + frameHeight + "px;border-style:none;display: none;z-index:0;' src=''></iframe><div id='webyclipDisclaimer' style='display:none'>" + (window.webyclipData[prodIndex].data.profile.disclaimerHtml || "") + "</div>");

                                $("#webyclipInnerIFrame").attr('src', frameUrl);
                                $('#webyclipFrame').show();
                                var lastPlayedMediaId = null;
                                var messageListener = function(event) {
                                    //wbDebug(event.origin);
                                    if (event.origin !== origin)
                                        return;
                                    var messageObj = $.parseJSON(event.data) || {};
                                    if (typeof (messageObj.mediaId) !== 'undefined') {
                                        if (messageObj.name === 'Played') {
                                            if (lastPlayedMediaId == null) {
                                                lastPlayedMediaId = messageObj.mediaId;
                                            }
                                            if (lastPlayedMediaId != messageObj.mediaId) {
                                                flashPlayedMediaDuration(prodIndex);
                                                lastPlayedMediaId = messageObj.mediaId;
                                            }
                                            if (typeof (playedMediaDuration[prodIndex][messageObj.mediaId]) === 'undefined') {
                                                playedMediaDuration[prodIndex][messageObj.mediaId] = {
                                                    'mediaSourceId': messageObj.mediaSourceId,
                                                    'mediaSourceKey': messageObj.mediaSourceKey,
                                                    'sponsoredMedia': ((typeof(messageObj.sponsoredMedia) != "undefined")? messageObj.sponsoredMedia : false),
                                                    'count': 0
                                                };
                                            }
                                            playedMediaDuration[prodIndex][messageObj.mediaId].count += messageObj.value;

                                        } else if (messageObj.name === 'FBShare') {
                                            postAnalyticsMessageNG(prodIndex, JSON.stringify({
                                                "messageType": "event",
                                                "eventName": "FBShare",
                                                "eventData": {
                                                    "mediaId": messageObj.mediaId,
                                                    "mediaSourceId": messageObj.mediaSourceId,
                                                    "mediaSourceKey": messageObj.mediaSourceKey,
                                                    "postId": messageObj.postId
                                                }
                                            }));
                                        } else if (messageObj.name === 'ReportAbuse') {
                                            postAnalyticsMessageNG(prodIndex, JSON.stringify({
                                                "messageType": "event",
                                                "eventName": "reportAbuse",
                                                "eventData": {
                                                    "mediaId": messageObj.mediaId,
                                                    "mediaSourceId": messageObj.mediaSourceId,
                                                    "mediaSourceKey": messageObj.mediaSourceKey,
                                                    "reasonCode": messageObj.reasonCode,
                                                    "embedded": messageObj.embedded
                                                }
                                            }));
                                        } else if (messageObj.name === 'MediaLikeAdded') {
                                            postAnalyticsMessageNG(prodIndex, JSON.stringify({
                                                "messageType": "event",
                                                "eventName": "MediaLikeAdded",
                                                "eventData": {
                                                    "mediaId": messageObj.mediaId,
                                                    "mediaSourceId": messageObj.mediaSourceId,
                                                    "mediaSourceKey": messageObj.mediaSourceKey,
                                                    "embedded": messageObj.embedded
                                                }
                                            }));

                                        } else if (messageObj.name === 'MediaLikeRemoved') {
                                            postAnalyticsMessageNG(prodIndex, JSON.stringify({
                                                "messageType": "event",
                                                "eventName": "MediaLikeRemoved",
                                                "eventData": {
                                                    "mediaId": messageObj.mediaId,
                                                    "mediaSourceId": messageObj.mediaSourceId,
                                                    "mediaSourceKey": messageObj.mediaSourceKey,
                                                    "embedded": messageObj.embedded
                                                }
                                            }));

                                        } else if (messageObj.name === 'MediaDislikeAdded') {
                                            postAnalyticsMessageNG(prodIndex, JSON.stringify({
                                                "messageType": "event",
                                                "eventName": "MediaDislikeAdded",
                                                "eventData": {
                                                    "mediaId": messageObj.mediaId,
                                                    "mediaSourceId": messageObj.mediaSourceId,
                                                    "mediaSourceKey": messageObj.mediaSourceKey,
                                                    "embedded": messageObj.embedded
                                                }
                                            }));

                                        } else if (messageObj.name === 'MediaDislikeRemoved') {
                                            postAnalyticsMessageNG(prodIndex, JSON.stringify({
                                                "messageType": "event",
                                                "eventName": "MediaDislikeRemoved",
                                                "eventData": {
                                                    "mediaId": messageObj.mediaId,
                                                    "mediaSourceId": messageObj.mediaSourceId,
                                                    "mediaSourceKey": messageObj.mediaSourceKey,
                                                    "embedded": messageObj.embedded
                                                }
                                            }));

                                        }

				    } else if (messageObj.name === 'CLOSE') {
                                        if (currentOverlay != null && currentOverlay.isOpened()) {
                                            currentOverlay.close();
                                        }

                                    } else if (messageObj.name === 'hideWebyclipDisclaimer') {
					$("#webyclipDisclaimer").hide();

				    } else if (messageObj.name === 'showWebyclipDisclaimer') {
                                        if (window.webyclipIFrameLoaded) {
                                            $("#webyclipDisclaimer").show();
                                        }
				    }
                                    else if (messageObj.name === 'setDisclaimer') {
                                        $("#webyclipDisclaimer").css("margin-top",messageObj.pushTop);
                                        $("#webyclipDisclaimer").html(messageObj.html);
                                    }
                                    else if (messageObj.name === 'revertToDefaultDisclaimer') {
                                        $("#webyclipDisclaimer").css("margin-top","");
                                        $("#webyclipDisclaimer").html((window.webyclipData[prodIndex].data.profile.disclaimerHtml || ""));
                                    }
                                };

                                playedMediaDuration[prodIndex] = [];
                                if (window.addEventListener) {
                                    removeEventListener("message", messageListener, false);
                                    addEventListener("message", messageListener, false);
                                } else {
                                    detachEvent("onmessage", messageListener);
                                    attachEvent("onmessage", messageListener);
                                }
                            };
                            if ((!window.webyclipLogin) && (typeof webyclipCdnPrefixUrl != 'undefined')) {
                                var req = $.ajax({
                                    dataType: 'jsonp',
                                    jsonpCallback: 'webyclip_getFrameTs',
                                    url: webyclipCdnPrefixUrl + '/wc-frame-ts-' + productId[prodIndex],
                                    timeout: 3000
                                });
                                req.done(function(data, textStatus, jqXHR) {
                                    var lm = data.__lastModified || 'Tue, 01 Jan 2013 00:00:00 GMT';
                                    var lmDate = new Date(lm);
                                    var now = new Date();
                                    var origin = null;
                                    if (now - lmDate > 1000 * 60 * 60 * 24 * 3) {
                                        //modified
                                        origin = webyclipProtocol + '://' + webyclipRoot.split('/')[0];
                                        showFrame(webyclipBaseUrl + '/webyclip.php?_m=frame' + getRequestData(prodIndex) + encodeIf('_mdid', mediaId) + encodeIf('_up', webyclipBaseUrl) + encodeIf('origin', window.webyclipOrigin) + encodeIf('_p3', productExternalId[prodIndex]) + encodeIf('_p5', webyclipAnalyticsData) + encodeIf('_p2', productSubCategory[prodIndex]) + encodeIf('_hp', webyclipHasPrivateVideos) + encodeIf('_io', webyclipIsOwnerPage) + encodeIf('_ui', webyclipUILocale) + encodeIf('_es', (webyclipEnableShare) ? '1' : '0') + encodeIf('_csl', webyclipCustomShareLink) + encodeIf('_cst', webyclipCustomShareTitle) + encodeIf('_csc', webyclipCustomShareCaption) + encodeIf('_csd', webyclipCustomShareDescription) + encodeIf('_dsl', (webyclipIsDirectShareLink) ? '1' : '0') + encodeIf('_nss', (needToSimulateSponsored) ? '1' : '0'), origin, prodIndex);
                                    }
                                    else {
                                        //valid
                                        origin = webyclipCdnPrefixUrl;
                                        showFrame(webyclipCdnPrefixUrl + '/wc-frame-' + productId[prodIndex] + '?q=q' + encodeIf('_srcu', window.location) + encodeIf('_mdid', mediaId) + encodeIf('_up', webyclipBaseUrl) + encodeIf('origin', window.webyclipOrigin) + encodeIf('_p3', productExternalId[prodIndex]) + encodeIf('_p5', webyclipAnalyticsData) + encodeIf('_p2', productSubCategory[prodIndex]) + encodeIf('_hp', webyclipHasPrivateVideos) + encodeIf('_io', webyclipIsOwnerPage) + encodeIf('_ui', webyclipUILocale) + encodeIf('_es', (webyclipEnableShare) ? '1' : '0') + encodeIf('_csl', webyclipCustomShareLink) + encodeIf('_cst', webyclipCustomShareTitle) + encodeIf('_csc', webyclipCustomShareCaption) + encodeIf('_csd', webyclipCustomShareDescription) + encodeIf('_dsl', (webyclipIsDirectShareLink) ? '1' : '0') + encodeIf('_nss', (needToSimulateSponsored) ? '1' : '0'), origin, prodIndex);
                                    }
                                });
                                req.fail(function(jqXHR, textStatus, errorThrown) {
                                    //not exists
                                    var origin = webyclipProtocol + '://' + webyclipRoot.split('/')[0];
                                    showFrame(webyclipBaseUrl + '/webyclip.php?_m=frame' + getRequestData(prodIndex) + encodeIf('_mdid', mediaId) + encodeIf('_up', webyclipBaseUrl) + encodeIf('origin', window.webyclipOrigin) + encodeIf('_p3', productExternalId[prodIndex]) + encodeIf('_p5', webyclipAnalyticsData) + encodeIf('_p2', productSubCategory[prodIndex]) + encodeIf('_hp', webyclipHasPrivateVideos) + encodeIf('_io', webyclipIsOwnerPage) + encodeIf('_ui', webyclipUILocale) + encodeIf('_es', (webyclipEnableShare) ? '1' : '0') + encodeIf('_csl', webyclipCustomShareLink) + encodeIf('_cst', webyclipCustomShareTitle) + encodeIf('_csc', webyclipCustomShareCaption) + encodeIf('_csd', webyclipCustomShareDescription) + encodeIf('_dsl', (webyclipIsDirectShareLink) ? '1' : '0') + encodeIf('_nss', (needToSimulateSponsored) ? '1' : '0'), origin, prodIndex);
                                });
                            }
                            else {
                                var origin = webyclipProtocol + '://' + webyclipRoot.split('/')[0];
                                showFrame(webyclipBaseUrl + '/webyclip.php?_m=frame' + getRequestData(prodIndex) + encodeIf('_mdid', mediaId) + encodeIf('_up', webyclipBaseUrl) + encodeIf('origin', window.webyclipOrigin) + encodeIf('_p3', productExternalId[prodIndex]) + encodeIf('_p5', webyclipAnalyticsData) + encodeIf('_p2', productSubCategory[prodIndex]) + encodeIf('_hp', webyclipHasPrivateVideos) + encodeIf('_io', webyclipIsOwnerPage) + encodeIf('_ui', webyclipUILocale) + encodeIf('_es', (webyclipEnableShare) ? '1' : '0') + encodeIf('_csl', webyclipCustomShareLink) + encodeIf('_cst', webyclipCustomShareTitle) + encodeIf('_csc', webyclipCustomShareCaption) + encodeIf('_csd', webyclipCustomShareDescription) + encodeIf('_dsl', (webyclipIsDirectShareLink) ? '1' : '0') + encodeIf('_nss', (needToSimulateSponsored) ? '1' : '0'), origin, prodIndex);
                            }
                        },
                        onBeforeClose: function() {
                            var prodIndex = this.getTrigger().attr('data-prod-index');
                            flashPlayedMediaDuration(prodIndex);
                            $('#webyclipFrame').html("");
                            if (useMask) {
                                $("#wcOverlayMask").hide();
                            }
                        }
                    });

            if ($('#webyclipBuyNow').length > 0) {
                $('#webyclipBuyNow').click(function() {
                    currentOverlay.close();
                });
            }

            $(document).mouseup(function(e) {
                if (currentOverlay != null && currentOverlay.isOpened()) {
                    var container = $("#webyclipOverlay");

                    if (container.has(e.target).length === 0) {
                        currentOverlay.close();
                    }
                }
            });
        };
        var connectReportOverlayToLinks = function(targetId) {
            // use fixed layout when not in quirks mode
            var useFixedLayout = $.support.boxModel;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                useFixedLayout = false;
            }

            $('#' + targetId + ' .webyclip-report-button-link').overlay(
                    {
                        fixed: useFixedLayout,
                        onBeforeLoad: function() {
                            currentReportOverlay = this;
                            var mediaId = this.getTrigger().attr('data-media-id') || null;
                            var prodIndex = this.getTrigger().attr('data-prod-index') || null;
                        },
                        onBeforeClose: function() {
                            var prodIndex = this.getTrigger().attr('data-prod-index');

                        }
                    });
            $(document).mouseup(function(e) {
                if (currentReportOverlay != null && currentReportOverlay.isOpened()) {
                    var container = $("#webyclipReportOverlay");

                    if (container.has(e.target).length === 0) {
                        currentReportOverlay.close();
                    }
                }
            });
        };
        var initLink = function(showLink, showAddMediaButton, profile, $target, prodIndex) {

            ensureOverlay(prodIndex);
            if (showLink) {
                $target.append('<a id="webyclipButtonLink" class="webyclip-button-link" data-prod-index="' + prodIndex + '" data-media-index="0" rel="#webyclipOverlay" href="#">' + currentLinkHtml[prodIndex] + '</a>');
                connectOverlayToLinks($target.attr('id'), profile);
            }
            if (showAddMediaButton) {
                var addMediaText = profile._addMediaText || '<img src="' + webyclipCdnCodeBaseUrl + '/add-media.png" style="vertical-align: top; text-decoration: none; border: 0 none;">Add Photos/Video';
                $target.append('<a class="webyclipAddMediaLink" href="javascript: void 0" style="color: #3C5897; display: block;  padding-left: 3px; padding-right: 3px; margin: 1px; font-weight: bold; text-decoration: none; cursor: auto; font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif; font-size: 12px;">' + addMediaText + '</a>');
            }
            if (window.webyclipIsOwnerPage) {
                var addPrivateMediaText = '<img src="' + webyclipCdnCodeBaseUrl + '/add-media.png" style="vertical-align: top; text-decoration: none; border: 0 none;">Add Owner Video';
                $target.append('<a class="webyclipAddPrivateMediaLink" href="javascript: void 0" style="color: #3C5897; display: block;  padding-left: 3px; padding-right: 3px; margin: 1px; font-weight: bold; text-decoration: none; cursor: auto; font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif; font-size: 12px;">' + addPrivateMediaText + '</a>');
            }
        };

        var bounce = function(playSound) {
            if (playSound) {
                $("#wc_notification").trigger("play");
            }
            if ($(".wc-smart-phone .wc-content-marker").size() > 0) {
                $(".wc-smart-phone .wc-content-marker")
                        .animate({bottom: '47px'}, 'fast')
                        .animate({bottom: '13px'}, 'fast')
                        .animate({bottom: '30px'}, 'fast')
                        .animate({bottom: '13px'}, 'fast')
                        .animate({bottom: '20px'}, 'fast')
                        .animate({bottom: '13px'}, 'fast')
                        .animate({bottom: '17px'}, 'fast')
                        .animate({bottom: '13px'}, 'fast');
            }
            else {
                $(".wc-content-marker")
                        .animate({bottom: '70px'}, 'fast')
                        .animate({bottom: '20px'}, 'fast')
                        .animate({bottom: '45px'}, 'fast')
                        .animate({bottom: '20px'}, 'fast')
                        .animate({bottom: '35px'}, 'fast')
                        .animate({bottom: '20px'}, 'fast')
                        .animate({bottom: '25px'}, 'fast')
                        .animate({bottom: '20px'}, 'fast');
            }
        };
        var closeU = function() {
            if ($(".wc-smart-phone .wc-thumb-container").size() > 0) {
                //$(".wc-thumb-container").animate({ height: '70px'},'fast', function() {
                $(".wc-thumb-container").hide();
                //});
            }
            else {
                $(".wc-thumb-container").animate({height: '105px'}, 'fast', function() {
                    $(".wc-thumb-container").hide();
                });
            }
        };
        var closeR = function() {
            if ($(".wc-smart-phone .wc-thumb-container").size() > 0) {
                //$(".wc-thumb-container").animate({ width: '93px'},'fast', function() {
                $(".wc-thumb-container").hide();
                //});
            }
            else {
                $(".wc-thumb-container").animate({width: '140px'}, 'fast', function() {
                    $(".wc-thumb-container").hide();
                });
            }
        };
        var closeL = function() {
            if ($(".wc-smart-phone .wc-thumb-container").size() > 0) {
                $(".wc-thumb-container").hide();
            }
            else {
                $(".wc-thumb-container").animate({width: '140px'}, 'fast', function() {
                    $(".wc-thumb-container").hide();
                });
            }
        };
        var openU = function() {
            if ($(".wc-smart-phone .wc-thumb-container").size() > 0) {
                $(".wc-thumb-container").css('height', '400px').show();
            }
            else {
                $(".wc-thumb-container").css('height', '105px').show();
                $(".wc-thumb-container").animate({height: '600px'}, 'fast');
            }
        };
        var openR = function() {
            if ($(".wc-smart-phone .wc-thumb-container").size() > 0) {
                $(".wc-thumb-container").css('width', '533px').show();
            }
            else {
                $(".wc-thumb-container").css('width', '140px').show();
                $(".wc-thumb-container").animate({width: '800px'}, 'fast');
            }
        };
        var openL = function() {
            if ($(".wc-smart-phone .wc-thumb-container").size() > 0) {
                $(".wc-thumb-container").css('width', '600px').show();
            }
            else {
                $(".wc-thumb-container").css('width', '140px').show();
                $(".wc-thumb-container").animate({width: '800px'}, 'fast');
            }
        };
        var startWebyClip = function(data, prodIndex) {
            // make sure we got data
            if (typeof data.data != 'undefined' && data.data != null) {
                // make sure we don't need to refresh
                if (data.data.forcePluginRefresh) {
                    if ((typeof (window.webyclipRefreshedOnce) == "undefined" || !window.webyclipRefreshedOnce)) {
                        window.webyclipRefreshedOnce = true;
                        var tag = document.createElement('script');
                        tag.setAttribute("type", "text/javascript");
                        tag.setAttribute("src", webyclipBaseUrl + "/WebyClipPlugin.js?dummy=" + String(Math.random()));
                        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(tag);
                        return;
                    }
                    else {
                        wbDebug("WEBYCLIP: Versions infinite refresh detected. Aborting plugin load.");
                        return;
                    }
                }

                if (typeof (window.webyclipData) === 'undefined') {
                    window.webyclipData = [];
                }
                window.webyclipData[prodIndex] = data;
                // load modules if any
                if (typeof data.modules != 'undefined' && data.modules != null && data.modules.length > 0) {
                    $.each(data.modules, function(idx, val) {

                        try {
                            if (typeof val.url != 'undefined' && val.url != null) {
                                loadScript(val.url, function() {
                                    if (typeof val.initMethod != 'undefined' && val.initMethod != null) {
                                        window[val.initMethod]($, prodIndex);
                                    }
                                });
                            }
                            else if (typeof val.body != 'undefined' && val.body != null) {
                                var modF = new Function("$", "prodIndex", val.body);
                                modF($, prodIndex);
                            }
                        }
                        catch (e) {
                            wbDebug('Unable to load module, error: ' + e);
                        }
                    });
                }

                currentSession = data.data.session;

                productId[prodIndex] = data.data._pid;
                siteId = data.data.site._id;
                //var analyticsFrameUrl = webyclipCdnCodeBaseUrl + '/WebyClipAnalytics.html?origin=' + window.webyclipOrigin + '&siteId=' + siteId + '&prodId=' + productId[prodIndex] + '&p1=' + encodeURIComponent(productCategory[prodIndex]) + '&p2=' + encodeURIComponent(productSubCategory[prodIndex]) + '&p3=' + encodeURIComponent(productExternalId[prodIndex]) + '&p4=' + encodeURIComponent(productName[prodIndex]) + '&p5=' + encodeURIComponent(webyclipAnalyticsData);
                //$('BODY').append("<iframe id='webyclipAnalytics" + prodIndex + "' frameBorder='0' style='background-color:#FFFFFF;width:0px;height:0px;border-style:none;display: none;z-index:0;' src='" + analyticsFrameUrl + "'></iframe>");

                var analyticsNGFrameUrl = webyclipCdnCodeBaseSslUrl + '/WebyClipAnalyticsNG.html?v=14&origin=' + window.webyclipOrigin + '&ref=' + encodeURIComponent(location.href) + '&siteKey=' + currentSiteKey + '&siteId=' + siteId + '&prodId=' + productId[prodIndex] + '&p1=' + encodeURIComponent(productCategory[prodIndex]) + '&p2=' + encodeURIComponent(productSubCategory[prodIndex]) + '&p3=' + encodeURIComponent(productExternalId[prodIndex]) + '&p4=' + encodeURIComponent(productName[prodIndex]) + '&p5=' + encodeURIComponent(webyclipAnalyticsData);
                $('BODY').append("<iframe id='webyclipAnalyticsNG" + prodIndex + "' frameBorder='0' style='background-color:#FFFFFF;width:0px;height:0px;border-style:none;display: none;z-index:0;' src='" + analyticsNGFrameUrl + "'></iframe>");
                if (typeof (webyclipAnalyticsNGIframe) == 'undefined') {
                    window.webyclipAnalyticsNGIframe = [];
                }
                window.webyclipAnalyticsNGIframe[prodIndex] = false;
                $('#webyclipAnalyticsNG' + prodIndex).load(function() {
                    window.webyclipAnalyticsNGIframe[prodIndex] = true;
                });

                var profile = data.data.profile;
                showBuyNow = profile._sihowBuyNow;

                isAbTest[prodIndex] = (data.data.abtest == 1 || data.data.abtest == true);
                wbDebug("ABTEST:" + data.data.abtest + ", SHOWLINK:" + data.data.showLink);
                showLink[prodIndex] = data.data.showLink && !isAbTest[prodIndex] && data.data.medias.length > 0;

                initCallForAction(prodIndex);

                var wcEmbededText = '';
                var addMediaText = '';
                var addPrivateMediaText = '';
                hasLinkToShow[prodIndex] = false;
                if (webyclipWidgetMode == "commerce") {
                    if (showLink[prodIndex] || data.data.showAddMediaButton || window.webyclipIsOwnerPage) {
                        if (profile != null && profile._showThumb == 1 && typeof (data.data.medias) != "undefined" && data.data.medias != null && data.data.medias.length > 0) {
                            hasLinkToShow[prodIndex] = true;
                            if (useEmbedded[prodIndex]) {
                                wcEmbededText = getYTEmbededIframeHtml(embeddedWidth[prodIndex], embeddedHeight[prodIndex], data.data.medias[0]._sourceKey, data.data.medias[0]._id, window.webyclipOrigin, prodIndex, data.data._pid, '0', '0', 0, (typeof(data.data.medias[0].privateMedia) != 'undefined' && data.data.medias[0].privateMedia), (typeof(data.data.medias[0].sponsoredMedia) != 'undefined' && data.data.medias[0].sponsoredMedia));
                                wcEmbededText += '<div style="width: ' + embeddedWidth[prodIndex] + 'px;">';
                                if (data.data.showAddMediaButton && profile._showAddVideo) {
                                    addMediaText = profile._addMediaText || '<img src="' + webyclipCdnCodeBaseUrl + '/add-media.png" style="vertical-align: top; text-decoration: none; border: 0 none;">Add Photos/Video';
                                    wcEmbededText += '<a class="webyclipAddMediaLink" href="javascript: void 0" style="color: #3C5897;padding-left: 3px; padding-right: 3px; margin: 1px; font-weight: bold; text-decoration: none; cursor: auto; font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif; font-size: 12px;">' + addMediaText + '</a>';
                                }
                                if (window.webyclipIsOwnerPage) {
                                    addPrivateMediaText = '<img src="' + webyclipCdnCodeBaseUrl + '/add-media.png" style="vertical-align: top; text-decoration: none; border: 0 none;">Add Owner Video';
                                    wcEmbededText += '<a class="webyclipAddPrivateMediaLink" href="javascript: void 0" style="color: #3C5897; display: block;  padding-left: 3px; padding-right: 3px; margin: 1px; font-weight: bold; text-decoration: none; cursor: auto; font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif; font-size: 12px;">' + addPrivateMediaText + '</a>';
                                }
                                if (data.showAdmin) {
                                    ensureOverlay(prodIndex);
                                    wcEmbededText += '<a class="webyclip-button-link" href="javascript: void 0" style="color: #3C5897;padding-left: 3px; padding-right: 3px; margin: 1px; font-weight: bold; text-decoration: none; cursor: auto; font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif; font-size: 12px;" data-prod-index="' + prodIndex + '" data-media-index="0" rel="#webyclipOverlay"><img src="' + webyclipCdnCodeBaseUrl + '/add-media.png" style="vertical-align: top; text-decoration: none; border: 0 none;">Show All Videos</a>';
                                }
                                if (window.webyclipData[prodIndex].data.profile._showReportAbuse) {
                                    ensureReportOverlay(prodIndex);
                                    wcEmbededText += '<a class="webyclip-report-button-link" href="javascript: void 0" style="float:right;color: #3C5897!important;padding-left: 3px; padding-right: 3px; margin: 1px; font-weight: bold; text-decoration: none; cursor: auto; font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif!important; font-size: 12px!important;z-index: 200;position: relative;" data-prod-index="' + prodIndex + '" data-media-index="0" data-media-id="' + window.webyclipData[prodIndex].data.medias[0]._id + '" data-media-source-id="' + window.webyclipData[prodIndex].data.medias[0]._sourceId + '" data-media-source-key="' + window.webyclipData[prodIndex].data.medias[0]._sourceKey + '" rel="#webyclipReportOverlay"><img src="' + webyclipCdnCodeBaseUrl + '/flag-gray.png" style="vertical-align: top; text-decoration: none; border: 0 none;">Report</a>';
                                }
                                wcEmbededText += "<div id='webyclipDisclaimerInline' style='/*width: " + (embeddedWidth[prodIndex] - 70) + "px;*/'>" + (window.webyclipData[prodIndex].data.profile.disclaimerHtml || "") + "</div>";
                                wcEmbededText += '</div>';
                                ((window.$webyclipContainers.size() > 0) ? $(window.$webyclipContainers[prodIndex]) : $('#webyclipButtonContainer')).html(wcEmbededText);
                                registerToYTEmbededMessages();
                                if (data.showAdmin) {
                                    connectOverlayToLinks(((window.$webyclipContainers.size() > 0) ? $(window.$webyclipContainers[prodIndex]) : $('#webyclipButtonContainer')).attr('id'), profile);
                                }
                                if (window.webyclipData[prodIndex].data.profile._showReportAbuse) {
                                    connectReportOverlayToLinks(((window.$webyclipContainers.size() > 0) ? $(window.$webyclipContainers[prodIndex]) : $('#webyclipButtonContainer')).attr('id'));
                                }
                            }
                            else {
                                if (typeof(profile._customTragetId) != 'undefined') {
                                    ensureOverlay(prodIndex);
                                    connectOverlayToLinks(profile._customTragetId, profile);
                                }
                                else {
                                    carouselHtml[prodIndex] = getCarouselHtml(data.data.medias, prodIndex);
                                    initCarousel(profile, data.data.medias.length, data.data.showAddMediaButton, ((window.$webyclipContainers.size() > 0) ? $(window.$webyclipContainers[prodIndex]) : $('#webyclipButtonContainer')), prodIndex);
                                }
                                setTimeout(function() {
                                    var hash = location.hash;
                                    if (hash.startsWith('#wc:')) {
                                        var media_id = hash.substring(4);
                                        var mediaSourceId = null;
                                        var mediaSourceKey = null;
                                        var mediaHtmlLink = $("a[data-media-id='" + media_id + "']");
                                        if (mediaHtmlLink.length > 0) {
                                            mediaSourceId = mediaHtmlLink.attr("data-media-source-id");
                                            mediaSourceKey = mediaHtmlLink.attr("data-media-source-key");
                                        }
                                        postAnalyticsMessageNG(prodIndex, JSON.stringify({
                                            "messageType": "event",
                                            "eventName": "FBFromShare",
                                            "eventData": {
                                                "mediaId": media_id,
                                                "mediaSourceId": mediaSourceId,
                                                "mediaSourceKey": mediaSourceKey
                                            }
                                        }));
                                        $("a[data-media-id='" + media_id + "']").click();
                                    }
                                }, 0);
                            }
                        }
                        else {
                            if (profile != null && profile._linkText != null) {
                                linkText[prodIndex] = profile._linkText;
                                if (typeof (webyclipLinkTextOverride) != 'undefined' && webyclipLinkTextOverride != null) {
                                    linkText[prodIndex] = webyclipLinkTextOverride;
                                }
                                currentLinkHtml[prodIndex] = linkText[prodIndex];
                            }
                            hasLinkToShow[prodIndex] = true;
                            if (useEmbedded[prodIndex]) {
                                wcEmbededText = '<iframe width="' + embeddedWidth[prodIndex] + '" height="' + embeddedHeight[prodIndex] + '" src="' + (location.protocol.startsWith('http') ? '' : 'http:') + '//www.youtube.com/embed/' + data.data.medias[0]._sourceKey + '?rel=0&iv_load_policy=3" frameborder="0" allowfullscreen=""></iframe>';
                                wcEmbededText += '<div style="width: ' + embeddedWidth[prodIndex] + 'px;">';
                                if (data.data.showAddMediaButton) {
                                    addMediaText = profile._addMediaText || '<img src="' + webyclipCdnCodeBaseUrl + '/add-media.png" style="vertical-align: top; text-decoration: none; border: 0 none;">Add Photos/Video';
                                    wcEmbededText += '<a class="webyclipAddMediaLink" href="javascript: void 0" style="color: #3C5897; padding-left: 3px; padding-right: 3px; margin: 1px; font-weight: bold; text-decoration: none; cursor: auto; font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif; font-size: 12px;">' + addMediaText + '</a>';
                                }
                                if (window.webyclipIsOwnerPage) {
                                    addPrivateMediaText = '<img src="' + webyclipCdnCodeBaseUrl + '/add-media.png" style="vertical-align: top; text-decoration: none; border: 0 none;">Add Owner Video';
                                    wcEmbededText += '<a class="webyclipAddPrivateMediaLink" href="javascript: void 0" style="color: #3C5897; display: block;  padding-left: 3px; padding-right: 3px; margin: 1px; font-weight: bold; text-decoration: none; cursor: auto; font-family: \'lucida grande\',tahoma,verdana,arial,sans-serif; font-size: 12px;">' + addPrivateMediaText + '</a>';
                                }
                                wcEmbededText += "<div id='webyclipDisclaimerInline'>" + (window.webyclipData[prodIndex].data.profile.disclaimerHtml || "") + "</div>";
                                wcEmbededText += '</div>';
                                ((window.$webyclipContainers.size() > 0) ? $(window.$webyclipContainers[prodIndex]) : $('#webyclipButtonContainer')).html(wcEmbededText);
                            }
                            else {
                                initLink(showLink[prodIndex], data.data.showAddMediaButton, profile, ((window.$webyclipContainers.size() > 0) ? $(window.$webyclipContainers[prodIndex]) : $('#webyclipButtonContainer')), prodIndex);
                            }
                        }
                    }
                }
                else if (webyclipWidgetMode == "content") {
                    if (showLink[prodIndex] || data.data.showAddMediaButton) {
                        if (profile != null && profile._showThumb == 1 && typeof (data.data.medias) != "undefined" && data.data.medias != null && data.data.medias.length > 0) {
                            $("head").append(
                                    "<style type='text/css'>\n\
	.wc-content-marker img { width: 129px; height: 89px;}\n\
           div.wc-fixed-position-marker { position: fixed; z-index: 2000; width: 130px; height: 90px; cursor: pointer; }\n\
	div.wc-fixed-position-pannel { position: fixed; z-index: 1999; background-color: #FFFFFF; border-style: solid; border-color: #aaa; border-width: 1px; 	}\n\
	div.open-u {width: 140px; height: 600px; background-repeat: repeat-x; /* Safari 4-5, Chrome 1-9 */ background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ddd), to(#fff)); /* Safari 5.1, Chrome 10+ */ background: -webkit-linear-gradient(top, #ddd, #fff); /* Firefox 3.6+ */ background: -moz-linear-gradient(top, #ddd, #fff); /* IE 10 */ background: -ms-linear-gradient(top, #ddd, #fff); /* Opera 11.10+ */ background: -o-linear-gradient(top, #ddd, #fff);}\n\
	div.open-l {width: 800px; height: 105px; background-repeat: repeat-y; /* Safari 4-5, Chrome 1-9 */ background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ddd), to(#fff)); /* Safari 5.1, Chrome 10+ */ background: -webkit-linear-gradient(left, #ddd, #fff); /* Firefox 3.6+ */ background: -moz-linear-gradient(left, #ddd, #fff); /* IE 10 */ background: -ms-linear-gradient(left, #ddd, #fff); /* Opera 11.10+ */ background: -o-linear-gradient(left, #ddd, #fff);}\n\
	div.open-r {width: 800px; height: 105px; background-repeat: repeat-y; /* Safari 4-5, Chrome 1-9 */ background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ddd), to(#fff)); /* Safari 5.1, Chrome 10+ */ background: -webkit-linear-gradient(left, #ddd, #fff); /* Firefox 3.6+ */ background: -moz-linear-gradient(left, #ddd, #fff); /* IE 10 */ background: -ms-linear-gradient(left, #ddd, #fff); /* Opera 11.10+ */ background: -o-linear-gradient(left, #ddd, #fff);}\n\
	div.wc-fixed-marker-s-e {  bottom: 20px; right: 20px; }\n\
	div.wc-fixed-pannel-s-e {  bottom: 15px; right: 20px; }\n\
	div.wc-fixed-marker-s-w {  bottom: 20px; left: 20px; }\n\
	div.wc-fixed-pannel-s-w {  bottom: 15px; left: 15px; }\n\
@media only screen and (min-device-width : 320px) and (max-device-width : 550px) {\n\
           .wc-content-marker img { width: 86px; height: 60px;}\n\
           div.wc-fixed-position-marker { position: fixed; z-index: 2000; width: 87px; height: 60px; cursor: pointer; }\n\
	div.wc-fixed-position-pannel { position: fixed; z-index: 1999; background-color: #FFFFFF; border-style: solid; border-color: #aaa; border-width: 1px; 	}\n\
	div.open-u {width: 93px; height: 400px; background-repeat: repeat-x; /* Safari 4-5, Chrome 1-9 */ background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ddd), to(#fff)); /* Safari 5.1, Chrome 10+ */ background: -webkit-linear-gradient(top, #ddd, #fff); /* Firefox 3.6+ */ background: -moz-linear-gradient(top, #ddd, #fff); /* IE 10 */ background: -ms-linear-gradient(top, #ddd, #fff); /* Opera 11.10+ */ background: -o-linear-gradient(top, #ddd, #fff);}\n\
	div.open-l {width: 533px; height: 70px; background-repeat: repeat-y; /* Safari 4-5, Chrome 1-9 */ background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ddd), to(#fff)); /* Safari 5.1, Chrome 10+ */ background: -webkit-linear-gradient(left, #ddd, #fff); /* Firefox 3.6+ */ background: -moz-linear-gradient(left, #ddd, #fff); /* IE 10 */ background: -ms-linear-gradient(left, #ddd, #fff); /* Opera 11.10+ */ background: -o-linear-gradient(left, #ddd, #fff);}\n\
	div.open-r {width: 533px; height: 70px; background-repeat: repeat-y; /* Safari 4-5, Chrome 1-9 */ background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ddd), to(#fff)); /* Safari 5.1, Chrome 10+ */ background: -webkit-linear-gradient(left, #ddd, #fff); /* Firefox 3.6+ */ background: -moz-linear-gradient(left, #ddd, #fff); /* IE 10 */ background: -ms-linear-gradient(left, #ddd, #fff); /* Opera 11.10+ */ background: -o-linear-gradient(left, #ddd, #fff);}\n\
	div.wc-fixed-marker-s-e {  bottom: 13px; right: 13px; }\n\
	div.wc-fixed-pannel-s-e {  bottom: 10px; right: 13px; }\n\
	div.wc-fixed-marker-s-w {  bottom: 13px; left: 13px; }\n\
	div.wc-fixed-pannel-s-w {  bottom: 10px; left: 10px; }\n\
}\n\
</style>");
                            //var dirL = webyclipContentDirection.toLowerCase();
                            var contentPositionL = webyclipContentMarkerPosition.toLowerCase();
                            var openDirectionL = webyclipContentOpenDirection.toLowerCase();
                            $('BODY').append("<div data-role='button' data-opened='false' data-state='close' class='wc-fixed-position-marker wc-fixed-marker-" + contentPositionL + " wc-content-marker'><img src='" + webyclipCdnCodeBaseUrl + "/logo-marker-new.png' title='Webyclip Content' /><audio src='" + webyclipCdnCodeBaseUrl + "/Notification.mp3' id='wc_notification'></audio></div><div id='webyclipContentPannel' class='wc-fixed-position-pannel wc-fixed-pannel-" + contentPositionL + " wc-thumb-container open-" + openDirectionL + "'></div>");
                            if ($(window).width() >= 320 && $(window).width() <= 550) {
                                $('BODY').addClass('wc-smart-phone');
                            }
                            $(".wc-content-marker").click(function() {
                                if ($(this).attr('data-state') == 'open') {
                                    $(this).attr('data-state', 'close');
                                    switch (openDirectionL) {
                                        case 'u':
                                            closeU();
                                            break;
                                        case 'r':
                                            closeR();
                                            break;
                                        case 'l':
                                            closeL();
                                            break;
                                    }
                                }
                                else {
                                    $(this).attr('data-state', 'open');
                                    $(this).attr('data-opened', 'true');
                                    switch (openDirectionL) {
                                        case 'u':
                                            openU();
                                            break;
                                        case 'r':
                                            openR();
                                            break;
                                        case 'l':
                                            openL();
                                            break;
                                    }
                                }
                            });
                            carouselHtml[prodIndex] = getCarouselHtml(data.data.medias, prodIndex);
                            initCarousel(profile, data.data.medias.length, data.data.showAddMediaButton, $('.wc-fixed-position-pannel'), prodIndex);
                            $(".wc-thumb-container").hide();
                            bounce(true);
                            (function defredBounce(timeout) {
                                setTimeout(function() {
                                    var state = $(".wc-content-marker").attr("data-opened");
                                    if (state != 'true') {
                                        bounce(false);
                                        defredBounce(timeout * 2);
                                    }
                                }, timeout);
                            })(10000);
                        }
                    }
                }
                var $target = ((window.$webyclipContainers.size() > 0) ? $(window.$webyclipContainers[prodIndex]) : $('#webyclipButtonContainer'));
                $("#" + $target.attr('id') + " .webyclipAddMediaLink").click(function() {
                    var x = screen.width / 2 - 720 / 2;
                    var y = screen.height / 2 - 465 / 2;
                    var dse = '';
                    if (data.showAdmin) {
                        dse = encodeURIComponent(data.data.dse);
                    }
                    window.open(webyclipBaseUrl + '/addmedia.php?_m=default&_dse=' + dse + getRequestData(prodIndex), "webyclipAddMedia", "top=" + y + ",left=" + x + ",status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,height=465,width=720", false);
                    return false;
                });
                $("#" + $target.attr('id') + " .webyclipAddPrivateMediaLink").click(function() {
                    var x = screen.width / 2 - 720 / 2;
                    var y = screen.height / 2 - 465 / 2;
                    var dse = '';
                    if (data.showAdmin) {
                        dse = encodeURIComponent(data.data.dse);
                    }
                    var p5 = encodeURIComponent(webyclipAnalyticsData);
                    window.open(webyclipBaseUrl + '/addmedia.php?_m=default&_p5=' + p5 + '&_dse=' + dse + getRequestData(prodIndex), "webyclipAddMedia", "top=" + y + ",left=" + x + ",status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,height=465,width=720", false);
                    return false;
                });
                if (!window.webyclipShowAnyway && (window.$webyclipContainers.size() > 0)) {
                    var allDone = true;
                    for (var i = 0; i < hasLinkToShow.length; i++) {
                        allDone = allDone && hasLinkToShow[i];
                    }
                    if (allDone) {
                        window.$webyclipContainers.show();
                        for (var i = 0; i < hasLinkToShow.length; i++) {
                            var metadataUserLoggedIn = (window.webyclipLogin) ? true : false;
                            var metadataCdnUsed = (window.isCdnUsed[i]) ? true : false;
                            var metadataHasLinkToShow = hasLinkToShow[i];
                            var metadataShowThumbnails = (window.webyclipData[i].data.profile._showThumb == 1);
                            var metadataThumbnailsCount = (metadataShowThumbnails) ? (window.webyclipData[i].data.medias.length) : 0;
                            var metadataIsABTesting = webyclipIsABTesting;
                            var metadataABGroup = webyclipABGroup;
                            postAnalyticsMessageNG(i, JSON.stringify({
                                "messageType": "metadata",
                                "userLoggedIn": metadataUserLoggedIn,
                                "cdnUsed": metadataCdnUsed,
                                "hasLinkToShow": metadataHasLinkToShow,
                                "showThumbnails": metadataShowThumbnails,
                                "thumbnailsCount": metadataThumbnailsCount,
                                "isABTesting": metadataIsABTesting,
                                "ABGroup": metadataABGroup

                            }));
                        }
                    }
                }
                else {
                    var metadataUserLoggedIn = (window.webyclipLogin) ? true : false;
                    var metadataCdnUsed = (window.isCdnUsed[prodIndex]) ? true : false;
                    var metadataHasLinkToShow = hasLinkToShow[prodIndex];
                    var metadataShowThumbnails = (window.webyclipData[prodIndex].data.profile._showThumb == 1);
                    var metadataThumbnailsCount = (metadataShowThumbnails) ? (window.webyclipData[prodIndex].data.medias.length) : 0;
                    var metadataIsABTesting = webyclipIsABTesting;
                    var metadataABGroup = webyclipABGroup;
                    postAnalyticsMessageNG(prodIndex, JSON.stringify({
                        "messageType": "metadata",
                        "userLoggedIn": metadataUserLoggedIn,
                        "cdnUsed": metadataCdnUsed,
                        "hasLinkToShow": metadataHasLinkToShow,
                        "showThumbnails": metadataShowThumbnails,
                        "thumbnailsCount": metadataThumbnailsCount,
                        "isABTesting": metadataIsABTesting,
                        "ABGroup": metadataABGroup
                    }));
                }
                // Log we were there, only if we really get the answer back
                postStat(100, null, null, null, prodIndex);

                //                $(window).unload(function() {
                //                    postStat(500, null);
                //                });
            }
        };

        /***** jcarousel *****/
        // Default configuration properties.
        var defaults = {
            vertical: false,
            rtl: false,
            start: 1,
            offset: 1,
            size: null,
            scroll: 3,
            visible: null,
            animation: 'normal',
            easing: 'swing',
            auto: 0,
            wrap: null,
            initCallback: null,
            setupCallback: null,
            reloadCallback: null,
            itemLoadCallback: null,
            itemFirstInCallback: null,
            itemFirstOutCallback: null,
            itemLastInCallback: null,
            itemLastOutCallback: null,
            itemVisibleInCallback: null,
            itemVisibleOutCallback: null,
            animationStepCallback: null,
            buttonNextHTML: '<div></div>',
            buttonPrevHTML: '<div></div>',
            buttonNextEvent: 'click',
            buttonPrevEvent: 'click',
            buttonNextCallback: null,
            buttonPrevCallback: null,
            itemFallbackDimension: null
        }, windowLoaded = true;

        $(window).bind('load.jcarousel', function() {
            windowLoaded = true;
        });

        /**
         * The jCarousel object.
         *
         * @constructor
         * @class jcarousel
         * @param e {HTMLElement} The element to create the carousel for.
         * @param o {Object} A set of key/value pairs to set as configuration properties.
         * @cat Plugins/jCarousel
         */
        $.jcarousel = function(e, o) {
            this.options = $.extend({}, defaults, o || {});

            this.locked = false;
            this.autoStopped = false;

            this.container = null;
            this.clip = null;
            this.list = null;
            this.buttonNext = null;
            this.buttonPrev = null;
            this.buttonNextState = null;
            this.buttonPrevState = null;

            // Only set if not explicitly passed as option
            if (!o || o.rtl === undefined) {
                this.options.rtl = ($(e).attr('dir') || $('html').attr('dir') || '').toLowerCase() == 'rtl';
            }

            this.wh = !this.options.vertical ? 'width' : 'height';
            this.lt = !this.options.vertical ? (this.options.rtl ? 'right' : 'left') : 'top';

            // Extract skin class
            var skin = '', split = e.className.split(' ');

            for (var i = 0; i < split.length; i++) {
                if (split[i].indexOf('jcarousel-skin') != -1) {
                    $(e).removeClass(split[i]);
                    skin = split[i];
                    break;
                }
            }

            if (e.nodeName.toUpperCase() == 'UL' || e.nodeName.toUpperCase() == 'OL') {
                this.list = $(e);
                this.clip = this.list.parents('.jcarousel-clip');
                this.container = this.list.parents('.jcarousel-container');
            } else {
                this.container = $(e);
                this.list = this.container.find('ul,ol').eq(0);
                this.clip = this.container.find('.jcarousel-clip');
            }

            if (this.clip.size() === 0) {
                this.clip = this.list.wrap('<div></div>').parent();
            }

            if (this.container.size() === 0) {
                this.container = this.clip.wrap('<div></div>').parent();
            }

            if (skin !== '' && this.container.parent()[0].className.indexOf('jcarousel-skin') == -1) {
                this.container.wrap('<div class=" ' + skin + '"></div>');
            }

            this.buttonPrev = $('.jcarousel-prev', this.container);

            if (this.buttonPrev.size() === 0 && this.options.buttonPrevHTML !== null) {
                this.buttonPrev = $(this.options.buttonPrevHTML).appendTo(this.container);
            }

            this.buttonPrev.addClass(this.className('jcarousel-prev'));

            this.buttonNext = $('.jcarousel-next', this.container);

            if (this.buttonNext.size() === 0 && this.options.buttonNextHTML !== null) {
                this.buttonNext = $(this.options.buttonNextHTML).appendTo(this.container);
            }

            this.buttonNext.addClass(this.className('jcarousel-next'));

            this.clip.addClass(this.className('jcarousel-clip')).css({
                position: 'relative'
            });

            this.list.addClass(this.className('jcarousel-list')).css({
                overflow: 'hidden',
                position: 'absolute',
                top: 0,
                margin: 0,
                padding: 0
            }).css((this.options.rtl ? 'right' : 'left'), 0);

            this.container.addClass(this.className('jcarousel-container')).css({
                position: 'relative'
            });

            if (!this.options.vertical && this.options.rtl) {
                this.container.addClass('jcarousel-direction-rtl').attr('dir', 'rtl');
            }

            var di = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
            var li = this.list.children('li');

            var self = this;

            if (li.size() > 0) {
                var wh = 0, j = this.options.offset;
                li.each(function() {
                    self.format(this, j++);
                    wh += self.dimension(this, di);
                });

                this.list.css(this.wh, (wh + 100) + 'px');

                // Only set if not explicitly passed as option
                if (!o || o.size === undefined) {
                    this.options.size = li.size();
                }
            }

            // For whatever reason, .show() does not work in Safari...
            this.container.css('display', 'block');
            this.buttonNext.css('display', 'block');
            this.buttonPrev.css('display', 'block');

            this.funcNext = function() {
                self.next();
            };
            this.funcPrev = function() {
                self.prev();
            };
            this.funcResize = function() {
                if (self.resizeTimer) {
                    clearTimeout(self.resizeTimer);
                }

                self.resizeTimer = setTimeout(function() {
                    self.reload();
                }, 100);
            };

            if (this.options.initCallback !== null) {
                this.options.initCallback(this, 'init');
            }

            if (!windowLoaded && $.browser.safari) {
                this.buttons(false, false);
                $(window).bind('load.jcarousel', function() {
                    self.setup();
                });
            } else {
                this.setup();
            }
        };

        // Create shortcut for internal use
        var $jc = $.jcarousel;

        $jc.fn = $jc.prototype = {
            jcarousel: '0.2.8'
        };

        $jc.fn.extend = $jc.extend = $.extend;

        $jc.fn.extend({
            /**
             * Setups the carousel.
             *
             * @method setup
             * @return undefined
             */
            setup: function() {
                this.first = null;
                this.last = null;
                this.prevFirst = null;
                this.prevLast = null;
                this.animating = false;
                this.timer = null;
                this.resizeTimer = null;
                this.tail = null;
                this.inTail = false;

                if (this.locked) {
                    return;
                }

                this.list.css(this.lt, this.pos(this.options.offset) + 'px');
                var p = this.pos(this.options.start, true);
                this.prevFirst = this.prevLast = null;
                this.animate(p, false);

                $(window).unbind('resize.jcarousel', this.funcResize).bind('resize.jcarousel', this.funcResize);

                if (this.options.setupCallback !== null) {
                    this.options.setupCallback(this);
                }
            },
            /**
             * Clears the list and resets the carousel.
             *
             * @method reset
             * @return undefined
             */
            reset: function() {
                this.list.empty();

                this.list.css(this.lt, '0px');
                this.list.css(this.wh, '10px');

                if (this.options.initCallback !== null) {
                    this.options.initCallback(this, 'reset');
                }

                this.setup();
            },
            /**
             * Reloads the carousel and adjusts positions.
             *
             * @method reload
             * @return undefined
             */
            reload: function() {
                if (this.tail !== null && this.inTail) {
                    this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + this.tail);
                }

                this.tail = null;
                this.inTail = false;

                if (this.options.reloadCallback !== null) {
                    this.options.reloadCallback(this);
                }

                if (this.options.visible !== null) {
                    var self = this;
                    var di = Math.ceil(this.clipping() / this.options.visible), wh = 0, lt = 0;
                    this.list.children('li').each(function(i) {
                        wh += self.dimension(this, di);
                        if (i + 1 < self.first) {
                            lt = wh;
                        }
                    });

                    this.list.css(this.wh, wh + 'px');
                    this.list.css(this.lt, -lt + 'px');
                }

                this.scroll(this.first, false);
            },
            /**
             * Locks the carousel.
             *
             * @method lock
             * @return undefined
             */
            lock: function() {
                this.locked = true;
                this.buttons();
            },
            /**
             * Unlocks the carousel.
             *
             * @method unlock
             * @return undefined
             */
            unlock: function() {
                this.locked = false;
                this.buttons();
            },
            /**
             * Sets the size of the carousel.
             *
             * @method size
             * @return undefined
             * @param s {Number} The size of the carousel.
             */
            size: function(s) {
                if (s !== undefined) {
                    this.options.size = s;
                    if (!this.locked) {
                        this.buttons();
                    }
                }

                return this.options.size;
            },
            /**
             * Checks whether a list element exists for the given index (or index range).
             *
             * @method get
             * @return bool
             * @param i {Number} The index of the (first) element.
             * @param i2 {Number} The index of the last element.
             */
            has: function(i, i2) {
                if (i2 === undefined || !i2) {
                    i2 = i;
                }

                if (this.options.size !== null && i2 > this.options.size) {
                    i2 = this.options.size;
                }

                for (var j = i; j <= i2; j++) {
                    var e = this.get(j);
                    if (!e.length || e.hasClass('jcarousel-item-placeholder')) {
                        return false;
                    }
                }

                return true;
            },
            /**
             * Returns a jQuery object with list element for the given index.
             *
             * @method get
             * @return jQuery
             * @param i {Number} The index of the element.
             */
            get: function(i) {
                return $('>.jcarousel-item-' + i, this.list);
            },
            /**
             * Adds an element for the given index to the list.
             * If the element already exists, it updates the inner html.
             * Returns the created element as jQuery object.
             *
             * @method add
             * @return jQuery
             * @param i {Number} The index of the element.
             * @param s {String} The innerHTML of the element.
             */
            add: function(i, s) {
                var e = this.get(i), old = 0, n = $(s);

                if (e.length === 0) {
                    var c, j = $jc.intval(i);
                    e = this.create(i);
                    while (true) {
                        c = this.get(--j);
                        if (j <= 0 || c.length) {
                            if (j <= 0) {
                                this.list.prepend(e);
                            } else {
                                c.after(e);
                            }
                            break;
                        }
                    }
                } else {
                    old = this.dimension(e);
                }

                if (n.get(0).nodeName.toUpperCase() == 'LI') {
                    e.replaceWith(n);
                    e = n;
                } else {
                    e.empty().append(s);
                }

                this.format(e.removeClass(this.className('jcarousel-item-placeholder')), i);

                var di = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
                var wh = this.dimension(e, di) - old;

                if (i > 0 && i < this.first) {
                    this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - wh + 'px');
                }

                this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) + wh + 'px');

                return e;
            },
            /**
             * Removes an element for the given index from the list.
             *
             * @method remove
             * @return undefined
             * @param i {Number} The index of the element.
             */
            remove: function(i) {
                var e = this.get(i);

                // Check if item exists and is not currently visible
                if (!e.length || (i >= this.first && i <= this.last)) {
                    return;
                }

                var d = this.dimension(e);

                if (i < this.first) {
                    this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) + d + 'px');
                }

                e.remove();

                this.list.css(this.wh, $jc.intval(this.list.css(this.wh)) - d + 'px');
            },
            /**
             * Moves the carousel forwards.
             *
             * @method next
             * @return undefined
             */
            next: function() {
                if (this.tail !== null && !this.inTail) {
                    this.scrollTail(false);
                } else {
                    this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'last') && this.options.size !== null && this.last == this.options.size) ? 1 : this.first + this.options.scroll);
                }
            },
            /**
             * Moves the carousel backwards.
             *
             * @method prev
             * @return undefined
             */
            prev: function() {
                if (this.tail !== null && this.inTail) {
                    this.scrollTail(true);
                } else {
                    this.scroll(((this.options.wrap == 'both' || this.options.wrap == 'first') && this.options.size !== null && this.first == 1) ? this.options.size : this.first - this.options.scroll);
                }
            },
            /**
             * Scrolls the tail of the carousel.
             *
             * @method scrollTail
             * @return undefined
             * @param b {Boolean} Whether scroll the tail back or forward.
             */
            scrollTail: function(b) {
                if (this.locked || this.animating || !this.tail) {
                    return;
                }

                this.pauseAuto();

                var pos = $jc.intval(this.list.css(this.lt));

                pos = !b ? pos - this.tail : pos + this.tail;
                this.inTail = !b;

                // Save for callbacks
                this.prevFirst = this.first;
                this.prevLast = this.last;

                this.animate(pos);
            },
            /**
             * Scrolls the carousel to a certain position.
             *
             * @method scroll
             * @return undefined
             * @param i {Number} The index of the element to scoll to.
             * @param a {Boolean} Flag indicating whether to perform animation.
             */
            scroll: function(i, a) {
                if (this.locked || this.animating) {
                    return;
                }

                this.pauseAuto();
                this.animate(this.pos(i), a);
            },
            /**
             * Prepares the carousel and return the position for a certian index.
             *
             * @method pos
             * @return {Number}
             * @param i {Number} The index of the element to scoll to.
             * @param fv {Boolean} Whether to force last item to be visible.
             */
            pos: function(i, fv) {
                var pos = $jc.intval(this.list.css(this.lt));

                if (this.locked || this.animating) {
                    return pos;
                }

                if (this.options.wrap != 'circular') {
                    i = i < 1 ? 1 : (this.options.size && i > this.options.size ? this.options.size : i);
                }

                var back = this.first > i;

                // Create placeholders, new list width/height
                // and new list position
                var f = this.options.wrap != 'circular' && this.first <= 1 ? 1 : this.first;
                var c = back ? this.get(f) : this.get(this.last);
                var j = back ? f : f - 1;
                var e = null, l = 0, p = false, d = 0, g;

                while (back ? --j >= i : ++j < i) {
                    e = this.get(j);
                    p = !e.length;
                    if (e.length === 0) {
                        e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                        c[back ? 'before' : 'after' ](e);

                        if (this.first !== null && this.options.wrap == 'circular' && this.options.size !== null && (j <= 0 || j > this.options.size)) {
                            g = this.get(this.index(j));
                            if (g.length) {
                                e = this.add(j, g.clone(true));
                            }
                        }
                    }

                    c = e;
                    d = this.dimension(e);

                    if (p) {
                        l += d;
                    }

                    if (this.first !== null && (this.options.wrap == 'circular' || (j >= 1 && (this.options.size === null || j <= this.options.size)))) {
                        pos = back ? pos + d : pos - d;
                    }
                }

                // Calculate visible items
                var clipping = this.clipping(), cache = [], visible = 0, v = 0;
                c = this.get(i - 1);
                j = i;

                while (++visible) {
                    e = this.get(j);
                    p = !e.length;
                    if (e.length === 0) {
                        e = this.create(j).addClass(this.className('jcarousel-item-placeholder'));
                        // This should only happen on a next scroll
                        if (c.length === 0) {
                            this.list.prepend(e);
                        } else {
                            c[back ? 'before' : 'after' ](e);
                        }

                        if (this.first !== null && this.options.wrap == 'circular' && this.options.size !== null && (j <= 0 || j > this.options.size)) {
                            g = this.get(this.index(j));
                            if (g.length) {
                                e = this.add(j, g.clone(true));
                            }
                        }
                    }

                    c = e;
                    d = this.dimension(e);
                    if (d === 0) {
                        throw new Error('jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...');
                    }

                    if (this.options.wrap != 'circular' && this.options.size !== null && j > this.options.size) {
                        cache.push(e);
                    } else if (p) {
                        l += d;
                    }

                    v += d;

                    if (v >= clipping) {
                        break;
                    }

                    j++;
                }

                // Remove out-of-range placeholders
                for (var x = 0; x < cache.length; x++) {
                    cache[x].remove();
                }

                // Resize list
                if (l > 0) {
                    this.list.css(this.wh, this.dimension(this.list) + l + 'px');

                    if (back) {
                        pos -= l;
                        this.list.css(this.lt, $jc.intval(this.list.css(this.lt)) - l + 'px');
                    }
                }

                // Calculate first and last item
                var last = i + visible - 1;
                if (this.options.wrap != 'circular' && this.options.size && last > this.options.size) {
                    last = this.options.size;
                }

                if (j > last) {
                    visible = 0;
                    j = last;
                    v = 0;
                    while (++visible) {
                        e = this.get(j--);
                        if (!e.length) {
                            break;
                        }
                        v += this.dimension(e);
                        if (v >= clipping) {
                            break;
                        }
                    }
                }

                var first = last - visible + 1;
                if (this.options.wrap != 'circular' && first < 1) {
                    first = 1;
                }

                if (this.inTail && back) {
                    pos += this.tail;
                    this.inTail = false;
                }

                this.tail = null;
                if (this.options.wrap != 'circular' && last == this.options.size && (last - visible + 1) >= 1) {
                    var m = $jc.intval(this.get(last).css(!this.options.vertical ? 'marginRight' : 'marginBottom'));
                    if ((v - m) > clipping) {
                        this.tail = v - clipping - m;
                    }
                }

                if (fv && i === this.options.size && this.tail) {
                    pos -= this.tail;
                    this.inTail = true;
                }

                // Adjust position
                while (i-- > first) {
                    pos += this.dimension(this.get(i));
                }

                // Save visible item range
                this.prevFirst = this.first;
                this.prevLast = this.last;
                this.first = first;
                this.last = last;

                return pos;
            },
            /**
             * Animates the carousel to a certain position.
             *
             * @method animate
             * @return undefined
             * @param p {Number} Position to scroll to.
             * @param a {Boolean} Flag indicating whether to perform animation.
             */
            animate: function(p, a) {
                if (this.locked || this.animating) {
                    return;
                }

                this.animating = true;

                var self = this;
                var scrolled = function() {
                    self.animating = false;

                    if (p === 0) {
                        self.list.css(self.lt, 0);
                    }

                    if (!self.autoStopped && (self.options.wrap == 'circular' || self.options.wrap == 'both' || self.options.wrap == 'last' || self.options.size === null || self.last < self.options.size || (self.last == self.options.size && self.tail !== null && !self.inTail))) {
                        self.startAuto();
                    }

                    self.buttons();
                    self.notify('onAfterAnimation');

                    // This function removes items which are appended automatically for circulation.
                    // This prevents the list from growing infinitely.
                    if (self.options.wrap == 'circular' && self.options.size !== null) {
                        for (var i = self.prevFirst; i <= self.prevLast; i++) {
                            if (i !== null && !(i >= self.first && i <= self.last) && (i < 1 || i > self.options.size)) {
                                self.remove(i);
                            }
                        }
                    }
                };

                this.notify('onBeforeAnimation');

                // Animate
                if (!this.options.animation || a === false) {
                    this.list.css(this.lt, p + 'px');
                    scrolled();
                } else {
                    var o = !this.options.vertical ? (this.options.rtl ? {
                        'right': p
                    } : {
                        'left': p
                    }) : {
                        'top': p
                    };
                    // Define animation settings.
                    var settings = {
                        duration: this.options.animation,
                        easing: this.options.easing,
                        complete: scrolled
                    };
                    // If we have a step callback, specify it as well.
                    if ($.isFunction(this.options.animationStepCallback)) {
                        settings.step = this.options.animationStepCallback;
                    }
                    // Start the animation.
                    this.list.animate(o, settings);
                }
            },
            /**
             * Starts autoscrolling.
             *
             * @method auto
             * @return undefined
             * @param s {Number} Seconds to periodically autoscroll the content.
             */
            startAuto: function(s) {
                if (s !== undefined) {
                    this.options.auto = s;
                }

                if (this.options.auto === 0) {
                    return this.stopAuto();
                }

                if (this.timer !== null) {
                    return;
                }

                this.autoStopped = false;

                var self = this;
                this.timer = window.setTimeout(function() {
                    self.next();
                }, this.options.auto * 1000);
            },
            /**
             * Stops autoscrolling.
             *
             * @method stopAuto
             * @return undefined
             */
            stopAuto: function() {
                this.pauseAuto();
                this.autoStopped = true;
            },
            /**
             * Pauses autoscrolling.
             *
             * @method pauseAuto
             * @return undefined
             */
            pauseAuto: function() {
                if (this.timer === null) {
                    return;
                }

                window.clearTimeout(this.timer);
                this.timer = null;
            },
            /**
             * Sets the states of the prev/next buttons.
             *
             * @method buttons
             * @return undefined
             */
            buttons: function(n, p) {
                if (n == null) {
                    n = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'first') || this.options.size === null || this.last < this.options.size);
                    if (!this.locked && (!this.options.wrap || this.options.wrap == 'first') && this.options.size !== null && this.last >= this.options.size) {
                        n = this.tail !== null && !this.inTail;
                    }
                }

                if (p == null) {
                    p = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != 'last') || this.first > 1);
                    if (!this.locked && (!this.options.wrap || this.options.wrap == 'last') && this.options.size !== null && this.first == 1) {
                        p = this.tail !== null && this.inTail;
                    }
                }

                var self = this;

                if (this.buttonNext.size() > 0) {
                    this.buttonNext.unbind(this.options.buttonNextEvent + '.jcarousel', this.funcNext);

                    if (n) {
                        this.buttonNext.bind(this.options.buttonNextEvent + '.jcarousel', this.funcNext);
                    }

                    this.buttonNext[n ? 'removeClass' : 'addClass'](this.className('jcarousel-next-disabled')).attr('disabled', n ? false : true);

                    if (this.options.buttonNextCallback !== null && this.buttonNext.data('jcarouselstate') != n) {
                        this.buttonNext.each(function() {
                            self.options.buttonNextCallback(self, this, n);
                        }).data('jcarouselstate', n);
                    }
                } else {
                    if (this.options.buttonNextCallback !== null && this.buttonNextState != n) {
                        this.options.buttonNextCallback(self, null, n);
                    }
                }

                if (this.buttonPrev.size() > 0) {
                    this.buttonPrev.unbind(this.options.buttonPrevEvent + '.jcarousel', this.funcPrev);

                    if (p) {
                        this.buttonPrev.bind(this.options.buttonPrevEvent + '.jcarousel', this.funcPrev);
                    }

                    this.buttonPrev[p ? 'removeClass' : 'addClass'](this.className('jcarousel-prev-disabled')).attr('disabled', p ? false : true);

                    if (this.options.buttonPrevCallback !== null && this.buttonPrev.data('jcarouselstate') != p) {
                        this.buttonPrev.each(function() {
                            self.options.buttonPrevCallback(self, this, p);
                        }).data('jcarouselstate', p);
                    }
                } else {
                    if (this.options.buttonPrevCallback !== null && this.buttonPrevState != p) {
                        this.options.buttonPrevCallback(self, null, p);
                    }
                }

                this.buttonNextState = n;
                this.buttonPrevState = p;
            },
            /**
             * Notify callback of a specified event.
             *
             * @method notify
             * @return undefined
             * @param evt {String} The event name
             */
            notify: function(evt) {
                var state = this.prevFirst === null ? 'init' : (this.prevFirst < this.first ? 'next' : 'prev');

                // Load items
                this.callback('itemLoadCallback', evt, state);

                if (this.prevFirst !== this.first) {
                    this.callback('itemFirstInCallback', evt, state, this.first);
                    this.callback('itemFirstOutCallback', evt, state, this.prevFirst);
                }

                if (this.prevLast !== this.last) {
                    this.callback('itemLastInCallback', evt, state, this.last);
                    this.callback('itemLastOutCallback', evt, state, this.prevLast);
                }

                this.callback('itemVisibleInCallback', evt, state, this.first, this.last, this.prevFirst, this.prevLast);
                this.callback('itemVisibleOutCallback', evt, state, this.prevFirst, this.prevLast, this.first, this.last);
            },
            callback: function(cb, evt, state, i1, i2, i3, i4) {
                if (this.options[cb] == null || (typeof this.options[cb] != 'object' && evt != 'onAfterAnimation')) {
                    return;
                }

                var callback = typeof this.options[cb] == 'object' ? this.options[cb][evt] : this.options[cb];

                if (!$.isFunction(callback)) {
                    return;
                }

                var self = this;

                if (i1 === undefined) {
                    callback(self, state, evt);
                } else if (i2 === undefined) {
                    this.get(i1).each(function() {
                        callback(self, this, i1, state, evt);
                    });
                } else {
                    var call = function(i) {
                        self.get(i).each(function() {
                            callback(self, this, i, state, evt);
                        });
                    };
                    for (var i = i1; i <= i2; i++) {
                        if (i !== null && !(i >= i3 && i <= i4)) {
                            call(i);
                        }
                    }
                }
            },
            create: function(i) {
                return this.format('<li></li>', i);
            },
            format: function(e, i) {
                e = $(e);
                var split = e.get(0).className.split(' ');
                for (var j = 0; j < split.length; j++) {
                    if (split[j].indexOf('jcarousel-') != -1) {
                        e.removeClass(split[j]);
                    }
                }
                e.addClass(this.className('jcarousel-item')).addClass(this.className('jcarousel-item-' + i)).css({
                    'float': (this.options.rtl ? 'right' : 'left'),
                    'list-style': 'none'
                }).attr('jcarouselindex', i);
                return e;
            },
            className: function(c) {
                return c + ' ' + c + (!this.options.vertical ? '-horizontal' : '-vertical');
            },
            dimension: function(e, d) {
                var el = $(e);

                if (d == null) {
                    return !this.options.vertical ?
                            (el.outerWidth(true) || $jc.intval(this.options.itemFallbackDimension)) :
                            (el.outerHeight(true) || $jc.intval(this.options.itemFallbackDimension));
                } else {
                    var w = !this.options.vertical ?
                            d - $jc.intval(el.css('marginLeft')) - $jc.intval(el.css('marginRight')) :
                            d - $jc.intval(el.css('marginTop')) - $jc.intval(el.css('marginBottom'));

                    $(el).css(this.wh, w + 'px');

                    return this.dimension(el);
                }
            },
            clipping: function() {
                return !this.options.vertical ?
                        this.clip[0].offsetWidth - $jc.intval(this.clip.css('borderLeftWidth')) - $jc.intval(this.clip.css('borderRightWidth')) :
                        this.clip[0].offsetHeight - $jc.intval(this.clip.css('borderTopWidth')) - $jc.intval(this.clip.css('borderBottomWidth'));
            },
            index: function(i, s) {
                if (s == null) {
                    s = this.options.size;
                }

                return Math.round((((i - 1) / s) - Math.floor((i - 1) / s)) * s) + 1;
            }
        });

        $jc.extend({
            /**
             * Gets/Sets the global default configuration properties.
             *
             * @method defaults
             * @return {Object}
             * @param d {Object} A set of key/value pairs to set as configuration properties.
             */
            defaults: function(d) {
                return $.extend(defaults, d || {});
            },
            intval: function(v) {
                v = parseInt(v, 10);
                return isNaN(v) ? 0 : v;
            },
            windowLoaded: function() {
                windowLoaded = true;
            }
        });

        /**
         * Creates a carousel for all matched elements.
         *
         * @example $("#mycarousel").jcarousel();
         * @before <ul id="mycarousel" class="jcarousel-skin-name"><li>First item</li><li>Second item</li></ul>
         * @result
         *
         * <div class="jcarousel-skin-name">
         *   <div class="jcarousel-container">
         *     <div class="jcarousel-clip">
         *       <ul class="jcarousel-list">
         *         <li class="jcarousel-item-1">First item</li>
         *         <li class="jcarousel-item-2">Second item</li>
         *       </ul>
         *     </div>
         *     <div disabled="disabled" class="jcarousel-prev jcarousel-prev-disabled"></div>
         *     <div class="jcarousel-next"></div>
         *   </div>
         * </div>
         *
         * @method jcarousel
         * @return jQuery
         * @param o {Hash|String} A set of key/value pairs to set as configuration properties or a method name to call on a formerly created instance.
         */
        $.fn.jcarousel = function(o) {
            if (typeof o == 'string') {
                var instance = $(this).data('jcarousel'), args = Array.prototype.slice.call(arguments, 1);
                return instance[o].apply(instance, args);
            } else {
                return this.each(function() {
                    var instance = $(this).data('jcarousel');
                    if (instance) {
                        if (o) {
                            $.extend(instance.options, o);
                        }
                        instance.reload();
                    } else {
                        $(this).data('jcarousel', new $jc(this, o));
                    }
                });
            }
        };


        function webyclipIsReadyToStart() {
            wbDebug('WebyClip Starting');
            if (typeof (webyclipLocale) != 'undefined') {
                currentLocale = webyclipLocale;
            }

            window.$webyclipContainers = $("*[data-webyclip-product]");

            if (window.$webyclipContainers.size() > 0) {
                window.$webyclipContainers.each(function(index) {
                    productName[index] = resolveVariable($(this).attr("data-webyclip-product"), null, null, null);
                    brandName[index] = resolveVariable($(this).attr("data-webyclip-brand"), null, null, null);
                    modelName[index] = resolveVariable($(this).attr("data-webyclip-model"), null, null, null);
                    productCategory[index] = resolveVariable($(this).attr("data-webyclip-category"), null, null, null);
                    productSubCategory[index] = resolveVariable($(this).attr("data-webyclip-sub-category"), null, null, null);
                    productExternalId[index] = resolveVariable($(this).attr("data-webyclip-external-id"), null, null, null);
                    searchString[index] = resolveVariable($(this).attr("data-webyclip-search-string"), null, null, null);
                    aliasName[index] = resolveVariable($(this).attr("data-webyclip-alias-name"), null, null, null);
                    keyword1[index] = resolveVariable($(this).attr("data-webyclip-keyword1"), null, null, null);
                    keyword2[index] = resolveVariable($(this).attr("data-webyclip-keyword2"), null, null, null);
                    keyword3[index] = resolveVariable($(this).attr("data-webyclip-keyword3"), null, null, null);
                    keyword4[index] = resolveVariable($(this).attr("data-webyclip-keyword4"), null, null, null);
                    keyword5[index] = resolveVariable($(this).attr("data-webyclip-keyword5"), null, null, null);
                    var atrUseEmbedded = resolveVariable($(this).attr("data-webyclip-use-embedded"), null, null, null);
                    useEmbedded[index] = (atrUseEmbedded == 'true');
                    var atrEmbeddedWidth = resolveVariable($(this).attr("data-webyclip-embedded-width"), null, null, null);
                    var atrEmbeddedHeight = resolveVariable($(this).attr("data-webyclip-embedded-height"), null, null, null);
                    embeddedWidth[index] = (atrEmbeddedWidth == null || isNaN(atrEmbeddedWidth) ? 350 : parseInt(atrEmbeddedWidth));
                    embeddedHeight[index] = (atrEmbeddedHeight == null || isNaN(atrEmbeddedHeight) ? 201 : parseInt(atrEmbeddedHeight));
                    hasLinkToShow[index] = false;
                });
                if (!window.webyclipShowAnyway) {
                    window.$webyclipContainers.hide();
                }
            }
            else {
                if (!$('#webyclipButtonContainer').length) {
                    findWebyClipScriptTag().after('<span id="webyclipButtonContainer"></span>');
                }
                productName[0] = resolveVariable(webyclipProduct, "*[webyclip='ProductName']", "*[itemprop='name']", null);
                brandName[0] = resolveVariable(webyclipBrand, "*[webyclip='BrandName']", "*[itemprop='brand']", null);
                modelName[0] = resolveVariable(webyclipModel, "*[webyclip='ModelName']", "*[itemprop='model']", null);

                if (location.href.indexOf('pompa.co.il') != -1) {
                    if (productName[0] != null) {
                        var indexOfPipe = productName[0].indexOf('|');
                        if (indexOfPipe != -1) {
                            productName[0] = productName[0].substr(0, indexOfPipe).trim();
                        }
                    }
                    var $brandEl = $('a[href^="search.asp"]');
                    if ($brandEl.length == 1) {
                        brandName[0] = $brandEl.text().trim();
                        var $modelEl = $brandEl.closest('tr').next().find('td:last');
                        if ($modelEl.length == 1 && $modelEl.text().length > 4 && $modelEl.text()[3] == ':') {
                            modelName[0] = $modelEl.text().substr(4).trim();
                        }
                    }
                }


                if (productName[0] == null && brandName[0] != null && modelName[0] != null) {
                    productName[0] = brandName[0] + ' ' + modelName[0];
                }


                productCategory[0] = resolveVariable(webyclipProductCategory, "*[webyclip='MainCategoryName']", "*[itemprop='category']", null);
                productSubCategory[0] = resolveVariable(webyclipProductSubCategory, "*[webyclip='SubCategoryName']", "*[itemprop='subcategory']", null);
                productExternalId[0] = resolveVariable(webyclipProductExternalId, "*[webyclip='ExternalId']", "*[itemprop='externalid']", null);

                productExternalId[0] = (isNaN(productExternalId[0]) ? null : productExternalId[0]);

                searchString[0] = resolveVariable(webyclipSearchString, "*[webyclip='SearchString']", "*[itemprop='searchstring']", null);
                aliasName[0] = resolveVariable(webyclipAliasName, "*[webyclip='AliasName']", "*[itemprop='aliasname']", null);
                keyword1[0] = resolveVariable(webyclipKeyword1, "*[webyclip='Keyword1']", "*[itemprop='keyword1']", null);
                keyword2[0] = resolveVariable(webyclipKeyword2, "*[webyclip='Keyword2']", "*[itemprop='keyword2']", null);
                keyword3[0] = resolveVariable(webyclipKeyword3, "*[webyclip='Keyword3']", "*[itemprop='keyword3']", null);
                keyword4[0] = resolveVariable(webyclipKeyword4, "*[webyclip='Keyword4']", "*[itemprop='keyword4']", null);
                keyword5[0] = resolveVariable(webyclipKeyword5, "*[webyclip='Keyword5']", "*[itemprop='keyword5']", null);
                useEmbedded[0] = false;
                embeddedWidth[0] = 400;
                embeddedHeight[0] = 230;
            }
            function addSponsoredMedia(startData) {
                if (window.needToSimulateSponsored) {
                    if (typeof startData.data !== 'undefined' && startData.data != null && !startData.data.forcePluginRefresh && typeof(startData.data.sponsoredMedias) !== 'undefined') {
                        $.each(startData.data.sponsoredMedias, function(idx, val) {
                            val.sponsoredMedia = true;
                            if (startData.data.medias.length > 0) {
                                startData.data.medias.splice(1,0,val);
                            }
                            else {
                                startData.data.medias.push(val);
                            }
                        });
                    }
                }
            }
            function removeExcludedMediaAndStartWebyclip(callCdn, p5, fnStartWebyclip, startData, prodIndex) {
                //
                // OMER: New method using getInitial CDN records.
                //
                if (typeof startData.data !== 'undefined' && startData.data != null && !startData.data.forcePluginRefresh && p5 != null) {
                
                    var mediasAfterExclude = [];
                    $.each(startData.data.medias, function(idx, val) {
                        var excludeMedia = false;
                        if ((typeof(val._excludeIn) !== 'undefined') && (val._excludeIn !== null)) {
                            $.each(val._excludeIn, function(i, v) {
                                if (v === p5) {
                                    excludeMedia = true;
                                }
                            });
                        }
                            
                        if (!excludeMedia) {
                            mediasAfterExclude.push(val);
                        }
                    });
                    
                    startData.data.medias = mediasAfterExclude;
                    addSponsoredMedia(startData);
                    startData.data.showLink = startData.data.showLink || (startData.data.medias.length > 0);

                    //All good can start!
                    fnStartWebyclip(startData, prodIndex);
                
                } else if (typeof startData.data !== 'undefined' && startData.data != null && !startData.data.forcePluginRefresh) {
                    addSponsoredMedia(startData);
                    startData.data.showLink = startData.data.showLink || (startData.data.medias.length > 0);
                    fnStartWebyclip(startData, prodIndex);
                    return;
                }
                else {
                    fnStartWebyclip(startData, prodIndex);
                    return;                    
                }
                /*
                //
                // OMER: Old method, using specific excluded media CDN records.
                //
                var key = '';
                if (typeof startData.data != 'undefined' && startData.data != null && !startData.data.forcePluginRefresh && p5 != null) {
                    key = startData.data.site._id + '_' + startData.data._pid + '_' + p5;
                }
                else {
                    fnStartWebyclip(startData, prodIndex);
                    return;
                }

                var req = $.ajax({
                    dataType: 'jsonp',
                    jsonpCallback: 'webyclip_getExcludedMedia_' + key,
                    //url: (callCdn) ? webyclipCdnPrefixUrl + '/' + encodeURIComponent('private-media-' + p5.toLowerCase()) : webyclipBaseUrl + '/webyclip.php?_m=get_privateMedia' + getRequestData(prodIndex) + encodeIf('_pid', startData.data._pid) + encodeIf('_p5', p5),
                    timeout: (callCdn) ? 3000 : 30000,
				    url: (callCdn) ? webyclipCdnPrefixUrl + '/' + encodeURIComponent('excluded-media-' + p5.toLowerCase()) : webyclipBaseUrl + '/webyclip.php?_m=get_excludedMedia&callback=?' + getRequestData(prodIndex) + encodeIf('_pid', startData.data._pid) + encodeIf('_p5', p5)
                });
                req.done(function(data, textStatus, jqXHR) {
                    if (callCdn) {
                        var lm = data.__lastModified || 'Tue, 01 Jan 2013 00:00:00 GMT';
                        var lmDate = new Date(lm);
                        var now = new Date();
                        if (now - lmDate > 1000 * 60 * 60 * 24 * 3) {
                            removeExcludedMediaAndStartWebyclip(false, p5, fnStartWebyclip, startData, prodIndex);
                        }
                        else {

                            //Exclude medias
                            $.each(data.medias, function(idx, val) {
						        var mediaIndex = -1;
							    for (var i = 0; i < startData.data.medias.length; i++) {
								    var currMedia = startData.data.medias[i];
								    if ((currMedia._id === val._id) && (currMedia._sourceKey === val._sourceKey) && (currMedia._sourceId == val._sourceId)) {
										mediaIndex = i;
										break;
								    }
							    }
                                if (mediaIndex > -1) {
								    startData.data.medias.splice(mediaIndex, 1);
							    }
                            });

                            startData.data.showLink = startData.data.showLink || (startData.data.medias.length > 0);

						    //All good can start!
                            fnStartWebyclip(startData, prodIndex);
                        }
                    }
                    else {
                        //Exclude medias
                        $.each(data.medias, function(idx, val) {
						    var mediaIndex = -1;
							for (var i = 0; i < startData.data.medias.length; i++) {
								var currMedia = startData.data.medias[i];
								if ((currMedia._id === val._id) && (currMedia._sourceKey === val._sourceKey) && (currMedia._sourceId == val._sourceId)) {
										mediaIndex = i;
										break;
								}
							}
                            if (mediaIndex > -1) {
								startData.data.medias.splice(mediaIndex, 1);
							}
                        });

                        startData.data.showLink = startData.data.showLink || (startData.data.medias.length > 0);

						//All good can start!
                        fnStartWebyclip(startData, prodIndex);
                    }
                });
                req.fail(function(jqXHR, textStatus, errorThrown) {
                    if (callCdn) {
                        removeExcludedMediaAndStartWebyclip(false, p5, fnStartWebyclip, startData, prodIndex);
                    }
                });
                */
            }

            function mergeSpecificMedias(subCategory, data) {
                for (var i=0; i < data.data.spesificMedias.length; i++) {
                    if (data.data.spesificMedias[i].key == subCategory) {
                        var arrMedias = data.data.spesificMedias[i].value;
                        $.each(arrMedias, function(idx, val) {
                            data.data.medias.splice(idx, 0, val);
                        });
                    }
                }
                data.data.showLink = data.data.showLink || (data.data.medias.length > 0);
            }
            function getMergeCustomPrivateMedias(callCdn, p5, fnStartWebyclip, startData, prodIndex) {
                var key = '';
                if (typeof startData.data != 'undefined' && startData.data != null && !startData.data.forcePluginRefresh && p5 != null && p5 != "") {
                    key = startData.data.site._id + '_' + startData.data._pid + '_' + p5;
                }
                else {
                    //fnStartWebyclip(startData, prodIndex);
					removeExcludedMediaAndStartWebyclip(callCdn, p5, fnStartWebyclip, startData, prodIndex);
                    return;
                }
                var req = $.ajax({
                    dataType: 'jsonp',
                    jsonpCallback: 'webyclip_getPrivateMedia_' + key,
                    url: (callCdn) ? webyclipCdnPrefixUrl + '/' + encodeURIComponent('private-media-' + p5.toLowerCase()) : webyclipBaseUrl + '/webyclip.php?_m=get_privateMedia' + getRequestData(prodIndex) + encodeIf('_pid', startData.data._pid) + encodeIf('_p5', p5),
                    timeout: (callCdn) ? 3000 : 30000
                });
                req.done(function(data, textStatus, jqXHR) {
                    if (callCdn) {
                        var lm = data.__lastModified || 'Tue, 01 Jan 2013 00:00:00 GMT';
                        var lmDate = new Date(lm);
                        var now = new Date();
                        if (now - lmDate > 1000 * 60 * 60 * 24 * 3) {
                            getMergeCustomPrivateMedias(false, p5, fnStartWebyclip, startData, prodIndex);
                        }
                        else {
                            //Merge data to StartData
                            $.each(data.medias, function(idx, val) {
                                val.privateMedia = true;
                                startData.data.medias.splice(idx, 0, val);
                            });
                            startData.data.showLink = startData.data.showLink || (startData.data.medias.length > 0);
                            //All good can start!
                            //fnStartWebyclip(startData, prodIndex);
							removeExcludedMediaAndStartWebyclip(false, p5, fnStartWebyclip, startData, prodIndex);
                        }
                    }
                    else {
                        //Merge data to StartData
                        $.each(data.medias, function(idx, val) {
                            val.privateMedia = true;
                            startData.data.medias.splice(idx, 0, val);
                        });
                        startData.data.showLink = startData.data.showLink || (startData.data.medias.length > 0);
                        //All good can start!
                        //fnStartWebyclip(startData, prodIndex);
						removeExcludedMediaAndStartWebyclip(true, p5, fnStartWebyclip, startData, prodIndex);
                    }
                });
                req.fail(function(jqXHR, textStatus, errorThrown) {
                    if (callCdn) {
                        getMergeCustomPrivateMedias(false, p5, fnStartWebyclip, startData, prodIndex);
                    }
                });
            }
            function getInitialData(callCdn, fnStartWebyclip, prodIndex) {
                if (typeof (window.isCdnUsed) === 'undefined') {
                    window.isCdnUsed = [];
                }
                window.isCdnUsed[prodIndex] = callCdn;
                var req = $.ajax({
                    dataType: 'jsonp',
                    jsonpCallback: 'webyclip_getInitial_' + md5(productName[prodIndex].toLowerCase()),
                    url: (callCdn) ? webyclipCdnPrefixUrl + '/' + encodeURI(productName[prodIndex].toLowerCase()) : webyclipBaseUrl + '/webyclip.php?_m=get_initial' + getRequestData(prodIndex),
                    timeout: (callCdn) ? 3000 : 30000
                });
                req.done(function(data, textStatus, jqXHR) {
                    if (callCdn) {
                        var lm = data.__lastModified || 'Tue, 01 Jan 2013 00:00:00 GMT';
                        var lmDate = new Date(lm);
                        var now = new Date();
                        if (now - lmDate > 1000 * 60 * 60 * 24 * 3) {
                            getInitialData(false, fnStartWebyclip, prodIndex);
                        }
                        else {
                            if (aliasName[prodIndex] != null && productExternalId[prodIndex] != null) {
                                var found = false;
                                if (typeof (data.data.customerProductsData) != 'undefined') {
                                    for (var pd = 0; pd < data.data.customerProductsData.length; pd++) {
                                        if (data.data.customerProductsData[pd].externalId == productExternalId[prodIndex]) {
                                            found = true;
                                            break;
                                        }
                                    }
                                }
                                if (!found) {
                                    //Make fire and forget call to server in order to update the current externalId and current alias.
                                    getInitialData(false, function(d, p) {
                                    }, prodIndex);
                                }
                            }

							if ((webyclipAnalyticsData !== "") && ($.inArray(webyclipAnalyticsData, data.data.blacklistIn) > -1)) {
								// Current p5 is blacklisted.
								data.data.medias = [];
								data.data.showLink = false;
                                fnStartWebyclip(data, prodIndex);

							} else {
								//All good can start!
								if (typeof (data.data.spesificMedias) != 'undefined'
										&& $.isArray(data.data.spesificMedias)
										&& productSubCategory[prodIndex] != null) {
									mergeSpecificMedias(productSubCategory[prodIndex], data);
								}
								if (typeof (data.data.privateMedias) != 'undefined'
										&& $.isArray(data.data.privateMedias)
										&& webyclipAnalyticsData != ''
										&& $.inArray(webyclipAnalyticsData, data.data.privateMedias) > -1) {
									webyclipHasPrivateVideos = true;
									getMergeCustomPrivateMedias(true, webyclipAnalyticsData, fnStartWebyclip, data, prodIndex);
								}
								else {
									removeExcludedMediaAndStartWebyclip(true, webyclipAnalyticsData, fnStartWebyclip, data, prodIndex);
									//fnStartWebyclip(data, prodIndex);
								}
							}
                        }
                    }
                    else {
						if ((webyclipAnalyticsData !== "") && ($.inArray(webyclipAnalyticsData, data.data.blacklistIn) > -1)) {
						    // Current p5 is blacklisted.
							data.data.medias = [];
							data.data.showLink = false;
                            fnStartWebyclip(data, prodIndex);

						} else {
                            if (typeof (data.data.spesificMedias) != 'undefined'
                                    && $.isArray(data.data.spesificMedias)
                                    && productSubCategory[prodIndex] != null) {
                                mergeSpecificMedias(productSubCategory[prodIndex], data);
                            }
                            if (typeof (data.data.privateMedias) != 'undefined'
                                    && $.isArray(data.data.privateMedias)
                                    && webyclipAnalyticsData != ''
                                    && $.inArray(webyclipAnalyticsData, data.data.privateMedias) > -1) {
                                webyclipHasPrivateVideos = true;
                                getMergeCustomPrivateMedias((typeof webyclipCdnPrefixUrl != 'undefined' && !window.webyclipLogin), webyclipAnalyticsData, fnStartWebyclip, data, prodIndex);
                            }
                            else {
                                removeExcludedMediaAndStartWebyclip(false, webyclipAnalyticsData, fnStartWebyclip, data, prodIndex)
								//fnStartWebyclip(data, prodIndex);
                            }
						}
                    }
                });
                req.fail(function(jqXHR, textStatus, errorThrown) {
                    if (callCdn) {
                        getInitialData(false, fnStartWebyclip, prodIndex);
                    }
                });
            }
            var getInitialDataBegin = function(callCdn, fnStartWebyclip) {
                for (var i = 0; i < productName.length; i++) {
                    getInitialData(callCdn, fnStartWebyclip, i);
                }
            };
            var loginStatusListener = function(event) {
                if (event.origin !== 'https://6bf746ad5bc91a240a3d-1d8fbdf7ecdc2b67730d7c561f0d1dfd.ssl.cf2.rackcdn.com')
                    return;
                var messageObj = $.parseJSON(event.data) || {};
                window.webyclipLogin = messageObj.status;
                if (!window.gotLoginStatus) {
                    window.gotLoginStatus = true;
                    getInitialDataBegin(!window.webyclipLogin, startWebyClip);
                }
            };
            if (typeof webyclipCdnPrefixUrl != 'undefined') {
                window.webyclipLogin = false;
                window.gotLoginStatus = false;
                if (window.addEventListener) {
                    removeEventListener("message", loginStatusListener, false);
                    addEventListener("message", loginStatusListener, false);
                } else {
                    detachEvent("onmessage", loginStatusListener);
                    attachEvent("onmessage", loginStatusListener);
                }
                $("BODY").append("<iframe id='webyclipIsLogin' frameBorder='0' style='background-color:#FFFFFF;width:0px;height:0px;border-style:none;display: none;z-index:0;' src='https://6bf746ad5bc91a240a3d-1d8fbdf7ecdc2b67730d7c561f0d1dfd.ssl.cf2.rackcdn.com/il.html?origin=" + window.webyclipOrigin + "'></iframe>");
                $("#webyclipIsLogin").load(function() {
                    setTimeout(function() {
                        if (!window.gotLoginStatus) {
                            window.gotLoginStatus = true;
                            getInitialDataBegin(true, startWebyClip);
                        }
                    }, 300);
                });
            }
            else {
                getInitialDataBegin(false, startWebyClip);
            }
        }
        $(document).ready(function() {
            function scriptRettrival(callCdn) {
                var reqScriptRettrival = $.ajax({
                    dataType: 'jsonp',
                    jsonpCallback: 'webyclip_siteScript',
                    url: (callCdn) ? (webyclipCdnCodeBaseUrl + '/site-script-' + currentSiteKey) : (webyclipBaseUrl + '/WebyClipSiteScript.php?sk=' + currentSiteKey),
                    timeout: (callCdn) ? 3000 : 30000
                });
                reqScriptRettrival.done(function(data, textStatus, jqXHR) {
                    if (callCdn) {
                        var lm = data.__lastModified || 'Tue, 01 Jan 2013 00:00:00 GMT';
                        var lmDate = new Date(lm);
                        var now = new Date();
                        if (now - lmDate > 1000 * 60 * 60 * 24 * 3) {
                            scriptRettrival(false);
                        }
                        else {
                            //All good can start!
                            if (typeof data.script != 'undefined' && data.script != null) {
                                try {
                                    var modF = new Function("$", data.script);
                                    modF($);
                                }
                                catch (e) {
                                    wbDebug('Unable to load script, error: ' + e);
                                }
                            }
                            if (!webyclipBlockProcessing) {
                                webyclipIsReadyToStart();
                            }
                        }
                    }
                    else {
                        if (typeof data.script != 'undefined' && data.script != null) {
                            try {
                                var modF1 = new Function("$", data.script);
                                modF1($);
                            }
                            catch (e) {
                                wbDebug('Unable to load script, error: ' + e);
                            }
                        }
                        if (!webyclipBlockProcessing) {
                            webyclipIsReadyToStart();
                        }
                    }
                });
                reqScriptRettrival.fail(function(jqXHR, textStatus, errorThrown) {
                    if (callCdn) {
                        scriptRettrival(false);
                    }
                });
            }
            if ((!webyclipSkipScriptRettrival) && (currentSiteKey != null)) {
                scriptRettrival(true);
            }
            else {
                if (!webyclipBlockProcessing) {
                    webyclipIsReadyToStart();
                }
            }

        });
    }
})(); // We call our anonymous function immediately
