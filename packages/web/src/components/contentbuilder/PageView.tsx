import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import StyledDiv from './StyledDiv';
import DisplayContent from './DisplayContent';

interface IProps {
  value: string;
  onClickEdit: () => void;
}

export default function Home({ value, onClickEdit }: IProps) {
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
      <DisplayContent value={value} />
    </StyledDiv>
  );
}
