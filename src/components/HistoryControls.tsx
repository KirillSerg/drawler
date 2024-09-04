import { useAtom } from 'jotai';
import {
  currentHistoryIndexAtom,
  historyAtom,
  useHistoryAtom,
} from '../store/store';

const HistoryControls = () => {
  const [, doRedo] = useAtom(useHistoryAtom);
  const [currentHistoryIndex] = useAtom(currentHistoryIndexAtom);
  const [history] = useAtom(historyAtom);

  return (
    // h-fit w-fit px-2 fixed bottom-3 right-[20%] flex justify-center items-center gap-4 border-[1px] border-black
    <div className="flex justify-between items-center gap-3 bg-gray-200 rounded-lg p-1">
      <button
        // id=""
        className="h-6 w-6"
        onClick={() => doRedo(1)}
        disabled={history.length - 1 == currentHistoryIndex}
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke={
            history.length - 1 == currentHistoryIndex ? 'grey' : 'currentColor'
          }
          strokeLinecap="round"
          strokeLinejoin="round"
          width={'100%'}
          height={'100%'}
        >
          <path
            d="M7.5 10.833 4.167 7.5 7.5 4.167M4.167 7.5h9.166a3.333 3.333 0 0 1 0 6.667H12.5"
            strokeWidth="1.25"
          ></path>
        </svg>
      </button>

      <button
        // id=""
        className="h-6 w-6"
        onClick={() => doRedo(-1)}
        disabled={currentHistoryIndex == 0}
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke={currentHistoryIndex == 0 ? 'grey' : 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
          width={'100%'}
          height={'100%'}
        >
          <path
            d="M12.5 10.833 15.833 7.5 12.5 4.167M15.833 7.5H6.667a3.333 3.333 0 1 0 0 6.667H7.5"
            strokeWidth="1.25"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default HistoryControls;
