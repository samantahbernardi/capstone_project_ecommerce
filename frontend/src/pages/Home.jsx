import React from 'react'
import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller'
import Novita from '../components/Novita'
import BoxNewsletter from '../components/BoxNewsletter'
import Vantaggi from '../components/Vantaggi'

const Home = () => {
  return (
    <div>
      <Hero />
      <Novita/>
      <BestSeller/>
      <Vantaggi/>
      <BoxNewsletter/>
    </div>
  )
}

export default Home
