import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NoSsr } from '@material-ui/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const useStyles = makeStyles(theme => ({
  editor: {
    paddingLeft: `${theme.spacing(2)}px !important`,
    paddingRight: `${theme.spacing(2)}px !important`,
    borderRadius: theme.spacing(1/2),
  },
}));

interface Props {
  /**
   * External classes
   */
  className?: string;
  /**
   * Code
   */
  code: string;
  /**
   * All other props
   */
  [x:string]: any;
};

const CodeHighlighter = ({ code, className, ...rest }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={className} {...rest}>
      <NoSsr>
        <SyntaxHighlighter language="javascript" style={vs2015} className={classes.editor}>
          {code}
        </SyntaxHighlighter>
      </NoSsr>
    </div>
  );
};

export default CodeHighlighter;
