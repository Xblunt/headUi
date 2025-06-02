'use client';

import { FormElements, IPropertyForm } from "@/components/form";
import { PfButton } from "@/components/ui/button";
import { IColumn, PfTable } from "@/components/ui/table";
import { career_mock_data } from "@/mocks/career.mock";
import { tabsMusic } from "@/mocks/other.mock";
import { Career } from "@/models";
import { CareerService } from "@/services";
import { useStores } from "@/utils/hooks/useStores";
import { observer } from "mobx-react-lite";
import { TabMenu } from "primereact/tabmenu";
import { useEffect, useState } from "react";

const CareerPageSetting = observer(() => {
  const { careerStore } = useStores();
  const careerService = CareerService.getInstance();
  const [data, setData] = useState<Career[]>([]);

  useEffect(() => {
    // setData(career_mock_data); // Моковые данные (для разработки)
    const fetchCareers = async () => {
      try {
        await careerService.fetchCareers();
        setData(careerStore.careers); // Реальные данные
        setTimeout(() => {
          careerStore.setCanEdit(false);
        }, 1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCareers();
  }, []);

  useEffect(() => {
    careerStore.setCanEdit(true);
  }, [data]);

  const updateData = async (updata: Career[]) => {
    const newData = await careerService.updateCareers(updata);
    setData(newData);
    setTimeout(() => {
      careerStore.setCanEdit(false);
    }, 10);
  };

  const handleDelete = (id: number) => {
    setData((prevData: any[]) => {
      const updatedData = prevData.filter((item: any) => item.id !== id);
      return updatedData;
    });
  };

  const handleUpdate = (row: Career) => {
    setData((prevData: Career[]) => {
      if (row.id) {
        const updatedData = prevData.map((item: Career) =>
          item.id === row.id ? { ...item, ...row } : item
        );
        updateData(updatedData);
        return updatedData;
      } else {
        const updatedData = [...prevData, row];
        updateData(updatedData);
        return updatedData;
      }
    });
  };

  const vacancyColumns: IColumn[] = [
    {
      field: 'title',
      header: 'Заголовок'
    }
  ];

  const vacancyFormProperty: IPropertyForm[] = [
    {
      name: 'title',
      element: FormElements.InputText,
      label: 'Должность',
      placeholder: 'Должность'
    },
    {
      name: 'description',
      element: FormElements.Editor,
      label: 'Описание'
    },
    {
      name: 'image',
      element: FormElements.ImageUpload,
    }
  ];

  const emptyVacancyRow: Career = {
    title: '',
    description: '',
    image: ''
  };
  
  return (
    <div className="wrapper">
      <div className="saveBtn">
        {/* <PfButton
          onClick={() => { if (data) updateData(data) }}
          label={'Сохранить'}
          icon={"pi pi-save"}
          loading={careerStore.loading}
          disabled={!careerStore.canEdit}
        /> */}
        <TabMenu model={tabsMusic} />
      </div>
      <PfTable 
        data={data}
        columns={vacancyColumns}
        headerTitle={'Редактирование вакансии'}
        title={'Вакансии'}
        formProperty={vacancyFormProperty}
        emptyRow={emptyVacancyRow}
        onEdit={(data) => handleUpdate(data)}
        onDelete={(data) => handleDelete(data.id)}
      />
    </div>
  );
});

export default CareerPageSetting;
