import { observer } from "mobx-react-lite";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import s from './style.module.scss';
import { Dialog } from "primereact/dialog";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Form, IPropertyForm } from "@/components/form";
import { useRouter } from "next/navigation";

export interface IColumn {
  field: string;
  header: string;
}

interface IProps {
  data?: any[];
  columns: IColumn[];
  emptyRow?: any;
  formProperty?: IPropertyForm[];
  title?: string;
  redirect?: boolean;
  onEdit?: (rowData: any) => any;
  onDelete?: (rowData: any) => void;
  headerTitle?: string;
  minWidth?: number;
  hideActions?: boolean;
  quantityRows?: number;
  quantityRowsArray?: number[];
}

export const PfTable: FC<IProps> = observer((props) => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [activeRow, setActiveRow] = useState<any>({});
  const [visibleCols, setVisibleCols] = useState<boolean>(true);

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button icon={"pi pi-pencil"} rounded outlined text  className={"mr-2"} onClick={() => clickEdit(rowData)} />
        <Button icon={"pi pi-trash"} rounded outlined text   severity={"danger"} onClick={() => props.onDelete?.(rowData)} />
      </React.Fragment>
    );
  };

  const [visibleTooltipIndex, setVisibleTooltipIndex] = useState<number | null>(null);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState<{ left: number; top: number } | null>(null);

  const valueBodyTemplate = (rowData: any, field: string, rowIndex: number) => {
    const value = rowData[field];

    if (typeof value === 'string' && value.startsWith('{"')) {
      try {
        const parsedValue = JSON.parse(value);
        return (
          <div>
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline', color: visibleTooltipIndex === rowIndex ? 'darkblue' : '#6366F1' }}
              onMouseEnter={() => {
                setVisibleTooltipIndex(rowIndex);
                setTooltipContent(JSON.stringify(parsedValue, null, 2));
              }}
              onMouseMove={(e) => {
                const { clientX, clientY } = e;
                if (tooltipPosition !== null) {
                  setTooltipPosition({ left: clientX - 150, top: clientY - 100 });
                }
              }}
              onMouseLeave={() => {
                setTooltipPosition(null);
                setVisibleTooltipIndex(null);
              }}
            >
              Просмотр
            </span>
            {visibleTooltipIndex === rowIndex && (
              <div
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  padding: '5px',
                  zIndex: 1000,
                  whiteSpace: 'pre-wrap',
                  left: tooltipPosition?.left,
                  top: tooltipPosition?.top,
                }}
                onMouseEnter={() => setVisibleTooltipIndex(rowIndex)}
                onMouseLeave={() => setVisibleTooltipIndex(null)}
              >
                {tooltipContent}
              </div>
            )}
          </div>
        );
      } catch (e) {}
    }

    if (value === true) {
      return <i className="pi pi-check" style={{ fontSize: '1.2rem', color: '#008000' }}></i>;
    }

    if (value === false) {
      return <i className="pi pi-times" style={{ fontSize: '1.2rem', color: '#FF0000' }}></i>;
    }

    return value;
  };

  const clickEdit = (row: any) => {
    if (props.redirect) {
      router.push(`/directions/${row.path}`);
    } else {
      setVisibleDialog(true);
      setActiveRow(row);
    }
  };

  const saveRow = () => {
    props.onEdit?.(activeRow);
    setVisibleDialog(false);
  };

  const openNewRow = () => {
    if (props.redirect) {
      router.push(`/directions/create`);
    } else {
      setVisibleDialog(true);
      setActiveRow(props.emptyRow);
    }
  };

  useEffect(() => {
    if (!props.data) return;
    const preparedData = props.data.map((item) => {
      if (item.rows) {
        const updatedRows = item.rows?.map((row: any) => {
          return {
            ...row,
            _id: row.id
          };
        });

        const updatedAdditionalLicenseRows = item.additionalLicenseRows?.map((row: any) => {
          return {
            ...row,
            _id: row.id
          };
        });

        return {
          ...item,
          rows: updatedRows,
          additionalLicenseRows: updatedAdditionalLicenseRows
        };
      } else if (item.variables) {
        const updatedVariables = item.variables.map((variable: any) => {
          return {
            ...variable,
            _id: variable.id
          };
        });

        return {
          ...item,
          variables: updatedVariables
        };
      } else {
        return { ...item };
      }
    });

    setData(preparedData);
  }, [props.data]);

  const headerTable = (
    <div className={"flex flex-wrap gap-2 align-items-center justify-content-between"}>
      <h2 className={"m-0"}>{props.title}</h2>
      {visibleCols ?
        (<div className={"flex row gap-2"}>
          <IconField iconPosition={"left"}>
            <InputIcon className={"pi pi-search"} />
            <InputText type={"search"} placeholder={"Поиск..."} onInput={(e) => { const target = e.target as HTMLInputElement; setGlobalFilter(target.value); }} />
          </IconField>
          {!props.hideActions && <Button icon={"pi pi-plus"} severity={"success"} onClick={openNewRow} />}
        </div>) : (<div className={"flex row gap-2"}> <Button icon={"pi pi-angle-down"} onClick={() => setVisibleCols(true)} /></div>)
      }
    </div>
  );

  const rowDialogFooter = (
    <React.Fragment>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: '1rem'
      }}>
        <Button 
          label="Отменить" 
          icon="pi pi-times" 
          outlined 
          onClick={() => setVisibleDialog(false)} 
        />
        <Button 
          label="Сохранить" 
          icon="pi pi-check" 
          onClick={() => saveRow()} 
        />
      </div>
    </React.Fragment>
  );
  return (
    <div className={s.wrapper}>
      <DataTable
        value={data}
        style={{ border: '1px solid lightgrey', width: '100%', position: 'relative' }}
        paginator={visibleCols}
        rows={props.quantityRows || 5}
        rowsPerPageOptions={visibleCols ? (props.quantityRowsArray || [5, 10, 25]) : []}
        paginatorTemplate={visibleCols ? "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" : ""}
        globalFilter={globalFilter}
        header={headerTable}
      >
        {visibleCols && !props.hideActions && (
          <Column style={{ minWidth: '150px' }} header={'Действия'} body={actionBodyTemplate} exportable={false} />
        )}

        {visibleCols && props.columns.map((col, idx) => (
          <Column key={idx} field={col.field} header={col.header} body={(rowData, { rowIndex }) => valueBodyTemplate(rowData, col.field, rowIndex)} />
        ))}
      </DataTable>
      {props.formProperty && (
        <Dialog
          visible={visibleDialog}
          onHide={() => setVisibleDialog(false)}
          modal
          style={{
            minWidth: props.minWidth ? `${props.minWidth}%` : '40%',
            maxWidth: '85%',
            maxHeight: '85%'
          }}
          footer={rowDialogFooter}
          header={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ flexGrow: 1 }}>{props.headerTitle}</span>
            </div>
          }
        >
          <div className={s.form}>
            <Form
              data={activeRow}
              property={props.formProperty}
              onChange={(data: any) => setActiveRow(data)}
            />
          </div>
        </Dialog>
      )}
    </div>
  );
});
