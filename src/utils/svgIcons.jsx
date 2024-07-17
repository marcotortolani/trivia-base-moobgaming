export function BackArrowIcon({ colorFill = '#000' }) {
  return (
    <svg
      fill={colorFill}
      width="100%"
      height="100%"
      version="1.1"
      id="Capa_1"
      viewBox="0 0 96.154 96.154"
    >
      <g>
        <path
          d="M75.183,0.561L17.578,46.513c-0.951,0.76-0.951,2.367,0,3.126l57.608,45.955c0.689,0.547,1.717,0.709,2.61,0.414
		c0.186-0.061,0.33-0.129,0.436-0.186c0.65-0.351,1.057-1.025,1.057-1.765V2.093c0-0.736-0.405-1.414-1.057-1.762
		c-0.108-0.059-0.253-0.127-0.426-0.184C76.903-0.15,75.874,0.011,75.183,0.561z"
        />
      </g>
    </svg>
  )
}

export function HomeIcon({ colorFill = '#000', colorStroke = '#FFF' }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.3103 1.77586C11.6966 1.40805 12.3034 1.40805 12.6897 1.77586L20.6897 9.39491L23.1897 11.7759C23.5896 12.1567 23.605 12.7897 23.2241 13.1897C22.8433 13.5896 22.2103 13.605 21.8103 13.2241L21 12.4524V20C21 21.1046 20.1046 22 19 22H14H10H5C3.89543 22 3 21.1046 3 20V12.4524L2.18966 13.2241C1.78972 13.605 1.15675 13.5896 0.775862 13.1897C0.394976 12.7897 0.410414 12.1567 0.810345 11.7759L3.31034 9.39491L11.3103 1.77586ZM5 10.5476V20H9V15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15V20H19V10.5476L12 3.88095L5 10.5476ZM13 20V15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15V20H13Z"
        fill={colorStroke}
      />
    </svg>
  )
}

export function MenuIcon({ colorFill = '#000', colorStroke = '#FFF' }) {
  return (
    <svg width="100%" height="100%" viewBox="-0.5 0 25 25" fill="none">
      <path
        d="M19 3.32001H16C14.8954 3.32001 14 4.21544 14 5.32001V8.32001C14 9.42458 14.8954 10.32 16 10.32H19C20.1046 10.32 21 9.42458 21 8.32001V5.32001C21 4.21544 20.1046 3.32001 19 3.32001Z"
        stroke={colorStroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 3.32001H5C3.89543 3.32001 3 4.21544 3 5.32001V8.32001C3 9.42458 3.89543 10.32 5 10.32H8C9.10457 10.32 10 9.42458 10 8.32001V5.32001C10 4.21544 9.10457 3.32001 8 3.32001Z"
        stroke={colorStroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 14.32H16C14.8954 14.32 14 15.2154 14 16.32V19.32C14 20.4246 14.8954 21.32 16 21.32H19C20.1046 21.32 21 20.4246 21 19.32V16.32C21 15.2154 20.1046 14.32 19 14.32Z"
        stroke={colorStroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14.32H5C3.89543 14.32 3 15.2154 3 16.32V19.32C3 20.4246 3.89543 21.32 5 21.32H8C9.10457 21.32 10 20.4246 10 19.32V16.32C10 15.2154 9.10457 14.32 8 14.32Z"
        stroke={colorStroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CloseIcon({ colorFill = '#000', colorStroke = '#FFF' }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM8.96965 8.96967C9.26254 8.67678 9.73742 8.67678 10.0303 8.96967L12 10.9394L13.9696 8.96969C14.2625 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0303L13.0606 12L15.0303 13.9697C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73744 15.3232 9.26256 15.3232 8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697L10.9393 12L8.96965 10.0303C8.67676 9.73744 8.67676 9.26256 8.96965 8.96967Z"
        fill={colorFill}
      />
    </svg>
  )
}

export function SoundActiveIcon({ colorFill = '#000', colorStroke = '#FFF' }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      fill={colorFill}
      stroke={colorStroke}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    >
      <polygon points="1.75 5.75,1.75 10.25,4.25 10.25,8.25 13.25,8.25 2.75,4.25 5.75" />
      <path d="m10.75 6.25s1 .5 1 1.75-1 1.75-1 1.75m1-6.5c2 1 3 2.5 3 4.75s-1 3.75-3 4.75" />
    </svg>
  )
}

export function SoundMuteIcon({ colorFill = '#000', colorStroke = '#FFF' }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      fill={colorFill}
      stroke={colorStroke}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
    >
      <polygon points="1.75 5.75 1.75 10.25 4.25 10.25 8.25 13.25 8.25 2.75 4.25 5.75" />
      <path d="m14.25 5.75-3.5 4.5m0-4.5 3.5 4.5" />
    </svg>
  )
}
