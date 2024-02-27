export default function Rocket({
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
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M66.5374 0.288856L67.6272 0.425621C70.5078 0.823097 74.32 1.35734 76.4783 3.51995C78.2476 5.28509 78.9272 8.15717 79.3332 10.7215L79.5725 12.3713C80.111 16.2606 80.2521 21.3551 79.3332 27.0138C77.5211 38.1816 71.5762 51.5077 56.6478 61.825C56.5666 62.6285 56.5623 63.4405 56.5794 64.2526L56.6221 65.4664C56.6905 67.3341 56.7589 69.2018 56.2375 71.0139C55.4255 73.8347 52.5321 75.6939 49.8268 77.0274L48.5019 77.6556L46.7924 78.4078C43.5955 79.767 39.279 81.1603 36.5737 78.4506C34.9496 76.8308 34.2829 74.4545 33.7401 72.091L33.5393 71.2063C33.313 70.0893 33.0276 68.985 32.6845 67.8982C32.4708 67.2742 32.24 66.6374 31.9921 65.9963C31.7193 66.3313 31.4297 66.6522 31.1245 66.958C29.6501 68.4325 27.4491 69.4625 25.637 70.1848C23.6582 70.9669 21.4187 71.6508 19.3459 72.2149L18.2817 72.497L16.2431 73.0056L14.3968 73.433L12.1873 73.9031L10.8068 74.1724C10.1184 74.2999 9.40921 74.2579 8.74055 74.0502C8.07189 73.8425 7.46379 73.4753 6.96869 72.9802C6.4736 72.4851 6.10637 71.877 5.89868 71.2083C5.69099 70.5396 5.64907 69.8304 5.77654 69.142L6.14409 67.2999L6.80226 64.3167L7.33221 62.137L7.73395 60.5984C8.2981 58.5298 8.98191 56.2902 9.76829 54.3157C10.4863 52.4993 11.5163 50.2982 12.9907 48.8237L13.3327 48.4946L13.0591 48.3834C12.3287 48.1057 11.5889 47.8534 10.841 47.627L9.65717 47.2637C6.69114 46.3662 3.51997 45.4002 1.54974 43.4257C-0.843597 41.0366 -0.0358463 37.3994 1.11808 34.3735L1.5882 33.2024L2.34467 31.4929L2.97292 30.1679C4.30635 27.4668 6.16546 24.5734 8.98618 23.7613C10.482 23.3339 12.0377 23.3083 13.6019 23.351L14.5421 23.3809C15.7645 23.4237 16.9825 23.4707 18.1749 23.3553C28.4919 8.42215 41.8176 2.47711 52.9851 0.664961C57.465 -0.0698355 62.0236 -0.196346 66.5374 0.288856ZM24.6027 54.461C23.9301 53.9631 23.1262 53.6734 22.2906 53.6279C21.4549 53.5823 20.6243 53.7828 19.9015 54.2046L19.4314 54.5208L19.0339 54.8756L18.4997 55.5508C17.3885 57.1578 16.756 59.3803 16.2645 61.4574L15.8029 63.4576L15.585 64.368L16.4013 64.1714L18.1877 63.7611C20.658 63.1841 23.3975 62.4362 25.0814 60.9189C25.8135 60.1871 26.2552 59.2145 26.3244 58.1816C26.3935 57.1487 26.0855 56.1258 25.4575 55.303L25.107 54.9012L25.0044 54.8029L24.6027 54.461ZM55.3015 24.6546C54.5079 23.8607 53.5657 23.2308 52.5287 22.8011C51.4917 22.3713 50.3802 22.15 49.2577 22.1498C48.1352 22.1496 47.0236 22.3705 45.9865 22.7999C44.9493 23.2293 44.0069 23.8588 43.213 24.6524C42.4191 25.446 41.7894 26.3883 41.3596 27.4253C40.9298 28.4623 40.7086 29.5738 40.7084 30.6964C40.7082 31.8189 40.9291 32.9305 41.3584 33.9677C41.7878 35.0049 42.4173 35.9473 43.2109 36.7412C44.8136 38.3446 46.9877 39.2456 49.2547 39.246C51.5217 39.2464 53.6961 38.3462 55.2994 36.7434C56.9027 35.1406 57.8037 32.9665 57.8041 30.6994C57.8045 28.4323 56.9043 26.2579 55.3015 24.6546Z"
        fill="#ffffff"
      />
    </svg>
  );
}
