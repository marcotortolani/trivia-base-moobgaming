import { lazy, Suspense } from 'preact/compat'
import { Routes, Route } from 'react-router-dom'
import { Loading } from './components/Loading'
const Trivia = lazy(() => import('./pages/Trivia'))
const Category = lazy(() => import('./pages/Category'))
const Question = lazy(() => import('./pages/Question'))

export function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Trivia />} />
        <Route path="/category/:cat" element={<Category />} />
        <Route path="/question/:cat" element={<Question />} />
      </Routes>
    </Suspense>
  )
}
