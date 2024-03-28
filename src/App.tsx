import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import MainLayout from "./layout/main-layout";
import { Home } from "./pages/home/home";
import { CategoryList } from "./pages/category/category-list";
import { CreateCategory } from "./pages/category/create-category";
import { EditCategory } from "./pages/category/edit-category";
import { SubCategoryList } from "./pages/subcategory/subcategory-list";
import { CreateSubCategory } from "./pages/subcategory/create-subcategory";

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
      </Route>
    </Routes>
  );
}

export default App;
