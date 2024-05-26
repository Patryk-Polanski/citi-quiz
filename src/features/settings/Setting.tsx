type SettingProps = {
  title: string;
  subtitle?: string;
  children: JSX.Element;
};

export default function Setting({ title, subtitle, children }: SettingProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h5>{title}</h5>
        <small>{subtitle && subtitle}</small>
      </div>
      {children && children}
    </div>
  );
}
