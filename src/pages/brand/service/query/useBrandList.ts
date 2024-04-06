import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface ResponseBrandType {
  count: number;
  next: null;
  previous: null;
  results: [];
}
export const useBrandList = () => {
  return useQuery({
    queryKey: ["brand-list"],
    queryFn: () =>
      request.get<ResponseBrandType>("/brand/").then((res) => res.data),
  });
};
