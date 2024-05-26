import Setting from "src/features/settings/Setting";

export default function SettingsPage() {
  return (
    <section>
      <h2 className="mb-6 mt-6 text-center">Settings</h2>
      <small className="block text-center">
        Changes are saved automatically
      </small>
      <div className="mt-14 flex flex-col gap-12">
        <Setting title="Font size">
          <p>Font</p>
        </Setting>
        <Setting title="Background">
          <p>Background</p>
        </Setting>
        <Setting title="Reset app*" subtitle="*This will delete all data">
          <p>Data</p>
        </Setting>
      </div>
    </section>
  );
}
