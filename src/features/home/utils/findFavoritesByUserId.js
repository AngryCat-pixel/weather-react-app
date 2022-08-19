export const findFavoritesByUserId = (id) => {
  let favorites = localStorage.getItem("favorites");
  if (!favorites) {
    return false;
  }
  favorites = JSON.parse(favorites);
  const found = favorites.find((favorite) => {
    return favorite.userId === id;
  });
  return found ? found : false;
};
