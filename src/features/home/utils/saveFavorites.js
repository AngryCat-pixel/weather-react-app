export const saveFavorites = (favorites) => {
  let allFavorites = localStorage.getItem("favorites");
  if (!allFavorites) {
    allFavorites = [];
  } else {
    allFavorites = JSON.parse(allFavorites);
  }

  let foundFavorites = allFavorites.find((f) => f.userId === favorites.userId);
  if (foundFavorites) {
    allFavorites = allFavorites.map((f) => {
      if (f.userId === favorites.userId) {
        return favorites;
      }
      return f;
    });
  } else {
    allFavorites.push(favorites);
  }

  localStorage.setItem("favorites", JSON.stringify(allFavorites));
};
