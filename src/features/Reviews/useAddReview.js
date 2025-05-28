import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postReview } from "../../api/useApi";


export function useAddReview(){
    const queryClient = useQueryClient()
    
    const {mutate: addReview, error, isPending:isAdding} = useMutation({
        mutationFn: postReview,
        onSuccess: () => {
            queryClient.resetQueries({ queryKey: ['reviews'] }); // Reset the query cache
            toast.success('Review added successfully');
        },
        onError: () => {
            toast.error('Failed to add review')
        }
    })

    return {addReview, isAdding, error}

}
