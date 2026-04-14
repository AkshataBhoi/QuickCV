import { useEffect } from "react";

export function useKeyPress(targetKey: string, handler: () => void) {
  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        handler();
      }
    };

    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [targetKey, handler]);
}
