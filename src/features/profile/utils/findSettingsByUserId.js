export const findSettingsByUserId = (id) => {
  let settings = localStorage.getItem("settings");
  if (!settings) {
    return false;
  }
  settings = JSON.parse(settings);
  const found = settings.find((setting) => {
    return setting.userId === id;
  });
  return found ? found : false;
};
