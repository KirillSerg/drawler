import { ElemenEvent, Element } from '../types/CommonTypes';
import { transformCoordinates } from '../assets/utilities';
import { useAtom } from 'jotai';
import { onDragStartAtom, onMouseUpAtom } from '../store/store';

interface Props {
  element: Element;
  svgContainerRef: SVGSVGElement | null;
}

const SingleElement = ({ element, svgContainerRef }: Props) => {
  const [, onDragStart] = useAtom(onDragStartAtom);
  const [, onMouseUp] = useAtom(onMouseUpAtom);

  const handleMouseDown = (e: ElemenEvent) => {
    const { transX, transY } = transformCoordinates(
      svgContainerRef,
      e.clientX,
      e.clientY,
    );
    onDragStart({
      element,
      position: {
        x: transX,
        y: transY,
      },
    });
  };

  return (
    <>
      {element.type !== 'free' && (
        <element.type //flexible&dynemic rendering svg-elements
          {...element}
          style={{ cursor: 'pointer' }}
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={onMouseUp}
        >
          {element.children}
        </element.type>
      )}
    </>
  );
};

export default SingleElement;
