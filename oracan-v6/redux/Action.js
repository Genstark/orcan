export const updateStack = (stack) => {
  return {
    type: "UPDATE_STACK",
    payload: stack,
  };
};

export const updateUserId = (userId) => {
  return {
    type: "UPDATE_USER_ID",
    payload: userId,
  };
};
