import { MentionsInput, Mention } from 'react-mentions';
// import classNames from '../../utils/mention.module.css';
import { useMentionList } from '@frontend/shared/hooks/list';

interface IProps {
  value: string;
  placeholder: string;
  onChange: (arg: any) => void;
  minHeight?: number;
}

export default function MentionInput({
  value,
  onChange,
  minHeight = 0,
  placeholder = "What's on your mind ?",
}: IProps) {
  const { suggestions, state, setState, data } = useMentionList();

  const handleChange = ({ target }: any) => {
    target.value = target.value.split('@@@^^^@@@__').join('@@@^^^ @@@__');
    setState({ ...state, showSubList: false });
    return onChange(target.value);
  };

  const handleOnAdd = (id, display, startPos, endPos) => {
    if (!state.showSubList) {
      let textBeforeCursorPosition = value.substring(0, startPos);
      let textAfterCursorPosition = value.substring(startPos, endPos - 1);
      let newString =
        textBeforeCursorPosition + `@@@__${id}^^__${display}@@@^^^@` + textAfterCursorPosition;
      setState({
        ...state,
        selectedType: id,
        showSubList: true,
      });
      return onChange(newString);
    }
  };

  return (
    <MentionsInput
      allowSuggestionsAboveCursor
      style={{ minHeight }}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      // classNames={classNames}
    >
      <Mention
        trigger="@"
        data={suggestions}
        markup="@@@____id__^^____display__@@@^^^"
        appendSpaceOnAdd
        onAdd={handleOnAdd}
        // className={classNames.mentions__mention}
      />
    </MentionsInput>
  );
}
