// 'use client';

// import { FormElements, IPropertyForm } from "@/components/form";
// import { PfButton } from "@/components/ui/button";
// import { IColumn, PfTable } from "@/components/ui/table";
// import { news_mock_data } from "@/mocks/news.mock";
// // import { News } from "@/models";
// // import { AllService } from "@/services";
// import { useStores } from "@/utils/hooks/useStores";
// import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";

// const CareerPageSetting = observer(() => {
//   const { allStore} = useStores();
//   const allService = AllService.getInstance();
//   const [data, setData] = useState<News[]>([]);

//   useEffect(() => {
//     //setData(news_mock_data); // Моковые данные (для разработки)
//     const fetchNews= async () => {
//       try {
//         await AllService.fetchNews();
//         setData(allStore.news); // Реальные данные
//         setTimeout(() => {
//           allStore.setCanEdit(false);
//         }, 1);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchNews();
//   }, []);

//   useEffect(() => {
//     allStore.setCanEdit(true);
//   }, [data]);

//   const updateData = async (updata: News[]) => {
//     const newData = await AllService.updateNews(updata);
//     setData(newData);
//     setTimeout(() => {
//       allStore.setCanEdit(false);
//     }, 10);
//   };

//   const handleDelete = (id: number) => {
//     setData((prevData: any[]) => {
//       const updatedData = prevData.filter((item: any) => item.id !== id);
//       return updatedData;
//     });
//   };

//   const handleUpdate = (row: News) => {
//     setData((prevData: News[]) => {
//       if (row.id) {
//         const updatedData = prevData.map((item: News) =>
//           item.id === row.id ? { ...item, ...row } : item
//         );
//         updateData(updatedData);
//         return updatedData;
//       } else {
//         const updatedData = [...prevData, row];
//         updateData(updatedData);
//         return updatedData;
//       }
//     });
//   };

//   const newsColumns: IColumn[] = [
//     {
//       field: 'title',
//       header: 'Заголовок'
//     },
//     {
//       field: 'activity',
//       header: 'На главной странице'
//     }
//   ];

//   const newsFormProperty: IPropertyForm[] = [
//     {
//       name: 'title',
//       element: FormElements.InputText,
//       label: 'Заголовок',
//       placeholder: 'Заголовок'
//     },
//     {
//       name: 'description',
//       element: FormElements.InputTextarea,
//       label: 'Краткое описание',
//       placeholder: 'Краткое описание'
//     },
//     {
//         name: 'fullDescription',
//         element: FormElements.Editor,
//         label: 'Полное описание'
//     },
//     {
//         name: 'activity',
//         element: FormElements.Checkbox,
//         label: 'Отображать в банере на главной странице'
//     },
//     {
//         name: 'video',
//         element: FormElements.InputText,
//         label: 'Ссылка на видео',
//         placeholder: 'Ссылку',
//         helperText:`*если ссылка относится к одному из видеохостингов, необходимо добавить "iframe:" (iframe:https://...)`
//     },
//     {
//       name: 'image',
//       element: FormElements.ImageUpload,
//     },
    
//   ];

//   const emptyNewsRow: News = {
//     title: '',
//     description: '',
//     fullDescription:'',
//     date: new Date().toLocaleDateString('en-CA'), 
//     video: '',
//     image: '',
//     activity: false
//   };
  
//   return (
//     <div className="wrapper">
//       <PfTable 
//         data={data}
//         columns={newsColumns}
//         headerTitle={'Редактирование новости'}
//         title={'Новости'}
//         formProperty={newsFormProperty}
//         emptyRow={emptyNewsRow}
//         onEdit={(data) => handleUpdate(data)}
//         onDelete={(data) => handleDelete(data.id)}
//       />
//     </div>
//   );
// });

// export default CareerPageSetting;
