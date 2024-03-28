import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { CreateCategoryType } from "../../types-category";
import { client } from "../../../../config/query-client";

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["create"],
    mutationFn: (data: FormData) =>
      request
        .post<CreateCategoryType>("/category/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["category-list"] });
    },
  });
};
