import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

export const useDeleteAttributeValue = () => {
  return useMutation({
    mutationFn: (id: number | undefined) =>
      request.delete(`/attribute-value/${id}/`).then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["single-category"] });
    },
  });
};
