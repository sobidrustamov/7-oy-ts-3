import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { ResponseProduct } from "../../types/product-type";

export const useSingleProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["single-product", id],
    queryFn: () =>
      request.get<ResponseProduct>(`/product/${id}/`).then((res) => res.data),
  });
};
