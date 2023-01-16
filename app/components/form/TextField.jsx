import clsx from 'clsx'

const formClasses =
  'min-w-full min-h-[30px] rounded-md px-2 focus:outline-none'

const Label = ({ id, children }) => {
  return (
    <label
      htmlFor={id}
      className='text-xs font-medium text-custom-extralightpurple'
    >
      {children}
    </label>
  )
}

const TextField = ({ id, label, type = 'text', className, ...props }) => {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  )
}

export default TextField
