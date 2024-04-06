import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useSingleAttribute = (id: string | undefined) => {
  return useQuery({
    queryKey: ["single-attribute"],
    queryFn: () => request.get(`attribute/${id}/`).then((res) => res.data),
  });
};
