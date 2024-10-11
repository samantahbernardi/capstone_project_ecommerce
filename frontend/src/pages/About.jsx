import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/BoxNewsletter'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text={'LA NOSTRA FILOSOFIA'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>VerdeBio Market nasce dalla volontà di rendere accessibili i migliori prodotti naturali e biologici italiani, selezionati con cura per garantire qualità, sostenibilità e rispetto per l'ambiente. Sosteniamo piccole aziende e produttori locali che operano con etica e passione, promuovendo una filiera corta e trasparente. La nostra missione è quella di contribuire a un mondo più sano e consapevole, dove ogni acquisto è una scelta responsabile per il benessere delle persone e del pianeta. Desideriamo ispirare uno stile di vita in armonia con la natura, attraverso prodotti genuini che celebrano la ricchezza del nostro territorio.</p>
             </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text={'Perché Sceglierci?'}  />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Garanzia di qualità</b>
            <p className=' text-gray-600'>Garantiamo prodotti naturali e biologici italiani di altissima qualità, selezionati con rigorosi standard nel pieno rispetto dell'ambiente e della tradizione agricola locale.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenienza</b>
            <p className=' text-gray-600'>Offriamo prodotti con un perfetto equiilibrio tra qualità e convenienza rendendo la sostenibilità accessibile a tutti..</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Servizio clienti 24H</b>
            <p className=' text-gray-600'>Il nostro serivizio clienti è pronto ad assisterti in ogni momento per garantire la massima soddisfazione.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
