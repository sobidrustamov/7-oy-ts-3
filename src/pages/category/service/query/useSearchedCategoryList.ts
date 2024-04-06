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

export const useSearchedCategoryList = (search: string) => {
  return useQuery({
    queryKey: ["searched-list", search],
    queryFn: () =>
      request
        .get<CategoryResponse>("/category/", { params: { search } })
        .then((res) => res.data.results),
  });
};
