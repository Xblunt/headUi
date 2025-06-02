import { observer } from "mobx-react-lite";
import { FloatLabel } from "primereact/floatlabel";
import { FC } from "react";
import { InputNumber, InputNumberProps } from 'primereact/inputnumber';

export const PfInputNumber: FC<InputNumberProps> = observer((props) => {

  return (
    <FloatLabel>
      <InputNumber
        value={props.value}
        onChange={props.onChange}
        onValueChange={props.onValueChange}
        placeholder={`Введите ${props.placeholder?.toLowerCase()}`}
        style={props.style || { width: '500px' }}
        min={0}
        maxLength={props.maxLength}
      />
      <label htmlFor={props.id}>{props.title}</label>
    </FloatLabel>
  );
});
