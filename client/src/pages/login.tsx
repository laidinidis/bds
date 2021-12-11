import { Link, Navigate, useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Button from '../components/button'
import Card from '../components/card'
import Input from '../components/input'
import { useAuth } from '../hooks/auth'

const Login = () => {
  const location = useLocation()
  const { user, error, login } = useAuth()

  if (user) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return (
    <div className="w-96 mx-auto mt-10">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <Card>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              .required('Required')
              .min(8, 'Password should be 8 chars minimum.')
              .matches(
                /^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u,
                'Password must contain one uppercase letter, one lowercase letter, and one digit'
              )
          })}
          onSubmit={({ email, password }) => {
            login(email, password)
          }}
        >
          <Form>
            <Input name="email" label="Email" type="email" />
            <Input name="password" label="Password" type="password" />
            <Button type="submit">Login</Button>
            {error && <div className="block text-sm font-medium text-red-500 mt-1">{error}</div>}
          </Form>
        </Formik>
      </Card>
      <div className="text-center mt-4">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login
