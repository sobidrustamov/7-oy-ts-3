import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface ResponseBrandType {
  count: number;
  next: null;
  previous: null;
  results: [];
}
export const useBrandList = (filter: string, page: number) => {
  return useQuery({
    queryKey: ["brand-list", filter, page],
    queryFn: () =>
      request
        .get<ResponseBrandType>(`/brand/?ordering=${filter}`, {
          params: { offset: page, limit: 5 },
        })
        .then((res) => {
          const size = Math.ceil(res.data.count);
          return { data: res.data, size };
        }),
  });
};
