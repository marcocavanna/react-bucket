import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  createShorthandFactory,
  createHTMLParagraph,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  classByKey,
  classByPattern,
  classByValue
} from '../../lib';

import Icon from '../../elements/Icon';

function TableCell(props) {

  const {
    action,
    active,
    children,
    className,
    content,
    disabled,
    error,
    header,
    icon,
    metadata,
    selectable,
    success,
    textAlign,
    verticalAlign,
    warning
  } = props;

  const classes = cx(
    classByKey(action, 'is-action'),
    classByKey(active, 'is-active'),
    classByKey(disabled, 'is-disabled'),
    classByKey(error, 'is-error'),
    classByKey(selectable, 'is-selectable'),
    classByKey(success, 'is-success'),
    classByKey(metadata, 'has-metadata'),
    classByPattern(textAlign, 'has-text-%value%'),
    classByValue(verticalAlign),
    classByKey(warning, 'is-warning'),
    className,
    'cell'
  );

  const rest = getUnhandledProps(TableCell, props);
  const ElementType = getElementType(TableCell, props);

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes}>
        {children}
      </ElementType>
    );
  }

  const cellHeader = createHTMLParagraph(header, {
    autoGenerateKey : false,
    overrideProps   : {
      className : 'cell-header',
      children  : icon
        ? <span>{Icon.create(icon, { autoGenerateKey: false })}{header}</span>
        : header
    }
  });

  /** Create the CellContent */
  const cellContent = createHTMLParagraph(content, {
    autoGenerateKey : false,
    overrideProps   : {
      className: 'cell-content'
    }
  });

  /** Create the CellMetadata */
  const cellMetadata = createHTMLParagraph(metadata, {
    autoGenerateKey : false,
    overrideProps   : {
      className: 'cell-metadata'
    }
  });

  return (
    <ElementType {...rest} className={classes}>
      {cellMetadata}
      {cellHeader}
      {cellContent}
    </ElementType>
  );

}

TableCell.propTypes = {
  /** Set the cell as Action Container */
  action: PropTypes.bool,

  /** Set the Cell as Active */
  active: PropTypes.bool,

  /** An Element used to Render the Component */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** User Defined Class */
  className: PropTypes.string,

  /** Cell content Shorthand */
  content: PropTypes.node,

  /** Disable Cell */
  disabled: PropTypes.bool,

  /** Cell Error Style */
  error: PropTypes.bool,

  /** Cell Header Shorthand */
  header: PropTypes.node,

  /** Icon Shorthand */
  icon: customPropTypes.fontAwesome,

  /** Add Metadata Info on Cell */
  metadata: PropTypes.node,

  /** Set cell as Selectable */
  selectable: PropTypes.bool,

  /** Set cell as Success */
  success: PropTypes.bool,

  /** Set Text align */
  textAlign: customPropTypes.textAlign,

  /** Set Cell Vertical Align */
  verticalAlign: PropTypes.string,

  /** Set Cell as Warning */
  warning: PropTypes.bool
};

TableCell.defaultProps = {
  as: 'td'
};

TableCell.create = createShorthandFactory(TableCell, content => ({ content }));

export default TableCell;
