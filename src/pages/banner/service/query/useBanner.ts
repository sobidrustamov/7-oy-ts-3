import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { BannerType } from "../../types/type";

export const useBanner = (id: string | undefined) => {
  return useQuery({
    queryKey: ["banne"],
    queryFn: () => request.get<BannerType>(`/banner/${id}/`).then((res) => res.data),
  });
};
