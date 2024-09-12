interface Props {
  className?: string;
  Icon?: () => JSX.Element;
  handlerClick?: () => void;
}

const LayersBtn = ({ className, Icon, handlerClick }: Props) => {
  return (
    <button
      onClick={handlerClick}
      className={`${className} active:bg-blue-300`}
    >
      {Icon && <Icon />}
    </button>
  );
};

export default LayersBtn;
