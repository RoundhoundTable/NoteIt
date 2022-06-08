import logoPath from "../assets/images/Logo.svg";

interface ILogoProps {
  className?: string
}

export const Logo = (props?: ILogoProps) => <img src={logoPath} {...props}/>;

