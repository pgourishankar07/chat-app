import { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { convertToArr } from '../misc/helper';

const RoomContext = createContext();

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState(null);
  useEffect(() => {
    const roomsListRef = database.ref('rooms');
    roomsListRef.on('value', snap => {
      const data = convertToArr(snap.val());
      setRooms(data);
    });

    return () => {
      roomsListRef.off();
    };
  }, []);

  return <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>;
}

export const useRooms = () => useContext(RoomContext);
