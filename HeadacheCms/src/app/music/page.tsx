'use client';

import { useStores } from "@/utils/hooks/useStores";
import { observer } from "mobx-react-lite";
import { IColumn, PfTable } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { main_mock_data } from "@/mocks/main.mock";
import { PfInputText } from "@/components/ui/input-text";
import { PfInputTextarea } from "@/components/ui/input-textarea";
import { FormElements, IPropertyForm } from "@/components/form";
import { PfButton } from "@/components/ui/button";
import { TabMenu } from "primereact/tabmenu";
import { tabsMusic } from "@/mocks/other.mock";
import { PfTabMenu } from "@/components/ui/tabmenu";
import s from './style.module.scss';
// import { ProductService } from './service/ProductService';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import TrackList from "@/components/tracklist";
import { AllService } from "@/services";
import { Song } from "@/models";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

const mockProducts: Product[] = [
  {
    id: '1000',
    code: 'P1000',
    name: 'Apple iPhone 13',
    description: 'Latest Apple iPhone with A15 Bionic chip and improved camera.',
    image: 'https://mimigram.ru/wp-content/uploads/2020/07/chto-takoe-foto.jpg',
    price: 999,
    category: 'Smartphones',
    quantity: 50,
    inventoryStatus: 'In Stock',
    rating: 4.8,
  },
  {
    id: '1001',
    code: 'P1001',
    name: 'Samsung Galaxy S21',
    description: 'Samsung flagship smartphone with dynamic AMOLED display.',
    image: 'https://mimigram.ru/wp-content/uploads/2020/07/chto-takoe-foto.jpg',
    price: 899,
    category: 'Smartphones',
    quantity: 30,
    inventoryStatus: 'Low Stock',
    rating: 4.5,
  },
  {
    id: '1002',
    code: 'P1002',
    name: 'Sony WH-1000XM4',
    description: 'Industry leading noise cancelling wireless headphones.',
    image: 'https://mimigram.ru/wp-content/uploads/2020/07/chto-takoe-foto.jpg',
    price: 349,
    category: 'Headphones',
    quantity: 100,
    inventoryStatus: 'In Stock',
    rating: 4.7,
  },
  {
    id: '1003',
    code: 'P1003',
    name: 'Dell XPS 13',
    description: 'Compact and powerful ultrabook with InfinityEdge display.',
    image: 'https://mimigram.ru/wp-content/uploads/2020/07/chto-takoe-foto.jpg',
    price: 1199,
    category: 'Laptops',
    quantity: 20,
    inventoryStatus: 'In Stock',
    rating: 4.6,
  },
  {
    id: '1004',
    code: 'P1004',
    name: 'Apple MacBook Pro 16"',
    description: 'High-performance laptop with M1 Pro chip for professionals.',
    image: 'https://mimigram.ru/wp-content/uploads/2020/07/chto-takoe-foto.jpg',
    price: 2499,
    category: 'Laptops',
    quantity: 10,
    inventoryStatus: 'Limited Stock',
    rating: 4.9,
  },
];

