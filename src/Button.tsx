type ButtonPropsType = {
  title: string;
  onClick?: () => void;
  isDisabled?: boolean;
  className?: string
};

export const Button = (props: ButtonPropsType) => {
  return <button className={props.className} onClick={props.onClick} disabled={props.isDisabled}>{props.title}</button>;
};
