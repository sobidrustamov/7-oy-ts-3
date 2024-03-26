import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { CategoryType } from "../../types-category";

export const useCategoryList = () => {
  return useQuery({
    queryKey: ["category-list"],
    queryFn: () =>
      request
        .get<{ data: CategoryType }>("/category/")
        .then((res) => res.data.results),
  });
};
