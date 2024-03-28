import { UploadFile } from "antd";

export interface CreateSubCategoryType {
  title: string;
  image: {
    file: File;
    fileList: UploadFile;
  };
  parent: string;
}
