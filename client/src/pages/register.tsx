import { Link } from "react-router-dom";
import Button from '../components/button'
import Card from '../components/card'
import Input from '../components/input'

const Register = () => (
  <div className="w-96 mx-auto mt-10">
    <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
    <Card>
      <Input name='name' label='Name' type='text' />
      <Input name='email' label='Email' type='email' />
      <Input name='password' label='Password' type='password' />
      <Input name='confirm-password' label='Confirm password' type='password' />
      <Button>Register</Button>
    </Card>
      <div className="text-center mt-4">Already registered? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link></div>
  </div>
)

export default Register
