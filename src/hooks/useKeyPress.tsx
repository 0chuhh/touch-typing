import { useState, useEffect, KeyboardEvent } from 'react';

//1
const useKeyPress = (callback: (key:string)=>void, targetKey?:string) => {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState<string | null>();
    // If pressed key is our target key then set to true
    function downHandler({ key }:{key:string}): void {
        if (keyPressed !== key) {
            setKeyPressed(key);
            callback && callback(key);
          }
    }
    // If released key is our target key then set to false
    const upHandler = (): void => {
        setKeyPressed(null);
    };
    // Add event listeners
    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    },[callback]); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
  }

export default useKeyPress;