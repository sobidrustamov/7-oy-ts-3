import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface CategoryResponse {
  count: number;
  next: null;
  previous: null;
  results: {
    id: string;
    title: string;
    image: string;
    children: [];
  }[];
}

export const useCategoryList = (page?: number) => {
  return useQuery({
    queryKey: ["category-list", page],
    queryFn: () =>
      request
        .get<CategoryResponse>("/category/", {
          params: { limit: page ? 5 : "", offset: page },
        })
        .then((res) => res.data),
  });
};
