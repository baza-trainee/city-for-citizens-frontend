import { FadeLoader } from 'react-spinners';

const Loader = ({ text = 'Loading ...' }) => {
  return (
    <div className="m-auto flex flex-col items-center justify-center gap-[10px]">
      <p className="text-[44px]">{text}</p>
      <FadeLoader
        color="#6589E3"
        height={25}
        margin={15}
        radius={5}
        width={8}
      />
    </div>
  );
};
export default Loader;
