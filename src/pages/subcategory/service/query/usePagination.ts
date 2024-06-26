import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { SubCategoryListResponse } from "../../types/sub-types";

export const usePagination = (page: number) => {
  return useQuery({
    queryKey: ["subcategory-list", page],
    queryFn: () =>
      request
        .get<SubCategoryListResponse>(`/api/subcategory/`, {
          params: { offset: page, limit: 5 },
        })
        .then((res) => {
          const size = Math.ceil(res.data.count);
          return { data: res.data, size };
        }),
  });
};
