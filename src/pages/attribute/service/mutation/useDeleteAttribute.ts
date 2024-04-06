import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

export const useDeleteAttribute = () => {
  return useMutation({
    mutationFn: (id: number | undefined) =>
      request.delete(`/attribute/${id}/`).then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({
        queryKey: ["attribute-list"],
      });
    },
  });
};
