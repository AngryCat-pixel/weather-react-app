export const findUserById = (id) => {
  let users = localStorage.getItem("users");
  if (!users) {
    return false;
  }
  users = JSON.parse(users);
  const found = users.find((user) => {
    return user.id === id;
  });
  return found ? found : false;
};
