import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppProvider from "./contexts";
import { AdminRoom } from "./pages/AdminRoom";
import { Loading } from "./components/Loading";

import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";
import { Room } from "./pages/Room";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </Router>
      <Toaster />
      <Loading />
    </AppProvider>
  );
};

export default App;
