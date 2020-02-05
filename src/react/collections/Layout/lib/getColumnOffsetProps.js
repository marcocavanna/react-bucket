import { isObject } from 'formik';

export default function getColumnOffsetProps(props) {

  const { offsettedBy: _offsettedBy } = props;

  if (isObject(_offsettedBy)) {
    const {
      phoneUp: offsettedBy,
      tabletUp: onTabletOffsettedBy,
      desktopUp: onDesktopOffsettedBy,
      largeDesktopUp: onLargeDesktopOffsettedBy
    } = _offsettedBy;

    return {
      offsettedBy,
      onTabletOffsettedBy,
      onDesktopOffsettedBy,
      onLargeDesktopOffsettedBy
    };
  }

  const {
    onTabletOffsettedBy,
    onDesktopOffsettedBy,
    onLargeDesktopOffsettedBy
  } = props;

  return {
    offsettedBy: _offsettedBy,
    onTabletOffsettedBy,
    onDesktopOffsettedBy,
    onLargeDesktopOffsettedBy
  };

}
