import { FileUpload, FileUploadProps } from "primereact/fileupload";
import { FC, useRef, useState } from "react";
import s from './style.module.scss';
import { ProgressSpinner } from "primereact/progressspinner";

interface IProps extends FileUploadProps {
  file?: string;
  title?: string;
  loading?: boolean;
  onChange: (file: File) => void;
}

export const PfFileUpload: FC<IProps> = (props) => {
  const fileUploadRef = useRef<any>(null);

  const onSelect = (event: any) => {
    const file = event.files?.[0];
    if (!file) return;

    try {
      props.onChange(file);
    } finally {
      fileUploadRef.current.clear();
    }
  };

  return (
    <div className={s.fuwrapper}>
      <div>{props.title}</div>
      <div className={s.file}>
        {props.loading && (
          <div>
            <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="5" />
          </div>
        )}
        <FileUpload
          ref={fileUploadRef}
          mode={'basic'}
          chooseLabel={props.loading ? 'Загрузка...' : 'Выбрать файл'}
          auto
          onSelect={onSelect}
          disabled={props.loading}
        />
        {!props.loading && props.file && (
          <a href={props.file}>{'Скачать и посмотреть сертификат'}</a>
        )
        }
      </div>
    </div>
  );
};
