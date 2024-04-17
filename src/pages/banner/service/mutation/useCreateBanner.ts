import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

interface resType {
  data: {
    id: number;
    title: string;
    image: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
}
export const useCreateBanner = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<resType>("/banner/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data),
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["banner-list"] });
    },
  });
};
