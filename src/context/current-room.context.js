import { createContext, useContextSelector } from 'use-context-selector';

const currRoomContext = createContext();

export function CurrRoomProvider({ children, data }) {
  return (
    <currRoomContext.Provider value={data}>{children}</currRoomContext.Provider>
  );
}

export const useCurrRoom = selector =>
  useContextSelector(currRoomContext, selector);
