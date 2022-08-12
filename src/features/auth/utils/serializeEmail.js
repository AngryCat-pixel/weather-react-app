export const serializeEmail = (email) => {
  let newEmail = email.toLowerCase();
  newEmail = `${newEmail.match(/.*@/)[0].replace(/\./g, "")}${
    newEmail.match(/@(.*)/)[1]
  }`;
  return newEmail;
};
