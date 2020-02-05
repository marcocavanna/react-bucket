import { isObject } from 'formik';

export default function getColumnWidthProps(props) {

  const { is: _is } = props;

  if (isObject(_is)) {
    const {
      phoneUp: is,
      tabletUp: onTabletIs,
      desktopUp: onDesktopIs,
      largeDesktopUp: onLargeDesktopIs
    } = _is;

    return { is, onTabletIs, onDesktopIs, onLargeDesktopIs };
  }

  const {
    onTabletIs,
    onDesktopIs,
    onLargeDesktopIs
  } = props;

  return {
    is: _is,
    onTabletIs,
    onDesktopIs,
    onLargeDesktopIs
  };

}
