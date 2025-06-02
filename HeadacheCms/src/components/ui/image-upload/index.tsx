import { FileUpload, FileUploadProps } from "primereact/fileupload";
import { Image } from "primereact/image";
import { FC, useRef, useState } from "react";
import s from './style.module.scss';
import { ProgressSpinner } from "primereact/progressspinner";
import { AppService } from "@/services";

interface IProps extends FileUploadProps {
  src: string;
  title?: string;
  isSvg?: boolean;
  onChange: (img: string) => void;
}

export const ImageUpload: FC<IProps> = (props) => {
  const appService = AppService.getInstance();
  const [isLoading, setIsLoading] = useState(false);
  const fileUploadRef = useRef<any>(null);

  const validTypes = props.isSvg
    ? ['image/svg+xml']
    : ['image/png', 'image/jpeg', 'image/jpg'];

  const title = props.isSvg
    ? 'Иконка (*.svg)'
    : 'Изображение (*.png, *.jpeg, *.jpg)';

  const onSelect = async (event: any) => {
    const file = event.files?.[0];
    if (!file) return;

    if (props.isSvg) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const htmlContent = event.target.result as string;
          props.onChange(htmlContent);
        }
      };
      reader.readAsText(file);
    } else {
      if (!validTypes.includes(file.type)) {
        return;
      }

      setIsLoading(true);
      const imageLink = await appService.updateFile(file, 'minio/upload');
  
      try {
        props.onChange(imageLink);
      } finally {
        setIsLoading(false);
        fileUploadRef.current.clear();
      }
    }
  };

  return (
    <div className={s.fuwrapper}>
      <div>{props.title || title}</div>
      <div className={s.file} style={{ background: props.isSvg ? 'lightgray' : 'white' }}>
        {isLoading && (
          <div>
            <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="5" />
          </div>
        )}
        <FileUpload
          ref={fileUploadRef}
          mode={'basic'}
          chooseLabel={isLoading ? 'Загрузка...' : 'Выбрать файл'}
          auto
          onSelect={onSelect}
          accept={props.isSvg ? "image/svg+xml" : "image/png, image/jpeg, image/jpg"}
          disabled={isLoading}
        />
        {props.src && (
          props.isSvg ? (
            <div dangerouslySetInnerHTML={{ __html: props.src }} />
          ) : (
            <Image src={props.src} alt={'Изображение'} preview width="100%" />
          )
        )}
      </div>
    </div>
  );
};
