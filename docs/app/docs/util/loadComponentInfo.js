import React from 'react';

import { isObject } from '@appbuckets/rabbit';

import { Label } from '../../../../src/react';

export default function loadComponentInfo(src) {

  /** Assert source is an Object */
  if (!isObject(src) || !Array.isArray(src.props)) {
    return {};
  }

  return src.props.reduce((props, prop) => {
    props[prop.name] = {
      type         : prop.type,
      comment      : (
        <React.Fragment>
          {prop.description.map(desc => <div key={desc}>{desc}</div>)}
          {prop.value && prop.value.length > 0 && (
            <Label.Group
              content={prop.value.map(value => <Label key={value} content={value} />)}
            />
          )}
        </React.Fragment>
      ),
      required     : prop.required,
      defaultValue : prop.defaultValue || null
    };

    return props;
  }, {});

}
