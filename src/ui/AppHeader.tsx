import Logo from "./Logo";

export default function AppHeader() {
  return (
    <header className="grid grid-cols-6 px-4 py-6">
      <div></div>
      <div className="col-span-4 justify-self-center">
        <Logo />
      </div>
      <div></div>
    </header>
  );
}
