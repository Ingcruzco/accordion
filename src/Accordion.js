import React, { useRef, useState } from "react";
import { useMountEffect } from "./hooks/useMountEffect";
import UniqueComponentId from "./utils/UniqueComponentId";
import { AccordionBase, AccordionTabBase } from "./AccordionBase";

export const AccordionTab = () => {};

export const Accordion = (inProps) => {
  const props = AccordionBase.getProps(inProps);
  const [idState, setIdState] = useState(props.id);
  const [activeIndexState, setActiveIndexState] = React.useState(
    props.activeIndex
  );
  const activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;

  useMountEffect(() => {
    if (!idState) {
      setIdState(UniqueComponentId());
    }
  });

  const onTabHeaderClick = (event, tab, index) => {
    changeActiveIndex(event, tab, index);
  };

  const isSelected = (index) => {
    return props.multiple && Array.isArray(activeIndex)
      ? activeIndex && activeIndex.some((i) => i === index)
      : activeIndex === index;
  };

  const getTabProp = (tab, name) => AccordionTabBase.getCProp(tab, name);

  const changeActiveIndex = (event, tab, index) => {
    if (!getTabProp(tab, "disabled")) {
      const selected = isSelected(index);
      let newActiveIndex = null;

      if (props.multiple) {
        const indexes = activeIndex || [];

        newActiveIndex = selected
          ? indexes.filter((i) => i !== index)
          : [...indexes, index];
      } else {
        newActiveIndex = selected ? null : index;
      }

      const callback = selected ? props.onTabClose : props.onTabOpen;

      callback && callback({ originalEvent: event, index: index });

      if (props.onTabChange) {
        props.onTabChange({
          originalEvent: event,
          index: newActiveIndex,
        });
      } else {
        setActiveIndexState(newActiveIndex);
      }
    }

    event.preventDefault();
  };

  const createTabHeader = (tab, selected, index) => {
    const headerId = idState + "_header_" + index;
    const ariaControls = idState + "_content_" + index;
    const tabIndex = getTabProp(tab, "disabled")
      ? -1
      : getTabProp(tab, "tabIndex");

    const headerTitleProps = {
      className: "accordion-header-text",
    };

    const header = (
      <span {...headerTitleProps} data-pc-section="headertitle">
        {tab.props.header}
      </span>
    );

    const headerProps = {
      id: headerId,
      tabIndex: 0,
    };

    const headerActionProps = {
      id: headerId,
      href: "#" + ariaControls,
      className: "accordion-header-link",
      role: "button",
      tabIndex,
      onClick: (e) => onTabHeaderClick(e, tab, index),
      "aria-disabled": getTabProp(tab, "disabled"),
      "aria-controls": ariaControls,
      "aria-expanded": selected,
    };

    return (
      <div {...headerProps}>
        <a {...headerActionProps}>{header}</a>
      </div>
    );
  };

  const createTabContent = (tab, selected, index) => {
    const style = {
      ...(getTabProp(tab, "style") || {}),
      ...(getTabProp(tab, "contentStyle") || {}),
    };
    const contentId = idState + "_content_" + index;
    const ariaLabelledby = idState + "_header_" + index;

    const toggleableContentProps = {
      id: contentId,
      className: "toggleable-content",
      style,
      role: "region",
      "aria-labelledby": ariaLabelledby,
    };

    const contentProps = {
      className: "accordion-content",
    };
    const children = getTabProp(tab, "children");

    return (
      <div {...toggleableContentProps}>
        <div {...contentProps}>{children}</div>
      </div>
    );
  };

  const createTab = (tab, index) => {
    const key = idState + "_" + index;
    const selected = isSelected(index);
    const tabHeader = createTabHeader(tab, selected, index);
    const tabContent = createTabContent(tab, selected, index);

    const rootProps = {
      key,
      className: selected ? "accordion-tab accordion-tab-active" : "accordion-tab",
    };

    return (
      <div {...rootProps}>
        {tabHeader} {tabContent}
      </div>
    );
  };

  const createTabs = () => {
    return React.Children.map(props.children, createTab);
  };

  const tabs = createTabs();

  return <div>{tabs}</div>;
};

AccordionTab.displayName = "AccordionTab";
