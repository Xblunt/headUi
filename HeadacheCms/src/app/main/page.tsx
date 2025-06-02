'use client';

import s from './style.module.scss';
import { useRouter } from 'next/navigation';
import { tabs } from "@/mocks/other.mock";

const MainPageSettings = () => {
    const router = useRouter();
  
    const handleTabClick = (link: string) => {
      router.push(`/${link}`);
    };
  
    return (
        <div className="wrapper">
        <div className={s.mainContent}>
          <h1 className={s.mainTitle}>Выберите список</h1>
          
          <div className={s.tabsGrid}>
            {tabs.filter( tab => tab.link !== 'main').map((tab, index) => (
              <div 
                key={index}
                className={s.tabCard}
                onClick={() => handleTabClick(tab.link)}
              >
                <i className={`${tab.icon} ${s.tabIcon}`} />
                <span className={s.tabTitle}>{tab.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default MainPageSettings;