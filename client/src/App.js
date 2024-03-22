import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlogsProvider } from "./context/blogsContext";
import { Toaster } from "react-hot-toast";
import Overview from "./pages/Overview";
import BlogLayout from "./pages/BlogLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./components/Blog";
import UserLayout from "./pages/UserLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import { AuthProvider } from "./context/AuthContext";
import CurrentUserLayout from "./pages/CurrentUserLayout";
import BlogWriteContainer from "./pages/BlogWriteContainer";
import BlogWriteContainerAI from "./pages/BlogWriteContainerAI";
import Docs from "./pages/Docs";
import ProtectedRoute from "./pages/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BlogsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/en-us" element={<BlogLayout />}>
                  <Route path="blog/:id" element={<Blog />} />
                </Route>
                <Route path="/">
                  <Route path=":username/:id" element={<UserLayout />} />
                </Route>
                <>
                  <Route
                    path="/me/:username"
                    element={
                      <ProtectedRoute>
                        <CurrentUserLayout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/writeblog"
                    element={
                      <ProtectedRoute>
                        <BlogWriteContainer />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/writeblog/minder"
                    element={
                      <ProtectedRoute>
                        <BlogWriteContainerAI />
                      </ProtectedRoute>
                    }
                  />
                </>
                <Route path="/docs" element={<Docs />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </BlogsProvider>
        </AuthProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#f8fafc",
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
