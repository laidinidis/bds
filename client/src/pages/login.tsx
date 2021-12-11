import { Link } from 'react-router-dom'
import Button from '../components/button'
import Card from '../components/card'
import Input from '../components/input'

const Login = () => (
  <div className="w-96 mx-auto mt-10">
    <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
    <Card>
      <Input name='email' label='Email' type='email' />
      <Input name='password' label='Password' type='password' />
      <Button>Login</Button>
    </Card>
    <div className="text-center mt-4">Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link></div>
  </div>
)

export default Login
