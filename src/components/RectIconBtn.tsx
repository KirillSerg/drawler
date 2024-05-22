import { ElementsType } from './Toolbar';

interface Props {
  elementTypeName: ElementsType;
  handlerClick: (typeName: ElementsType) => void;
}

const RectIconBtn = ({ elementTypeName, handlerClick }: Props) => {
  return (
    <button
      className={`${elementTypeName === 'rect' ? 'bg-orange-500' : 'bg-inherit'} p-[6px]`}
      onClick={() => handlerClick('rect')}
    >
      <svg viewBox="0 0 24 24" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </button>
  );
};

export default RectIconBtn;
