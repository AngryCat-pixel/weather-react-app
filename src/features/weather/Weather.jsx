import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { weatherAPI } from './weatherAPI';
import moment from 'moment';
import Forecast from './Forecast.component';
import Current from './Current.component';
import DatePicker from './datepicker';

export const Weather = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    let [cityName, setCityName] = useState(searchParams.get('cityName'));
    let [forecastDate, setForecastDate] = useState(searchParams.get('forecastDate') || moment().format('YYYY-MM-DD'));

    const {
        data: cityData,
        isLoading,
        error,
    } = weatherAPI.useFetchForecastQuery(
        { cityName, forecastDate },
        {
            skip: forecastDate ? false : true,
        },
    );

    let [historyDate, setHistoryDate] = useState(searchParams.get('historyDate') || false);
    const {
        data: historyWeatherData,
        historyIsLoading,
        historyError,
    } = weatherAPI.useFetchHistoryQuery(
        { cityName, historyDate },
        {
            skip: historyDate ? false : true,
        },
    );

    let [renderWeatherData, setRenderWeatherData] = useState(false);
    useEffect(() => {
        if (cityData) {
            setRenderWeatherData(cityData);
        }
    }, [cityData]);
    useEffect(() => {
        if (historyWeatherData) {
            setRenderWeatherData(historyWeatherData);
        }
    }, [historyWeatherData]);

    let [selectedDate, setSelectedDate] = useState(null);
    useEffect(() => {
        if (selectedDate && selectedDate.isBefore(moment(), 'day')) {
            setHistoryDate(selectedDate.format('YYYY-MM-DD'));
        } else if (selectedDate) {
            setForecastDate(selectedDate.format('YYYY-MM-DD'));
        }
    }, [selectedDate]);

    return (
        <>
            {isLoading || historyIsLoading && <div>Loading...</div>}
            {error || historyError && (
                <div>
                    Город не найден.
                    <button>
                        <a href="/">На главную</a>
                    </button>
                </div>
            )}
            {renderWeatherData && (
                <div>
                    <h1>{renderWeatherData.location.name}</h1>
                    <Forecast selectDay={setSelectedDate} selectedDay={selectedDate} cityName={cityName} />
                    <DatePicker selectDate={setSelectedDate} />
                    <Current
                        weatherData={renderWeatherData.forecast.forecastday[0]}
                        currentWeatherData={cityData.current}
                    />
                </div>
            )}
        </>
    );
};
