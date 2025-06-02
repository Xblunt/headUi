// 'use client';

// import { FormElements, IPropertyForm } from "@/components/form";
// import { PfButton } from "@/components/ui/button";
// import { ImageUpload } from "@/components/ui/image-upload";
// import { PfInputText } from "@/components/ui/input-text";
// import { PfInputTextarea } from "@/components/ui/input-textarea";
// import { InputsArray } from "@/components/ui/inputs-array";
// import { IColumn, PfTable } from "@/components/ui/table";
// import { about_mock_data } from "@/mocks/about.mock";
// import { About, AboutPrinciple } from "@/models";
// import { AboutService } from "@/services";
// import { useStores } from "@/utils/hooks/useStores";
// import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";

// const AboutPageSetting = observer(() => {
//   const { aboutStore } = useStores();
//   const aboutService = AboutService.getInstance();
//   const [data, setData] = useState<About | null>(null);

//   useEffect(() => {
//     // setData(about_mock_data); // Моковые данные (для разработки)
//     const fetchAbout = async () => {
//       try {
//         await aboutService.fetchAbout();
//         setData(aboutStore.about); // Реальные данные
//         setTimeout(() => {
//           aboutStore.setCanEdit(false);
//         }, 1);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchAbout();
//   }, []);

//   useEffect(() => {
//     aboutStore.setCanEdit(true);
//   }, [data]);

//   const updateData = async (updata: About) => {
//     const newData = await aboutService.updateAbout(updata);
//     setData(newData);
//     setTimeout(() => {
//       aboutStore.setCanEdit(false);
//     }, 10);
//   };

//   const handleDelete = (id: number, type: string) => {
//     setData((prevData: any) => {
//       const updateData = prevData?.[type].filter((item: any) => item.id !== id);
//       return {
//         ...prevData,
//         [type]: updateData
//       }
//     });
//   };

//   const handleUpdate = (row: any, type: string) => {
//     setData((prevData: any) => {
//       const rowExists = prevData[type].find((item: any) => item.id === row.id);
//       const updatedRow = rowExists
//         ? prevData[type].map((item: any) => item.id === row.id ? row : item)
//         : [...prevData[type], row];

//       const updatedData = {
//         ...prevData,
//         [type]: updatedRow
//       };

//       updateData(updatedData);

//       return updatedData;
//     });
//   };

//   const principleColumns: IColumn[] = [
//     {
//       field: 'title',
//       header: 'Заголовок'
//     }
//   ];

//   const principleFormProperty: IPropertyForm[] = [
//     {
//       name: 'title',
//       element: FormElements.InputText,
//       label: 'Принцип',
//       placeholder: 'Принцип'
//     },
//     {
//       name: 'icon',
//       element: FormElements.ImageUpload,
//       isSvg: true
//     }
//   ];

//   const emptyPrincipleRow: AboutPrinciple = {
//     title: '',
//     icon: ''
//   };

//   return (
//     <div className="wrapper">
//       <div className="saveBtn">
//         <PfButton
//           onClick={() => {if (data) updateData(data)}}
//           label={'Сохранить'}
//           icon={"pi pi-save"}
//           loading={aboutStore.loading}
//           disabled={!aboutStore.canEdit}
//         />
//       </div>
//       <PfInputText 
//         value={data?.title || ''}
//         title={'Заголовок страницы'}
//         placeholder={'Заголовок страницы'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               title: e.target.value
//             };
//           });
//         }}
//       />
//       <PfInputTextarea
//         value={data?.description}
//         title={'Описание'}
//         placeholder={'Описание'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               description: e.target.value
//             };
//           });
//         }}
//       />
//       <PfInputText
//         value={data?.video || ''}
//         title={'Ссылка на видео'}
//         placeholder={'Ссылку на видео'}
//         helperText={`*если ссылка относится к одному из видеохостингов, необходимо добавить "iframe:" (iframe:https://...)`}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               video: e.target.value
//             };
//           });
//         }}
//       />
//       <ImageUpload
//         src={data?.image || ''}
//         onChange={(img: string) => {
//           setData((prev: any) => ({
//             ...prev,
//             image: img,
//           }));
//         }}
//       />
//       <PfInputText 
//         value={data?.missionTitle || ''}
//         title={'Заголовок миссии'}
//         placeholder={'Заголовок миссии'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               missionTitle: e.target.value
//             };
//           });
//         }}
//       />
//       <PfInputTextarea
//         value={data?.missionDescription}
//         title={'Описание миссии'}
//         placeholder={'Описание миссии'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               missionDescription: e.target.value
//             };
//           });
//         }}
//       />
//       <ImageUpload
//         src={data?.missionImage || ''}
//         title={'Изображение миссии (*.png, *.jpeg, *.jpg)'}
//         onChange={(img: string) => {
//           setData((prev: any) => ({
//             ...prev,
//             image: img,
//           }));
//         }}
//       />
//       <PfInputText 
//         value={data?.statusTitle || ''}
//         title={'Заголовок статусов'}
//         placeholder={'Заголовок статусов'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               statusTitle: e.target.value
//             };
//           });
//         }}
//       />
//       <ImageUpload
//         src={data?.statusImage || ''}
//         title={'Изображение статусов (*.png, *.jpeg, *.jpg)'}
//         onChange={(img: string) => {
//           setData((prev: any) => ({
//             ...prev,
//             image: img,
//           }));
//         }}
//       />
//       <InputsArray 
//         value={data?.status || []}
//         label={'Статусы'}
//         inputTitle={'Статус'}
//         onChange={(val: string[]) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               status: val
//             }
//           })
//         }}
//       />
//       <PfInputText 
//         value={data?.principleTitle || ''}
//         title={'Заголовок принципиов'}
//         placeholder={'Заголовок принципиов'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               principleTitle: e.target.value
//             };
//           });
//         }}
//       />
//       <PfTable
//         data={data?.principles}
//         columns={principleColumns}
//         title={'Принципы'}
//         headerTitle="Редактирование принципа"
//         formProperty={principleFormProperty}
//         emptyRow={emptyPrincipleRow}
//         onEdit={(data) => handleUpdate(data, 'principles')}
//         onDelete={(data) => handleDelete(data.id, 'principles')}
//       />
//       <PfInputText
//         value={data?.offerTitle || ''}
//         title={'Заголовок предложения'}
//         placeholder={'Заголовок предложения'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               offerTitle: e.target.value
//             };
//           });
//         }}
//       />
//       <PfInputTextarea
//         value={data?.offerDescription}
//         title={'Описание предложения'}
//         placeholder={'Описание предложения'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               offerDescription: e.target.value
//             };
//           });
//         }}
//       />
//       <ImageUpload
//         src={data?.offerImage || ''}
//         title={'Изображение предложения (*.png, *.jpeg, *.jpg)'}
//         onChange={(img: string) => {
//           setData((prev: any) => ({
//             ...prev,
//             image: img,
//           }));
//         }}
//       />
//     </div>
//   );
// });

// export default AboutPageSetting;
