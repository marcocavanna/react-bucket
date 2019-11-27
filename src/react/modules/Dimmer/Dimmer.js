import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import {
  createShorthandFactory,
  getUnhandledProps,
  isBrowser
} from '../../lib';

import Loader from '../../elements/Loader';
import Portal from '../../addons/Portal';
import DimmerDimmable from './DimmerDimmable';
import DimmerInner from './DimmerInner';

/**
 * A dimmer hides distractions to focus attention on particular content.
 */
export default class Dimmer extends PureComponent {
  static propTypes = {
    /** An active dimmer will dim its parent container. */
    active: PropTypes.bool,

    /** Dimmer Inner Content Shorthand */
    content: PropTypes.node,

    /** Append Loader inside Dimmer */
    loading: PropTypes.bool,

    /** A dimmer can be formatted to be fixed to the page. */
    page: PropTypes.bool
  }

  static Dimmable = DimmerDimmable

  static Inner = DimmerInner

  handlePortalMount = () => {
    if (!isBrowser()) return;

    // Heads up, IE doesn't support second argument in add()
    document.body.classList.add('dimmed');
    document.body.classList.add('dimmable');
  }

  handlePortalUnmount = () => {
    if (!isBrowser()) return;

    // Heads up, IE doesn't support second argument in remove()
    document.body.classList.remove('dimmed');
    document.body.classList.remove('dimmable');
  }

  render() {

    const { active, content, loading, page } = this.props;

    const rest = getUnhandledProps(Dimmer, this.props);

    const innerContent = loading && _.isNil(content) ? <Loader active inverted size='big' /> : content;

    if (page) {
      return (
        <Portal
          closeOnEscape={false}
          closeOnDocumentClick={false}
          open={active}
          openOnTriggerClick={false}
          onMount={this.handlePortalMount}
          onUnmount={this.handlePortalUnmount}
        >
          <DimmerInner {...rest} active={active} page={page} content={innerContent} />
        </Portal>
      );
    }

    return <DimmerInner {...rest} active={active} page={page} />;
  }
}

Dimmer.create = createShorthandFactory(Dimmer, value => ({ content: value }));
