import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

export const useDeleteBanner = () => {
  return useMutation({
    mutationFn: (id: string | number) =>
      request.delete(`/banner/${id}/`).then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["banner-list"] });
    },
  });
};
