import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

interface resType {
  data: { id: number; title: string; image: string; parent: number };
}
export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ["create"],
    mutationFn: (data: FormData) =>
      request
        .post<resType>("/category/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["category-list"] });
    },
  });
};
