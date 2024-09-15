import React from 'react';
import { useProgress } from '@react-three/drei';

const Loading = () => {
  const { progress } = useProgress();
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10">
      <div className="flex flex-col items-center">
        <div className="spinner border-t-4 border-white rounded-full w-12 h-12"></div>
        <div className="text-white text-2xl mt-4">{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

export default Loading;
