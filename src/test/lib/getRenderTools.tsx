import * as React from 'react';

import { render } from '@testing-library/react';


export default function getRenderTools<P>(
  Component: React.ComponentType<P>,
  defaultProps?: P,
  dataTestID = 'my-component'
) {

  /** Render the Component */
  const renderComponent = (overrideProps?: P) => render(
    // @ts-ignore
    <Component
      {...defaultProps}
      {...overrideProps}
      data-testid={dataTestID}
    />
  );

  /** Render the Component and Return the Element */
  const getComponentElement = (overrideProps?: P) => {
    /** Get Render Result */
    const { getByTestId } = renderComponent(overrideProps);
    return getByTestId(dataTestID);
  };

  /** Render the component and get an element using text */
  const getChildByText = (text: string, overrideProps?: P) => {
    const { getByText } = renderComponent(overrideProps);
    return getByText(text);
  };

  /** Render the component and get an element using test id */
  const getChildByTestId = (childTestId: string, overrideProps?: P) => {
    const { getByTestId } = renderComponent(overrideProps);
    return getByTestId(childTestId);
  };

  /** Get children */
  const getChildrenByTestId = (childrenTestId: string, overrideProps?: P) => {
    const { getAllByTestId } = renderComponent(overrideProps);
    return getAllByTestId(childrenTestId);
  };

  /** Return tools */
  return {
    renderComponent,
    getComponentElement,
    getChildByTestId,
    getChildByText,
    getChildrenByTestId
  };
}
