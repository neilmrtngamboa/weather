import React, { useEffect, useState } from 'react'
import clearWeather from '../assets/Images/clear.png'
import humidIcon from '../assets/Images/humid.png'
import windIcon from '../assets/Images/wind.png'


const Weather = () => {

    const [weatherData, setWeatherData] = useState(false);

    const findCity = async (city) => {
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                temperature: Math.floor(data.main.temp),
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                location: data.name            
            })
        
        } catch (error){

        }
    }

    useEffect (() => {
        
        findCity('Manila')

    }, [])
    
    return (
        <div className='mx-auto'>
            <div className=''>
                <div className='bg-yellow-300 p-14 rounded-2xl shadow-2xl shadow-yellow-500 mt-16'>
                    <div className='flex gap-2'>
                        <input type="text" placeholder='Search' className='p-1.5 shadow-md border border-blue-800 rounded' />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 my-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <img src={clearWeather} alt="clear" className='mt-10' style={{width:'15rem',height:'15rem'}} />
                    <div className='text-center mt-5'>
                        <p>{weatherData.temperature}°C</p>
                        <p>{weatherData.location}</p>
                    </div>

                    <div className='grid grid-cols-2 mt-7'>

                        <div className='flex gap-2'>
                            <p className='my-auto'>{weatherData.humidity}%</p>
                            <img src={humidIcon} alt="humid" style={{width:'2.5rem', height:'2.5rem'}} />
                        </div>

                        <div className='flex gap-2'>
                            <p className='my-auto'>{weatherData.windSpeed}Km/h</p>
                            <img src={windIcon} alt="wind" style={{width:'2.5rem', height:'2.5rem'}} />
                        </div>

                    </div>
                    

                </div>



            </div>


        </div>
    )
}

export default Weather
