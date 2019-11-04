import { NetworkErrorBoundary } from 'rest-hooks';
import React, { Suspense } from 'react';
import PostAndAuthor from "./UIElements/PostAndAuthor";
import PostIndex from './UIElements/PostIndex';
import CommentIndex from './UIElements/CommentIndex';
import AuthorIndex from './UIElements/AuthorIndex';
import Spinner from "./UIElements/Spinner";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <NetworkErrorBoundary>
        <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/postAndAuthor">Post and Author</Link>
              </li>
              <li>
                <Link to="/authors">Authors</Link>
              </li>
              <li>
                <Link to="/comments">Comments </Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/postAndAuthor">
              <PostAndAuthor id={5}/>
            </Route>
            <Route path="/comments">
              <CommentIndex />
            </Route>
            <Route path="/authors">
              <AuthorIndex />
            </Route>
            <Route path="/">
              <PostIndex />
            </Route>
          </Switch>
        </div>
      </Router>

      </NetworkErrorBoundary>
    </Suspense>    
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>Users</h2>;
}