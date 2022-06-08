import logoPath from "../assets/images/Logo.svg";

interface ILogoProps {
  className: string
}

export const Logo = (className: ILogoProps) => <img src={logoPath} {...className}/>
;
