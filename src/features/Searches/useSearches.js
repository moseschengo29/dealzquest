import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getSearchHistory } from "../../api/useApi";

export default function useSearches() {
  const { user } = useAuth();

  const { data: searches, isLoading } = useQuery({
    queryKey: ["searches"],
    queryFn: getSearchHistory,
    enabled: !!user, // ✅ Only fetch if user is logged in
  });

  return { searches, isLoading };
}
