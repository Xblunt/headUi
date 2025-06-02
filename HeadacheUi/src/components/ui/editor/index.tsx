import { observer } from "mobx-react-lite";
import { Editor, EditorProps } from "primereact/editor";
import { FC } from "react";

// interface IProps extends EditorProps { }

export const PfEditor: FC<EditorProps> = observer((props) => {
  const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }, { 'header': 5 }, { 'header': 6 }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }],
      [{ 'align': [] }],
      ['link', 'clean']  
    ],
  };

  return (
    <Editor
      value={props.value}
      headerTemplate={<></>}
      modules={modules}
      onTextChange={props.onTextChange}
      formats={props.formats}
      placeholder={`Введите ${props.placeholder?.toLowerCase()}`}
      pt={props.pt}
      ptOptions={props.ptOptions}
      readOnly={props.readOnly}
      showHeader={props.showHeader}
      unstyled={props.unstyled}
    />
  );
});
