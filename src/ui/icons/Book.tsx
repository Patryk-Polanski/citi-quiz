export default function Book({ className }: { className: string | undefined }) {
  return (
    <svg
      className={className}
      width="80"
      height="82"
      viewBox="0 0 80 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M67.875 9.11111H77V82H17.6875C10.1138 82 4 75.8956 4 68.3333V13.6667C4 6.10444 10.1138 0 17.6875 0H58.75V63.7778H17.6875C15.1781 63.7778 13.125 65.8278 13.125 68.3333C13.125 70.8389 15.1781 72.8889 17.6875 72.8889H67.875V9.11111Z"
        fill="#ffffff"
      />
    </svg>
  );
}
