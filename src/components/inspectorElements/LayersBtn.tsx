// import { IconLayerToBackFront } from '../../assets/icons/Icons';

interface Props {
  className?: string;
  Icon?: () => JSX.Element;
}

const LayersBtn = ({ className, Icon }: Props) => {
  return (
    <button className={`${className} active:bg-blue-300`}>
      {Icon && <Icon />}
    </button>
  );
};

export default LayersBtn;
