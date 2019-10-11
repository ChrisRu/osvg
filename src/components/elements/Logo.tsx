import React from 'react'

interface IProps {
  fill?: string
}

export function Logo({ fill }: IProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="100"
        height="100"
      >
        <circle cx="50" cy="50" r="46.5909" stroke="black" strokeWidth="6.81818" />
        <rect
          x="43.4091"
          y="60.2273"
          width="6.81818"
          height="20.4545"
          rx="3.40909"
          transform="rotate(-180 43.4091 60.2273)"
          fill="black"
        />
        <rect
          x="22.9546"
          y="46.5911"
          width="6.81818"
          height="20.4545"
          rx="3.40909"
          transform="rotate(-90 22.9546 46.5911)"
          fill="black"
        />
        <rect
          x="43.0664"
          y="45.0486"
          width="40.9091"
          height="6.81818"
          transform="rotate(135 43.0664 45.0486)"
          fill="black"
        />
        <rect x="56.8181" y="39.8845" width="6.81818" height="20.4545" rx="3.40909" fill="black" />
        <rect
          x="77.2728"
          y="53.521"
          width="6.81818"
          height="20.4545"
          rx="3.40909"
          transform="rotate(90 77.2728 53.521)"
          fill="black"
        />
        <rect
          x="57.1608"
          y="55.0635"
          width="40.9091"
          height="6.81818"
          transform="rotate(-45 57.1608 55.0635)"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="50" cy="50" r="50" fill={fill ? fill : 'url(#gradient)'} />
      </g>
      <defs>
        <linearGradient
          id="gradient"
          x1="1.15551e-06"
          y1="-20.4528"
          x2="86.9434"
          y2="109.019"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DD6ECB" />
          <stop offset="1" stopColor="#5334AE" />
        </linearGradient>
      </defs>
    </svg>
  )
}
