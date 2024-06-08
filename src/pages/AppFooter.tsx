import Button from "src/ui/Button";

export default function AppFooter() {
  return (
    <footer className="mt-20 p-3 text-center">
      <small className="text-sm">
        © Built and maintained by{" "}
        <Button
          el="link"
          href="https://www.linkedin.com/in/patryk-polanski/"
          omitStyles
          classes="inline"
          target="_blank"
        >
          Patryk Polanski.
        </Button>
      </small>
    </footer>
  );
}
