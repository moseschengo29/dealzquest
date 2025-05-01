import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeSearchItem } from "../../api/useApi";

export function useRemoveSearchItem() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: clearSearchItem } = useMutation({
    mutationFn: removeSearchItem,
    onSuccess: () => {
      toast.success("Search Item Removed Successfully!");
      queryClient.invalidateQueries({
        queryKey: ["searches"],
      });
    },
    onError: (err) => {
        toast.error('Failed To Remove Search Item!', err)
},
  });

  return { isDeleting, clearSearchItem };
}
