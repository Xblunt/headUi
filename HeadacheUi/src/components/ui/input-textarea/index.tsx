import { observer } from "mobx-react-lite";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import { FC } from "react";

// interface IProps extends InputTextareaProps { }

export const PfInputTextarea: FC<InputTextareaProps> = observer((props) => {

  return (
    <FloatLabel>
      <InputTextarea
        id={props.id}
        autoResize={true}
        invalid={props.invalid}
        keyfilter={props.keyfilter}
        pt={props.pt}
        ptOptions={props.ptOptions}
        tooltip={props.tooltip}
        tooltipOptions={props.tooltipOptions}
        style={props.style || { minWidth: '500px', minHeight: '150px', }}
        unstyled={props.unstyled}
        value={props.value}
        variant={props.variant}
        disabled={props.disabled}
        title={props.title}
        placeholder={`Введите ${props.placeholder?.toLowerCase()}`}
        onInput={props.onInput}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.title}</label>
    </FloatLabel>
  );
});
