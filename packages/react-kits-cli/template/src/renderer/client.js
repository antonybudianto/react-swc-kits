import '@babel/polyfill'
import 'raf/polyfill'

import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { HelmetProvider } from 'react-helmet-async'
import { UserAgentProvider } from 'react-ua'
import { Provider } from 'urql'

import App from '../App'
import 'basscss/css/basscss.css'
// import { HOME_PATH } from '../constant/url'

import createUrqlClient from './createUrqlClient'

const renderRoot = (el, container) => {
  const root = createRoot(container)
  root.render(el)
}

const renderHydrateRoot = (el, container) => {
  hydrateRoot(container, el)
}

const { client } = createUrqlClient()

function renderApp(MyApp) {
  const boot = window.__shell__ ? renderRoot : renderHydrateRoot
  boot(
    <HelmetProvider>
      <UserAgentProvider>
        <BrowserRouter>
          <Provider value={client}>
            <MyApp />
          </Provider>
        </BrowserRouter>
      </UserAgentProvider>
    </HelmetProvider>,
    document.querySelector('#root')
  )
}

renderApp(App)

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register(HOME_PATH + 'service-worker.js')
//       .then(registration => {
//         console.log('SW registered: ', registration.scope)

//         registration.onupdatefound = () => {
//           const installingWorker = registration.installing
//           if (installingWorker == null) {
//             return
//           }
//           installingWorker.onstatechange = () => {
//             switch (installingWorker.state) {
//               case 'installed':
//                 if (navigator.serviceWorker.controller) {
//                   window.location.reload()
//                 }
//                 break
//             }
//           }
//         }
//       })
//       .catch(registrationError => {
//         console.log('SW registration failed: ', registrationError)
//       })
//   })
// }
