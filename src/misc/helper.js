export function nameInitials(name) {
  let init = '';
  let inittialArr = name.toUpperCase().split(' ');
  for (let i = 0; i < inittialArr.length; i++) {
    let temp = inittialArr[i][0];
    init = init + temp;
  }
  return init;
}

export function convertToArr(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}

export async function getUserUpdates(userId, keyToUpdate, value, db) {
  const updates = {};
  updates[`/profiles/${userId}/${keyToUpdate}`] = value;
  const getMsgs = db
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userId)
    .once('value');
  const getRooms = db
    .ref('/rooms')
    .orderByChild('lastMessage/author/uid')
    .equalTo(userId)
    .once('value');

  const [msgSnap, roomSnap] = await Promise.all([getMsgs, getRooms]);

  msgSnap.forEach(msg => {
    updates[`/messages/${msg.key}/author/${keyToUpdate}`] = value;
  });

  roomSnap.forEach(room => {
    updates[`/rooms/${room.key}/lastMessage/author/${keyToUpdate}`] = value;
  });

  return updates;
}
