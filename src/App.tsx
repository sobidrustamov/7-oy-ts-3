import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import MainLayout from "./layout/main-layout";
import { mainRouter } from "./routes/main-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<MainLayout />}>
        {mainRouter.map((item, i) => (
          <Route
            key={i}
            index={!item.path}
            path={item.path}
            element={<item.component />}
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
