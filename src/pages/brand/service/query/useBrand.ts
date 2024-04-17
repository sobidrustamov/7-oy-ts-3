import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface BrandType {
  id: number;
  title: string;
  image: string;
}
export const useBrand = (id: string | undefined) => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () =>
      request.get<BrandType>(`/brand/${id}/`).then((res) => res.data),
  });
};
