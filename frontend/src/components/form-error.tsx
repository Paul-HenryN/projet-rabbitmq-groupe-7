interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormError({ className, children, ...rest }: FormErrorProps) {
  return (
    <div className={`text-red-500 text-sm ${className}`} {...rest}>
      {children}
    </div>
  );
}
