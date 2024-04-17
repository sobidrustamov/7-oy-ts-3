import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useFilterBanner = (id: string, page: number) => {
  return useQuery({
    queryKey: ["filter-banner", id, page],
    queryFn: () =>
      request
        .get(`/banner/?ordering=${id}`, { params: { offset: page, limit: 5 } })
        .then((res) => {
          const size = Math.ceil(res.data.count);
          return { data: res.data, size };
        }),
  });
};
