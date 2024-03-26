import { UploadFile } from "antd";

export type Children = {
  id: string;
  title: string;
  image: string;
};

export interface CategoryType {
  id: number;
  title: string;
  image: string;
  children: Children[];
}
export type CreateCategoryType = {
  title: string;
  image: {
    file: File;
    fileList: UploadFile;
  };
};
export type CategoryCreateType = {
  id: number;
  title: string;
  image: {
    file: File;
    fileList: UploadFile;
  };
};
