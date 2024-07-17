import { useContext } from 'preact/hooks'
import { ConfigContext } from './ConfigProvider'
import { lazy, Suspense } from 'preact/compat'
import { Routes, Route } from 'react-router-dom'
import { Loading } from './components/Loading'
import Upcoming from './components/Upcoming'
import Ended from './components/Ended'
const Trivia = lazy(() => import('./pages/Trivia'))
const Category = lazy(() => import('./pages/Category'))
const Question = lazy(() => import('./pages/Question'))

export function App() {
  const { validPeriod } = useContext(ConfigContext)
  const actualDate = new Date().getTime()
  const startDate = new Date(validPeriod.startDate).getTime()
  const endDate = new Date(validPeriod.endDate).getTime()

  if (actualDate < startDate) {
    return <Upcoming />
  }

  if (actualDate > endDate) {
    return <Ended />
  }

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
