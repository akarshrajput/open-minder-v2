import { BlogsProvider } from "./context/blogsContext";
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

function App() {
  return (
    <div>
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
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Error />} />
              <Route path="/me/:username" element={<CurrentUserLayout />} />
              <Route path="/writeblog" element={<BlogWriteContainer />} />
            </Routes>
          </BrowserRouter>
        </BlogsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
