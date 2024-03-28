import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

export const useCreateSubCategory = () => {
  return useMutation({
    mutationKey: ["create"],
    mutationFn: (data: FormData) =>
      request
        .post("/category/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["category-list"] });
    },
  });
};
