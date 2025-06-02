import { observer } from "mobx-react-lite";
import { FloatLabel } from "primereact/floatlabel";
import { FC } from "react";
import { InputMask, InputMaskProps } from 'primereact/inputmask';

export const PfInputMask: FC<InputMaskProps> = observer((props) => {

  return (
    <FloatLabel>
      <InputMask
        value={props.value}
        onChange={props.onChange}
        mask={props.mask}
        placeholder={props.placeholder}
        style={props.style || { width: '500px' }}
      />
      <label htmlFor={props.id}>{props.title}</label>
    </FloatLabel>
  );
});
