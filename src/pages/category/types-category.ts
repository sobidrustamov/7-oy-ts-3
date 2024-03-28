import { UploadFile } from "antd";

export interface CategoryType {
  attributes: [];
  children: [];
  id: number;
  image: string;
  parent: null | number;
  title: string;
}
export interface CreateCategoryType {
  title: string;
  image: {
    file: File;
    fileList: UploadFile;
  };
}
