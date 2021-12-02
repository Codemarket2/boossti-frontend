import { useUpdateForm } from '@frontend/shared/hooks/form';
import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getSepratorValue, seprator } from '../contentbox/seprator';
// import Authorization from '../common/Authorization';
// import ErrorLoading from '../common/ErrorLoading';
import { onAlert } from '../../utils/alert';
import Backdrop from '../common/Backdrop';

const UPLOAD_ENDPOINT = {
  saveimage: '/api/saveimage',
  savecover: '/api/savecover',
  saveimageLarge: '/api/saveimage-large',
  saveimageModule: '/api/saveimage-module',
};

interface IProps {
  _id: string;
}

export default function DesignEditor({ _id }: IProps) {
  const { error, state, setState, updateLoading } = useUpdateForm({ onAlert, _id });

  const [init, setInit] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(true);

  const onSave = (sPageHTML = '', sMainCss = '', sSectionCss = '') => {
    const value = `${sPageHTML}${seprator}${sMainCss}${seprator}${sSectionCss}`;
    setState({
      ...state,
      settings: { ...state.settings, layout: { ...state.settings.layout, value } },
    });
  };

  //   useEffect(
  const loadBox = () => {
    let timeoutId;

    jQuery(document).ready(function ($: any) {
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
  };
  // ,[]);

  const handleClose = () => {
    jQuery(document).ready(async function ($) {
      setShowBackdrop(true);
      //   const sHTML = $('.is-wrapper').data('contentbox').html();
      //   const sMainCss = $('.is-wrapper').data('contentbox').mainCss();
      //   const sSectionCss = $('.is-wrapper').data('contentbox').sectionCss();
      //   onSave(sHTML, sMainCss, sSectionCss);
      $('.is-wrapper').data('contentbox').destroy();
      window.location.href = `/forms/${_id}`;
    });
  };

  useEffect(() => {
    if (state && !init) {
      setInit(true);
      document
        .getElementsByTagName('head')[0]
        .insertAdjacentHTML(
          'beforeend',
          `<link href="/contentbox/contentbox.css" rel="stylesheet" type="text/css" />`,
        );
      loadBox();
      const { pageHTML, mainCss, sectionCss } = getSepratorValue(
        state?.settings?.layout?.value || '',
      );
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
      setShowBackdrop(false);
    }
  }, [state]);

  //   if (error || !state) {
  //     return <ErrorLoading error={error} />;
  //   }

  return (
    // <Authorization _id={state?.createdBy?._id}>
    <div>
      <Backdrop open={showBackdrop || !init} />
      <div className="position-fixed m-3" style={{ zIndex: 999, right: 0 }}>
        <Button size="small" variant="contained" color="primary" onClick={handleClose}>
          Close
          {updateLoading && <CircularProgress className="ml-2" size={15} color="secondary" />}
        </Button>
      </div>
      <div className="is-wrapper" />
    </div>
    // </Authorization>
  );
}
