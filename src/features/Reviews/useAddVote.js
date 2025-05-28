import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postVote } from "../../api/useApi";


export function useAddVote(){
    const queryClient = useQueryClient()
    
    const {mutate: addVote, error, isPending:isAdding} = useMutation({
        mutationFn: (formData) => postVote(formData),
        onSuccess: () => {
            queryClient.resetQueries({ queryKey: ['reviews'] }); // Reset the query cache
            toast.success('Vote added successfully');
        },
        onError: () => {
            toast.error('Failed to add vote. You have already voted!')
        }
    })

    return {addVote, isAdding, error}

}
