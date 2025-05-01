import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import allRoutes from "./routes/routes";
import { Suspense, useEffect, useState } from "react";
import Loader from "./components/Loader";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Search from "./pages/Search";


const App = () => {
  const [loading, setLoading] = useState(true);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 100000,
      },
    },
  });

  const toasterStyle = {
    position: "top-center",
    reverseOrder: false,
    containerClassName: "overflow-auto",
    containerStyle: {
      margin: "8px",
      zIndex: '1000000',
    },
    toastOptions: {
      success: {
        duration: 3000,
      },
      error: {
        duration: 5000,
      },
      style: {
        fontSize: "18px",
        maxWidth: "500px", 
        padding: "16px 24px",
        background: '#1A222C', 
        color: '#fff',
        opacity: 1
      },
    },
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    loading ? 
    <Loader /> : 
    <>
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
        <Toaster {...toasterStyle}/>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/search" element={<Search />} />

              <Route element={<ProtectedRoutes />}>
                {allRoutes.map((route, index) => {
                      const { path, component: Component } = route;
                      return (
                        <Route
                          key={index}
                          path={path}
                          element={
                            <Suspense fallback={<Loader />}>
                              <Component />
                            </Suspense>
                          }
                        />
                      );
                    })}
                  </Route>
            </Route>
          </Routes>
          </AuthProvider>
        </QueryClientProvider>

          
    </>
  );
};

export default App;
