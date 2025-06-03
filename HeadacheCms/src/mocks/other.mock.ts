import { IKeyToken, ILink, ITab } from "@/models";

// Tabs (Hardcode)
export const tabs: ITab[] = [
  {
    title: 'Главная',
    link: 'main',
    icon: 'pi pi-home'
  },
  {
    title: 'Пользователи',
    link: 'users',
    icon: 'pi pi-users'
  },
  {
    title: 'Музыка',
    link: 'music',
    icon: 'pi pi-headphones'
  },
  {
    title: 'Альбомы',
    link: 'albums',
    icon: 'pi pi-th-large'
  },
   {
    title: 'Чаты',
    link: 'chats',
    icon: 'pi pi-comments'
  },
  {
    title: 'Сотрудничество',
    link: 'cooperation',
    icon: 'pi pi-file'
  },
   {
    title: 'Продвижение',
    link: 'promo',
    icon: 'pi pi-chart-bar'
  },
];

export const tabsMusic: ILink[] = [
  {
    label: 'Очередь',
  },
  {
    label: 'Одобренные',
  },
  {
    label: 'Отклонённые',
  },
];

export const tabsUser: ILink[] = [
  {
    label: 'Администраторы',
  },
  {
    label: 'Пользователи',
  },
  {
    label: 'Авторы',
  },
  {
    label: 'Лейблы',
  },
];

export const keyToken: IKeyToken = {
  key: 'token'
}
