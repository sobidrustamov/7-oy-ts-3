import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

interface ResponseType {
  attributes: [];
  children: null;
  id: number;
  image: string;
  parent: { id: number; title: string };
  title: string;
}
export const useEditSubCategory = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch<ResponseType>(`/category/${id}/`, data)
        .then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["subcategory-list"] });
    },
  });
};
