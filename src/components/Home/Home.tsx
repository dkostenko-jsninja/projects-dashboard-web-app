import React, { useEffect } from 'react';
import './Home.scss';

import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

import Developers from '../Developers';
import Projects from '../Projects';
import Dashboard from '../Dashboard';

function Home() {
  const history = useHistory();

  const menuItems = ['Developers', 'Projects', 'Dashboard'];

  useEffect(() => {
    history.push('/dashboard');
  }, []);

  return (
    <div className="c-home">
      <div className="c-home__menu">
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item}>
              <Link to={`/${item.toLowerCase()}`}>
                <ListItemText primary={item} />
              </Link>
            </ListItem>
          ))}
        </List>
      </div>

      <div className="c-home__content">
        <Switch>
          <Route path="/developers">
            <Developers />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Home;
