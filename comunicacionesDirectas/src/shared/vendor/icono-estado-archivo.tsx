import type { SVGProps } from 'react';

export function IconoAdjunto(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12.5l4.5-4.5a3 3 0 114.24 4.24l-6.1 6.1a5 5 0 11-7.07-7.07l6.66-6.66"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default IconoAdjunto;