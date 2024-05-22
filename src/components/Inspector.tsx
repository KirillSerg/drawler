import { useAtom } from 'jotai';
import deleteIcon from '../assets/icons/trash.svg';
import { deleteElementsAtom, selectedElementAtom } from '../store/store';
import LineIconBtn from './LineIconBtn';
import LineArrowIconBtn from './LineArrowIconBtn';

const Inspector = () => {
  const [, deleteElements] = useAtom(deleteElementsAtom);
  const [selectedElement] = useAtom(selectedElementAtom);

  return (
    <aside className="fixed min-w-[10%] max-w-[25%] max-h-[80%] overflow-auto px-3 py-5  top-[10%] right-5 border border-black">
      Inspector
      {selectedElement && (
        <img
          onClick={deleteElements}
          src={deleteIcon}
          alt="delete"
          width={25}
          height={25}
        />
      )}

      {selectedElement?.type === "line" ? (
        <LineIconBtn elementTypeName={} />
        <LineArrowIconBtn/>
      ) : ""}

    </aside>
  );
};

export default Inspector;
