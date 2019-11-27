import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { isObject } from '@appbuckets/rabbit';

import { Header, Checkbox, Tabs } from '../../../src/react';

import RenderPropTable from './RenderPropTable';

function ComponentProps(props) {

  const [viewProps, setViewProps] = useState(false);

  const handlePropsVisibleChange = () => setViewProps(!viewProps);

  const renderProps = (prop) => {
    /** If not an Object, return null */
    if (!isObject(prop)) {
      return null;
    }

    /** Check if must render Tabs */
    const propsSection = Object.getOwnPropertyNames(prop);

    /** Return props Panels */
    return (
      <React.Fragment>

        <Checkbox
          slider
          size='large'
          label={viewProps ? 'View Examples' : 'View Props'}
          checked={viewProps}
          onChange={handlePropsVisibleChange}
        />

        {viewProps && propsSection.length > 0 && (
          <React.Fragment>
            {/* Show Header */}
            <Header content='Props' textAlign='center' />

            {/* Show Props Tabs */}
            {propsSection.length === 1
              ? <RenderPropTable propsData={prop[propsSection[0]]} />
              : (
                <Tabs
                  panels={propsSection.map(sectionKey => ({
                    trigger : sectionKey,
                    panel   : <RenderPropTable propsData={prop[sectionKey]} />
                  }))}
                />
              )}
          </React.Fragment>
        )}

      </React.Fragment>
    );
  };

  const { propsList } = props;
  
  return (
    <React.Fragment>
      {renderProps(propsList)}
    </React.Fragment>
  );

}

ComponentProps.propTypes = {
  propsList: PropTypes.object
};

export default ComponentProps;
