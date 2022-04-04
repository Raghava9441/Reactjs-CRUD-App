import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Users from "./components/Users";
import UserPosts from "./components/UserPosts";
import Posts from "./components/Posts";
import Todos from "./components/Todos";
import Footer from "./components/Footer/Footer";
import UserTodos from "./components/UserTodos";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Users />
          </Route>
          <Route path="/public/v2/users/:id/posts">
            <UserPosts />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/todos">
            <Todos />
          </Route>
          <Route path="/public/v2/users/:id/todos">
            <UserTodos />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
