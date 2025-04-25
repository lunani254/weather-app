export interface WeatherData {
  current: {
    temperature: number;
    description: string;
    icon: string;
    wind_speed: number;
    humidity: number;
    date: string;
  };
  forecast: {
    date: string;
    temperature: number;
    icon: string;
  }[];
}

export interface GeocodeData {
  lat: number;
  lon: number;
  city: string;
}