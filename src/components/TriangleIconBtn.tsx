import { ElementsType } from './Toolbar';

interface Props {
  elementTypeName: ElementsType;
  handlerClick: (typeName: ElementsType) => void;
}

const TriangleIconBtn = ({ elementTypeName, handlerClick }: Props) => {
  return (
    <button
      className={`${elementTypeName === 'polygon' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
      onClick={() => handlerClick('polygon')}
    >
      <svg viewBox="0 0 24 24" height="100%" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="12,2 22,22 2,22"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
};

export default TriangleIconBtn;
