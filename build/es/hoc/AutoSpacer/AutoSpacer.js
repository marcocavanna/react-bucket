'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

var AutoSpacer = /** @class */ (function (_super) {
  _tslib.__extends(AutoSpacer, _super);
  function AutoSpacer() {
    var _a, _b;
    var _this = _super.apply(this, arguments) || this;
    /* --------
     * Define initial State
     * -------- */
    _this.state = {
      height: _this.computeHeight(
        (_a = _this.props.defaultHeight) !== null && _a !== void 0 ? _a : 0
      ),
      width: _this.computeWidth(
        (_b = _this.props.defaultWidth) !== null && _b !== void 0 ? _b : 0
      ),
    };
    /* --------
     * Define the isMounted state to avoid unnecessary re render
     * -------- */
    _this.isComponentMounted = false;
    /* --------
     * Initialize Ref Containers
     * -------- */
    _this.containerRef = React.createRef();
    _this.parentNode = undefined;
    return _this;
  }
  /* --------
   * Component LifeCycle Handlers
   * -------- */
  AutoSpacer.prototype.componentDidMount = function () {
    var _a;
    this.isComponentMounted = true;
    this.parentNode =
      (_a = this.containerRef.current) === null || _a === void 0
        ? void 0
        : _a.parentNode;
    window.addEventListener('resize', this.recomputeSizing.bind(this));
    this.recomputeSizing();
  };
  AutoSpacer.prototype.componentWillUnmount = function () {
    this.isComponentMounted = false;
    this.parentNode = undefined;
    window.removeEventListener('resize', this.recomputeSizing.bind(this));
  };
  /* --------
   * Get valid data
   * -------- */
  AutoSpacer.prototype.computeHeight = function (initialHeight) {
    var _a = this.props,
      _b = _a.subtractHeight,
      subtractHeight = _b === void 0 ? 0 : _b,
      maximumHeight = _a.maximumHeight,
      _c = _a.minimumHeight,
      minimumHeight = _c === void 0 ? 0 : _c;
    var subtractedHeight = initialHeight - subtractHeight;
    if (subtractedHeight < minimumHeight) {
      return minimumHeight;
    }
    if (typeof maximumHeight === 'number' && subtractedHeight > maximumHeight) {
      return maximumHeight;
    }
    return subtractedHeight;
  };
  AutoSpacer.prototype.computeWidth = function (initialWidth) {
    var _a = this.props,
      _b = _a.subtractWidth,
      subtractWidth = _b === void 0 ? 0 : _b,
      maximumWidth = _a.maximumWidth,
      _c = _a.minimumWidth,
      minimumWidth = _c === void 0 ? 0 : _c;
    var subtractedWidth = initialWidth - subtractWidth;
    if (subtractedWidth < minimumWidth) {
      return minimumWidth;
    }
    if (typeof maximumWidth === 'number' && subtractedWidth > maximumWidth) {
      return maximumWidth;
    }
    return subtractedWidth;
  };
  /* --------
   * Resize Callback Function
   * -------- */
  AutoSpacer.prototype.recomputeSizing = function () {
    /** Avoid recomputing if no node, or if component is not mounted */
    var container = this.containerRef.current;
    if (!container || !this.parentNode) {
      return;
    }
    /** Get props */
    var _a = this.props,
      disableHeight = _a.disableHeight,
      disableWidth = _a.disableWidth,
      onResize = _a.onResize;
    /** Get current state and container ref */
    var _b = this.state,
      currHeight = _b.height,
      currWidth = _b.width;
    /** Get current window dimension */
    var windowHeight = window.innerHeight,
      windowWidth = window.innerWidth;
    /** Get Container offset Position */
    var _c = container.getBoundingClientRect(),
      containerTopPosition = _c.top,
      containerLeftPosition = _c.left;
    /** Get new Size */
    var nextHeight = disableHeight
      ? container.clientHeight
      : this.computeHeight(windowHeight - containerTopPosition);
    var nextWidth = disableWidth
      ? container.clientWidth
      : this.computeWidth(windowWidth - containerLeftPosition);
    /** Check if must update state */
    if (
      this.isComponentMounted &&
      (nextHeight !== currHeight || nextWidth !== currWidth)
    ) {
      this.setState(
        {
          height: nextHeight,
          width: nextWidth,
        },
        function () {
          if (typeof onResize === 'function') {
            onResize({ height: nextHeight, width: nextWidth });
          }
        }
      );
    }
  };
  /* --------
   * Component Render
   * -------- */
  AutoSpacer.prototype.renderChildren = function () {
    var _a = this.props,
      children = _a.children,
      renderIfInvisible = _a.renderIfInvisible;
    var _b = this.state,
      height = _b.height,
      width = _b.width;
    if ((height === 0 || width === 0) && !renderIfInvisible) {
      return null;
    }
    if (typeof children === 'function') {
      return children({ height: height, width: width });
    }
    return children !== null && children !== void 0 ? children : null;
  };
  AutoSpacer.prototype.render = function () {
    var _a = this.props,
      className = _a.className,
      children = _a.children,
      disableHeight = _a.disableHeight,
      disableWidth = _a.disableWidth,
      style = _a.style;
    var _b = this.state,
      height = _b.height,
      width = _b.width;
    var classes = clsx__default['default'](
      {
        'disabled-height': disableHeight,
        'disabled-width': disableWidth,
      },
      'autospacer',
      className
    );
    var divStyle =
      typeof children !== 'function'
        ? _tslib.__assign(_tslib.__assign({}, style), {
            height: height,
            width: width,
          })
        : _tslib.__assign({}, style);
    return React.createElement(
      'div',
      { ref: this.containerRef, className: classes, style: divStyle },
      this.renderChildren()
    );
  };
  return AutoSpacer;
})(React.Component);

module.exports = AutoSpacer;
//# sourceMappingURL=AutoSpacer.js.map
