import Header from "./components/Header";
import { BlogsProvider } from "./context/blogsContext";
import Overview from "./pages/Overview";

function App() {
  return (
    <div>
      <BlogsProvider>
        <Header />
        <Overview />
      </BlogsProvider>
    </div>
  );
}

export default App;
