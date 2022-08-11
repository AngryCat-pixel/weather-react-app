export const findUserByEmail = (email) => {
  let users = localStorage.getItem("users");
  if (!users) {
    return false;
  }
  users = JSON.parse(users);
  const found = users.find((user) => {
    return user.email === email;
  });
  return found ? found : false;
};
