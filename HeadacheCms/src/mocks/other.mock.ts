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
    title: 'Сотрудничество',
    link: 'news',
    icon: 'pi pi-comments'
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
