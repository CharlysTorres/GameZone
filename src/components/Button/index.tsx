import { ButtonHTMLAttributes } from 'react'

// import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean,
  title?: string,
  color?: string,
  textColor?: string,
  disabled?: boolean,
}

export function Button({isOutlined = false, title, color, textColor, disabled, ...props}: ButtonProps) {
  return (
    <button 
      className={`h-12 font-semibold flex justify-center cursor-pointer border-0 px-8 py-0 border-x-8 border-y-8 items-center hover:opacity-95 ${disabled ? 'cursor-not-allowed bg-gray-100 text-gray-300' : ''} ${color} ${textColor} ${isOutlined ? 'bg-white border-x border-y border-solid border-violet-600' : ''}`}
      disabled={disabled}
      {...props} 
    >{title}</button>
  );
}
