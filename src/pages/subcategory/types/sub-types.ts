import { UploadFile } from "antd";

export interface CreateSubCategoryType {
  id: number;
  title: string;
  image: {
    file: File;
    fileList: UploadFile;
  };
  parent: string;
}
