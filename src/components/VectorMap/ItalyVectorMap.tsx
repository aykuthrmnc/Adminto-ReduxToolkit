import 'jsvectormap';
// import 'jsvectormap/dist/maps/italy.js';

//components
import BaseVectorMap from './BaseVectorMap';

type ItalyVectorMapProps = {
    width?: string;
    height?: string;
    options?: Record<string, unknown>;
};

const ItalyVectorMap = ({ width, height, options }: ItalyVectorMapProps) => {
    return <BaseVectorMap width={width} height={height} options={options} type="italy" />;
};

export default ItalyVectorMap;