const MusicPageSetting = observer(() => {
  const { allStore } = useStores();
  const allService = AllService.getInstance();
  const [data, setData] = useState<Song | null>(null);

  useEffect(() => {
    // setData(main_mock_data); // Моковые данные (для разработки)
    const fetchSongs = async () => {
      try {
        const dat = await allService.get('song');
        console.log('dat', dat)
        setData(allStore.data); // Реальные данные
        setTimeout(() => {
          allStore.setCanEdit(false);
        }, 1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    allStore.setCanEdit(true);
  }, [data]);

  // const updateData = async (updata: Song) => {
  //   const newData = await allService.updateMain(updata);
  //   setData(newData);
  //   setTimeout(() => {
  //     allStore.setCanEdit(false);
  //   }, 10);
  // };

  const handleDelete = (id: number, type: string) => {
    setData((prevData: any) => {
      const updateData = prevData?.[type].filter((item: any) => item.id !== id);
      return {
        ...prevData,
        [type]: updateData
      }
    });
  };

  const handleUpdate = (row: any, type: string) => {
    setData((prevData: any) => {
      const rowExists = prevData[type].find((item: any) => item.id === row.id);
      const updatedRow = rowExists 
        ? prevData[type].map((item: any) => item.id === row.id ? row : item)
        : [...prevData[type], row];

      const updatedData = {
        ...prevData,
        [type]: updatedRow
      };

      // updateData(updatedData);
      
      return updatedData;
    });
  };

  // ! STAFF

  const staffColumns: IColumn[] = [
    {
      field: 'username',
      header: 'ФИО'
    },
    {
      field: 'job',
      header: 'Должность'
    }
  ];

  const staffFormProperty: IPropertyForm[] = [
    {
      name: 'username',
      element: FormElements.InputText,
      label: 'ФИО',
      placeholder: 'ФИО'
    },
    {
      name: 'job',
      element: FormElements.InputText,
      label: 'Должность',
      placeholder: 'Должность'
    },
    {
      name: 'image',
      element: FormElements.ImageUpload,
    }
  ];

  // const emptyStaffRow: MainStaff = {
  //   username: '',
  //   job: '',
  //   image: ''
  // };

  // ! COMPANY

  const companyColumns: IColumn[] = [
    {
      field: 'description',
      header: 'Описание'
    }
  ];

  const companyFormProperty: IPropertyForm[] = [
    {
      name: 'name',
      element: FormElements.InputText,
      label: 'Название',
      placeholder: 'Название'
    },
    {
      name: 'description',
      element: FormElements.InputTextarea,
      label: 'Описание',
      placeholder: 'Описание'
    },
    {
      name: 'image',
      element: FormElements.ImageUpload,
    },
    {
      name: 'icon',
      element: FormElements.ImageUpload,
      isSvg: true
    }
  ];

  // const emptyCompanyRow: MainCompany = {
  //   name: '',
  //   description: '',
  //   image: '',
  //   icon: '',
  // };

 
  return (
    <div className="wrapper">
      <div className="saveBtn">
        {/* <PfButton
          onClick={() => { if (data) updateData(data) }}
          label={'Сохранить'}
          icon={"pi pi-save"}
          loading={allStore.loading}
          disabled={!allStore.canEdit}
        /> */}
         <PfTabMenu list={tabsMusic} />
      </div>
      {/* STAFF */}
      {/* <PfInputText 
        value={data?.teamTitle || ''}
        title={'Заголовок команды'}
        placeholder={'Заголовок команды'}
        onInput={(e: any) => {
          setData((prev: any) => {
            return {
              ...prev,
              teamTitle: e.target.value
            };
          });
        }}
      /> */}
      {/* <PfInputTextarea
        value={data?.teamDescription}
        title={'Описание команды'}
        placeholder={'Описание команды'}
        onInput={(e: any) => {
          setData((prev: any) => {
            return {
              ...prev,
              teamDescription: e.target.value
            };
          });
        }}
      /> */}
      {/* <PfTable 
        headerTitle={'Редактирование сотрудника'}
        data={data?.staffs}
        columns={staffColumns}
        title={'Блок «Сотрудники»'}
        formProperty={staffFormProperty}
        emptyRow={emptyStaffRow}
        onEdit={(data) => handleUpdate(data, 'staffs')}
        onDelete={(data) => handleDelete(data.id, 'staffs')}
      /> */}
      <TrackList></TrackList>
        {/* <div className="card">
            <DataView value={mockProducts} itemTemplate={itemTemplate} layout={layout} header={header()} />
        </div> */}

      {/* COMPANY */}
      {/* <PfInputText
        value={data?.companyTitle || ''}
        title={'Заголовок компаний'}
        placeholder={'Заголовок компаний'}
        onInput={(e: any) => {
          setData((prev: any) => {
            return {
              ...prev,
              companyTitle: e.target.value
            };
          });
        }}
      /> */}
      {/* <PfTable
        data={data?.companies}
        columns={companyColumns}
        headerTitle={'Редактирование компании'}
        title={'Блок «Компании»'}
        formProperty={companyFormProperty}
        emptyRow={emptyCompanyRow}
        onEdit={(data) => handleUpdate(data, 'companies')}
        onDelete={(data) => handleDelete(data.id, 'companies')}
      /> */}
    </div>
  );
});

export default MusicPageSetting;
