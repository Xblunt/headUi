// 'use client';

// import { observer } from "mobx-react-lite";
// import { useStores } from "@/utils/hooks/useStores";
// import { useEffect, useState } from "react";
// import { directions_mock_data } from "@/mocks/directions.mock";
// import { Direction } from "@/models";
// import { IColumn, PfTable } from "@/components/ui/table";
// import { AppService, DirectionService } from "@/services";
// import { PfButton } from "@/components/ui/button";
// import { PfFileUpload } from "@/components/ui/file-upload";

// const DirectionPageSetting = observer(() => {
//   const { directionStore, appStore } = useStores();
//   const directionService = DirectionService.getInstance();
//   const appService = AppService.getInstance();
//   const [data, setData] = useState<Direction[]>([]);
//   const [cert, setCert] = useState<string>('');

//   useEffect(() => {
//     // setData(directions_mock_data); // Моковые данные (для разработки)
//     const fetchDirections = async () => {
//       try {
//         await directionService.fetchDirections();
//         setData(directionStore.directions); // Реальные данные
//         setTimeout(() => {
//           directionStore.setCanEdit(false);
//         }, 1);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchDirections();
//   }, []);

//   useEffect(() => {
//     const fetchCertificate = async () => {
//       try {
//         await appService.fetchCertificate();
//         setCert(appStore.certificate);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCertificate();
//   }, []);

//   useEffect(() => {
//     directionStore.setCanEdit(true);
//   }, [data]);

//   const deleteDirection = (id: number) => {
//     setData((prevData: any) => {
//       const updateData = prevData?.filter((item: any) => item.id !== id);
//       return updateData;
//     });
//   };

//   const updateData = async (updata: Direction[]) => {
//     const newData = await directionService.updateDirections(updata);
//     setData(newData);
//     setTimeout(() => {
//       directionStore.setCanEdit(false);
//     }, 10);
//   };

//   const updateCertificate = async (file: File) => {
//     const fileLink = await appService.updateFile(file, 'certificate');
//     setCert(fileLink);
//   };

//   const directionColumns: IColumn[] = [
//     {
//       field: 'title',
//       header: 'Название'
//     },
//     {
//       field: 'shortDescription',
//       header: 'Краткое описание'
//     }
//   ];

//   return (
//     <div className="wrapper">
//       <div className="saveBtn">
//         <PfButton
//           onClick={() => { if (data) updateData(data) }}
//           label={'Сохранить'}
//           icon={"pi pi-save"}
//           loading={directionStore.loading}
//           disabled={!directionStore.canEdit}
//         />
//       </div>
//       <PfTable 
//         data={data}
//         columns={directionColumns}
//         title={'Блок «Направления»'}
//         redirect
//         onDelete={(data) => deleteDirection(data.id)}
//       />
//       <PfFileUpload
//         file={cert}
//         title={'Сертификат'}
//         loading={appStore.isLoadingFile}
//         onChange={(file: File) => updateCertificate(file)}
//       />
//     </div>
//   );
// });

// export default DirectionPageSetting;
