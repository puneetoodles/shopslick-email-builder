const defaultFontFamily = [
  'inherit',
  'Georgia, serif',
  '\'Palatino Linotype\', \'Book Antiqua\', Palatino, serif',
  '\'Times New Roman\', Times, serif',
  'Arial, Helvetica, sans-serif',
  '\'Arial Black\', Gadget, sans-serif',
  '\'Comic Sans MS\', cursive, sans-serif',
  'Impact, Charcoal, sans-serif',
  '\'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif',
  'Tahoma, Geneva, sans-serif',
  '\'Trebuchet MS\', Helvetica, sans-serif',
  'Verdana, Geneva, sans-serif',
  '\'Courier New\', Courier, monospace',
  '\'Lucida Console\', Monaco, monospace',
];

const emailBuilderConfigurations = {
  assetsPath: 'http://localhost:4000/assets',
  layoutsPath: '/views', // Path of layouts
  defaultLayout: 'material', // modern or material
  defaultSkin: 'dark', // light or dark
  urlToUploadImage: '//uploads.im/api',
  tinymceBaseUrl: '/bower_components/tinymce',
  translateTemplateUrl: 'i18n/{part}/{lang}.json',
  mjmlPublicKey: '',
  mjmlApplicationId: '',
  mjmlCompileAdress: '/compile', // You can leave it empty if you have mjmlPublicKey and mjmlApplicationId completed from above
  buildFolder: '_dist', // Default distribution folder
  builderTitle: 'Angular email builder', // Default builder Title
  builderDescription: '', // Default builder meta description
  UA: '', // Your Google Analytics ID
  exportHtml: true,
  importHtml: true,
  deleteAllBlocks: true,
  trackEvents: false,
  includeMailchimpMergeTags: false,
  defaults: [{
    newEmailName: 'My new email template',
    emailOptions: {
      paddingTop: '15px',
      paddingRight: '10px',
      paddingBottom: '15px',
      paddingLeft: '10px',
      backgroundColor: '#273142',
    },
  }],
  disableBlocks: [],
  blocks: {
    title: {
      type: 'title',
      sort: 1,
      element: {
        type: 'title',
        icon: '&#xE165;',
        primary_head: 'builder_el_title',
        second_head: 'builder_el_title_comment',
      },
      defaultOptions: {
        align: 'center',
        title: 'Enter your title here',
        subTitle: 'Subtitle',
        padding: ['30px', '15px', '30px', '15px'],
        backgroundColor: '#fff',
        font: {
          weight: 'normal',
          weightOptions: [
            'bold',
            'bolder',
            'lighter',
            'inherit',
            'initial',
            'normal',
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
          ],
          family: 'Arial, Helvetica, sans-serif',
          familyOptions: defaultFontFamily,
        },
        color: '#444444',
      },
      template:
        '<table class="main" width="100%" cellspacing="0" cellpadding="0" border="0" align="center" ng-style="{backgroundColor: element.options.backgroundColor}" data-type="title">\n    <tbody>\n    <tr>\n        <td align="{{  element.options.align  }}" class="title" ng-style="{padding: (element.options.padding | arrToPadding) , color: \'#757575\'}" data-block-id="background">\n            <h1 ng-style="{fontFamily: element.options.font.family, fontWeight: element.options.font.weight, margin: 0, color: element.options.color}" ng-if="element.options.title.length" data-block-id="main-title">{{  element.options.title  }}</h1>\n            <h4 ng-style="{fontFamily: element.options.font.family, fontWeight: element.options.font.weight, marginBottom: 0, color: element.options.color }" ng-if="element.options.subTitle.length" data-block-id="sub-title">{{  element.options.subTitle  }}</h4>\n        </td>\n    </tr>\n    </tbody>\n</table>',
    },
    button: {
      type: 'button',
      sort: 4,
      element: {
        type: 'button',
        icon: '&#xE913;',
        primary_head: 'builder_el_button',
        second_head: 'builder_el_button_comment',
      },
      defaultOptions: {
        align: 'center',
        padding: ['12px', '20px', '12px', '20px'],
        margin: ['15px', '15px', '15px', '15px'],
        buttonText: 'Click me',
        url: '#',
        buttonBackgroundColor: '#3498DB',
        backgroundColor: '#ffffff',
        border: {
          size: 1,
          radius: 3,
          color: '#3498DB',
          style: 'solid',
          styleOptions: ['dotted', 'solid', 'dashed'],
        },
        fullWidth: false,
        font: {
          size: 15,
          color: '#ffffff',
          weight: 'normal',
          weightOptions: [
            'bold',
            'bolder',
            'lighter',
            'inherit',
            'initial',
            'normal',
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
          ],
          family: 'inherit',
          familyOptions: defaultFontFamily,
        },
      },
      template:
        '<table class="main" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#FFFFFF" align="center" ng-style="{backgroundColor: element.options.backgroundColor }">\n    <tbody>\n    <tr>\n        <td class="buttons-full-width"><table cellspacing="0" cellpadding="0" border="0" align="center" width="100%" ng-style="{textAlign: element.options.align }" class="button">\n                <tbody>\n                <tr><td class="button" ng-style="{padding: (element.options.margin | arrToPadding)}">\n                        <a ng-style="{backgroundColor: element.options.buttonBackgroundColor, color: element.options.font.color, fontFamily: element.options.font.family, fontSize: element.options.font.size, lineHeight: 1.9, display: (element.options.fullWidth ? \'block\' : \'inline-block\'), borderRadius: element.options.border.radius, borderWidth: element.options.border.size, borderStyle: element.options.border.style, borderColor: element.options.border.color, textAlign: \'center\', textDecoration: \'none\', fontWeight: element.options.font.weight, margin: 0, width: \'auto\', padding: (element.options.padding | arrToPadding)}" class="button-1" ng-href="{{ element.options.url }}" data-default="1">{{ element.options.buttonText }}</a>             </td>\n                </tr>\n                </tbody>\n            </table>\n        </td>\n    </tr>\n    </tbody>\n</table>',
    },
    text: {
      type: 'text',
      sort: 2,
      element: {
        type: 'text',
        icon: '&#xE8EE;',
        primary_head: 'builder_el_text',
        second_head: 'builder_el_text_comment',
      },
      defaultOptions: {
        padding: ['10px', '15px', '10px', '15px'],
        backgroundColor: '#ffffff',
        font: {
          family: 'inherit',
          familyOptions: defaultFontFamily,
        },
        text:
          '<p style="margin: 0">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>',
      },
      template:
        '<table class="main" width="100%" cellspacing="0" cellpadding="0" border="0" ng-style="{backgroundColor: element.options.backgroundColor}" align="center" data-type="text-block">\n    <tbody>\n    <tr>\n        <td class="block-text" data-block-id="background" data-clonable="true" align="left" ng-style="{padding:(element.options.padding | arrToPadding), fontSize: 13, lineHeight: 1.3, fontFamily: element.options.font.family}"\n      ui-tinymce="tinymceOptions"    ng-model="element.options.text">\n        </td>\n    </tr>\n    </tbody>\n</table>',
    },
    social: {
      type: 'social',
      sort: 10,
      element: {
        type: 'social',
        icon: 'share',
        primary_head: 'social_icons',
        second_head: 'social_icons_comment',
      },
      defaultOptions: {
        align: 'center',
        padding: ['10px', '15px', '10px', '15px'],
        backgroundColor: '#eeeeee',
        links: {
          facebook: {
            link: 'https://www.facebook.com/envato',
            active: true,
          },
          twitter: {
            link: 'https://twitter.com/envatomarket',
            active: true,
          },
          linkedin: {
            link: '',
            active: false,
          },
          youtube: {
            link: 'https://www.youtube.com/user/Envato',
            active: true,
          },
          instagram: {
            link: '',
            active: false,
          },
        },
      },
      template:
        '<table class="main" align="center" width="100%" cellspacing="0" cellpadding="0" border="0" ng-style="{backgroundColor: element.options.backgroundColor}" data-type="social-links">\n    <tbody>\n    <tr>\n        <td class="social" align="{{element.options.align}}" ng-style="{padding: (element.options.padding | arrToPadding)}">\n            <a ng-href="{{element.options.links.facebook.link}}" target="_blank" style="border: none;text-decoration: none;" class="facebook">\n                <img border="0" ng-if="element.options.links.facebook.active" src="assets/social/facebook.png">\n            </a>\n            <a ng-href="{{element.options.links.twitter.link}}" target="_blank" style="border: none;text-decoration: none;" class="twitter">\n                <img border="0" ng-if="element.options.links.twitter.active" src="assets/social/twitter.png">\n            </a>\n            <a ng-href="{{element.options.links.linkedin.link}}" target="_blank" style="border: none;text-decoration: none;" class="linkedin">\n                <img border="0" ng-if="element.options.links.linkedin.active" src="assets/social/linkedin.png">\n            </a>\n            <a ng-href="{{element.options.links.youtube.link}}" target="_blank" style="border: none;text-decoration: none;" class="youtube">\n                <img border="0" ng-if="element.options.links.youtube.active" src="assets/social/youtube.png">\n            </a>\n             <a ng-href="{{element.options.links.instagram.link}}" target="_blank" style="border: none;text-decoration: none;" class="instagram">\n                <img border="0" ng-if="element.options.links.instagram.active" src="assets/social/instagram.png">\n            </a>\n         </td>\n    </tr>\n    </tbody>\n</table>',
    },
    divider: {
      type: 'divider',
      sort: 3,
      element: {
        type: 'divider',
        icon: '&#xE8E9;',
        primary_head: 'builder_el_divider',
        second_head: 'builder_el_divider_comment',
      },
      defaultOptions: {
        padding: ['15px', '15px', '15px', '15px'],
        backgroundColor: '#ffffff',
        border: {
          size: 1,
          style: 'solid',
          styleOptions: ['solid', 'dashed', 'dotted'],
          color: '#DADFE1',
        },
      },
      template:
        '<table class="main" width="100%" ng-style="{border: 0, backgroundColor: element.options.backgroundColor}" cellspacing="0" cellpadding="0" border="0" align="center" data-type="divider">\n    <tbody>\n    <tr>\n        <td class="divider-simple" ng-style="{padding: (element.options.padding | arrToPadding)};">\n            <table width="100%" cellspacing="0" cellpadding="0" border="0" ng-style="{borderTopWidth: element.options.border.size, borderTopStyle: element.options.border.style, borderTopColor: element.options.border.color}">\n                <tbody>\n                <tr>\n                    <td width="100%"></td>\n                </tr>\n                </tbody>\n            </table>\n        </td>\n    </tr>\n    </tbody>\n</table>',
    },
    image: {
      type: 'image',
      sort: 5,
      element: {
        type: 'image',
        icon: '&#xE40B;',
        primary_head: 'builder_el_image',
        second_head: 'builder_el_image_comment',
      },
      defaultOptions: {
        align: 'center',
        padding: ['15px', '15px', '15px', '15px'],
        image: 'assets/350x150.jpg',
        width: '370',
        backgroundColor: '#ffffff',
        altTag: '',
        linkTo: {
          type: 'none',
          typeOptions: ['link', 'email', 'none'],
          link: '',
        },
      },
      template:
        '<table width="100%" class="main" cellspacing="0" cellpadding="0" border="0" align="center" ng-style="{backgroundColor: element.options.backgroundColor}" data-type="image">\n    <tbody>\n    <tr>\n        <td align="{{ element.options.align }}" ng-style="{padding: (element.options.padding | arrToPadding)}" class="image">\n          <img border="0" align="one_image" image-with-link link="element.options.linkTo" style="display:block;max-width:100%;" ng-style="{width: element.options.width}" alt="{{element.options.altTag}}" ng-src="{{ element.options.image }}" tabindex="0">       </td>\n    </tr>\n    </tbody>\n</table>',
    },
    navBar: {
      type: 'navBar',
      sort: 10,
      element: {
        type: 'navBar',
        icon: '&#xE5D2;',
        primary_head: 'builder_el_navbar',
        second_head: 'builder_el_navbar_comment',
      },
      defaultOptions: {
        align: 'center',
        padding: ['5px', '15px', '5px', '15px'],
        image: 'assets/350x150.jpg',
        backgroundColor: '#ef6451',
        color: '#ffffff',
        border: {
          size: 0,
          color: '#3498DB',
          style: 'solid',
          styleOptions: ['dotted', 'solid', 'dashed'],
        },
        font: {
          size: 15,
          weight: 'normal',
          weightOptions: [
            'bold',
            'bolder',
            'lighter',
            'inherit',
            'initial',
            'normal',
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
          ],
          family: 'inherit',
          familyOptions: defaultFontFamily,
        },
        items: [
          {
            title: 'Default',
            href: 'https://em.wlocalhost.org/#!/',
          },
        ],
      },
      template:
        '<div class="menu-block" ng-style="{padding: (element.options.padding | arrToPadding), backgroundColor: element.options.backgroundColor, borderWidth: element.options.border.size, borderStyle: element.options.border.style, borderColor: element.options.border.color}"><div class="menu-logo"><img ng-src="{{ element.options.image }}" /></div><div ng-style="{textAlign: element.options.align}" class="menu-links"> <ul><li ng-repeat="item in element.options.items"><a ng-style="{fontFamily: element.options.font.family, fontWeight: element.options.font.weight, color: element.options.color, fontSize: element.options.font.size}" href="{{item.href}}">{{item.title}}</a></li></ul></div></div>',
    },
    location: {
      type: 'location',
      sort: 11,
      element: {
        type: 'location',
        icon: '&#xE0C8;',
        primary_head: 'builder_el_location',
        second_head: 'builder_el_location_comment',
      },
      defaultOptions: {
        align: 'center',
        padding: ['15px', '15px', '15px', '15px'],
        address: '37 bis, rue du Sentier 75002 Paris',
        image: 'http://i.imgur.com/DPCJHhy.png',
        backgroundColor: '#ffffff',
        color: '#ef6451',
        font: {
          size: 20,
          weight: 'normal',
          weightOptions: [
            'bold',
            'bolder',
            'lighter',
            'inherit',
            'initial',
            'normal',
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
          ],
          family: 'inherit',
          familyOptions: defaultFontFamily,
        },
      },
      template: `<div class="location-block" ng-style="{padding: (element.options.padding | arrToPadding), backgroundColor: element.options.backgroundColor}"><div class="location-img"><img ng-src="{{ element.options.image }}" /></div><div class="location-address"><a ng-style="{fontFamily: element.options.font.family, fontEeight: element.options.font.weight, color: element.options.color, fontSize: element.options.font.size}" href="http://maps.google.com/maps?q={{element.options.address}}">{{element.options.address}}</a></div></div>`,
    },
    imageTextRight: {
      type: 'imageTextRight',
      sort: 6,
      element: {
        type: 'imageTextRight',
        icon: 'format_textdirection_l_to_r',
        primary_head: 'builder_el_image_text_right',
        second_head: 'builder_el_image_text_right_comment',
      },
      defaultOptions: {
        padding: ['15px', '15px', '15px', '15px'],
        image: 'assets/340x145.jpg',
        width: '340',
        backgroundColor: '#ffffff',
        altTag: '',
        linkTo: {
          type: 'none',
          typeOptions: ['link', 'email', 'none'],
          link: '',
        },
        text:
          '<p style="line-height: 20px;margin:0">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>',
      },
      template: `<table class="main" width="100%" cellspacing="0" cellpadding="0" border="0" ng-style="{backgroundColor: element.options.backgroundColor}" align="center">
        <tbody>
          <tr ng-style="{padding: (element.options.padding | arrToPadding), display: 'table-cell', fontFamily: 'Arial', fontSize: 13, lineHeight: 1.3}">
            <td width="295">
              <img image-with-link link="element.options.linkTo" border="0" ng-src="{{ element.options.image }}" ng-style="{width: element.options.width, display: 'block', margin: 0, maxWidth: '100%', padding: 0}">
            </td>
            <td width="10"></td>
            <td width="295" valign="top" ui-tinymce="tinymceOptions" ng-model="element.options.text"></td>
          </tr>
        </tbody>
      </table>`,
    },
    imageTextLeft: {
      type: 'imageTextLeft',
      sort: 7,
      element: {
        type: 'imageTextLeft',
        icon: 'format_textdirection_r_to_l',
        primary_head: 'builder_el_image_text_left',
        second_head: 'builder_el_image_text_left_comment',
      },
      defaultOptions: {
        padding: ['15px', '15px', '15px', '15px'],
        image: 'assets/340x145.jpg',
        width: '340',
        backgroundColor: '#ffffff',
        altTag: '',
        linkTo: {
          type: 'none',
          typeOptions: ['link', 'email', 'none'],
          link: '',
        },
        text:
          '<p style="line-height: 20px;margin:0"">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>',
      },
      template: `<table class="main" width="100%" cellspacing="0" cellpadding="0" border="0" ng-style="{backgroundColor: element.options.backgroundColor}" align="center">
        <tbody>
          <tr ng-style="{padding: (element.options.padding | arrToPadding), display: 'table-cell', fontFamily: 'Arial', fontSize: 13, color: 'black', lineHeight: 1.3}">
            <td width="295" valign="top" ui-tinymce="tinymceOptions" ng-model="element.options.text"></td>
            <td width="10px"></td>
            <td width="295">
              <img image-with-link link="element.options.linkTo" border="0" ng-src="{{ element.options.image }}" ng-style="{width: element.options.width, display: 'block', margin: 0, maxWidth: '100%', padding: 0}">
            </td>
          </tr>
        </tbody>
      </table>`,
    },
    imageText2x2: {
      type: 'imageText2x2',
      sort: 8,
      element: {
        type: 'imageText2x2',
        icon: 'text_fields',
        primary_head: 'builder_el_image_text_2x2',
        second_head: 'builder_el_image_text_2x2_comment',
      },
      defaultOptions: {
        padding: ['15px', '15px', '15px', '15px'],
        image1: 'assets/255x154.jpg',
        image2: 'assets/255x154.jpg',
        width1: '255',
        width2: '255',
        backgroundColor: '#ffffff',
        altTag1: '',
        altTag2: '',
        linkTo1: {
          type: 'none',
          typeOptions: ['link', 'email', 'none'],
          link: '',
        },
        linkTo2: {
          type: 'none',
          typeOptions: ['link', 'email', 'none'],
          link: '',
        },
        text1:
          '<p style="line-height: 20px;margin:0"">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>',
        text2:
          '<p style="line-height: 20px;margin:0"">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>',
      },
      template: `<table class="main" width="100%" cellspacing="0" cellpadding="0" border="0" ng-style="{backgroundColor: element.options.backgroundColor}" align="center" data-type="imageText2x2Template">
        <tbody ng-style="{display: 'table-cell', padding: (element.options.padding | arrToPadding )}">
          <tr>
            <td width="295" style="padding-left: 5px;"> 
              <img image-with-link link="element.options.linkTo1" ng-src="{{ element.options.image1 }}" alt="{{element.options.altTag1}}" ng-style="{width: element.options.width1, maxWidth: '100%'}" border="0">
            </td>
            <td width="10"></td>
            <td width="295" style="padding-right: 5px;"> 
              <img image-with-link link="element.options.linkTo2" ng-src="{{ element.options.image2 }}" alt="{{element.options.altTag2}}"  ng-style="{width: element.options.width2, maxWidth: '100%'}" border="0">
            </td>
          </tr>
          <tr>
            <td width="295" align="left" style="font-family: Arial;font-size: 13px;color: #000000;line-height: 20px;padding-left: 5px;" ui-tinymce="tinymceOptions" ng-model="element.options.text1"></td>
            <td width="10"></td>
            <td width="295" align="left" style="font-family: Arial;font-size: 13px;color: #000000;line-height: 20px;padding-right: 5px;" ui-tinymce="tinymceOptions" ng-model="element.options.text2"></td>
          </tr>
        </tbody>
      </table>`,
    },
    imageText3x2: {
      type: 'imageText3x2',
      sort: 9,
      element: {
        type: 'imageText3x2',
        icon: 'wrap_text',
        primary_head: 'builder_el_image_text_3x2',
        second_head: 'builder_el_image_text_3x2_comment',
      },
      defaultOptions: {
        padding: ['15px', '15px', '15px', '15px'],
        image1: 'assets/154x160.jpg',
        image2: 'assets/154x160.jpg',
        image3: 'assets/154x160.jpg',
        width1: '154',
        width2: '154',
        width3: '154',
        backgroundColor: '#ffffff',
        altTag1: '',
        altTag2: '',
        altTag3: '',
        linkTo1: {
          type: 'none',
          typeOptions: ['link', 'email', 'none'],
          link: '',
        },
        linkTo2: {
          type: 'none',
          typeOptions: ['link', 'email', 'none'],
          link: '',
        },
        linkTo3: {
          type: 'none',
          typeOptions: ['link', 'email', 'none'],
          link: '',
        },
        text1:
          '<p style="line-height: 20px;margin:0"">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>',
        text2:
          '<p style="line-height: 20px;margin:0"">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>',
        text3:
          '<p style="line-height: 20px;margin:0"">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>',
      },
      template: `<table width="100%" class="main" cellspacing="0" cellpadding="0" border="0" ng-style="{backgroundColor: element.options.backgroundColor}" align="center" data-type="imageText3x2">
        <tbody>
          <tr>
            <td valign="top" width="100%">
              <div ng-style="{display: 'flex', padding: (element.options.padding | arrToPadding)}">
                <div style="flex: 1 1 100%; display: flex; flex-direction: column;padding: 0 3px;">
                  <img style="max-width: 100%; padding-bottom: 3px;display: block;margin: 0 auto;" image-with-link link="element.options.linkTo1" ng-src="{{ element.options.image1 }}" ng-style="{width: element.options.width1}" alt="{{element.options.altTag1}}" border="0">
                  <div style="font-family: Arial, serif; font-size: 13px; color: #000000; line-height: 20px" ui-tinymce="tinymceOptions" ng-model="element.options.text1"></div>
                </div>
                <div style="flex: 1 1 100%; display: flex; flex-direction: column;padding: 0 3px;">
                  <img style="max-width: 100%; padding-bottom: 3px;display: block;margin: 0 auto;" image-with-link link="element.options.linkTo2" ng-src="{{ element.options.image2 }}"  ng-style="{width: element.options.width2}" alt="{{element.options.altTag2}}" border="0">
                  <div style="font-family: Arial, serif; font-size: 13px; color: #000000; line-height: 20px" ui-tinymce="tinymceOptions" ng-model="element.options.text2"></div>
                </div>
                <div style="flex: 1 1 100%; display: flex; flex-direction: column;padding: 0 3px;">
                  <img style="max-width: 100%; padding-bottom: 3px;display: block;margin: 0 auto;" image-with-link link="element.options.linkTo3" ng-src="{{ element.options.image3 }}"  ng-style="{width: element.options.width3}" alt="{{element.options.altTag3}}" border="0">
                  <div style="font-family: Arial, serif; font-size: 13px; color: #000000; line-height: 20px" ui-tinymce="tinymceOptions" ng-model="element.options.text3"></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>`,
    },
  },
};

// In case of require()
if (typeof module !== 'undefined') {
  module.exports = emailBuilderConfigurations;
}
