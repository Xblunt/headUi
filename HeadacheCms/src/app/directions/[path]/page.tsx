// 'use client';

// import { observer } from "mobx-react-lite";
// import { useStores } from "@/utils/hooks/useStores";
// import { useEffect, useState } from "react";
// import { Direction, Solution, SubRow } from "@/models";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { PfInputText } from "@/components/ui/input-text";
// import { PfInputTextarea } from "@/components/ui/input-textarea";
// import { PfEditor } from "@/components/ui/editor";
// import { directions_mock_data } from "@/mocks/directions.mock";
// import { ImageUpload } from "@/components/ui/image-upload";
// import { IColumn, PfTable } from "@/components/ui/table";
// import { FormElements, IPropertyForm } from "@/components/form";
// import { DirectionService } from "@/services";
// import { PfButton } from "@/components/ui/button";

// const DirectionPageSetting = observer(() => {
//   const { directionStore } = useStores();
//   const directionService = DirectionService.getInstance();
//   const [data, setData] = useState<Direction | null>(null);
//   const router = useRouter();

//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const fullUrl = `${pathname}${searchParams ? `?${searchParams.toString()}` : ''}`;

//   useEffect(() => {
//     if (!directionStore.directions.length) {
//       // directionStore.setDirections(directions_mock_data); // Моковые данные (для разработки)
//       const fetchDirections = async () => {
//         try {
//           await directionService.fetchDirections(); // Реальные данные
//           directionStore.directions?.map((direction) => {
//             if (fullUrl.includes(direction.path)) {
//               setData(direction);
//             } else {
//               setData({
//                 title: '',
//                 fullDescription: '',
//                 shortDescription: '',
//                 image: '',
//                 path: '',
//                 solutions: []
//               });
//             }
//           });
//         } catch (error) {
//           console.error(error);
//         }
//       };
//       fetchDirections();
//     } else {
//       setTimeout(() => {
//         directionStore.directions?.map((direction) => {
//           if (fullUrl.includes(direction.path)) {
//             setData(direction);
//           }
//         });
//       }, 10);
//     }
//   }, []);

//   useEffect(() => {
//     directionStore.setCanEdit(true);
//   }, [data]);

//   const updateData = async (updata: Direction) => {
//     const newData = await directionService.updateDirection(updata);
//     setData(newData);
//     setTimeout(() => {
//       directionStore.setCanEdit(false);
//       if (fullUrl.includes('create')) {
//         router.push(`/directions/${newData.path}`);
//       }
//     }, 10);
//   };

//   const updateSolution = (sol: Solution) => {
//     setData((prevData: any) => {
//       const currentSolutions = prevData.solutions || [];
//       const rowExist = currentSolutions.find((item: any) => item.id === sol.id);

//       const updatedRow = rowExist
//         ? currentSolutions.map((item: any) => item.id === sol.id ? sol : item)
//         : [...currentSolutions, sol];

//       const updatedData = {
//         ...prevData,
//         solutions: updatedRow || []
//       };

//       updateData(updatedData);

//       return updatedData;
//     });
//   };

//   const deleteSolution = (id: number) => {
//     setData((prevData: any) => {
//       const updateData = prevData?.solutions.filter((item: any) => item.id !== id);
//       return {
//         ...prevData,
//         solutions: updateData
//       }
//     });
//   };

//   const solutionRowColumns: IColumn[] = [
//     {
//       field: 'name',
//       header: 'Название'
//     }
//   ];

//   const solutionRowFormProperty: IPropertyForm[] = [
//     {
//       name: 'rows',
//       element: FormElements.RowConstructor,
//     }
//   ];

//   const solutionRowEmptyRow: { _id?: number } & SubRow = {
//     name: '',
//     singleService: false,
//     variables: []
//   };

//   const solutionColumns: IColumn[] = [
//     {
//       field: 'title',
//       header: 'Заголовок'
//     }
//   ];

//   const solutionFormProperty: IPropertyForm[] = [
//     {
//       name: 'title',
//       element: FormElements.InputText,
//       label: 'Название решения',
//       placeholder: 'Название решения'
//     },
//     {
//       name: 'description',
//       element: FormElements.InputTextarea,
//       label: 'Описание решения',
//       placeholder: 'Описание решения'
//     },
//     {
//       name: 'rows',
//       element: FormElements.Table,
//       label: 'Услуги',
//       columns: solutionRowColumns,
//       headerTitle: 'Редактирование услуги',
//       formData: solutionRowFormProperty,
//       emptyRow: solutionRowEmptyRow
//     },
//     {
//       name: 'additionalLicenseRows',
//       element: FormElements.Table,
//       label: 'Дополнительные лицензии',
//       headerTitle: 'Редактирование лицензии',
//       columns: solutionRowColumns,
//       formData: solutionRowFormProperty,
//       emptyRow: solutionRowEmptyRow
//     },
//     {
//       name: 'additionalLicenseDescription',
//       element: FormElements.InputTextarea,
//       label: 'Описание для дополнительных лицензий',
//       placeholder: 'Описание для дополнительных лицензий'
//     }
//   ];

//   const emptySolutionRow: Solution = {
//     title: '',
//     description: '',
//     rows: [],
//     additionalLicenseDescription: '',
//     additionalLicenseRows: []
//   };
  
//   return (
//     <div className="wrapper">
//       <div className="saveBtn">
//         <PfButton
//           onClick={() => { if (data) updateData(data) }}
//           label={'Сохранить'}
//           icon={"pi pi-save"}
//           loading={directionStore.loading}
//           disabled={!directionStore.canEdit || !data?.path}
//         />
//       </div>
//       <PfInputText
//         value={data?.title || ''}
//         title={'Заголовок направления'}
//         placeholder={'Заголовок направления'}
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
//         value={data?.shortDescription}
//         title={'Краткое описание команды'}
//         placeholder={'Краткое описание команды'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               shortDescription: e.target.value
//             };
//           });
//         }}
//       />
//       <PfEditor 
//         value={data?.fullDescription || ''}
//         placeholder={'Описание'}
//         onTextChange={(val) => {
//           if (data?.fullDescription === val.htmlValue) return;
//           setData((prev: any) => {
//             return {
//               ...prev,
//               fullDescription: val.htmlValue
//             };
//           });
//         }}
//       />
//       <ImageUpload
//         src={data?.image || ''}
//         onChange={(img: string) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               image: img
//             };
//           });
//         }}
//       />
//       <PfInputText
//         value={data?.path || ''}
//         title={'URL'}
//         placeholder={'URL'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               path: e.target.value
//             };
//           });
//         }}
//       />
//       <PfTable
//         data={data?.solutions}
//         columns={solutionColumns}
//         headerTitle={'Редактирование решения'}
//         title={'Блок «Решения»'}
//         formProperty={solutionFormProperty}
//         emptyRow={emptySolutionRow}
//         onEdit={(rowData: any) => updateSolution(rowData)}
//         onDelete={(rowData: any) => deleteSolution(rowData.id)}
//       />
//     </div>
//   );
// });

// export default DirectionPageSetting;
