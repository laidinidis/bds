import { useField } from 'formik'
import { FC } from 'react'

type Props = JSX.IntrinsicElements['input'] & {
  label?: string
  name: string
}

const Input: FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name)
  return (
    <div className='mb-4'>
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="my-1 relative rounded-md shadow-sm">
        <input
          {...field}
          {...props}
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      {meta.touched && meta.error ? <div className="block text-sm font-medium text-red-500">{meta.error}</div> : null}
    </div>
  )
}

export default Input
