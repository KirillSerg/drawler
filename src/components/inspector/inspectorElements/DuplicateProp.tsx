import { useAtom } from 'jotai';
import { duplicateAtom } from '../../../store/store';

const DuplicateProp = () => {
  const [, setDuplicate] = useAtom(duplicateAtom);
  return (
    <button
      className="bg-gray-200 hover:bg-blue-300 h-8 min-w-8 p-[6px] rounded-md"
      onClick={setDuplicate}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g strokeWidth="1.25">
          <path d="M14.375 6.458H8.958a2.5 2.5 0 0 0-2.5 2.5v5.417a2.5 2.5 0 0 0 2.5 2.5h5.417a2.5 2.5 0 0 0 2.5-2.5V8.958a2.5 2.5 0 0 0-2.5-2.5Z"></path>
          <path
            clipRule="evenodd"
            d="M11.667 3.125c.517 0 .986.21 1.325.55.34.338.55.807.55 1.325v1.458H8.333c-.485 0-.927.185-1.26.487-.343.312-.57.75-.609 1.24l-.005 5.357H5a1.87 1.87 0 0 1-1.326-.55 1.87 1.87 0 0 1-.549-1.325V5c0-.518.21-.987.55-1.326.338-.34.807-.549 1.325-.549h6.667Z"
          ></path>
        </g>
      </svg>
    </button>
  );
};

export default DuplicateProp;
