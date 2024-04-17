import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useBannerList = () => {
  return useQuery({
    queryKey: ["banner-list"],
    queryFn: () => request.get("/banner/").then((res) => res.data),
  });
};
