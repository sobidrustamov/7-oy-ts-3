import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { CreateCategoryType } from "../../types-category";

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["create"],
    mutationFn: (data: FormData) =>
      request
        .post<CreateCategoryType>("/category/", data)
        .then((res) => res.data),
  });
};
