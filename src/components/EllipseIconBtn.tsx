import { ElementsType } from './Toolbar';

interface Props {
  elementTypeName: ElementsType;
  handlerClick: (typeName: ElementsType) => void;
}

const EllipseIconBtn = ({ elementTypeName, handlerClick }: Props) => {
  return (
    <button
      className={`${elementTypeName === 'ellipse' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
      onClick={() => handlerClick('ellipse')}
    >
      <svg viewBox="0 0 24 24" height="100%" xmlns="http://www.w3.org/2000/svg">
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="7"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </button>
  );
};

export default EllipseIconBtn;
