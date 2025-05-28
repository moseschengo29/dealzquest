import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../api/useApi";

export default function useReviews() {

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  return { reviews, isLoading };
}
