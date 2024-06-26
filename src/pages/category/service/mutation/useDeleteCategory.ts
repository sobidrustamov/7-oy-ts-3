import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: string | number) =>
      request.delete(`/category/${id}/`).then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["category-list"] });
    },
  });
};
