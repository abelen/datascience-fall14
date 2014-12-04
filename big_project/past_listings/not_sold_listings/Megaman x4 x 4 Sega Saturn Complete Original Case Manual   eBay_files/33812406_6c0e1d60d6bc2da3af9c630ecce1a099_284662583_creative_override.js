(function() {
  var creativeDefinition = {
    customScriptUrl: '',
    isDynamic: false,
    delayedImpression: false,
    standardEventIds: {
      DISPLAY_TIMER: '2',
      INTERACTION_TIMER: '3',
      INTERACTIVE_IMPRESSION: '4',
      FULL_SCREEN_VIDEO_PLAYS: '5',
      FULL_SCREEN_VIDEO_COMPLETES: '6',
      FULL_SCREEN_AVERAGE_VIEW_TIME: '7',
      MANUAL_CLOSE: '8',
      BACKUP_IMAGE_IMPRESSION: '9',
      EXPAND_TIMER: '10',
      VIDEO_PLAY: '11',
      VIDEO_VIEW_TIMER: '12',
      VIDEO_COMPLETE: '13',
      VIDEO_INTERACTION: '14',
      VIDEO_PAUSE: '15',
      VIDEO_MUTE: '16',
      VIDEO_REPLAY: '17',
      VIDEO_MIDPOINT: '18',
      FULL_SCREEN_VIDEO: '19',
      VIDEO_STOP: '20',
      VIDEO_FIRST_QUARTILE: '960584',
      VIDEO_THIRD_QUARTILE: '960585',
      VIDEO_UNMUTE: '149645',
      FULL_SCREEN: '286263',
      DYNAMIC_CREATIVE_IMPRESSION: '536393',
      HTML5_CREATIVE_IMPRESSION: '871060'
    },
    exitEvents: [
      {
        name: 'background_exit',
        reportingId: '1818454',
        url: 'http://www.chrysler.com/en/200/?bid\x3d%ebuy!\x26sid\x3d%25esid!\x26pid\x3d%25epid!\x26adid\x3d%eaid!\x26cid\x3d%ecid!\x26buytype\x3dLF\x26TR\x3d1\x26channel\x3ddisplay',
        targetWindow: '_blank',
        windowProperties: ''
      },
      {
        name: 'tour_factory_exit',
        reportingId: '1982121',
        url: 'http://www.chrysler200factory.com/?bid\x3d%ebuy!\x26sid\x3d%esid!\x26pid\x3d%epid!\x26adid\x3d%eaid!\x26cid\x3d%ecid!\x26buytype\x3dLF\x26TR\x3d1\x26channel\x3ddisplay\x26utm_source\x3ddisplay\x26utm_medium\x3dbanners\x26utm_campaign\x3dChrysler-200-factory-campaigns',
        targetWindow: '_blank',
        windowProperties: ''
      },
      {
        name: 'vehicle_details_exit',
        reportingId: '1800884',
        url: 'http://www.chrysler.com/en/200/?bid\x3d%ebuy!\x26sid\x3d%25esid!\x26pid\x3d%25epid!\x26adid\x3d%eaid!\x26cid\x3d%ecid!\x26buytype\x3dLF\x26TR\x3d1\x26channel\x3ddisplay',
        targetWindow: '_blank',
        windowProperties: ''
      }
    ],
    timerEvents: [
    ],
    counterEvents: [
    ],
    childFiles: [
      {
        name: 'child.swf',
        url: '/ads/richmedia/studio/pv2/31653556/20140814133655556/child.swf',
        isVideo: false
      },
      {
        name: 'back_up_728x90.jpg',
        url: '/ads/richmedia/studio/pv2/31653556/20140814133655556/back_up_728x90.jpg',
        isVideo: false
      }
    ],
    videoFiles: [
    ],
    videoEntries: [
    ],
    primaryAssets: [
      {
        id: '32794729',
        artworkType: 'FLASH',
        displayType: 'BANNER',
        width: '728',
        height: '90',
        servingPath: '/ads/richmedia/studio/pv2/31653556/20140814133655556/shell.swf',
        zIndex: '1000000',
        customCss: '',
        flashArtworkTypeData: {
          actionscriptVersion: '3',
          wmode: 'opaque',
          sdkVersion: '2.4.1'
        },
        htmlArtworkTypeData: null,
        floatingDisplayTypeData: null,
        expandingDisplayTypeData: null,
        imageGalleryTypeData: null,
        pageSettings:null,
layoutsConfig: null,
layoutsApi: null
      }
    ]
  }
  var rendererDisplayType = '';
  rendererDisplayType += 'flash_';
  var rendererFormat = 'inpage';
  var rendererName = rendererDisplayType + rendererFormat;

  var creativeId = '59499752';
  var adId = '284662583';
  var templateVersion = '200_53';
  var studioObjects = window['studioV2'] = window['studioV2'] || {};
  var creativeObjects = studioObjects['creatives'] = studioObjects['creatives'] || {};
  var creativeKey = [creativeId, adId].join('_');
  var creative = creativeObjects[creativeKey] = creativeObjects[creativeKey] || {};
  creative['creativeDefinition'] = creativeDefinition;
  var adResponses = creative['adResponses'] || [];
  for (var i = 0; i < adResponses.length; i++) {
    adResponses[i].creativeDto && adResponses[i].creativeDto.csiEvents &&
        (adResponses[i].creativeDto.csiEvents['pe'] =
            adResponses[i].creativeDto.csiEvents['pe'] || (+new Date));
  }
  var loadedLibraries = studioObjects['loadedLibraries'] = studioObjects['loadedLibraries'] || {};
  var versionedLibrary = loadedLibraries[templateVersion] = loadedLibraries[templateVersion] || {};
  var typedLibrary = versionedLibrary[rendererName] = versionedLibrary[rendererName] || {};
  if (typedLibrary['bootstrap']) {
    typedLibrary.bootstrap();
  }
})();
