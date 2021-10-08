import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import StyledDiv from './StyledDiv';

export default function Home({ htmlData, onClickEdit }) {
  async function onLoad() {
    let range = document.createRange();
    const wrapper = document.querySelector('.container');
    wrapper.innerHTML = '';
    wrapper.appendChild(range.createContextualFragment(htmlData)); // We use createContextualFragment so that embedded javascript code (code block) will be executed
  }
  useEffect(() => {
    onLoad();
  }, []);
  return (
    <StyledDiv>
      <div className="position-fixed m-3">
        <Button
          size="small"
          startIcon={<EditIcon />}
          variant="contained"
          color="primary"
          onClick={onClickEdit}>
          Edit
        </Button>
      </div>
      <div className="is-container container"></div>
    </StyledDiv>
  );
}
