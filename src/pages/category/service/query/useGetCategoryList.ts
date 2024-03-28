import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface CategoryResponse {
  count: number;
  next: null;
  previous: null;
  results: {
    id: number;
    title:string;
    image: string;
    children: [];
  }[];
}

export const useCategoryList = () => {
  return useQuery({
    queryKey: ["category-list"],
    queryFn: () =>
      request
        .get<CategoryResponse>("/category/")
        .then((res) => res.data.results),
  });
};
