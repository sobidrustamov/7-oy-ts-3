import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

export const useDeleteSubCategory = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`category/${id}/`).then((res) => res.data),
      onSettled:()=>{
      client.invalidateQueries({ queryKey: ["subcategory-list"] });
      }
  });
};
