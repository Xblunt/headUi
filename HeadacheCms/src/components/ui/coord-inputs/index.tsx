import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { PfInputMask } from "../input-mask";
import s from './style.module.scss';

interface IProps {
  coords: number[];
  onChange: (coords: number[]) => void;
}

export const CoordInputs: FC<IProps> = observer((props) => {
  const [stringCoords, setStringCoords] = useState<string[]>(
    props.coords.map(coord => coord?.toString() || '')
  );

  useEffect(() => {
    setStringCoords(props.coords.map((coord) => coord?.toString() || ''));
  }, [props.coords]);

  const handleChange = (index: number) => (e: any) => {
    const newValue = e.target.value;

    const updatedStringCoords = [...stringCoords];
    updatedStringCoords[index] = newValue || '';
    setStringCoords(updatedStringCoords);

    const updatedNumberCoords = updatedStringCoords.map((coord) => parseFloat(coord));
    if (!updatedNumberCoords.some(coord => isNaN(coord))) {
      props.onChange(updatedNumberCoords);
    }
  };

  return (
    <div className={s.frame}>
      <PfInputMask 
        value={stringCoords[0] || ''}
        title={'Координата (X)'}
        mask={'99.999999'}
        placeholder={'99.999999'}
        onChange={handleChange(0)}
      />
      <PfInputMask
        value={stringCoords[1] || ''}
        title={'Координата (Y)'}
        mask={'99.999999'}
        placeholder={'99.999999'}
        onChange={handleChange(1)}
      />
    </div>
  );
});
