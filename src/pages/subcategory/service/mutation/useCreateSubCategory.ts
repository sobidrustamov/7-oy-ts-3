import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";
import { CreateSubcategoryResult } from "../../types/sub-types";

export const useCreateSubCategory = () => {
  return useMutation({
    mutationKey: ["create"],
    mutationFn: (data: FormData) =>
      request
        .post<CreateSubcategoryResult>("/category/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["subcategory-list"] });
    },
  });
};
