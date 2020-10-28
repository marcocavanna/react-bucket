import * as React from 'react';
import clsx from 'clsx';

import {
  simpleFetch,
  useElementType,
  useSharedClassName
} from '../../lib';

import { WeatherProps } from './Weather.types';

import * as Icons from './icons';
import { Loader } from '../../elements/Loader';
import { Header } from '../../elements/Header';
import { Icon } from '../../elements/Icon';


/* --------
 * Declare Internal Using Interfaces
 * -------- */
interface WeatherResponse {
  /** Temps and Humidity */
  main: { temp: number, humidity: number };

  /** System Information */
  sys: { sunrise: number, sunset: number };

  /** Current Eligible Weather */
  weather: { id: number, main: string, description: string }[];
}

interface IPAPIResponse {
  city: string;

  countryCode: string;
}

interface WeatherState {
  /** Current User City */
  city: string | null;

  /** Current User Country */
  countryCode: string | null;

  /** Request Error */
  error: boolean;

  /** Check if current time is night or day */
  isNight: boolean;

  /** Current Humidity */
  humidity: number | null;

  /** Request State */
  loading: boolean;

  /** Current Temperature */
  temperature: number | null;

  /** Current Weather Condition */
  weather: { id: number, main: string, description: string } | null;
}


/* --------
 * Component Declaration
 * -------- */
type WeatherComponent = React.FunctionComponent<WeatherProps>;

/* --------
 * Component Render
 * -------- */
const Weather: WeatherComponent = (props) => {

  const {
    className,
    rest: {
      language,
      openWeatherMapAPI,
      showHumidity,
      showTemperature,
      updateInterval,
      units,
      ...rest
    }
  } = useSharedClassName(props);

  /** Get render element type */
  const ElementType = useElementType(Weather, props);

  /** Build a State Container for fetch request */
  const [ state, setState ] = React.useState<WeatherState>({
    city       : null,
    countryCode: null,
    error      : false,
    humidity   : null,
    isNight    : true,
    loading    : true,
    temperature: null,
    weather    : null
  });

  /** Build a Reload Time State to refresh weather */
  const [ reloadTime, setReloadTime ] = React.useState<number>(Date.now());

  /** Set the Interval to reload Weather condition */
  React.useEffect(
    () => {
      /** If updated interval is 0, return */
      if (updateInterval === 0 || typeof updateInterval !== 'number') {
        return () => null;
      }

      /** Create a new Interval */
      const reloadInterval = setTimeout(() => {
        setReloadTime(Date.now());
      }, updateInterval);

      /** Delete the timer on unmount */
      return () => {
        clearTimeout(reloadInterval);
      };
    },
    [ reloadTime, updateInterval ]
  );

  /** Fetch Weather Condition each time reloadTime change */
  React.useEffect(
    () => {
      (async () => {
        try {
          /** Get User Location */
          const location = await simpleFetch<IPAPIResponse>('http://ip-api.com/json?fields=countryCode,city');

          /** Get Current Weather */
          const weather = await simpleFetch<WeatherResponse>(
            `https://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.countryCode}&appid=${openWeatherMapAPI}&lang=${language}&units=${units}`
          );

          const now = Date.now();

          setState({
            city       : location.city,
            countryCode: location.countryCode,
            error      : false,
            humidity   : weather.main.humidity,
            isNight    : now < weather.sys.sunrise * 1000 || now > weather.sys.sunset * 1000,
            loading    : false,
            temperature: weather.main.temp,
            weather    : weather.weather[0]
          });
        }
        catch (e) {
          setState((currState) => ({
            ...currState,
            loading: false,
            error  : true
          }));
        }
      })();
    },
    [ language, openWeatherMapAPI, reloadTime, units ]
  );

  /** Build Component Classes */
  const classes = clsx(
    { loading: state.loading },
    'weather',
    'widget',
    className
  );

  /** If Component is currently Loading show loaders */
  if (state.loading) {
    return (
      <ElementType {...rest} className={classes}>
        <Loader primary type={'indeterminate bar'} />
      </ElementType>
    );
  }

  /** If an Error occurred, show it */
  if (state.error || !state.weather) {
    return (
      <ElementType {...rest} className={classes}>
        <Icon name={'times circle'} danger size={'big'} iconStyle={'regular'} />
      </ElementType>
    );
  }

  /** Build Weather Icon */
  let iconElement: React.ReactElement | null = null;
  const { id } = state.weather;

  if (id >= 200 && id <= 232) {
    iconElement = <Icons.Thunderstorm />;
  }
  else if ((id >= 300 && id <= 501) || id === 520) {
    iconElement = <Icons.LightRain />;
  }
  else if (id === 502 || id === 503 || id === 504 || id === 521) {
    iconElement = <Icons.HeavyRain />;
  }
  else if (id === 511) {
    iconElement = <Icons.Hail />;
  }
  else if (id >= 600 && id <= 613) {
    iconElement = <Icons.Snow />;
  }
  else if (id >= 615 && id <= 622) {
    iconElement = <Icons.Snow />;
  }
  else if (id >= 700 && id <= 771) {
    iconElement = <Icons.Fog />;
  }
  else if (id === 781) {
    iconElement = <Icons.Tornado />;
  }
  else if (id === 800) {
    iconElement = state.isNight ? <Icons.ClearNight /> : <Icons.ClearDay />;
  }
  else if (id === 801 || id === 802) {
    iconElement = state.isNight ? <Icons.LightCloudyNight /> : <Icons.LightCloudyDay />;
  }
  else if (id === 803) {
    iconElement = state.isNight ? <Icons.CloudyNight /> : <Icons.CloudyDay />;
  }
  else if (id === 804) {
    iconElement = <Icons.HeavyCloud />;
  }

  /** Return the Component */
  return (
    <ElementType {...rest} className={classes}>
      <Header
        content={(
          <div className={'widget-content'}>
            {iconElement && (
              <div className={'addon weather'} title={state.weather.description}>
                {iconElement}
              </div>
            )}
            {showTemperature && state.temperature != null && (
              <div className={'addon temperature'}>
                <div className={'data'}>
                  {state.temperature.toFixed()}°
                </div>
                <Icons.Temperature />
              </div>
            )}
            {showHumidity && state.humidity != null && (
              <div className={'addon humidity'}>
                <div className={'data'}>
                  {state.humidity.toFixed()}
                </div>
                <Icons.Humidity />
              </div>
            )}
          </div>
        )}
        subheader={state.city}
      />
    </ElementType>
  );

};


/** Properly Set Display Name */
Weather.displayName = 'WeatherWidget';

/** Set default props */
Weather.defaultProps = {
  language      : 'en',
  updateInterval: 600000,
  units         : 'metric'
};

export default Weather;
