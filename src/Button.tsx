type ButtonPropsType = {
  title: string;
  onClick?: () => void;
};

export const Button = (props: ButtonPropsType) => {
  return <button onClick={props.onClick}>{props.title}</button>;
};
