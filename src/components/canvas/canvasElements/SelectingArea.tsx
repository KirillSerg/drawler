import { useAtomValue } from 'jotai';
import { selectingAreaAtom } from '../../../store/store';
import { useUpdateXYAndDistance } from '../../../assets/utilities';

const SelectingArea = () => {
  const selectingArea = useAtomValue(selectingAreaAtom);

  const { newX, newY, newWidth, newHeight } = useUpdateXYAndDistance(
    selectingArea?.startX,
    selectingArea?.startY,
    selectingArea?.endX,
    selectingArea?.endY,
  );

  return (
    <rect
      x={newX}
      y={newY}
      width={newWidth}
      height={newHeight}
      stroke="purple"
      strokeWidth="1"
      fill="purple"
      fillOpacity={0.1}
    />
  );
};

export default SelectingArea;
