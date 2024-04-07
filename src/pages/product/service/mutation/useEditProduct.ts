import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface ProductResponseType {
  id: number;
  image: null;
  title: string;
  price: string;
  is_available: boolean;
  category: number;
  is_new: boolean;
}
export const useEditProduct = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch<ProductResponseType>(`/product/${id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};
