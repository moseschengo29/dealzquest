import { useQuery } from "@tanstack/react-query";
import { getAllGames } from "../../api/useApi";

export default function useGames(){
    const {data:games, isError, isLoading} = useQuery({
        queryKey: ['games'],
        queryFn: getAllGames
    })

    return {games, isError, isLoading}
}