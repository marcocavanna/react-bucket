'use strict';

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var clsx = require('clsx');
require('@appbuckets/react-ui-core');
var customHook = require('../../lib/customHook.js');
require('tiny-invariant');
var simpleFetch = require('../../lib/simpleFetch.js');
var Icon = require('../../elements/Icon/Icon.js');
var Header = require('../../elements/Header/Header.js');
var Loader = require('../../elements/Loader/Loader.js');
var ClearDay = require('./icons/ClearDay.js');
var ClearNight = require('./icons/ClearNight.js');
var CloudyDay = require('./icons/CloudyDay.js');
var CloudyNight = require('./icons/CloudyNight.js');
var Fog = require('./icons/Fog.js');
var Hail = require('./icons/Hail.js');
var HeavyCloud = require('./icons/HeavyCloud.js');
var HeavyRain = require('./icons/HeavyRain.js');
var Humidity = require('./icons/Humidity.js');
var LightCloudyDay = require('./icons/LightCloudyDay.js');
var LightCloudyNight = require('./icons/LightCloudyNight.js');
var LightRain = require('./icons/LightRain.js');
require('./icons/RainySnow.js');
var Snow = require('./icons/Snow.js');
var Temperature = require('./icons/Temperature.js');
var Thunderstorm = require('./icons/Thunderstorm.js');
var Tornado = require('./icons/Tornado.js');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var clsx__default = /*#__PURE__*/ _interopDefaultLegacy(clsx);

/* --------
 * Component Render
 * -------- */
