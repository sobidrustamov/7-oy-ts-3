import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface SubCategoryResponse {
  count: number;
  next: null;
  previous: null;
  results: [];
}

export const useSubCategoryList = () => {
  return useQuery({
    queryKey: ["subcategory-list"],
    queryFn: () =>
      request
        .get<SubCategoryResponse>("api/subcategory/")
        .then((res) => res.data),
  });
};
