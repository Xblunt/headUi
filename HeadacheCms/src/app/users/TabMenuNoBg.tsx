import { TabMenu, TabMenuProps } from 'primereact/tabmenu';
import s from './style.module.scss';

export function TabMenuNoBg(props: TabMenuProps) {
  return (
    <TabMenu
      {...props}
      style={{
        background: 'transparent',
        width: '100%',
        boxShadow: 'none',
        border: 'none',
        ...props.style
      }}
      pt={{
        root: { className: s.tabs },
        menu: { className: s.tabUl }
      }}
    />
  );
}
