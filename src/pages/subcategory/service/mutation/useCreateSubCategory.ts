import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

interface CreateCategoryResult {
  data: { id: number; image: string; parent: number; title: string };
}

export const useCreateSubCategory = () => {
  return useMutation({
    mutationKey: ["create"],
    mutationFn: (data: FormData) =>
      request
        .post<CreateCategoryResult>("/category/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["subcategory-list"] });
    },
  });
};
