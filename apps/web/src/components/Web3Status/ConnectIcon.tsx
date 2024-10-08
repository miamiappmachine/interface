// ESLint reports `fill` is missing, whereas it exists on an SVGProps type
export type SVGProps = React.SVGProps<SVGSVGElement> & {
    fill?: string
    clickable?: boolean
  }
  
  export const ConnectIcon = (props: SVGProps) => (
    <svg {...props} viewBox="0 0 282 283" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M30.92 212.185L0 242.835L39.62 282.445L70.91 251.415C140.78 309.015 202.6 248.035 248.69 201.935L226.2 179.435L275.67 129.985C284 121.655 284 108.005 275.67 99.665C267.33 91.325 253.68 91.335 245.35 99.665L195.89 149.125L132.79 86.035L182.25 36.565C190.59 28.235 190.59 14.585 182.25 6.255C173.91 -2.085 160.27 -2.085 151.93 6.255L102.47 55.715L80.78 34.015C33.42 81.375 -25.86 139.885 30.92 212.185Z" fill="white"/>
    </svg>
  )