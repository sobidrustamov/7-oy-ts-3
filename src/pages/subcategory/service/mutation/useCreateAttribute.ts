import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { CreateAttrebuteType } from "../../types/sub-types";


export const useCreateAttribute = () => {
  return useMutation({
    mutationFn: (data: CreateAttrebuteType) =>
      request
        .patch<CreateAttrebuteType>("api/category_edit/", data)
        .then((res) => res.data),
  });
};
