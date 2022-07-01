/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface IProps {
  value: any;
  onSave: (newValue) => void;
  editMode?: boolean;
}

export class SampleBase extends React.PureComponent<IProps, any> {
  componentDidMount() {
    setTimeout(() => {
      this.rendereComplete();
    });
  }

  rendereComplete() {
    //
  }
}
