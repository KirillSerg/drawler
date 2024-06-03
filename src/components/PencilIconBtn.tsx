import { ElementsTypeName } from '../types/CommonTypes';

interface Props {
  className: string;
  handlerClick: (typeName: ElementsTypeName) => void;
}

const PencilIconBtn = ({ className, handlerClick }: Props) => {
  return (
    <button className={`${className}`} onClick={() => handlerClick('pencil')}>
      <svg
        id="pencil"
        viewBox="0 0 24 24"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke="black"
          strokeWidth={0.7}
          d="M4.323 20.346l.19-.443A4.1 4.1 0 0 1 2 16.1c0-2.42 1.895-4.116 3.727-5.756a10.835 10.835 0 0 0 3.21-3.838 7.746 7.746 0 0 0 3.996-3.256l-.866-.5a6.673 6.673 0 0 1-2.95 2.604 2.496 2.496 0 0 0-.433-1.291A2.56 2.56 0 0 0 6.5 3C4.701 3 3 4.336 3 5.75a.996.996 0 0 0 .299.719A3.787 3.787 0 0 0 5.849 7H6a9.083 9.083 0 0 0 1.654-.147A13.965 13.965 0 0 1 5.06 9.599C3.157 11.303 1 13.233 1 16.1a5.075 5.075 0 0 0 3.224 4.772 1.357 1.357 0 0 1 .099-.525zM6 6h-.155c-1.119.006-1.74-.08-1.845-.25C4 4.962 5.154 4 6.5 4a1.589 1.589 0 0 1 1.362.632 1.56 1.56 0 0 1 .246 1.09A7.796 7.796 0 0 1 6 6zm15.536-2.48a.965.965 0 0 0-1.385-.03L6.998 16.644 5.242 20.74a.371.371 0 0 0 .488.487l4.096-1.756L22.979 6.32a.965.965 0 0 0-.03-1.385zM6.78 19.688l.962-2.24 1.28 1.28zm3.015-1.6l-1.413-1.414L18.679 6.376l1.414 1.414zM21.952 5.932L20.8 7.083l-1.414-1.414L20.555 4.5a.42.42 0 0 1 .599.007l.804.838a.42.42 0 0 1-.006.587z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
      </svg>
    </button>
  );
};

export default PencilIconBtn;
