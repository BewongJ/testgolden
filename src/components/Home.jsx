import React, { useState } from 'react';
import Models1 from './modelsm/Models1';
import Models2 from './modelsm/Models2';
import { FaEyeSlash } from 'react-icons/fa';

function Home() {
  const [activeModel, setActiveModel] = useState(null);

  const toggleModel1 = () => {
    setActiveModel(activeModel === 'model1' ? null : 'model1');
  };

  const toggleModel2 = () => {
    setActiveModel(activeModel === 'model2' ? null : 'model2');
  };

  return (
    <div className="bg-black min-h-screen">
      <br></br>
      <div className="flex space-x-2 items-center px-10 mx-0">
        <button
          onClick={toggleModel1}
          className="bg-white text-black font-bold py-2 px-4 rounded"
        >
          {activeModel === 'model1' ? <FaEyeSlash /> : 'Candy Top'}
        </button>
        <button
          onClick={toggleModel2}
          className="bg-white text-black font-bold py-2 px-4 rounded"
        >
          {activeModel === 'model2' ? <FaEyeSlash /> : 'Poly Polo Zip'}
        </button>
      </div>
      {activeModel === 'model1' && (
        <div className="mt-4">
          <Models1 />
        </div>
      )}
      {activeModel === 'model2' && (
        <div className="mt-4">
          <Models2 />
        </div>
      )}
    </div>
  );
}

export default Home;
