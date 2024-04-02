import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface ResponseType {
  id: number;
  image: string;
  title: string;
  parent: { id: number; title: string };
  attributes: [];
  children: [];
}

export const useSingleSubCategory = (id: string | undefined) => {
  return useQuery({
    queryKey: ["single-category"],
    queryFn: () =>
      request.get<ResponseType>(`/category/${id}/`).then((res) => res.data),
  });
};
