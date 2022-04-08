import { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ABOUT_PATH, HOME_PATH } from '../constant/url'
import HomeView from './Home/HomeView'

const NotFoundPage = lazy(() => import('./NotFoundPage/NotFoundPage'))
const AboutView = lazy(() => import('./About/AboutView'))

export const getInitialData = req => {
  return []
}

export default function renderAppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path={HOME_PATH} component={HomeView} />
        <Route exact path={ABOUT_PATH} component={AboutView} />
        <Route exact path="**" component={NotFoundPage} />
      </Switch>
    </Suspense>
  )
}
