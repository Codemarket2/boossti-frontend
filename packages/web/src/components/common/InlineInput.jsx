import styled from 'styled-components';

export default styled.input`
  color: ${(props) => props.theme.palette.text.primary};
  background: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  margin-right: 10px;
  width: ${(props) => props.width};
`;
