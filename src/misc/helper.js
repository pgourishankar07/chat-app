export function nameInitials(name) {
  let init = '';
  let inittialArr = name.toUpperCase().split(' ');
  for (let i = 0; i < inittialArr.length; i++) {
    let temp = inittialArr[i][0];
    init = init + temp;
  }
  return init;
}