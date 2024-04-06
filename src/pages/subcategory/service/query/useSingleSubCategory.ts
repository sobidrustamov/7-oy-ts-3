import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { SingleSubResponseType } from "../../types/sub-types";

export const useSingleSubCategory = (id: string | undefined) => {
  return useQuery({
    queryKey: ["single-category"],
    queryFn: () =>
      request
        .get<SingleSubResponseType>(`/category/${id}/`)
        .then((res) => res.data),
  });
};
