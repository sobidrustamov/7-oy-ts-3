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

export const usePagination = (page: number) => {
  return useQuery({
    queryKey: ["category-list", page],
    queryFn: () =>
      request
        .get<CategoryResponse>(`/category/`, {
          params: { offset: page - 1, limit: 2 },
        })
        .then((res) => res.data),
  });
};
