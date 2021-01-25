interface IProps {
  className?: string
}

export function CodeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

export function ImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

export function SearchIcon({ className }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

export function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="feather feather-info"
      viewBox="0 0 24 24"
    >
      <defs />
      <circle cx={12} cy={12} r={10} />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

export function UploadCloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
      <polyline points="16 16 12 12 8 16" />
    </svg>
  )
}

export function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

export function ClipboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  )
}

export function CheckMarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function WarningIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12" y2="17" />
    </svg>
  )
}

export function ThemeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs />
      <mask id="osvg-theme-icon-mask" maskUnits="userSpaceOnUse" x="3" y="3" width="50" height="50">
        <path
          d="M28 53c13.807 0 25-11.193 25-25S41.807 3 28 3 3 14.193 3 28s11.193 25 25 25z"
          fill="#fff"
        />
      </mask>
      <g mask="url(#osvg-theme-icon-mask)">
        <path d="M28 0h28v56H28V0z" fill="currentColor" />
      </g>
      <path
        d="M28 52.5c13.531 0 24.5-10.969 24.5-24.5S41.531 3.5 28 3.5 3.5 14.469 3.5 28 14.469 52.5 28 52.5z"
        stroke="currentColor"
        strokeWidth="7"
      />
    </svg>
  )
}

export function PawIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -32 512 512">
      <path
        fill="currentColor"
        d="M342.383 239.352c-23.04-35.942-62.278-57.403-104.965-57.403-42.684 0-81.926 21.461-104.961 57.403l-55.516 86.605c-9.21 14.371-13.46 30.969-12.293 47.996 1.168 17.031 7.649 32.89 18.739 45.871 11.097 12.977 25.761 21.844 42.406 25.649 16.644 3.8 33.707 2.18 49.34-4.692l1.02-.453c39.34-16.957 84.304-16.805 123.546.453 10.121 4.45 20.844 6.7 31.664 6.7 5.883 0 11.801-.668 17.664-2.004 16.645-3.801 31.309-12.668 42.41-25.645 11.094-12.977 17.579-28.84 18.75-45.871 1.172-17.035-3.078-33.633-12.289-48.008zm26.246 160.972c-14.121 16.508-36.965 21.727-56.848 12.985-23.633-10.395-49-15.59-74.375-15.59-25.351 0-50.715 5.191-74.332 15.574l-.672.297c-19.73 8.344-42.238 3.058-56.203-13.266-14.105-16.512-15.71-39.887-3.992-58.172l55.52-86.605c17.492-27.29 47.28-43.582 79.691-43.582 32.41 0 62.203 16.293 79.7 43.582l55.51 86.601c11.724 18.293 10.114 41.672-4 58.176zM91.895 239.238c16.515-6.343 29.062-19.652 35.332-37.476 5.96-16.961 5.472-36.11-1.383-53.922-6.86-17.8-19.336-32.332-35.13-40.922-16.597-9.02-34.827-10.488-51.316-4.133-33.171 12.754-48.394 53.746-33.93 91.399 11.555 29.968 38.505 48.886 65.75 48.886a57.316 57.316 0 0020.677-3.832zm-58.418-55.836c-8.524-22.187-1.036-45.789 16.703-52.609a27.844 27.844 0 0110.047-1.848c5.336 0 10.847 1.457 16.152 4.344 9.539 5.184 17.16 14.184 21.457 25.336 4.293 11.16 4.676 22.941 1.074 33.18-3.3 9.382-9.617 16.28-17.781 19.418l-.016.007c-17.715 6.829-39.086-5.66-47.636-27.828zm166.136-12.015c41.469 0 75.207-38.438 75.207-85.684C274.82 38.445 241.082 0 199.613 0c-41.465 0-75.199 38.445-75.199 85.703 0 47.246 33.734 85.684 75.2 85.684zm0-141.375c24.918 0 45.196 24.984 45.196 55.691 0 30.695-20.278 55.672-45.196 55.672s-45.187-24.977-45.187-55.672c0-30.707 20.27-55.691 45.187-55.691zm129.883 162.426h.004a61.3 61.3 0 0019.367 3.128c30.242 0 59.715-22.011 70.961-55.84 6.477-19.472 6.05-40.062-1.2-57.972-7.585-18.746-21.644-32.356-39.589-38.324-17.945-5.961-37.363-3.477-54.664 7-16.527 10.011-29.191 26.246-35.656 45.718-13.653 41.079 4.64 84.274 40.777 96.29zM317.2 105.612c4.223-12.715 12.293-23.191 22.727-29.511 9.652-5.848 20.183-7.336 29.648-4.192 9.461 3.149 17 10.64 21.235 21.102 4.574 11.304 4.77 24.531.539 37.246-8.434 25.375-31.934 40.492-52.383 33.699-20.434-6.797-30.2-32.969-21.766-58.344zm170.675 76.826l-.012-.012c-28.597-21.125-71.367-11.969-95.347 20.422-23.957 32.406-20.211 75.972 8.343 97.113 10.414 7.715 22.72 11.402 35.313 11.402 21.95 0 44.785-11.203 60.047-31.804 23.957-32.407 20.215-75.973-8.344-97.122zm-15.777 79.265c-14.16 19.113-38.102 25.453-53.38 14.137-15.265-11.3-16.195-36.043-2.073-55.145 9.386-12.68 23.097-19.734 35.734-19.734 6.39 0 12.508 1.805 17.648 5.605 15.254 11.313 16.18 36.047 2.07 55.137zm0 0"
      />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function LoadingIcon() {
  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30">
      <rect x="0" y="10" width="4" height="10" fill="currentColor" opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="8" y="10" width="4" height="10" fill="currentColor" opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
      <rect x="16" y="10" width="4" height="10" fill="currentColor" opacity="0.2">
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  )
}

export function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
