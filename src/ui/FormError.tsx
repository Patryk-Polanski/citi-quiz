type FormErrorProps = {
  error: string;
};

export default function FormError({ error }: FormErrorProps) {
  return <small className="mt-1 text-sm font-bold text-red-900">{error}</small>;
}
