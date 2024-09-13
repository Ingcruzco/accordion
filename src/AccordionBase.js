import { classNames } from "./utils/ClassNames";
import { ObjectUtils } from "./utils/utils";

const classes = {
  root: "p-accordion p-component",
  accordiontab: {
    root: ({ selected }) =>
      classNames("p-accordion-tab", {
        "p-accordion-tab-active": selected,
      }),
    content: "p-accordion-content",
    header: ({ selected, getTabProp, tab }) =>
      classNames("p-accordion-header", {
        "p-highlight": selected,
        "p-disabled": getTabProp(tab, "disabled"),
      }),
    headeraction: "p-accordion-header-link",
    headericon: "p-accordion-toggle-icon",
    headertitle: "p-accordion-header-text",
    toggleablecontent: "p-toggleable-content",
    transition: "p-toggleable-content",
  },
};

const styles = `
@layer primereact {
    .p-accordion-header-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        user-select: none;
        position: relative;
        text-decoration: none;
    }
    
    .p-accordion-header-link:focus {
        z-index: 1;
    }
    
    .p-accordion-header-text {
        line-height: 1;
        width: 100%;
    }
}
`;

export const AccordionBase = {
  defaultProps: {
    __TYPE: "Accordion",
    id: null,
    activeIndex: null,
    className: null,
    style: null,
    multiple: false,
    expandIcon: null,
    collapseIcon: null,
    transitionOptions: null,
    onTabOpen: null,
    onTabClose: null,
    onTabChange: null,
    children: undefined,
  },
  css: {
    classes,
    styles,
  },
  getProps(props) {
    return ObjectUtils.getMergedProps(props, this.defaultProps);
  },
};

export const AccordionTabBase = {
  defaultProps: {
    __TYPE: "AccordionTab",
    className: null,
    contentClassName: null,
    contentStyle: null,
    disabled: false,
    header: null,
    headerClassName: null,
    headerStyle: null,
    headerTemplate: null,
    style: null,
    tabIndex: 0,
    children: undefined,
  },
  updateActiveIndex(tabIndex) {
    this.defaultProps.tabIndex = tabIndex;
  },
  getProp(props, prop = "") {
    const value = props ? props[prop] : undefined;
    return value === undefined ? this.defaultProps[prop] : value;
  },
  getCProp(tab, name) {
    return ObjectUtils.getComponentProp(
      tab,
      name,
      AccordionTabBase.defaultProps
    );
  },
};
