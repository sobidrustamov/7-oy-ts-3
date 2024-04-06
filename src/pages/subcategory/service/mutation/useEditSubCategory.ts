import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";
import { EditSubResponseType } from "../../types/sub-types";

export const useEditSubCategory = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch<EditSubResponseType>(`/category/${id}/`, data)
        .then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["subcategory-list"] });
    },
  });
};
