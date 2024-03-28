import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { CreateCategoryType } from "../../types-category";
import { client } from "../../../../config/query-client";

export const useEditCategory = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .put<CreateCategoryType>(`/category/${id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["category-list"] });
    },
  });
};
