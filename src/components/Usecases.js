import React from 'react'

function Usecases() {
  return (
    <div className='pt-16 px-2'>
        <h1 className='text-[28px] md:text-[50px] font-medium mx-auto text-center my-10 leading-tight'>Technologies & Usecases</h1>
        <div className='relative flex flex-col max-w-5xl mx-auto justify-center space-y-10'> 
        <img src="/images/1.svg" alt="Usecases" />
        <img src="/images/2.svg" alt="Usecases" />
        <img src="/images/3.svg" alt="Usecases" />

        <div className="relative h-fit">

        <img className='' src="/images/4.svg" alt="Usecases" />

        <img className='absolute top-[50%] left-[0%] sm:left-[5%] translate-y-[-50%] size-[50%]  sm:w-[300px]' src="/images/7.svg" alt="Usecases" />

        </div>

       
        <img src="/images/5.svg" alt="Usecases" />
        <img src="/images/6.svg" alt="Usecases" />
        </div>
      
    </div>
  )
}

export default Usecases
