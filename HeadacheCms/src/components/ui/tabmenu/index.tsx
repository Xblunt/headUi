import { observer } from "mobx-react-lite";
import { FC, useState } from "react";

import s from './style.module.scss';
import { ILink } from "@/models";
import { TabMenu, TabMenuProps } from "primereact/tabmenu";

interface IProps extends TabMenuProps {
  onTabChange?: (e: any) => void;
  list?: ILink[];
}

export const PfTabMenu: FC<IProps> = observer((props) => {
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handleTabChange = (e: any) => {
      setActiveIndex(e.index);
      if (props.onTabChange) {
        props.onTabChange(e);
      }
    };
  
    return (
      <TabMenu 
        className={s.tabs }
        model={props.list} 
  
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    );
  });