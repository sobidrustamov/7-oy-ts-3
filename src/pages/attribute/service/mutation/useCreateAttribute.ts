import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { CreateAttributeType } from "../../types/attribute-type";

export const useCreateAttribute = () => {
  return useMutation({
    mutationFn: (data: CreateAttributeType) =>
      request.post("/attribute/", data).then((res) => res.data),
  });
};
