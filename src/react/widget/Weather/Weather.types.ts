import { ReactBucketComponentProps } from '../../generic';


export interface WeatherProps extends ReactBucketComponentProps<StrictWeatherProps> {
}

export interface StrictWeatherProps {
  /** Set description Language */
  language?: string;

  /** Set OpenWeatherMap API Key */
  openWeatherMapAPI: string;

  /** Show current humidity */
  showHumidity?: boolean;

  /** Show current temperature */
  showTemperature?: boolean;

  /** Set the update weather interval in ms */
  updateInterval?: number;

  /** Set Units format */
  units?: 'metric' | 'imperial';
}
