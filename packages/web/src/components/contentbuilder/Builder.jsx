export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // see Home.js where localStorage is set first as a sample/initial content
      html: localStorage.getItem('mywebcontent'),
    };

    this.history = props.history;

    this.handleOnSave = this.handleOnSave.bind(this);
    this.handleOnSaveAndFinish = this.handleOnSaveAndFinish.bind(this);
  }

  handleOnSave(html) {
    // Save content
    localStorage.setItem('mywebcontent', html);
  }

  handleOnSaveAndFinish(html) {
    // Save content
    localStorage.setItem('mywebcontent', html);

    // this.props.history.push('/');
    Router.push('/pageview');
  }

  componentWillUnmount() {
    if (this.callDestroy) this.callDestroy();
  }

  closeBuilder = () => {
    const answer = window.confirm('Do you really want to leave?');
    // cancel the navigation and stay on the same page
    if (!answer) return false;

    // this.props.history.push('/');
    Router.push('/pageview');
  };

  render() {
    return (
      <>
        <BuilderControl
          history={this.history}
          initialHtml={this.state.html}
          onSave={this.handleOnSave}
          onSaveAndFinish={this.handleOnSaveAndFinish}
          doSave={(f) =>
            (this.callSave = f)
          } /* https://stackoverflow.com/questions/37949981/call-child-method-from-parent */
          doSaveAndFinish={(f) => (this.callSaveAndFinish = f)}
          doDestroy={(f) => (this.callDestroy = f)}
          base64Handler={'/upload'}
          largerImageHandler={'/upload'}
          imageSelect={'images.html'}
          snippetFile={'/assets/minimalist-blocks/content.js'}
          languageFile={'/contentbuilder/lang/en.js'}
        />

        <div
          className="is-ui"
          style={{ position: 'fixed', right: '30px', bottom: '30px', display: 'flex' }}>
          <button
            type="button"
            onClick={() => this.callSave()}
            style={{ width: '85px', backgroundColor: 'rgba(0,0,0,0.06)' }}>
            Save
          </button>
          <button
            type="button"
            onClick={() => this.callSaveAndFinish()}
            style={{ width: '120px', backgroundColor: 'rgba(0,0,0,0.06)' }}>
            Save & Finish
          </button>
          <button
            type="button"
            onClick={() => this.closeBuilder()}
            style={{ width: '85px', backgroundColor: 'rgba(0,0,0,0.06)' }}>
            Close
          </button>
        </div>
      </>
    );
  }
}
