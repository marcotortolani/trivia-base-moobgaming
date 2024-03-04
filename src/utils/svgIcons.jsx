export function BackArrowIcon({ colorFill = "#000" }) {
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
  );
}

export function HomeIcon({ colorFill = "#000", colorStroke = "#FFF" }) {
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
  );
}

export function SoundActiveIcon({ colorFill = "#000", colorStroke = "#FFF" }) {
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
  );
}

export function SoundMuteIcon({ colorFill = "#000", colorStroke = "#FFF" }) {
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
  );
}
