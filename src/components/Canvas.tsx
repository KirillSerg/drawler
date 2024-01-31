import { Element } from '../types/Common';

interface Props {
  elements: Element[];
}

const Canvas = ({ elements }: Props) => {
  return (
    <svg
      className="border-4 border-green-600"
      preserveAspectRatio="xMinYMin meet" //for the SVG container to be on the entire screen, while the elements inside kept the proportions and x=0, y=0 viewBox started from the upper left corner
      viewBox="0 0 1920 1080"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {elements.map((block) => (
        <block.type //flexible&dynemic rendering svg-elements
          key={block.id}
          {...block}
        />
      ))}
    </svg>
  );
};

export default Canvas;
