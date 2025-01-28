import React from 'react'

const Weather = () => {
    return (
        <div className='mx-auto'>
            <div className=''>
                <div className='bg-yellow-300 p-14'>
                    <div className='flex gap-2'>
                        <input type="text" placeholder='Search' className='p-1.5 shadow-md border border-blue-800 rounded' />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 my-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>

                </div>



            </div>


        </div>
    )
}

export default Weather
