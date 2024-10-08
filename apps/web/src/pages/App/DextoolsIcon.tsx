// ESLint reports `fill` is missing, whereas it exists on an SVGProps type
export type SVGProps = React.SVGProps<SVGSVGElement> & {
    fill?: string
    clickable?: boolean
  }
  
  export const DextoolsIcon = (props: SVGProps) => (
    <svg {...props} viewBox="0 0 31 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_437_1046)">
        <path d="M24.4575 10.3969L30.1854 13.4925L5.8991 24.4733L0.0566406 21.3193L24.4575 10.3969Z" fill="white"/>
        <path d="M4.69688 5.54889L0 7.88524L10.0238 13.2588L15.0071 10.9225L4.69688 5.54889Z" fill="white"/>
        <path d="M4.69688 10.3387L0 7.88556V17.5814L4.69688 15.4203V10.3387Z" fill="white"/>
        <path d="M25.3184 29.3794L30.2532 26.9182L30.2588 17.2224L25.3315 19.3806L25.3184 29.3794Z" fill="white"/>
        <path d="M25.3213 29.3832V24.3601L20.2235 21.6149L15.2402 23.9512L25.3213 29.3832Z" fill="white"/>
        <path d="M26.1765 5.72394L30.1861 7.70983V13.4923L20.6777 8.35233L26.1765 5.72394Z" fill="white"/>
        <path d="M4.23717 29.1464L0.121095 27.0433L0.121094 21.3192L9.69924 26.4397L4.23717 29.1464Z" fill="white"/>
        <path d="M7.50391 4.03038L15.1793 0.000183105L23.0265 4.26401L17.8141 6.8924L15.1793 5.549L12.8881 6.8924L7.50391 4.03038Z" fill="white"/>
        <path d="M23.1404 30.6064L15.1786 34.695L7.38867 30.6648L12.6583 28.27L15.1786 29.6134L18.329 28.1532L23.1404 30.6064Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_437_1046">
          <rect width="30.3579" height="34.6947" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
