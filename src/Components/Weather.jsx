import React, { useEffect, useRef, useState } from 'react'
import clearWeather from '../assets/Images/clear.png'
import humidIcon from '../assets/Images/humid.png'
import windIcon from '../assets/Images/wind.png'
import LwindIcon from '../assets/Images/wind1.png'
import snowIcon from '../assets/Images/snow.png'
import cloudyIcon from '../assets/Images/cloudy.png'
import drizzleIcon from '../assets/Images/drizzle.png'
import rainIcon from '../assets/Images/rain.png'



const Weather = ({darkMode}) => {

    const [weatherData, setWeatherData] = useState(false);
    const weatherRef = useRef();

    const weatherIcons = {
        '01d' : clearWeather,
        '01n' : clearWeather,
        '02d' : cloudyIcon,
        '02n' : cloudyIcon,
        '03d' : cloudyIcon,
        '03n' : cloudyIcon,
        '04d' : drizzleIcon,
        '04n' : drizzleIcon,
        '09d' : rainIcon,
        '09n' : rainIcon,
        '10d' : rainIcon,
        '10n' : rainIcon,
        '13d' : snowIcon,
        '13n' : snowIcon,

    }


    const findCity = async (city) => {

        if (city === '') {
            alert('enter a city name');
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok) {
                alert(data.message);
                return;
            }
            
            console.log(data);
            const icon = weatherIcons[data.weather[0].icon] || clearWeather;
            setWeatherData({
                temperature: Math.floor(data.main.temp),
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                location: data.name,
                icon: icon

            })
        
        } catch (error){
            setWeatherData(false)
            console.error("Can't fetch data!")

        }
    }

    useEffect (() => {
        
        findCity('Madrid')

    }, [])
    
    return (
        <div className='mx-auto'>
            <div className=''>
                <div className='bg-violet-950  lg:p-14 p-8 rounded-2xl shadow-2xl shadow-violet-500 mt-10 mb-5 dark:bg-cyan-100 dark:shadow-cyan-200'>
                    <div className='flex gap-2'>
                        <input type="text" ref={weatherRef} placeholder='Search' className='p-1.5 w-36 lg:w-44  shadow-md border border-slate-200 bg-violet-900 placeholder-gray-400 rounded
                            focus:bg-sky-100 dark:bg-gray-400 dark:placeholder-gray-500 dark:focus:bg-gray-300'/>
                        <button className='flex bg-white rounded-md font-light lg:px-5 px-2 hover:bg-slate-300 transition-all
                            dark:bg-violet-950 dark:text-white dark:hover:bg-violet-900' onClick={() => findCity(weatherRef.current.value).then(weatherRef.current.value = '')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 my-auto">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                            <span className='my-auto ms-1'>Find City</span>
                        </button>
                    </div>

                    {weatherData 
                    ?
                    <div>
                        <img src={weatherData.icon} alt="clear" className='mt-10 lg:h-64 lg:w-72 h-32 w-36 mx-auto'/>
                        <div className='text-center mt-5 text-white'>
                            <p className='text-2xl lg:text-5xl font-extralight dark:text-black'>{weatherData.temperature}°C</p>
                            <p className='text-xl lg:text-3xl mt-2 font-semibold dark:text-black'>{weatherData.location}</p>
                        </div>

                        <div className='grid grid-cols-2 mt-10 text-white'>

                            <div className='flex gap-2'>
                                <p className='my-auto text-md lg:text-2xl font-mono dark:text-black'>{weatherData.humidity}%</p>
                                <img src={humidIcon} alt="humid" className='lg:h-12 lg:w-12 h-8 w-8 my-auto'/>
                            </div>  

                            <div className='flex gap-2'>
                                <p className='my-auto text-md lg:text-2xl font-mono dark:text-black'>{weatherData.windSpeed}Km/h</p>
                                {
                                    darkMode
                                    ?
                                    <img src={windIcon} alt="wind" className='lg:h-12 lg:w-12 h-8 w-8 my-auto' />
                                    :
                                    <img src={LwindIcon} alt="wind" className='lg:h-12 lg:w-12 h-8 w-8 my-auto' />
                                }

                                
                            </div>

                        </div>
                    </div> 
                    :
                    
                    <div>

                        <h1 className='text-center mt-10'>DATA NOT FOUND</h1>

                    </div>
                    
                    }
                        
                </div>


            </div>


        </div>
    )
}

export default Weather
