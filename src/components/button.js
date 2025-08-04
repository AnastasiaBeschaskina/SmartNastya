import * as React from "react";
import "./button.css"; 

export const Button = React.forwardRef(
  ({ className = "", type = "button", secondary = false, ...props }, ref) => {
    const base = "btn-base";
    const style = secondary ? "btn-secondary" : "btn-primary";
    const allClasses = `${base} ${style} ${className}`;

    return <button type={type} className={allClasses} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";
