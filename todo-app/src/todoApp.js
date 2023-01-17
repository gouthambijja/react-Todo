const getTodoIndexById = (arr, id) => {
  console.log(arr.length);

  let i = arr.length;
  while (i--) {
    if (arr[i] && arr[i].id == id) return i;
  }
  return -1;
};
const getAllCheckedindex = (arr) => {
  const checkedIndexArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].check === true) {
      console.log(i);
      checkedIndexArray.push(i);
    }
  }
  console.log(checkedIndexArray);
  return checkedIndexArray;
};

const getNoofchecked = (arr) => {
  let cnt = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].check === true) {
      cnt++;
    }
  }
  return cnt;
};
export { getNoofchecked, getTodoIndexById, getAllCheckedindex };
