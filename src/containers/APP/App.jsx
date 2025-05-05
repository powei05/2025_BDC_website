import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, Header, Navbar, NotFound } from "../../components";
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
    document.title = `${title || ""} | ${import.meta.env.VITE_TEAM_NAME} - iGEM ${import.meta.env.VITE_TEAM_YEAR}`;
  }, [title]);

  useEffect(() => {
    const scrollToElementWithOffset = (element) => {
      const header = document.querySelector(".navbar");
      const headerOffset = header ? header.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    };

    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          scrollToElementWithOffset(element);
        }
      }, 100);
    }
  }, [currentPath, location.hash]);

  return (
    <>
      <Navbar />

      <Routes>
        {Object.entries(pathMapping).map(
          ([path, { title, lead, component: Component }]) => (
            <Route
              key={path}
              path={path}
              element={
                <>
                  {currentPath !== "/" && (
                    <Header title={title || ""} lead={lead || ""} />
                  )}
                  <div className="container">
                    <Component />
                  </div>
                </>
              }
            />
          )
        )}
        <Route
          path="*"
          element={
            <>
              <Header
                title="Not Found"
                lead="The requested URL was not found on this server."
              />
              <NotFound />
            </>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;

