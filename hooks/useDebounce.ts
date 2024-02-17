"use client"

import { useState, useEffect } from "react";

function useDebounce(value: string, delay: number = 500) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounceValue;
}

export default useDebounce;