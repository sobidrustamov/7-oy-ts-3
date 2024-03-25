import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { FieldType } from "../../types";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: FieldType) => {
      return request
        .post<{ token: string }>("/api/admin-login/", data)
        .then((res) => res.data);
    },
  });
};
