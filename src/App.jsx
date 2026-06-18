import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Home from './pages/Home'
import CardPage from './pages/CardPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-100">
        <Navbar />
        <main className="max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/card/:id" element={<CardPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
