import React from 'react'
import HeroSection from './Components/Hero'
import PopularCategories from './Components/PopularCategories'
import TrendingBlogs from './Components/TrendingBlogs'
import LatestBlog from './Components/LatestBlog'
import FAQAccordion from './Components/FAQAccordion'


function Home() {
  return (
    <div>
      <HeroSection />
      <PopularCategories />
      <TrendingBlogs />
      <LatestBlog />
      <FAQAccordion />
    </div>
  )
}

export default Home