import { FC, useEffect, useState } from 'react';
import s from './style.module.scss';
import { observer } from 'mobx-react-lite';
import { SubRow, SubRowVariables } from '@/models';
import { PfInputText } from '../input-text';
import { PfCheckbox } from '../checkbox';
import { PfInputNumber } from '../input-number';
import { IColumn, PfTable } from '../table';
import { FormElements, IPropertyForm } from '@/components/form';

interface IProps {
  data: SubRow;
  onChange: (data: SubRow) => void;
}

export const RowConstructor: FC<IProps> = observer((props) => {
  const [data, setData] = useState<SubRow | null>(props.data);

  useEffect(() => {
    if (!data) return;
    props.onChange(data);
  }, [data]);

  const variableColumns: IColumn[] = [
    {
      field: 'code',
      header: 'Код'
    },
    {
      field: 'quantity',
      header: 'Кол-во р.м.'
    },
    {
      field: 'price',
      header: 'Цена'
    },
  ];

  const variableFormProperty: IPropertyForm[] = [
    {
      name: 'code',
      element: FormElements.InputText,
      label: 'Код',
      placeholder: 'Код'
    },
    {
      name: 'price',
      element: FormElements.InputNumber,
      label: 'Цена',
      placeholder: 'Цену',
      length: 10
    },
    {
      name: 'quantity',
      element: FormElements.InputNumber,
      label: 'Кол-во р.м.',
      placeholder: 'Кол-во р.м.',
      length: 5
    }
  ];

  const variableEmptyRow: { _id?: number } & SubRowVariables = {
    _id: new Date().getTime(),
    code: '',
    quantity: 0,
    price: 0,
  };

  if (!data) return;

  return (
    <div className={s.wrapper}>
      <PfInputText
        value={data.name}
        title={'Название'}
        placeholder={'Название'}
        onInput={(e: any) => {
          setData((prev: any) => {
            return {
              ...prev,
              name: e.target.value
            };
          });
        }}
      />
      <PfCheckbox
        checked={data.singleService}
        label={'Услуга продается в одном экземпляре'}
        onChange={(e: any) => {
          setData((prev: any) => {
            if (e.target.checked === true) {
              return {
                ...prev,
                singleService: e.target.checked,
                code: '',
                price: null
              };
            } else {
              return {
                ...prev,
                singleService: e.target.checked,
                code: null,
                price: null
              }
            }
          });
        }}
      />
      {data.singleService && (
        <div className={s.singleService}>
          <PfInputText
            value={data.code}
            title={'Код'}
            placeholder={'Код'}
            onInput={(e: any) => {
              setData((prev: any) => {
                return {
                  ...prev,
                  code: e.target.value
                };
              });
            }}
          />
          <PfInputNumber 
            value={data.price}
            title={'Цена'}
            placeholder={'Цену'}
            maxLength={10}
            onValueChange={(e: any) => {
              setData((prev: any) => {
                return {
                  ...prev,
                  price: e.target.value
                }
              })
            }}
          />
        </div>
      )}
      {!data.singleService && (
        <PfTable
          data={data.variables}
          columns={variableColumns}
          formProperty={variableFormProperty}
          emptyRow={variableEmptyRow}
          title={'Варианты услуги'}
          minWidth={10}
          onDelete={(rowData: any) => {
            setData((prevData: any) => {
              if (!prevData.variables) return prevData;
              const updatedRow = prevData.variables.filter((item: any) => item._id !== rowData._id);

              const updatedData = {
                ...prevData,
                variables: updatedRow
              };

              return updatedData;
            })
          }}
          onEdit={(rowData: any) => {
            setData((prevData: any) => {
              if (!data) return;
              const rowExists = prevData.variables.find((item: any) => item._id === rowData._id);

              if (!prevData.variables) {
                prevData.variables = [];
              }

              const updatedRow = rowExists
                ? prevData.variables.map((item: any) => item._id === rowData._id ? rowData : item)
                : [...prevData.variables, rowData];

              const updatedData = {
                ...prevData,
                variables: updatedRow
              };

              return updatedData;
            });
          }}
        />
      )}
    </div>
  );
});