var Weather = function (props) {
  var _a = customHook.useSharedClassName(props),
    className = _a.className,
    _b = _a.rest,
    language = _b.language,
    openWeatherMapAPI = _b.openWeatherMapAPI,
    showHumidity = _b.showHumidity,
    showTemperature = _b.showTemperature,
    updateInterval = _b.updateInterval,
    units = _b.units,
    rest = _tslib.__rest(_b, [
      'language',
      'openWeatherMapAPI',
      'showHumidity',
      'showTemperature',
      'updateInterval',
      'units',
    ]);
  /** Get render element type */
  var ElementType = customHook.useElementType(Weather, props);
  /** Build a State Container for fetch request */
  var _c = React.useState({
      city: null,
      countryCode: null,
      error: false,
      humidity: null,
      isNight: true,
      loading: true,
      temperature: null,
      weather: null,
    }),
    state = _c[0],
    setState = _c[1];
  /** Build a Reload Time State to refresh weather */
  var _d = React.useState(Date.now()),
    reloadTime = _d[0],
    setReloadTime = _d[1];
  /** Set the Interval to reload Weather condition */
  React.useEffect(
    function () {
      /** If updated interval is 0, return */
      if (updateInterval === 0 || typeof updateInterval !== 'number') {
        return function () {
          return null;
        };
      }
      /** Create a new Interval */
      var reloadInterval = setTimeout(function () {
        setReloadTime(Date.now());
      }, updateInterval);
      /** Delete the timer on unmount */
      return function () {
        clearTimeout(reloadInterval);
      };
    },
    [reloadTime, updateInterval]
  );
  /** Fetch Weather Condition each time reloadTime change */
  React.useEffect(
    function () {
      (function () {
        return _tslib.__awaiter(void 0, void 0, void 0, function () {
          var location_1, weather, now, e_1;
          return _tslib.__generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 3, , 4]);
                return [
                  4 /*yield*/,
                  simpleFetch('http://ip-api.com/json?fields=countryCode,city'),
                ];
              case 1:
                location_1 = _a.sent();
                return [
                  4 /*yield*/,
                  simpleFetch(
                    'https://api.openweathermap.org/data/2.5/weather?q=' +
                      location_1.city +
                      ',' +
                      location_1.countryCode +
                      '&appid=' +
                      openWeatherMapAPI +
                      '&lang=' +
                      language +
                      '&units=' +
                      units
                  ),
                ];
              case 2:
                weather = _a.sent();
                now = Date.now();
                setState({
                  city: location_1.city,
                  countryCode: location_1.countryCode,
                  error: false,
                  humidity: weather.main.humidity,
                  isNight:
                    now < weather.sys.sunrise * 1000 ||
                    now > weather.sys.sunset * 1000,
                  loading: false,
                  temperature: weather.main.temp,
                  weather: weather.weather[0],
                });
                return [3 /*break*/, 4];
              case 3:
                e_1 = _a.sent();
                setState(function (currState) {
                  return _tslib.__assign(_tslib.__assign({}, currState), {
                    loading: false,
                    error: true,
                  });
                });
                return [3 /*break*/, 4];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      })();
    },
    [language, openWeatherMapAPI, reloadTime, units]
  );
  /** Build Component Classes */
  var classes = clsx__default['default'](
    { loading: state.loading },
    'weather',
    'widget',
    className
  );
  /** If Component is currently Loading show loaders */
  if (state.loading) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      React.createElement(Loader, { primary: true, type: 'indeterminate bar' })
    );
  }
  /** If an Error occurred, show it */
  if (state.error || !state.weather) {
    return React.createElement(
      ElementType,
      _tslib.__assign({}, rest, { className: classes }),
      React.createElement(Icon, {
        name: 'times circle',
        danger: true,
        size: 'big',
        iconStyle: 'regular',
      })
    );
  }
  /** Build Weather Icon */
  var iconElement = null;
  var id = state.weather.id;
  if (id >= 200 && id <= 232) {
    iconElement = React.createElement(Thunderstorm, null);
  } else if ((id >= 300 && id <= 501) || id === 520) {
    iconElement = React.createElement(LightRain, null);
  } else if (id === 502 || id === 503 || id === 504 || id === 521) {
    iconElement = React.createElement(HeavyRain, null);
  } else if (id === 511) {
    iconElement = React.createElement(Hail, null);
  } else if (id >= 600 && id <= 613) {
    iconElement = React.createElement(Snow, null);
  } else if (id >= 615 && id <= 622) {
    iconElement = React.createElement(Snow, null);
  } else if (id >= 700 && id <= 771) {
    iconElement = React.createElement(Fog, null);
  } else if (id === 781) {
    iconElement = React.createElement(Tornado, null);
  } else if (id === 800) {
    iconElement = state.isNight
      ? React.createElement(ClearNight, null)
      : React.createElement(ClearDay, null);
  } else if (id === 801 || id === 802) {
    iconElement = state.isNight
      ? React.createElement(LightCloudyNight, null)
      : React.createElement(LightCloudyDay, null);
  } else if (id === 803) {
    iconElement = state.isNight
      ? React.createElement(CloudyNight, null)
      : React.createElement(CloudyDay, null);
  } else if (id === 804) {
    iconElement = React.createElement(HeavyCloud, null);
  }
  /** Return the Component */
  return React.createElement(
    ElementType,
    _tslib.__assign({}, rest, { className: classes }),
    React.createElement(Header, {
      content: React.createElement(
        'div',
        { className: 'widget-content' },
        iconElement &&
          React.createElement(
            'div',
            { className: 'addon weather', title: state.weather.description },
            iconElement
          ),
        showTemperature &&
          state.temperature != null &&
          React.createElement(
            'div',
            { className: 'addon temperature' },
            React.createElement(
              'div',
              { className: 'data' },
              state.temperature.toFixed(),
              '\u00B0'
            ),
            React.createElement(Temperature, null)
          ),
        showHumidity &&
          state.humidity != null &&
          React.createElement(
            'div',
            { className: 'addon humidity' },
            React.createElement(
              'div',
              { className: 'data' },
              state.humidity.toFixed()
            ),
            React.createElement(Humidity, null)
          )
      ),
      subheader: state.city,
    })
  );
};
/** Properly Set Display Name */
Weather.displayName = 'WeatherWidget';
/** Set default props */
Weather.defaultProps = {
  language: 'en',
  updateInterval: 600000,
  units: 'metric',
};

module.exports = Weather;
//# sourceMappingURL=Weather.js.map
