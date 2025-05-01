import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeItemFromFavourites } from "../../api/useApi";

export function useRemoveFavourite() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: removeFavourite } = useMutation({
    mutationFn: removeItemFromFavourites,
    onSuccess: () => {
      toast.success("Product Successfully Removed From Favorites!");
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
    onError: (err) => {
        toast.error('Failed To Remove Product From Favourites!', err)
},
  });

  return { isDeleting, removeFavourite };
}
