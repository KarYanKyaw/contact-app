import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const FormInput = ({ type, name, label, placeholder = "", ...rest }) => {
  return (
    <div className="flex flex-col gap-3 items-start">
      <Label className=" capitalize text-neutral-700" htmlFor={name}>
        {label}
      </Label>
      <Input
        {...rest}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
