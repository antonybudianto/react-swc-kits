import '@babel/polyfill'
import 'raf/polyfill'

import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { HelmetProvider } from 'react-helmet-async'
import { UserAgentProvider } from 'react-ua'

import App from '../App'
import 'basscss/css/basscss.css'
// import { HOME_PATH } from '../constant/url'

const renderRoot = (el, container) => {
  const root = createRoot(container)
  root.render(el)
}

const renderHydrateRoot = (el, container) => {
  hydrateRoot(container, el)
}

function renderApp(MyApp) {
  const boot = window.__shell__ ? renderRoot : renderHydrateRoot
  boot(
    <HelmetProvider>
      <UserAgentProvider>
        <BrowserRouter>
          <MyApp />
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
