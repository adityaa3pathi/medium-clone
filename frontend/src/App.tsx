import {BrowserRouter, Route, Routes} from 'react-router-dom'


import {Signup} from "./pages/Signup"
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Alternative } from './pages/Alternative'
import { Publish } from './components/Publish'


export default function App() {
return (
  <>
  <BrowserRouter>
  <Routes>
  <Route path='/Signup' element={<Signup />}/>
  <Route path='/Test' element={<Alternative />}/>
  <Route path='/Signin' element={<Signin />}/>
  <Route path='/Blog/:id' element={<Blog />}/>
  <Route path='/Blogs' element={<Blogs />}/>
  <Route path='/Publish' element={<Publish />}/>
  </Routes>
  </BrowserRouter>
  </>
)


}
