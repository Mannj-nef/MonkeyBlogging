import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/auth-context";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import SctollToTop from "./pages/SctollToTop";
import { ROUTER_DASHBOARD, ROUTES } from "./router/Router";

function App() {
  return (
    <div className="App">
      <SctollToTop></SctollToTop>
      <AuthProvider>
        <Suspense fallback={<>...loading</>}>
          <Routes>
            {ROUTES.map((page) => {
              const Component = page.element;
              return (
                <Route
                  key={page.id}
                  path={page.path}
                  element={<Component></Component>}
                ></Route>
              );
            })}
            <Route element={<DashboardLayout></DashboardLayout>}>
              {ROUTER_DASHBOARD.map((page) => {
                const Component = page.element;
                return (
                  <Route
                    key={page.id}
                    path={page.path}
                    element={<Component></Component>}
                  ></Route>
                );
              })}
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
