interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...rest }: InputProps) {
  return <input className={`border rounded-md p-2 ${className}`} {...rest} />;
}
