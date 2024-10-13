export default function Cross({
  className,
}: {
  className: string | undefined;
}) {
  return (
    <svg
      className={className}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="40" fill="#ffffff" />
      <rect
        width="15.9543"
        height="54.0577"
        rx="7.97717"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 26.7744 15.4934)"
        fill="#D60202"
      />
      <rect
        x="53.7188"
        y="15.4934"
        width="15.9543"
        height="54.0577"
        rx="7.97717"
        transform="rotate(45 53.7188 15.4934)"
        fill="#D60202"
      />
    </svg>
  );
}
