import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { PfInputText } from "../ui/input-text";
import { PfInputTextarea } from "../ui/input-textarea";
import { ImageUpload } from "../ui/image-upload";
import { IColumn, PfTable } from "../ui/table";
import { PfEditor } from "../ui/editor";
import { PfInputMask } from "../ui/input-mask";
import { PfCheckbox } from "../ui/checkbox";
import { RowConstructor } from "../ui/row-constructor";
import { PfInputNumber } from "../ui/input-number";

export interface IPropertyForm {
  name: string;
  element: FormElements;
  label?: string;
  placeholder?: string;
  options?: string[] | number[];
  isSvg?: boolean;
  
  // Пропсы для таблицы
  columns?: IColumn[];
  formData?: IPropertyForm[];
  emptyRow?: any;
  headerTitle?: string;
  length?: number;
  helperText?: string;
};

export enum FormElements {
  Autocomplele = 'Autocomplete',
  Checkbox = 'Checkbox',
  Editor = 'Editor',
  InputText = 'InputText',
  InputNumber = 'InputNumber',
  InputTextarea = 'InputTextarea',
  Table = 'Table',
  ImageUpload = 'ImageUpload',
  RowConstructor = 'RowConstructor',
};

interface IProps {
  property: IPropertyForm[];
  data: any;
  onChange: (data: any) => void;
};

// Это форма, которая отображается в модальных окнах
// Она собирает список UI-элементов в зависимости от того, какие пропсы были переданы извне
export const Form: FC<IProps> = observer((props) => {
  const [data, setData] = useState<any>(props.data);

  useEffect(() => {
    props.onChange(data);
  }, [data]);

  const transformedEmptyRow = (emptyRow: any) => {
    return {
      _id: new Date().getTime(), 
      ...emptyRow   
    }            
  };

  const renderElements = props.property.map((property, idx) => {
    switch (property.element) {
      // INPUT TEXT
      case FormElements.InputText:
        return (
          <PfInputText
            key={idx}
            helperText={property.helperText}
            value={data[property.name] || ''}
            title={property.label}
            placeholder={property.placeholder}
            onInput={(e: any) => {
              setData((prev: any) => {
                return {
                  ...prev,
                  [property.name]: e.target.value
                };
              });
            }}
          />
        );
      // CHECKBOX
      case FormElements.Checkbox:
        return (
          <PfCheckbox
            key={idx}
            checked={data[property.name] || false}
            label={property.label || ''}
            onChange={(e: any) => {
              setData((prev: any) => {
                return {
                  ...prev,
                  [property.name]: e.target.checked
                };
              });
            }}
          />
        );
        // INPUT NUMBER
        case FormElements.InputNumber:
          return (
            <PfInputNumber
              key={idx}
              maxLength={property.length}
              value={data[property.name] || ''}
              title={property.label}
              placeholder={property.placeholder}
              onValueChange={(e: any) => {
                setData((prev: any) => {
                  return {
                    ...prev,
                    [property.name]: e.target.value
                  };
                });
              }}
            />
          );
      // INPUT TEXTAREA
      case FormElements.InputTextarea:
        return (
          <PfInputTextarea 
            key={idx}
            value={data[property.name] || ''}
            title={property.label}
            placeholder={property.placeholder}
            onInput={(e: any) => {
              setData((prev: any) => {
                return {
                  ...prev,
                  [property.name]: e.target.value
                };
              });
            }}
          />
        );
      // EDITOR
      case FormElements.Editor:
        return (
          <PfEditor 
            key={idx}
            value={data[property.name]}
            placeholder={property.label}
            title={property.label}
            onTextChange={(val) => {
              if (data[property.name] === val.htmlValue) return;
              setData((prev: any) => {
                return {
                  ...prev,
                  [property.name]: val.htmlValue
                };
              });
            }}
          />
        );
      // ROW CONSTRUCTOR
      case FormElements.RowConstructor:
        return (
          <RowConstructor 
            key={idx}
            data={data}
            onChange={(newData) => {
              setData((prev: any) => {
                return {
                  ...prev,
                  ...newData
                }
              })
            }}
          />
        );
      // FILE UPLOAD
      case FormElements.ImageUpload:
        return (
          <ImageUpload 
            key={idx}
            src={data[property.name]}
            title={property.label}
            isSvg={property.isSvg}
            onChange={(img: string) => {
              setData((prev: any) => ({
                ...prev,
                image: img,
              }));
            }}
          />
        );
      // TABLE
      case FormElements.Table:
        return (
          <PfTable
            key={idx}
            data={data[property.name]}
            headerTitle={property.headerTitle}
            columns={property.columns || []}
            title={property.label as string}
            formProperty={property.formData}
            emptyRow={transformedEmptyRow(property.emptyRow)}
            onDelete={(rowData: any) => {
              setData((prevData: any) => {
                if (!prevData[property.name]) return prevData;
                const updatedRow = prevData[property.name].filter((item: any) => item._id !== rowData._id);

                const updatedData = {
                  ...prevData,
                  [property.name]: updatedRow
                };

                return updatedData;
              });
            }}
            onEdit={(rowData: any) => {
              setData((prevData: any) => {
                if (!data) return;
                const rowExists = prevData[property.name]?.find((item: any) => item._id === rowData._id);

                if (!prevData[property.name]) {
                  prevData[property.name] = [];
                }

                const updatedRow = rowExists 
                  ? prevData[property.name]?.map((item: any) => item._id === rowData._id ? rowData : item)
                  : [...prevData[property.name], rowData];

                const updatedData = {
                  ...prevData,
                  [property.name]: updatedRow
                };

                return updatedData;
              });
            }}
          />
        )
      default:
        return <></>;
    }
  });

  return (
    <>{renderElements}</>
  );
});
