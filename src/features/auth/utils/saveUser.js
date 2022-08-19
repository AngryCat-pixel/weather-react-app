export const saveUser = (user) => {
  let users = localStorage.getItem("users");
  if (!users) {
    users = [];
  } else {
    users = JSON.parse(users);
  }
  let userInDb = users.find((u) => u.id === user.id);
  if (userInDb) {
    users = users.map((u) => {
      if (u.id === user.id) {
        return user;
      }
      return u;
    });
  } else {
    users.push(user);
  }
  localStorage.setItem("users", JSON.stringify(users));
};
