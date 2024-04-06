import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { SubCategoryListResponse } from "../../types/sub-types";

export const useSubCategoryList = () => {
  return useQuery({
    queryKey: ["subcategory-list"],
    queryFn: () =>
      request
        .get<SubCategoryListResponse>("api/subcategory/")
        .then((res) => res.data),
  });
};
