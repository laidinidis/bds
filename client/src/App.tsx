import { Link } from 'react-router-dom'
import { useAuth } from './hooks/auth'

function App() {
  const { user } = useAuth()
  return (
    <div className="mt-10">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Welcome {user?.name}
      </h2>
      <div className="text-center mt-4">
        <span>Click&nbsp;</span>
        <Link
          to="/logout"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          here
        </Link>
        <span>&nbsp;to logout</span>
      </div>
    </div>
  )
}

export default App
