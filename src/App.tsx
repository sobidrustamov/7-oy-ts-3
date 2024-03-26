import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import MainLayout from "./layout/main-layout";
import { Home } from "./pages/home/home";
import { CategoryList } from "./pages/category/category-list";
import { CreateCategory } from "./pages/category/create-category";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="category-list" element={<CategoryList />} />
        <Route path="create-category" element={<CreateCategory />} />
      </Route>
    </Routes>
  );
}

export default App;
