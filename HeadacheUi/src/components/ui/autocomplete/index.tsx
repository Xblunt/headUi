import { observer } from "mobx-react-lite";
import { AutoComplete, AutoCompleteProps } from "primereact/autocomplete";
import { FC } from "react";

// interface IProps extends AutoCompleteProps { }

export const PfAutoComplete: FC<AutoCompleteProps> = observer((props) => {

  return (
    <AutoComplete 
      appendTo={props.appendTo}
      autoFocus={props.autoFocus}
      autoHighlight={props.autoHighlight}
      className={props.className}
      delay={props.delay}
      disabled={props.disabled}
      dropdown={props.dropdown}
      dropdownAriaLabel={props.dropdownAriaLabel}
      dropdownAutoFocus={props.dropdownAutoFocus}
      dropdownIcon={props.dropdownIcon}
      dropdownMode={props.dropdownMode}
      emptyMessage={props.emptyMessage}
      field={props.field}
      forceSelection={props.forceSelection}
      inputClassName={props.inputClassName}
      inputStyle={props.inputStyle}
      invalid={props.invalid}
      itemTemplate={props.itemTemplate}
      loadingIcon={props.loadingIcon}
      maxLength={props.maxLength}
      minLength={props.minLength}
      multiple={props.multiple}
      name={props.name}
      optionGroupChildren={props.optionGroupChildren}
      optionGroupLabel={props.optionGroupLabel}
      optionGroupTemplate={props.optionGroupTemplate}
      panelClassName={props.panelClassName}
      panelFooterTemplate={props.panelFooterTemplate}
      panelStyle={props.panelStyle}
      placeholder={props.placeholder}
      pt={props.pt}
      ptOptions={props.ptOptions}
      readOnly={props.readOnly}
      removeTokenIcon={props.removeTokenIcon}
      required={props.required}
      scrollHeight={props.scrollHeight}
      selectedItemTemplate={props.selectedItemTemplate}
      selectionLimit={props.selectionLimit}
      showEmptyMessage={props.showEmptyMessage}
      size={props.size}
      style={props.style}
      suggestions={props.suggestions}
      tabIndex={props.tabIndex}
      tooltip={props.tooltip}
      tooltipOptions={props.tooltipOptions}
      transitionOptions={props.transitionOptions}
      type={props.type}
      unstyled={props.unstyled}
      value={props.value}
      variant={props.variant}
      virtualScrollerOptions={props.virtualScrollerOptions}
      onChange={props.onChange}
    />
  );
});
