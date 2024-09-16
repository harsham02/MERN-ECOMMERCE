import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import Hero from '../component/Hero'
import NewsLetterBox from '../component/NewsLetterBox'

const Home = ({token}) => {
  return (
    <div>
        <Hero />
       <LatestCollection />
       <BestSeller />
       <OurPolicy />
       <NewsLetterBox />
    </div>
  )
}

export default Home
