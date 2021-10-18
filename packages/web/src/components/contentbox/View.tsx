import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DisplayContent from './DisplayContent';

interface IProps {
  pageHTML: string;
  mainCss: string;
  sectionCss: string;
  onClickEdit: () => void;
}

export default function Home({ pageHTML, mainCss, sectionCss, onClickEdit }: IProps) {
  return (
    <div>
      <div className="position-fixed m-3" style={{ zIndex: 999, right: 0 }}>
        <Button
          size="small"
          startIcon={<EditIcon />}
          variant="contained"
          color="primary"
          onClick={onClickEdit}>
          Edit
        </Button>
      </div>
      <DisplayContent pageHTML={pageHTML} mainCss={mainCss} sectionCss={sectionCss} />
    </div>
  );
}
