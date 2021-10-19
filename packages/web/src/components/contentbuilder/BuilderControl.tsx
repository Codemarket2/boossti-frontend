import { Component } from 'react';
import axios from 'axios';
import ContentBuilder from '@innovastudio/contentbuilder';
import config from '@frontend/shared/aws-exports';
// import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';

const { aws_user_files_s3_bucket_region: region, aws_user_files_s3_bucket: bucket } = config;

type TProps = {
  value: string;
  onSave?: (value: string) => void;
  onSaveAndFinish: (value: string) => void;
  doSave?: any;
  doSaveAndFinish: any;
  doDestroy: any;
  container?: any;
  scriptPath?: any;
  pluginPath?: any;
  modulePath?: any;
  fontAssetPath?: any;
  assetPath?: any;
  imageSelect?: any;
  fileSelect?: any;
  base64Handler?: any;
  largerImageHandler?: any;
  snippetFile?: any;
  languageFile?: any;
};
type TState = {
  html: string;
  containerClass: string;
};

class BuilderControl extends Component<TProps, TState> {
  static defaultProps = {
    // container: '.is-container',
    scriptPath: '/contentbuilder/',
    pluginPath: '/contentbuilder/',
    modulePath: '/assets/modules/',
    fontAssetPath: '/assets/fonts/',
    assetPath: '/assets/',
    imageSelect: '',
    fileSelect: '',
    base64Handler: '',
    largerImageHandler: '',
    snippetFile: '',
    languageFile: '',
  };

  obj: any;

  constructor(props) {
    super(props);
    this.state = {
      html: this.props.value,
      containerClass: `container${uuid()}`,
    };

    this.saveContent = this.saveContent.bind(this);
    this.saveContentAndFinish = this.saveContentAndFinish.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  componentDidMount() {
    // Load language file first
    this.loadLanguageFile(this.props.languageFile, () => {
      // Then init the ContentBuilder
      this.obj = new ContentBuilder({
        container: `.${this.state.containerClass}`,
        scriptPath: this.props.scriptPath,
        pluginPath: this.props.pluginPath,
        modulePath: this.props.modulePath,
        fontAssetPath: this.props.fontAssetPath,
        assetPath: this.props.assetPath,
        imageSelect: this.props.imageSelect,
        fileSelect: this.props.fileSelect,
        largerImageHandler: this.props.largerImageHandler,
        onLargerImageUpload: (e) => {
          console.log('onLargerImageUpload');
          alert('onLargerImageUpload');
          const selectedImage = e.target.files[0];
          const filename = selectedImage.name;
          const reader = new FileReader();
          reader.onload = (e) => {
            let base64: any = e.target.result;
            base64 = base64.replace(/^data:image\/(png|jpeg);base64,/, '');

            // Upload image process
            axios
              .post(this.props.largerImageHandler, {
                image: base64,
                filename: filename,
              })
              .then((response: any) => {
                const uploadedImageUrl = response.data.url; // get saved image url
                this.obj.applyLargerImage(uploadedImageUrl); // set input
              })
              .catch((err) => {
                console.log(err);
              });
          };
          reader.readAsDataURL(selectedImage);
        },
      });

      this.obj.loadSnippets(this.props.snippetFile); // Load snippet file

      this.obj.loadHtml(this.state.html);
    });

    // https://stackoverflow.com/questions/37949981/call-child-method-from-parent
    if (this.props.doSave) this.props.doSave(this.saveContent); // Make it available to be called using doSave
    if (this.props.doSaveAndFinish) this.props.doSaveAndFinish(this.saveContentAndFinish);
    if (this.props.doDestroy) this.props.doDestroy(this.destroy);
  }

  loadLanguageFile = (languageFile, callback) => {
    if (!this.isScriptAlreadyIncluded(languageFile)) {
      const script = document.createElement('script');
      script.src = languageFile;
      script.async = true;
      script.onload = () => {
        if (callback) callback();
      };
      document.body.appendChild(script);
    } else {
      if (callback) callback();
    }
  };

  isScriptAlreadyIncluded = (src) => {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++)
      if (scripts[i].getAttribute('src') === src) return true;
    return false;
  };
  save = (callback) => {
    // If base64Handler is specified

    // Save all embedded base64 images first
    this.obj.saveImages('/api/saveimage', () => {
      // Then save the content
      let html = this.obj.html();

      if (callback) callback(html);
    });
    // this.obj.saveImages(
    //   '',
    //   () => {
    //     // Then save the content
    //     let html = this.obj.html();

    //     if (callback) callback(html);
    //   },
    //   async (img, base64, filename) => {
    //     try {
    //       const buf = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    //       let key = `media/content-builder/${uuid()}${+new Date()}.jpeg`;
    //       let url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    //       const res = await Storage.put(key, buf, {
    //         contentType: 'image/jpeg',
    //       });
    //       img.setAttribute('src', url);
    //       console.log('url', url);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   },
    // );
  };

  saveContent = () => {
    this.save((html) => {
      this.props.onSave(html);
    });
  };

  saveContentAndFinish = () => {
    this.save((html) => {
      this.props.onSaveAndFinish(html);
    });
  };

  destroy = () => {
    this.obj.destroy();
  };

  render() {
    return <div className={`is-container container ${this.state.containerClass}`}></div>;
  }
}

export default BuilderControl;
