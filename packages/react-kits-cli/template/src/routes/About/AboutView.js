import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HOME_PATH } from '../../constant/url'

const AboutView = () => {
  useEffect(() => {
    console.log('useEffect-called-hydrated')
  }, [])

  return (
    <div>
      <div>About view....</div>
      <Link to={HOME_PATH}>Back to home</Link>
    </div>
  )
}

export default AboutView
