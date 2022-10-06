import { Router, Route, Set } from '@redwoodjs/router'
import HomeLayout from 'src/layouts/HomeLayout'
import HomePage from 'src/pages/HomePage/HomePage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={HomeLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
