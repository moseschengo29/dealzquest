import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { clearAllSearches } from "../../api/useApi";

export function useClearSearches(onSuccessCallback) {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: clearSearchHistory } = useMutation({
    mutationFn: clearAllSearches,
    onSuccess: () => {
      toast.success("Search History Cleared Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["searches"],
      });
      if (onSuccessCallback) onSuccessCallback(); // Call the close function

    },
    onError: (err) => {
        toast.error('Failed To Clear Search History!', err)
},
  });

  return { isDeleting, clearSearchHistory };
}
