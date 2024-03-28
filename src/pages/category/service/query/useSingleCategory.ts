import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface ResponseType {
  attributes: [];
  children: [];
  id: number;
  image: string;
  parent: null | number;
  title: string;
}

export const useSingleCategory = (id: string | undefined) => {
  return useQuery({
    queryKey: ["single-category"],
    queryFn: () =>
      request.get<ResponseType>(`/category/${id}/`).then((res) => res.data),
  });
};
