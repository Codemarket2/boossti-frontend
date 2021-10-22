import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { getSepratorValue } from './seprator';
const UPLOAD_ENDPOINT = {
  saveimage: '/api/saveimage',
  savecover: '/api/savecover',
  saveimageLarge: '/api/saveimage-large',
  saveimageModule: '/api/saveimage-module',
};

export default function Box({ onSave, onClose, data }) {
  const [init, setInit] = useState(false);
  useEffect(() => {
    // if (mainCss) {
    //   document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', mainCss);
    // }
    // if (sectionCss) {
    //   document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', sectionCss);
    // }

    let timeoutId; //Used for Auto Save

    jQuery(document).ready(function ($: any) {
      // Load content from database. In this example we use browser's localStorage. Normally you need to load saved content from database and place it directly inside div.is-wrapper above (not here)
      // if (pageHTML) {
      //   $('.is-wrapper').html(pageHTML);
      // }

      //Enable editing
      $('.is-wrapper').contentbox({
        modulePath: '/assets/modules/',
        assetPath: '/assets/',
        fontAssetPath: '/assets/fonts/',
        designPath: '/assets/designs/',
        contentStylePath: '/assets/styles/',
        snippetData: '/assets/minimalist-blocks/snippetlist.html',
        coverImageHandler: UPLOAD_ENDPOINT.savecover /* for uploading section background */,
        largerImageHandler: UPLOAD_ENDPOINT.saveimageLarge /* for uploading larger image */,
        moduleConfig: [
          {
            moduleSaveImageHandler:
              UPLOAD_ENDPOINT.saveimageModule /* for module purpose image saving (ex. slider) */,
          },
        ],
        onRender: function () {
          //Add lightbox script (This is optional. If used, lightbox js & css must be included)
          $('a.is-lightbox').simpleLightbox({
            closeText: '<i style="font-size:35px" class="icon ion-ios-close-empty"></i>',
            navText: [
              '<i class="icon ion-ios-arrow-left"></i>',
              '<i class="icon ion-ios-arrow-right"></i>',
            ],
            disableScroll: false,
          });
        },
        onChange: function () {
          //Auto Save
          clearTimeout(timeoutId);
          timeoutId = setTimeout(function () {
            save();
          }, 1000);
        },
      });

      // Example of adding buttons on the sidebar

      $('.is-wrapper')
        .data('contentbox')
        .addButton({
          pos: 2, // button position
          title: 'Undo', // title
          html:
            '<svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#ion-ios-undo"></use></svg>', // icon
          onClick: function () {
            $('.is-wrapper').data('contentbox').undo();
          },
        });

      $('.is-wrapper')
        .data('contentbox')
        .addButton({
          pos: 3, // button position
          title: 'Redo', // title
          html:
            '<svg class="is-icon-flex" style="width:14px;height:14px;"><use xlink:href="#ion-ios-redo"></use></svg>', // icon
          onClick: function () {
            $('.is-wrapper').data('contentbox').redo();
          },
        });

      $('a.is-lightbox').simpleLightbox({
        closeText: '<i style="font-size:35px" class="icon ion-ios-close-empty"></i>',
        navText: [
          '<i class="icon ion-ios-arrow-left"></i>',
          '<i class="icon ion-ios-arrow-right"></i>',
        ],
        disableScroll: false,
      });
    });

    function save() {
      //Save all base64 images into files on the server
      $('.is-wrapper')
        .data('contentbox')
        .saveImages(UPLOAD_ENDPOINT.saveimage, function () {
          //Save Content
          const sHTML = $('.is-wrapper').data('contentbox').html();
          const sMainCss = $('.is-wrapper').data('contentbox').mainCss();
          const sSectionCss = $('.is-wrapper').data('contentbox').sectionCss();
          onSave(sHTML, sMainCss, sSectionCss);
        });
    }
  }, []);

  const handleClose = () => {
    jQuery(document).ready(async function ($) {
      const sHTML = $('.is-wrapper').data('contentbox').html();
      const sMainCss = $('.is-wrapper').data('contentbox').mainCss();
      const sSectionCss = $('.is-wrapper').data('contentbox').sectionCss();
      await onSave(sHTML, sMainCss, sSectionCss);
      $('.is-wrapper').data('contentbox').destroy();
      onClose();
    });
  };

  useEffect(() => {
    if (data && data.getFieldValue && !init) {
      setInit(true);
      const { pageHTML, mainCss, sectionCss } = getSepratorValue(data.getFieldValue.value);
      if (mainCss) {
        document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', mainCss);
      }
      if (sectionCss) {
        document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', sectionCss);
      }
      jQuery(document).ready(function ($) {
        if (pageHTML) {
          $('.is-wrapper').data('contentbox').loadHtml(pageHTML);
        }
      });
    }
  }, [data]);

  return (
    <div>
      <div className="position-fixed m-3" style={{ zIndex: 999, right: 0 }}>
        <Button size="small" variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
      </div>
      <div className="is-wrapper"></div>
    </div>
  );
}
