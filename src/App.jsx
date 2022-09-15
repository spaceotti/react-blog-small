import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import NewPost from "./components/NewPost/NewPost";
import BlogDetails from "./BlogDetails/BlogDetails";
import NotFound from "./NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/newPost">
            <NewPost />
          </Route>
          <Route path="/blogs/:id">
            <BlogDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
