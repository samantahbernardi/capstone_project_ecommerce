import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Da più di 5 anni la nostra missione è rendere la vostra vita più sostenibile a partire dai piccoli gesti quotidiani. Apri le porte alla natura!
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>DI PIÙ</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>Condizioni di vendita</li>
                <li>Privacy & Cookie Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>CONTATTACI</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+02 000 111 2233</li>
                <li>info@verdebiomarket.it</li>
            </ul>
        </div>

      </div>

        <div>
            <p className='py-5 text-sm text-center'>Copyright 2024@ verdebiomarket.it - Tutti i diritti riservati.</p>
        </div>

    </div>
  )
}

export default Footer
