import React from 'react';

const Current = ({ weatherData, currentWeatherData }) => {
    return (
        <div>
            <h2>Текущая погода</h2>

            <div>Температура: {currentWeatherData.temp_c}</div>
            <div>
                Иконка: <img src={currentWeatherData.condition.icon} />
            </div>
            <div>Описание: {currentWeatherData.condition.text}</div>
            <div>Влажность: {currentWeatherData.humidity}</div>
            <div>Облачность: {currentWeatherData.cloud}</div>
            <div>Ветер: {currentWeatherData.wind_kph}</div>
            <div>Направление ветра: {currentWeatherData.wind_dir}</div>

            <h2>Прогноз на день</h2>

            <div>Минимальная температура: {weatherData.day.mintemp_c}</div>
            <div>Максимальная температура: {weatherData.day.maxtemp_c}</div>

            <div>Максимальная скорость ветра: {weatherData.day.maxwind_kph}</div>
            <div>Минимальная скорость ветра: {weatherData.day.minwind_kph}</div>

            <div>Вероятность дождя: {weatherData.day.daily_chance_of_rain}</div>
            <div>Вероятность снега: {weatherData.day.daily_chance_of_snow}</div>

            <div>Общее количество осадков в миллиметрах: {weatherData.day.totalprecip_mm}</div>
            <div>Средняя видимость в километрах: {weatherData.day.avgvis_km}</div>
            <div>Средняя влажность в процентах: {weatherData.day.avghumidity}</div>

            <h2>Прогноз по часам</h2>
            
            {weatherData.hour.map((hour, index) => (
                <div key={hour.time_epoch}>
                    <div>{hour.time}</div>
                    <div>Температура: {hour.temp_c}</div>
                    <div>
                        Иконка текущей погоды: <img src={hour.condition.icon} />
                    </div>
                    <div>Общее сотояние погоды: {hour.condition.text}</div>
                </div>
            ))}
        </div>
    );
};

export default Current;
