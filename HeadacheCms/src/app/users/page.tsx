'use client';

import { useStores } from "@/utils/hooks/useStores";
import { observer } from "mobx-react-lite";
import { IColumn, PfTable } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { FormElements, IPropertyForm } from "@/components/form";
import { tabsUser } from "@/mocks/other.mock";
import { PfTabMenu } from "@/components/ui/tabmenu";
import { AllService } from "@/services";
import { User } from "@/models";

const TAB_TO_ROLE_MAP: Record<string, string> = {
  'Администраторы': 'ROLE_ADMIN',
  'Пользователи': 'ROLE_USER',
  'Авторы': 'ROLE_AUTHOR',
  'Лейблы': 'ROLE_LABEL'
};


const UsersPageSetting = observer(() => {
  const { allStore } = useStores();
  const allService = AllService.getInstance();
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  // Загрузка и фильтрация данных
  const fetchAndFilterUsers = async () => {
    try {
      allStore.setLoading(true);
      const users = await allService.get<User[]>('user');
      if (users) {
        const role = TAB_TO_ROLE_MAP[tabsUser[activeTab].label];
        const filtered = role 
          ? users.filter(user => user.roles?.includes(role))
          : users;
        setFilteredData(filtered);
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    } finally {
      allStore.setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndFilterUsers();
  }, [activeTab]);

  const handleTabChange = (e: any) => {
    setActiveTab(e.index);
  };

  const handleUpdate = async (row: User) => {
    console.log('user', row)
    try {
      allStore.setLoading(true);
      const updatedUsers = await allService.post('user', row);
      console.log('fil', updatedUsers)
      if (updatedUsers) {
        fetchAndFilterUsers();
      //   const role = TAB_TO_ROLE_MAP[tabsUser[activeTab].label];
      //   // const filtered = role 
      //   //   ? updatedUsers.filter(user => user.roles?.includes(role))
      //   //   : updatedUsers;
      //   const filtered  = updatedUsers;
      //     console.log('fil', filtered)
      //   setFilteredData(filtered);
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    } finally {
      allStore.setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      allStore.setLoading(true);
      const updatedUsers = await allService.deleteById<User[]>('user', id);
      if (updatedUsers) {
        const role = TAB_TO_ROLE_MAP[tabsUser[activeTab].label];
        const filtered = role 
          ? updatedUsers.filter(user => user.roles?.includes(role))
          : updatedUsers;
        setFilteredData(filtered);
      }
    } catch (error) {
      console.error('Ошибка удаления:', error);
    } finally {
      allStore.setLoading(false);
    }
  };

  const сolumns: IColumn[] = [
    {
      field: 'login',
      header: 'Логин'
    },
    {
      field: 'password',
      header: 'Пароль'
    },
    {
      field: 'email',
      header: 'Почта'
    },
    {
      field: 'description',
      header: 'Описание'
    },
    {
      field: 'phoneNumber',
      header: 'Номер телефона'
    },
    {
      field: 'birthDate',
      header: 'Дата рождения'
    },
    {
      field: 'createdAt',
      header: 'Создан'
    },
    {
      field: 'lastVisitDate',
      header: 'Дата последнего посещения'
    },
    {
      field: 'roles',
      header: 'Роли'
    },

  ];

  const formProperty: IPropertyForm[] = [
    {
      name: 'description',
      element: FormElements.InputTextarea,
      label: 'Описание',
      placeholder: 'Описание'
    },
    {
      name: 'password',
      element: FormElements.InputText,
      label: 'Пароль',
      placeholder: 'Пароль'
    },
    {
      name: 'login',
      element: FormElements.InputText,
      label: 'Логин',
      placeholder: 'Логин'
    },
    {
      name: 'email',
      element: FormElements.InputText,
      label: 'Почта',
      placeholder: 'Почта'
    },
    {
      name: 'email',
      element: FormElements.InputNumber,
      label: 'Почта',
      placeholder: 'Почта'
    },
    {
      name: 'phoneNumber',
      element: FormElements.InputNumber,
      label: 'Номер телефона',
      placeholder: 'Номер телефона'
    }
  ];

  const emptyRow: User = {
    login: '',
    password: '',
    roles: [],
    isAccountNonLocked: true,
    isActive: true,
    description: '',
    phoneNumber: '',
    email: '',
    birthDate: new Date().toLocaleDateString('en-CA'),
    createdAt: new Date().toLocaleDateString('en-CA'),
    updatedAt: new Date().toLocaleDateString('en-CA'),
    lastVisitDate: new Date().toLocaleDateString('en-CA'),
    avgRating: 0
  };

 
  
  return (
    <div className="wrapper">
      <div className="saveBtn">
        <PfTabMenu 
          list={tabsUser} 
          onTabChange={handleTabChange}
          activeIndex={activeTab}
        />
      </div>
      <PfTable 
        data={filteredData}
        columns={сolumns}
        headerTitle={'Управление пользователем'}
        formProperty={formProperty}
        emptyRow={emptyRow}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
});

export default UsersPageSetting;
