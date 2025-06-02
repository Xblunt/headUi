// 'use client';

// import { PfButton } from "@/components/ui/button";
// import { CoordInputs } from "@/components/ui/coord-inputs";
// import { PfInputMask } from "@/components/ui/input-mask";
// import { PfInputText } from "@/components/ui/input-text";
// import { contacts_mock_data } from "@/mocks/contacts.mock";
// import { Contacts } from "@/models";
// import { ContactsService } from "@/services";
// import { useStores } from "@/utils/hooks/useStores";
// import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";

// const ContactsPageSetting = observer(() => {
//   const { contactsStore } = useStores();
//   const contactsService = ContactsService.getInstance();
//   const [data, setData] = useState<Contacts | null>(null);

//   useEffect(() => {
//     // setData(contacts_mock_data); // Моковые данные (для разработки)
//     const fetchContacts = async () => {
//       try {
//         await contactsService.fetchContacts();
//         setData(contactsStore.contacts); // Реальные данные
//         setTimeout(() => {
//           contactsStore.setCanEdit(false);
//         }, 1);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchContacts();
//   }, []);

//   useEffect(() => {
//     contactsStore.setCanEdit(true);
//   }, [data]);

//   const updateData = async () => {
//     if (!data) return;
//     await contactsService.updateContacts(data);
//   };
  
//   return (
//     <div className="wrapper">
//       <div className="saveBtn">
//         <PfButton 
//           onClick={updateData}
//           label={'Сохранить'}
//           icon={"pi pi-save"}
//           loading={contactsStore.loading}
//           disabled={!contactsStore.canEdit}
//         />
//       </div>
//       <PfInputText
//         value={data?.title || ''}
//         title={'Название организации'}
//         placeholder={'Название организации'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               title: e.target.value
//             };
//           });
//         }}
//       />
//       <PfInputText
//         value={data?.address || ''}
//         title={'Адрес'}
//         placeholder={'Адрес'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               address: e.target.value
//             };
//           });
//         }}
//       />
//       <CoordInputs 
//         coords={data?.coordinates || []}
//         onChange={(coords: number[]) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               coordinates: coords
//             }
//           })
//         }}
//       />
//       <PfInputText
//         value={data?.email || ''}
//         title={'Электронная почта'}
//         placeholder={'Электронную почту'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               email: e.target.value
//             };
//           });
//         }}
//       />
//       <PfInputMask 
//         value={data?.phone || ''}
//         title={'Номер телефона'}
//         mask={'(999) 999-9999'}
//         placeholder={'(999) 999-9999'}
//         onChange={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               phone: e.target.value
//             }
//           })
//         }}
//       />
//       <PfInputText
//         value={data?.tg || ''}
//         title={'Ссылка на telegram'}
//         placeholder={'Ссылку на telegram'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               tg: e.target.value
//             };
//           });
//         }}
//       />
//       <PfInputText
//         value={data?.vk || ''}
//         title={'Ссылка на vk'}
//         placeholder={'Ссылку на vk'}
//         onInput={(e: any) => {
//           setData((prev: any) => {
//             return {
//               ...prev,
//               vk: e.target.value
//             };
//           });
//         }}
//       />
//     </div>
//   );
// });

// export default ContactsPageSetting;
