import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useProductList = () => {
  return useQuery({
    queryKey: ["product-list"],
    queryFn: () => request.get("product/").then((res) => res.data),
  });
};
