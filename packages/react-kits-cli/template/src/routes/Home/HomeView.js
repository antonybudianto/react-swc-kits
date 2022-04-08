import React, { Component, useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { UserAgent } from 'react-ua'

import { toggleLogin } from '../../reducers/user'
import './HomeView.css'
import TestView from './TestView'
import { ABOUT_PATH } from '../../constant/url'
import HomeHook from './HomeHook'

const HomeView = () => {
  const [text, setText] = useState('')
  const [login, setLogin] = useState(false)

  useEffect(() => {
    fetch('/api/hello')
      .then(r => r.json())
      .then(data => {
        setText(data.text)
      })
      .catch(err => {
        console.error(err)
        setText('Error fetch data')
      })
  }, [])

  return (
    <div className="home-view">
      <div className="my2">home view</div>
      <div>user: {login ? 'loggedIn' : 'notLoggedIn'}</div>
      <div className="my2">
        <button onClick={() => setLogin(l => !l)}>toggle login</button>
        <Link
          style={{
            color: 'white'
          }}
          to={ABOUT_PATH}
        >
          visit About
        </Link>
      </div>
      <TestView />
      <UserAgent>
        {ua => {
          if (ua) {
            return <div>OS: {ua.os.name}</div>
          }
          return null
        }}
      </UserAgent>
      <div>Fetch hello api: {text}</div>
      <HomeHook />
    </div>
  )
}

export default HomeView
