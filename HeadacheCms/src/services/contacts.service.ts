// import { Contacts } from "@/models";
// import { AuthStore, ContactsStore } from "@/stores";
// import { AUTH_STORE, CONTACTS_STORE } from "@/stores/identifiers";
// import { getValidToken } from "@/utils/authToken";
// import { get, post } from "@/utils/fetchWrapper";
// import Injector from "@/utils/injector";

// class ContactsService {
//   private static instance: ContactsService;
//   private contactsStore: ContactsStore;
//   private authStore: AuthStore;

//   private constructor() {
//     this.contactsStore = Injector.get<ContactsStore>(CONTACTS_STORE);
//     this.authStore = Injector.get<AuthStore>(AUTH_STORE);
//   }

//   static getInstance(): ContactsService {
//     if (!ContactsService.instance) {
//       ContactsService.instance = new ContactsService();
//     }
//     return ContactsService.instance;
//   }

//   async fetchContacts(): Promise<void> {
//     const token = getValidToken() !== null;
//     if (token) {
//       const response = await get(`contact`, {});
//       if (response) {
//         const data = JSON.parse(response);
//         this.contactsStore.setContacts(data);
//       } else {
//         console.error('Ошибка при загрузки данных страницы "Контакты"');
//         throw new Error('Не удалось загрузить данные страницы "Контакты"');
//       }
//     } else {
//       this.authStore.setNotHaveToken(true);
//     }
//   };

//   async updateContacts(contacts: Contacts): Promise<void> {
//     const token = getValidToken();
//     this.contactsStore.setLoading(true);
//     const response = await post(`contact`, JSON.stringify(contacts), token);
//     if (response) {
//       const updatedData = JSON.parse(response);
//       this.contactsStore.setContacts(updatedData);
//       this.contactsStore.setLoading(false);
//       this.contactsStore.setCanEdit(false);
//     } else {
//       console.error('Ошибка при обновлении данных страницы "Контакты"');
//     }
//   };
// }

// export default ContactsService;
