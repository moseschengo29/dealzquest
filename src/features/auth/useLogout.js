import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export function useLogout() {
  const naviagte = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => {},
    onSuccess: () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        localStorage.removeItem('authTokens')
        localStorage.removeItem('current_user')
       
        // console.log('logging out! ')
        queryClient.removeQueries({});
        queryClient.clear()
        naviagte("/", { replace: true });
    },
  });

  return { logout, isPending };
}
