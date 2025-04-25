<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;

class WeatherController extends Controller
{
    private string $baseUrl = 'https://api.openweathermap.org';
    private string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.openweathermap.key');
    }

    /**
     * Geocode a city name to latitude and longitude.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function geocode(Request $request): JsonResponse
    {
        $city = $request->query('city');
        if (!$city) {
            return response()->json(['error' => 'City name is required'], 400);
        }

        $response = Http::get("{$this->baseUrl}/geo/1.0/direct", [
            'q' => $city,
            'limit' => 1,
            'appid' => $this->apiKey,
        ]);

        if ($response->failed() || empty($response->json())) {
            return response()->json(['error' => 'City not found'], 404);
        }

        $data = $response->json()[0];
        return response()->json([
            'lat' => $data['lat'],
            'lon' => $data['lon'],
            'city' => $data['name'],
        ]);
    }

    /**
     * Get weather data for a given latitude and longitude.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getWeather(Request $request): JsonResponse
    {
        $lat = $request->query('lat');
        $lon = $request->query('lon');
        $units = $request->query('units', 'metric');

        if (!$lat || !$lon) {
            return response()->json(['error' => 'Latitude and longitude are required'], 400);
        }

        $currentWeather = $this->fetchCurrentWeather($lat, $lon, $units);
        if (!$currentWeather) {
            return response()->json(['error' => 'Unable to fetch current weather'], 500);
        }

        $forecast = $this->fetchForecast($lat, $lon, $units);
        if (!$forecast) {
            return response()->json(['error' => 'Unable to fetch forecast'], 500);
        }

        return response()->json([
            'current' => $currentWeather,
            'forecast' => $forecast,
        ]);
    }

    /**
     * Fetch current weather data from OpenWeatherMap.
     *
     * @param float $lat
     * @param float $lon
     * @param string $units
     * @return array|null
     */
    private function fetchCurrentWeather(float $lat, float $lon, string $units): ?array
    {
        $response = Http::get("{$this->baseUrl}/data/2.5/weather", [
            'lat' => $lat,
            'lon' => $lon,
            'units' => $units,
            'appid' => $this->apiKey,
        ]);

        if ($response->failed()) {
            return null;
        }

        $data = $response->json();
        return [
            'temperature' => $data['main']['temp'],
            'description' => $data['weather'][0]['description'],
            'icon' => $data['weather'][0]['icon'],
            'wind_speed' => $data['wind']['speed'] * 3.6, // Convert m/s to km/h
            'humidity' => $data['main']['humidity'],
            'date' => now()->format('d M Y'),
        ];
    }

    /**
     * Fetch 5-day forecast and filter for the next 3 days.
     *
     * @param float $lat
     * @param float $lon
     * @param string $units
     * @return array|null
     */
    private function fetchForecast(float $lat, float $lon, string $units): ?array
    {
        $response = Http::get("{$this->baseUrl}/data/2.5/forecast", [
            'lat' => $lat,
            'lon' => $lon,
            'units' => $units,
            'appid' => $this->apiKey,
        ]);

        if ($response->failed()) {
            return null;
        }

        $forecasts = $response->json()['list'];
        $dailyForecasts = [];
        $currentDay = now()->day;
        $daysAdded = 0;

        foreach ($forecasts as $forecast) {
            $forecastDate = \Carbon\Carbon::createFromTimestamp($forecast['dt']);
            $day = $forecastDate->day;

            if ($day !== $currentDay && !isset($dailyForecasts[$day]) && $daysAdded < 3) {
                $dailyForecasts[$day] = [
                    'date' => $forecastDate->format('d M'),
                    'temperature' => $forecast['main']['temp'],
                    'icon' => $forecast['weather'][0]['icon'],
                ];
                $daysAdded++;
            }

            if ($daysAdded >= 3) {
                break;
            }
        }

        return array_values($dailyForecasts);
    }
}