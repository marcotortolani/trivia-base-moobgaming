import { lazy, Suspense } from 'preact/compat'
import { Routes, Route } from 'react-router-dom'
const Trivia = lazy(() => import('./pages/Trivia'))
const Category = lazy(() => import('./pages/Category'))
const Question = lazy(() => import('./pages/Question'))
import './sass/app.css'

export function App() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Routes>
        <Route path="/" element={<Trivia />} />
        <Route path="/category/:cat" element={<Category />} />
        <Route path="/question/:cat" element={<Question />} />
      </Routes>
    </Suspense>
  )
}
