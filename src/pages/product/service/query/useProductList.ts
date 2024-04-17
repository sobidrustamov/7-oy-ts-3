import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface resultsType {
  count: number;
  next: string;
  previous: null | string;
  results: [];
}
export const useProductList = (page: number) => {
  return useQuery({
    queryKey: ["product-list", page],
    queryFn: () =>
      request
        .get<resultsType>("product/", { params: { offset: page, limit: 5 } })
        .then((res) => res.data),
  });
};
