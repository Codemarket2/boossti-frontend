import { Component } from 'react';
import BuilderControl from './BuilderControl';
import Button from '@material-ui/core/Button';
import Backdrop from '../common/Backdrop';

type TProps = {
  value: string;
  onSave: (newValue: string) => void;
  onClose: () => void;
  loading?: boolean;
};
type TState = {
  showBackdrop: boolean;
};

export default class Builder extends Component<TProps, TState> {
  constructor(props) {
    super(props);
    this.state = {
      showBackdrop: false,
    };

    this.handleOnSave = this.handleOnSave.bind(this);
    this.handleOnSaveAndFinish = this.handleOnSaveAndFinish.bind(this);
  }

  callSaveAndFinish: any;
  callDestroy: any;

  handleOnSave(html) {
    this.props.onSave(html);
  }

  handleOnSaveAndFinish(html) {
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
      <div>
        <Backdrop open={this.state.showBackdrop} />
        <BuilderControl
          value={this.props.value}
          // onSave={this.handleOnSave}
          onSaveAndFinish={this.handleOnSaveAndFinish}
          // doSave={(f) => (this.callSave = f)}
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
            onClick={() => {
              this.setState({ ...this.state, showBackdrop: true });
              this.callSaveAndFinish();
            }}
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
      </div>
    );
  }
}
