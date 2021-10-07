import { Component } from 'react';
import BuilderControl from './BuilderControl';
import StyledDiv from './StyledDiv';
import Button from '@material-ui/core/Button';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: this.props.htmlData,
    };

    this.handleOnSave = this.handleOnSave.bind(this);
    this.handleOnSaveAndFinish = this.handleOnSaveAndFinish.bind(this);
  }

  handleOnSave(html) {
    // Save content
    this.props.onSave(html);
  }

  handleOnSaveAndFinish(html) {
    // Save content
    this.props.onSave(html);

    this.props.onClose();
  }

  componentWillUnmount() {
    if (this.callDestroy) this.callDestroy();
  }

  closeBuilder = () => {
    const answer = window.confirm('Do you really want to leave?');
    // cancel the navigation and stay on the same page
    if (!answer) return false;

    this.props.onClose();
  };

  render() {
    return (
      <StyledDiv>
        <BuilderControl
          // history={this.history}
          initialHtml={this.state.html}
          onSave={this.handleOnSave}
          onSaveAndFinish={this.handleOnSaveAndFinish}
          doSave={(f) =>
            (this.callSave = f)
          } /* https://stackoverflow.com/questions/37949981/call-child-method-from-parent */
          doSaveAndFinish={(f) => (this.callSaveAndFinish = f)}
          doDestroy={(f) => (this.callDestroy = f)}
          base64Handler={'http://localhost:8001/upload'}
          largerImageHandler={'http://localhost:8001/upload'}
          imageSelect={'images.html'}
          snippetFile={'/assets/minimalist-blocks/content.js'}
          languageFile={'/contentbuilder/lang/en.js'}
        />
        <div
          className="m-3"
          style={{
            position: 'fixed',
            display: 'flex',
            top: 0,
          }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="button"
            onClick={() => this.callSaveAndFinish()}
            disabled={this.props.loading}>
            Save
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            type="button"
            onClick={() => this.closeBuilder()}
            className="ml-2"
            disabled={this.props.loading}>
            Close
          </Button>
        </div>
      </StyledDiv>
    );
  }
}
