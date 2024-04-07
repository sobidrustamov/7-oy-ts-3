import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import MainLayout from "./layout/main-layout";
import { Home } from "./pages/home/home";
import { CategoryList } from "./pages/category/category-list";
import { CreateCategory } from "./pages/category/create-category";
import { EditCategory } from "./pages/category/edit-category";
import { SubCategoryList } from "./pages/subcategory/subcategory-list";
import { CreateSubCategory } from "./pages/subcategory/create-subcategory";
import { EditSubcategory } from "./pages/subcategory/edit-subcategory";
import { ProductList } from "./pages/product/product-list";
import { AttributeList } from "./pages/attribute/attribute-list";
import { BrandList } from "./pages/brand/brand-list";
import { CreateAttribute } from "./pages/attribute/create-attribute";
import { EditAttribute } from "./pages/attribute/edit-attribute";
import { CreateBrand } from "./pages/brand/create-brand";
import { CreateProduct } from "./pages/product/create-product";
import { EditProduct } from "./pages/product/edit-product";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/app" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="category-list" element={<CategoryList />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="edit-category/:id" element={<EditCategory />} />
        <Route path="subcategory-list" element={<SubCategoryList />} />
        <Route path="create-subcategory" element={<CreateSubCategory />} />
        <Route path="edit-subcategory/:id" element={<EditSubcategory />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="brand-list" element={<BrandList />} />
        <Route path="create-brand" element={<CreateBrand />} />
        <Route path="attribute-list" element={<AttributeList />} />
        <Route path="create-attribute" element={<CreateAttribute />} />
        <Route path="edit-attribute/:id" element={<EditAttribute />} />
      </Route>
    </Routes>
  );
}

export default App;
