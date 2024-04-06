import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useCreateBrand = () => {
  return useMutation({
    mutationFn: (data) => request.post("/brand/", data).then((res) => res.data),
  });
};
