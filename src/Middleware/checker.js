const checker = (store) => (next) => (action) => {
    console.log(action);
  if (
    action.type === 'todos/addTodo' &&
    action.payload.name.toLowerCase().includes("dinamita")
  ) {
    return alert("Nope. That's a bad idea.");
  }

  if (
    action.type === 'goals/addGoal' &&
    action.payload.name.toLowerCase().includes("dinamita")
  ) {
    return alert("Nope. That's a bad idea.");
  }

  return next(action);
};

export default checker;