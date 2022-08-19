import { saveFavorites } from "./saveFavorites";
import { useEffect } from "react";

export function useSyncFavorites(favorites) {
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);
}
