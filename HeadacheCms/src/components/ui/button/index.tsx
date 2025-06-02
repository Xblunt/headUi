import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Button, ButtonProps } from 'primereact/button';
import s from './style.module.scss';

interface IProps extends ButtonProps {
  onClick?: () => void;
}

export const PfButton: FC<IProps> = observer((props) => {
  return (
    <Button
      className={props.className ? props.className : s.btn}
      badge={props.badge}
      badgeClassName={props.badgeClassName}
      label={props.label}
      icon={props.icon}
      iconPos={props.iconPos}
      disabled={props.disabled}
      link={props.link}
      loading={props.loading}
      loadingIcon={props.loadingIcon}
      outlined={props.outlined}
      plain={props.plain}
      pt={props.pt}
      ptOptions={props.ptOptions}
      raised={props.raised}
      severity={props.severity}
      rounded={props.rounded}
      size={props.size}
      tooltip={props.tooltip}
      text={props.text}
      tooltipOptions={props.tooltipOptions}
      unstyled={props.unstyled}
      visible={props.visible}
      onClick={props.onClick}
    />
  );
});
