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
    queryKey: ["banner-list", page],
    queryFn: () =>
      request
        .get<CategoryResponse>(`/banner/`, {
          params: { offset: page, limit: 5 },
        })
        .then((res) => {
          const size = Math.ceil(res.data.count);
          return { data: res.data, size };
        }),
  });
};
