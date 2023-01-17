import clsx from "clsx";
import { forwardRef } from "react";
const formClasses =
  "min-w-full min-h-[30px] rounded-md px-2 focus:outline-none";

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

const TextField = forwardRef(function TextField({ id, label, type = "text", className, href, ...props }, ref) {
  return (
    <div className={className}>
    {label && <Label id={id}>{label}</Label>}
    <input ref={ref} id={id} type={type} {...props} className={formClasses} />
  </div>
  );
});

export default TextField;
