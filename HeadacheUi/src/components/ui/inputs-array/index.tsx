import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import s from './style.module.scss';
import { PfButton } from "../button";
import { PfInputText } from "../input-text";

interface IProps {
  value: string[];
  label?: string;
  inputTitle?: string;
  onChange: (arr: string[]) => void;
}

export const InputsArray: FC<IProps> = observer((props) => {
  const [data, setData] = useState<string[]>(props.value);
  const [hasChanged, setHasChanged] = useState(data.map(() => false));

  useEffect(() => {
    setData(props.value);
  }, [props.value]);

  const addNewItem = () => {
    const newArray = [...data, ''];
    props.onChange(newArray);
  };

  const handleChange = (index: number, newValue: string) => {
    const newArray = [...data];
    newArray[index] = newValue;
    setData(newArray);
    
    const newFlags = [...hasChanged];
    newFlags[index] = true;
    setHasChanged(newFlags);
  };

  const handleFocus = (index: number) => {
    const newFlags = [...hasChanged];
    newFlags[index] = false;
    setHasChanged(newFlags);
  };

  const handleBlur = (index: number) => {
    if (hasChanged[index]) {
      props.onChange(data);
    }
  };

  const handleDelete = (index: number) => {
    const newArray = data.filter((_, i) => i !== index);
    props.onChange(newArray);
  };

  return (
    <div className={s.iawrapper}>
      <div className={s.row}>
        <PfButton 
          onClick={addNewItem}
          icon={"pi pi-plus"} 
          label={`Добавить ${props.inputTitle?.toLowerCase()}`}
          severity={"success"} 
          aria-label={"Add"}
        />
      </div>
      {data.map((val, idx) => (
        <div className={s.row} key={idx}>
          <PfInputText 
            value={val}
            onInput={(e: any) => handleChange(idx, e.target.value)}
            title={`${props.inputTitle} ${idx+1}`}
            placeholder={props.inputTitle}
            onFocus={() => handleFocus(idx)}
            onBlur={() => handleBlur(idx)}
          />
          <PfButton 
            onClick={() => handleDelete(idx)}
            icon={"pi pi-times"} 
            severity={"danger"} 
            aria-label={"Cancel"}
          />
        </div>
      ))}
    </div>
  );
});
