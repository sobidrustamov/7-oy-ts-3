import { Home } from "./../pages/home/home";
import { CategoryList } from "../pages/category/category-list";
import { CreateCategory } from "../pages/category/create-category";
import { EditCategory } from "../pages/category/edit-category";
import { SubCategoryList } from "../pages/subcategory/subcategory-list";
import { CreateSubCategory } from "../pages/subcategory/create-subcategory";
import { EditSubcategory } from "../pages/subcategory/edit-subcategory";
import { AttributeList } from "../pages/attribute/attribute-list";
import { BrandList } from "../pages/brand/brand-list";
import { CreateAttribute } from "../pages/attribute/create-attribute";
import { EditAttribute } from "../pages/attribute/edit-attribute";
import { CreateBrand } from "../pages/brand/create-brand";
import { EditBrand } from "../pages/brand/edit-brand";
import { CreateProduct } from "../pages/product/create-product";
import { ProductList } from "../pages/product/product-list";
import { EditProduct } from "../pages/product/edit-product";
import { Banner } from "../pages/banner/banner";
import { CreateBanner } from "../pages/banner/create-banner";
import { EditBanner } from "../pages/banner/edit-banner";

interface MainRouterType {
  path?: string;
  component: React.FC;
}

export const mainRouter: MainRouterType[] = [
  {
    component: Home,
  },
  {
    path: "category-list",
    component: CategoryList,
  },
  {
    path: "create-category",
    component: CreateCategory,
  },
  {
    path: "edit-category/:id",
    component: EditCategory,
  },
  {
    path: "subcategory-list",
    component: SubCategoryList,
  },
  {
    path: "create-subcategory",
    component: CreateSubCategory,
  },
  {
    path: "edit-subcategory/:id",
    component: EditSubcategory,
  },
  {
    path: "attribute-list",
    component: AttributeList,
  },

  {
    path: "create-attribute",
    component: CreateAttribute,
  },
  {
    path: "edit-attribute/:id",
    component: EditAttribute,
  },
  {
    path: "brand-list",
    component: BrandList,
  },
  {
    path: "edit-brand/:id",
    component: EditBrand,
  },
  {
    path: "create-brand",
    component: CreateBrand,
  },
  {
    path: "product-list",
    component: ProductList,
  },
  {
    path: "create-product",
    component: CreateProduct,
  },
  {
    path: "edit-product/:id",
    component: EditProduct,
  },
  {
    path: "banner-list",
    component: Banner,
  },
  {
    path: "create-banner",
    component: CreateBanner,
  },
  {
    path: "edit-banner/:id",
    component: EditBanner,
  },
];
