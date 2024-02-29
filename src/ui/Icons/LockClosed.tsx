export default function LockClosed({
  className,
}: {
  className: string | undefined;
}) {
  return (
    <svg
      className={className}
      width="74"
      height="80"
      viewBox="0 0 74 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="33.2307"
        width="73.8462"
        height="46.7692"
        rx="6"
        fill="#ffffff"
      />
      <path
        fill-rule="evenodd"
        clipRule="evenodd"
        d="M63.2963 39.8462V27.0385C63.2963 12.1317 51.305 0 36.571 0C21.8369 0 9.8457 12.1317 9.8457 27.0385V39.8462H23.3842V27.0769C23.3842 19.612 29.1816 13.5385 36.3072 13.5385C43.4329 13.5385 49.2303 19.612 49.2303 27.0769V39.8462H63.2963Z"
        fill="#ffffff"
      />
    </svg>
  );
}
