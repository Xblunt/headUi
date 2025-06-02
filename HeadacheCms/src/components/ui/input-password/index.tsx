import { observer } from "mobx-react-lite";
import { FloatLabel } from "primereact/floatlabel";
import { Password, PasswordProps } from "primereact/password";
import { FC } from "react";

export const PfPassword: FC<PasswordProps> = observer((props) => {

  return (
    <FloatLabel>
      <Password
        className={props.className}
        id={props.id}
        feedback={props.feedback}
        value={props.value}
        style={props.style || { width: '500px' }}
        onInput={props.onInput}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        title={props.title}
        toggleMask={props.toggleMask}
        placeholder={`Введите ${props.placeholder?.toLowerCase()}`}
      />
      <label htmlFor={props.id}>{props.title}</label>
    </FloatLabel>
  );
});
