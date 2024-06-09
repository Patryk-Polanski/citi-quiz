type SettingProps = {
  title: string;
  subtitle?: string;
  children: JSX.Element;
};

export default function Setting({ title, subtitle, children }: SettingProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-8 text-left sm:flex-row sm:gap-2">
      <div className="text-center sm:text-left">
        <h5>{title}</h5>
        <small>{subtitle && subtitle}</small>
      </div>
      {children && children}
    </div>
  );
}
