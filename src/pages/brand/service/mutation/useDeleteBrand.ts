import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

export const useDeleteBrand = () => {
  return useMutation({
    mutationFn: (id: string | number) =>
      request.delete(`/brand/${id}/`).then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["brand-list"] });
    },
  });
};
