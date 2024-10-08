// ESLint reports `fill` is missing, whereas it exists on an SVGProps type
export type SVGProps = React.SVGProps<SVGSVGElement> & {
    fill?: string
    clickable?: boolean
  }
  
  export const XIcon = (props: SVGProps) => (
    <svg {...props} viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5711 14.7104L34.5047 0H31.441L20.2059 12.7702L11.2392 0H0.894531L14.457 19.3126L0.894531 34.7368H3.95832L15.8152 21.2482L25.2867 34.7368H35.6314M5.06411 2.26064H9.77095L31.4386 32.5873H26.7306" fill="white"/>
    </svg>
  )