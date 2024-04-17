import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export interface ProductResponse {
  count: number;
  next: string;
  previous: string;
  results: {
    category: number;
    id: number;
    image: string;
    is_available: boolean;
    is_new: boolean;
    price: string;
    title: string;
  }[];
}

export const useSearchedProductList = (search: string) => {
  return useQuery({
    queryKey: ["searched-list", search],
    queryFn: () =>
      request
        .get<ProductResponse>("/product/", { params: { search } })
        .then((res) => res.data),
  });
};
