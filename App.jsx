import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Services from './Services'
import Industries from './Industries'
import Insights from './Insights'
import About from './About'
import Contact from './Contact'

// HashRouter keeps every page working on any static host without server setup.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="industries" element={<Industries />} />
          <Route path="insights" element={<Insights />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
