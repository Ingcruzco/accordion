export default class ObjectUtils {
  static isEmpty(value) {
    return (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0) ||
      (!(value instanceof Date) &&
        typeof value === "object" &&
        Object.keys(value).length === 0)
    );
  }

  static getMergedProps(props, defaultProps) {
    return Object.assign({}, defaultProps, props);
  }

  static getProp(props, prop = "", defaultProps = {}) {
    const value = props ? props[prop] : undefined;

    return value === undefined ? defaultProps[prop] : value;
  }

  static isNotEmpty(value) {
    return !this.isEmpty(value);
  }

  static getComponentProp(component, prop = "", defaultProps = {}) {
    return this.isNotEmpty(component)
      ? this.getProp(component.props, prop, defaultProps)
      : undefined;
  }

  static getComponentProps(component, defaultProps) {
    return this.isNotEmpty(component)
      ? this.getMergedProps(component.props, defaultProps)
      : undefined;
  }
}
