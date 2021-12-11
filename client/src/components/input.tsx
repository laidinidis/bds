import { ChangeEvent, ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react'

interface Props {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement> 
  placeholder?: string
  name?: string
  label?: string
  type?: HTMLInputTypeAttribute
}

const Input: FC<Props> = ({ value, onChange, placeholder, name, label, type = 'text' }) => (
  <div>
    {label && (
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-4"
      />
    </div>
  </div>
)

export default Input
