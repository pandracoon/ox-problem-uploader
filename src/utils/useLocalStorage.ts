// useLocalStorage.js

import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialState:T):[T, React.Dispatch<React.SetStateAction<T>>] {
    const getStorageItem = () => {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialState
    }
  const [state, setState] = useState<T>(getStorageItem);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;