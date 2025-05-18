import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { NotFound } from "../../components/Index";
import { getPathMapping, stringToSlug } from "../../utils";
import { useEffect } from "react";

const App = () => {
  const pathMapping = getPathMapping();
  const location = useLocation();

  const currentPath =
    location.pathname
      .split(`/${stringToSlug(import.meta.env.VITE_TEAM_NAME)}`)
      .pop() || "/";

  const title =
    currentPath in pathMapping ? pathMapping[currentPath].title : "Not Found";

  useEffect(() => {
    document.title = `${title || ""} | ${import.meta.env.VITE_TEAM_NAME} - ${import.meta.env.VITE_TEAM_YEAR}`;
  }, [title]);

  // ✅ 新的 scroll 行為（無偏移）
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [currentPath, location.hash]);

  return (
    <Routes>
      {Object.entries(pathMapping).map(
        ([path, { component: Component }]) => (
          <Route key={path} path={path} element={<Component />} />
        )
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;


