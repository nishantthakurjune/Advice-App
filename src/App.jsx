import { useEffect } from "react";
import { useState } from "react";

import pattern from './images/pattern-divider-desktop.svg';
import dice from './images/icon-dice.svg';

const App = () => {
  const [data, setData] = useState(null);  // Initialize as null instead of empty string

  const fetchAdvice = async () => {  // Changed to camelCase for convention
    try {
      const res = await fetch('https://api.adviceslip.com/advice');
      const json = await res.json();
      if (res.ok) {
        setData(json);
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };

  useEffect(() => {
    fetchAdvice();  // Correct way to call the function in useEffect
  }, []);

  return (
    <div className="bg-dark-grayish-blue flex items-center justify-center h-screen">
      <div className="bg-dark-blue w-[450px] h-[300px] rounded-xl">
        <div className="innerbox justify-center font-manrope bg-grayish-blue h-full rounded-xl">
          {data ? (  // Added conditional rendering
            <>
              <div className="text-neon-green text-lg text-center pt-3 pb-3">
                Advice #{data.slip.id}
              </div>
              <p className="text-light-cyan font-extrabold text-center px-7 mb-20">
                {data.slip.advice}
              </p>
            </>
          ) : (
            <p className="text-light-cyan text-center pt-3 mb-20">Loading...</p>
          )}

          <img src={pattern} className="w-100 px-7 mb-20"/>
          <img 
              src={dice} 
              onClick={fetchAdvice}
              className=" mx-48 bg-neon-green absolute p-4 rounded-full cursor-pointer hover:shadow-[0_0_30px_rgba(82,255,168,0.7)] transition-shadow duration-100"
              width="60"
              height="60"
            />
        </div>
      </div>
    </div>
  );
};

export default App;