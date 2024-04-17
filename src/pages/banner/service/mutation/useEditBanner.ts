import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

interface resType {
  data: {
    id: number;
    title: string;
    image: string;
  };
}
export const useEditBanner = (id: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .patch<resType>(`/banner/${id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["banner-list"] });
    },
  });
};
