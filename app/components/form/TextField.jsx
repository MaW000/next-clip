import clsx from "clsx";
import { forwardRef } from "react";
const formClasses = {
  textLeft:
  "min-w-full min-h-[30px] rounded-md px-2 focus:outline-none",
  center: 
  'min-w-full min-h-[30px] rounded-md px-2 focus:outline-none text-center',
  centerNum: 
  'min-w-full min-h-[30px] rounded-md px-2 focus:outline-none text-center '
}
  

const Label = ({ id, children }) => {
  return (
    <label
      htmlFor={id}
      className="text-custom-extralightpurple text-xs font-medium"
    >
      {children}
    </label>
  );
};

const TextField = forwardRef(function TextField({ id, variant = 'textLeft', label, type = "text", className, href, ...props }, ref) {
  const inputClass = clsx(
    formClasses[variant]
  )
  return (
    <div className={className}>
    {label && <Label id={id}>{label}</Label>}
    <input ref={ref} id={id} type={type} {...props} className={inputClass} />
  </div>
  );
});

export default TextField;
