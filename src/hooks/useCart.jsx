import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('access-token')


  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://quick-bite-server-38rl.onrender.com/carts?email=${user?.email}`,{
          headers : {
            authorization: `Bearer ${token}`
          }
        }
      );
      return res.json();
    },
  });

  return [cart, refetch];
};

export default useCart;
