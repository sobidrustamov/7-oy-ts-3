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

export interface CreateAttrebuteType {
  attributes: {
    attribute_id: null | number;
    title: string;
    values: {
      value: string;
      value_id: null | number;
    }[];
  }[];
  category_id: number | undefined;
}
[];

export interface CreateSubcategoryResult {
  data: { id: number; image: string; parent: number; title: string };
}

export interface EditSubResponseType {
  attributes: [];
  children: null;
  id: number;
  image: string;
  parent: { id: number; title: string };
  title: string;
}

export interface SingleSubResponseType {
  id: number;
  image: string;
  title: string;
  parent: { id: number; title: string };
  attributes: [];
  children: [];
}

export interface SubCategoryListResponse {
  count: number;
  next: null;
  previous: null;
  results: {
    id: number;
    image: string;
    parent: {
      id: number;
      title: string;
    };
    title: string;
  }[];
}