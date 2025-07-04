import { observer } from "mobx-react-lite";
import { FloatLabel } from "primereact/floatlabel";
import { InputText, InputTextProps } from "primereact/inputtext";
import { FC } from "react";



export const PfInputText: FC<InputTextProps & { helperText?: string }> = observer((props) => {
  return (
    <div>
      <FloatLabel>
        <InputText
          id={props.id}
          invalid={props.invalid}
          keyfilter={props.keyfilter}
          pt={props.pt}
          ptOptions={props.ptOptions}
          size={props.size}
          style={props.style || { width: '500px' }}
          tooltip={props.tooltip}
          tooltipOptions={props.tooltipOptions}
          unstyled={props.unstyled}
          validateOnly={props.validateOnly}
          value={props.value}
          variant={props.variant}
          onInput={props.onInput}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          disabled={props.disabled}
          title={props.title}
          placeholder={`Введите ${props.placeholder?.toLowerCase()}`}
        />
        <label htmlFor={props.id}>{props.title}</label>
      </FloatLabel>
      {props.helperText && <small
        style={{
          marginLeft: '10px',
          marginTop: '5px',
          maxWidth: '490px' ,
          display: 'block',
          wordWrap: 'break-word',
          fontSize: '11px'
        }}
        className="p-text-secondary"
      >{
          props.helperText}
      </small>}
    </div>
  );
});
