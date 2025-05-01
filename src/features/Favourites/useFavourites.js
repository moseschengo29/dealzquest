import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getFavourites } from "../../api/useApi";

export default function useFavourites() {
  const { user } = useAuth();

  const { data: favourites, isLoading } = useQuery({
    queryKey: ["favourites"],
    queryFn: getFavourites,
    enabled: !!user, // ✅ Only fetch if user is logged in
  });

  return { favourites, isLoading };
}
