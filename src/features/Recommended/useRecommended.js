import { useQuery } from "@tanstack/react-query";
import { getRecommendedProducts } from "../../api/useApi";

export default function useRecommendedProducts() {

  const { data: recommended_products, isLoading } = useQuery({
    queryKey: ["recommended_products"],
    queryFn: getRecommendedProducts,
  });

  return { recommended_products, isLoading };
}
