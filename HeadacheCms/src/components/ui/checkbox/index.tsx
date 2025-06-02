import { observer } from 'mobx-react-lite';
import { Checkbox, CheckboxProps } from 'primereact/checkbox';
import { FC } from 'react';
import s from './style.module.scss';

interface IProps extends CheckboxProps {
  label: string;
}

export const PfCheckbox: FC<IProps> = observer((props) => {

  return (
    <div className={s.checkbox}>
      <Checkbox
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
});

