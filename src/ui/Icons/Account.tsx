export default function Account({
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
      <circle cx="40" cy="40" r="38" stroke="#ffffff" strokeWidth="4" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.6186 64.9674C44.5349 65.2393 53.8846 63.9195 60.3442 56.4622C62.9357 53.6282 62.8042 52.376 58.8283 45.8512C54.4713 38.701 51.9293 39.5523 49.7991 41.0401C46.5336 43.3207 42.4062 43.8349 40.6603 43.8099V43.8085C40.6484 43.8088 40.6365 43.809 40.6244 43.8093C40.6067 43.809 40.5894 43.8086 40.5723 43.8081V43.8102C38.8263 43.8352 34.6989 43.321 31.4335 41.0404C29.3033 39.5526 26.7613 38.7013 22.4042 45.8516C18.4284 52.3763 18.2969 53.6285 20.8884 56.4625C27.3505 63.9228 36.705 65.2407 40.6186 64.9674Z"
        fill="#ffffff"
      />
      <circle cx="40.3963" cy="27.3978" r="12.1268" fill="#ffffff" />
    </svg>
  );
}
