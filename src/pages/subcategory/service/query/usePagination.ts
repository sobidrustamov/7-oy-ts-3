import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { SubCategoryListResponse } from "../../types/sub-types";

export const usePagination = (page: number) => {
  return useQuery({
    queryKey: ["subcategory-list", page],
    queryFn: () =>
      request
        .get<SubCategoryListResponse>(`/api/subcategory/`, {
          params: { offset: page - 1, limit: 2 },
        })
        .then((res) => res.data),
  });
};
