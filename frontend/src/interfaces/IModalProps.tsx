export interface IModalProps {
  message: string;
  acceptOption: {
    text: string;
    onClick?: () => void;
  };
  cancelOption: {
    text: string;
    onClick?: () => void;
  };
}
