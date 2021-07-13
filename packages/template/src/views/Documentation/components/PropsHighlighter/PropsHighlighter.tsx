import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

interface Props {
  /**
   * External classes
   */
  className?: string;
  /**
   * Description
   */
  dataProperties: Array<{
    name: string,
    type: string,
    default: string,
    description: string,
  }>;
  /**
   * All other props
   */
  [x:string]: any;
};

const PropsHighlighter = ({ dataProperties, className, ...rest }: Props): JSX.Element => (
  <div className={className} {...rest}>
    <TableContainer>
      <Table aria-label="props & mthods">
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Type</b></TableCell>
            <TableCell><b>Default</b></TableCell>
            <TableCell><b>Description</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataProperties.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell><i>{row.type}</i></TableCell>
              <TableCell>{row.default}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default PropsHighlighter;
