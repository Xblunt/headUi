// "use client";

// import { IColumn, PfTable } from "@/components/ui/table";
// import { FeedbackTypes, GeneralFeedback } from "@/models";
// import { FeedbackService } from "@/services";
// import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";

// const FeedbackPage = observer(() => {
//   const feedbackService = FeedbackService.getInstance();
//   const [data, setData] = useState<GeneralFeedback[]>([]);

//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);

//     const offsetInMinutes = date.getTimezoneOffset();
//     const offsetInHours = offsetInMinutes / 60;

//     date.setHours(date.getHours() - offsetInHours); // Отнимаем смещение для UTC

//     // Форматируем дату в "DD-MM-YYYY HH:mm:ss"
//     const options: Intl.DateTimeFormatOptions = {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: false,
//     };

//     const formattedDate = date.toLocaleString('sv-SE', options).replace(" ", " ");
//     return formattedDate
//       .replace(/(\d{4})-(\d{2})-(\d{2})/, "$3-$2-$1")
//       .replace(/(\d{2}):(\d{2}):(\d{2})/, "$1:$2:$3");
//   };

//   const fetchFeedbackData = async () => {
//     try {
//       const [mainFeedback, directionFeedback, careerFeedback] = await Promise.all([
//         feedbackService.fetchMainFeedback(),
//         feedbackService.fetchDirectionFeedback(),
//         feedbackService.fetchCareerFeedback(),
//       ]);

//       const combinedData: GeneralFeedback[] = [
//         ...mainFeedback.map((item): GeneralFeedback => ({
//           name: item.name,
//           email: item.email,
//           date: item.date,
//           accepted: item.accepted,
//           type: FeedbackTypes.CONTACTS,
//           originalMessageText: JSON.stringify(item),
//           number: item.number,
//           topic: item.topic,
//           message: item.message,
//           html: undefined,
//           vacancy: undefined,
//         })),
//         ...directionFeedback.map((item): GeneralFeedback => ({
//           name: item.name,
//           email: item.email,
//           date: item.date,
//           accepted: item.accepted,
//           type: FeedbackTypes.DIRECTION,
//           originalMessageText: JSON.stringify(item),
//           number: item.number,
//           topic: undefined,
//           message: undefined,
//           html: item.html,
//           vacancy: undefined,
//         })),
//         ...careerFeedback.map((item): GeneralFeedback => ({
//           name: item.name,
//           email: item.email,
//           date: item.date,
//           accepted: item.accepted,
//           type: FeedbackTypes.CAREER,
//           originalMessageText: JSON.stringify(item),
//           number: item.number,
//           topic: undefined,
//           message: undefined,
//           html: undefined,
//           vacancy: item.vacancy,
//         })),
//       ];

//       combinedData.sort((a, b) => {
//         return new Date(b.date).getTime() - new Date(a.date).getTime();
//       });

//       const formattedCombinedData = combinedData.map(item => ({
//         ...item,
//         date: formatDate(item.date),
//       }));

//       setData(formattedCombinedData);
//     } catch (error) {
//       console.error('Ошибка при загрузке данных обратной связи:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFeedbackData();
//   }, []);

//   const tableColumns: IColumn[] = [
//     {
//       field: 'date',
//       header: 'Дата отправки'
//     },
//     {
//       field: 'type',
//       header: 'Тип'
//     },
//     {
//       field: 'originalMessageText',
//       header: 'Текст исходного сообщения'
//     },
//     {
//       field: 'accepted',
//       header: 'Результат обработки'
//     },
//     {
//       field: 'name',
//       header: 'Имя отправителя'
//     },
//     {
//       field: 'email',
//       header: 'Email'
//     },
//     {
//       field: 'number',
//       header: 'Телефон'
//     },
//   ];

//   return (
//     <div className="wrapper">
//       <PfTable 
//         data={data}
//         columns={tableColumns}
//         title={'Обратная связь'}
//         hideActions
//         quantityRows={25}
//         quantityRowsArray={[25, 50, 100]}
//       />
//     </div>
//   );
// });

// export default FeedbackPage;
