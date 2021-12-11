import { Link, Navigate, useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Button from '../components/button'
import Card from '../components/card'
import Input from '../components/input'
import { useAuth } from '../hooks/auth'

const Register = () => {
  const location = useLocation()
  const { user, error, register } = useAuth()

  if (user) {
    return <Navigate to="/" state={{ from: location }} />
  }
  
  return (
    <div className="w-96 mx-auto mt-10">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Register
      </h2>
      <Card>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Required')
              .min(5, 'Password should be 5 chars minimum.'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              .required('Required')
              .min(8, 'Password should be 8 chars minimum.')
              .matches(
                /^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u,
                'Password must contain one uppercase letter, one lowercase letter, and one digit'
              ),
            passwordConfirmation: Yup.string()
              .required('Required')
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
          })}
          onSubmit={({ name, email, password }) => {
            register(name, email, password)
          }}
        >
          <Form>
            <Input name="name" label="Name" type="text" />
            <Input name="email" label="Email" type="email" />
            <Input name="password" label="Password" type="password" />
            <Input
              name="passwordConfirmation"
              label="Password confirmation"
              type="password"
            />
            <Button type="submit">Register</Button>
            {error && <div className="block text-sm font-medium text-red-500 mt-1">{error}</div>}
          </Form>
        </Formik>
      </Card>
      <div className="text-center mt-4">
        Already registered?{' '}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default Register
