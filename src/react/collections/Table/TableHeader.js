import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  childrenUtils,
  getElementType,
  getUnhandledProps
} from '../../lib';

function TableHeader(props) {

  const {
    children,
    className,
    content,
    sticky,
    stickyClassName,
    topLimit
  } = props;

  const classes = cx(
    className,
    'head'
  );

  const [headerID] = React.useState(`header-${Math.ceil(Math.random() * 10000)}`);
  const rest = getUnhandledProps(TableHeader, props);
  const ElementType = getElementType(TableHeader, props);

  /** @type {React.MutableRefObject<HTMLElement>} */
  const sourceRef = React.useRef();

  const handleReplaceStickyHeader = React.useCallback(
    () => {
      if (!sourceRef.current) {
        return;
      }

      /** Get source dimension */
      const rect = sourceRef.current.getBoundingClientRect();
      const width = sourceRef.current.clientWidth;
      const height = sourceRef.current.clientHeight;

      if (rect.top < topLimit) {
        /** Check cloned element exists */
        let clonedElement = document.getElementById(`cloned-header-${headerID}`);

        if (!clonedElement) {
          clonedElement = document.createElement('table');
          clonedElement.id = `cloned-header-${headerID}`;
          clonedElement.classList.add('table');
          clonedElement.classList.add('cloned');

          if (stickyClassName) {
            clonedElement.classList.add(stickyClassName);
          }

          clonedElement.appendChild(sourceRef.current.cloneNode(true));

          document.body.appendChild(clonedElement);
        }

        clonedElement.style.position = 'fixed';
        clonedElement.style.top = `${topLimit}px`;
        clonedElement.style.left = `${rect.left}px`;
        clonedElement.style.width = `${width}px`;
        clonedElement.style.height = `${height}px`;
      }
      else {
        const clonedElement = document.getElementById(`cloned-header-${headerID}`);

        if (clonedElement) {
          clonedElement.remove();
        }
      }

    },
    [sourceRef.current]
  );

  React.useEffect(
    () => {
      /** If no sticky, doesn't need event attachment */
      if (!sticky) {
        return () => null;
      }

      /** Attach event */
      window.addEventListener('scroll', handleReplaceStickyHeader);
      window.addEventListener('resize', handleReplaceStickyHeader);

      /** Remove event on unload */
      return () => {
        window.removeEventListener('scroll', handleReplaceStickyHeader);
        window.removeEventListener('resize', handleReplaceStickyHeader);
      };
    },
    [sticky, handleReplaceStickyHeader]
  );

  /** On Component Unmount. remove the sticky header if exists */
  React.useEffect(
    () => () => {
      const clonedElement = document.getElementById(`cloned-header-${headerID}`);

      if (clonedElement) {
        clonedElement.remove();
      }
    },
    []
  );

  return (
    <ElementType ref={sourceRef} {...rest} id={headerID} className={classes}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  );

}

TableHeader.propTypes = {
  /** An element used to render the Component */
  as: PropTypes.elementType,

  /** Children Props */
  children: PropTypes.node,

  /** User Defined classes */
  className: PropTypes.string,

  /** Content shorthand */
  content: PropTypes.node,

  sticky: PropTypes.bool,

  stickyClassName: PropTypes.string,

  topLimit: PropTypes.number
};

TableHeader.defaultProps = {
  as       : 'thead',
  topLimit : 58
};

export default TableHeader;
