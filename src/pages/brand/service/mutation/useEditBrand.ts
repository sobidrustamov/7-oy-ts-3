import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditBrand = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch(`/brand/${id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
  });
};

