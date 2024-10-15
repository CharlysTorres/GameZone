import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function LoaderPage() {
  return (
    <div className='flex w-screen h-screen justify-center items-center'>
      <DotLottieReact 
        src='/src/assets/lotties/board-game-animation.json'
        loop
        autoplay
      />
    </div>
  );
}
