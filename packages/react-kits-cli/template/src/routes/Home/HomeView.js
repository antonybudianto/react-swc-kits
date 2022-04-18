import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

import { ABOUT_PATH } from '../../constant/url'
import Planets from './Planets'

const HomeView = () => {
  useEffect(() => {
    console.log('hydrated-homeview')
  }, [])

  return (
    <div className="home-view" style={{ marginLeft: '10px' }}>
      <div className="my2">home view</div>
      <Link to={ABOUT_PATH}>link to about</Link>
      <Planets />
    </div>
  )
}

export default HomeView
