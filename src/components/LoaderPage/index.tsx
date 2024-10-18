import Lottie from 'react-lottie';
import boardGameAnimation from '../../assets/lotties/board-game-animation.json';

export function LoaderPage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: boardGameAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <Lottie
	      options={defaultOptions}
        height={800}
        width={800}
      />
    </div>
  );
}
