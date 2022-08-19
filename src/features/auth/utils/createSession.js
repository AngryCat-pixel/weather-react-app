export const createSession = (userId) => {
  localStorage.setItem("session", userId);
  return;
};
