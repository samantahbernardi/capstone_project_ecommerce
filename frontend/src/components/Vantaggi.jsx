import React from 'react'
import { assets } from '../assets/assets'

const Vantaggi = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Spedizione gratuita</p>
        <p className=' text-gray-400'> a partire da €29,99</p>
      </div>
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Campioncini</p>
        <p className=' text-gray-400'>In omaggio con ogni ordine</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Consegna rapida</p>
        <p className=' text-gray-400'>Consegna in 1-3 giorni lavorativi</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Assistenza clienti</p>
        <p className=' text-gray-400'>Disponibile 24/7</p>
      </div>

    </div>
  )
}

export default Vantaggi
