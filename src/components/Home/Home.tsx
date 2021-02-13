import React from 'react';
import './Home.scss';

import { Link, Route, Switch } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

import Developers from '../Developers';

function Home() {
  const menuItems = ['Developers', 'Projects', 'Dashboard'];

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
        </Switch>
      </div>
    </div>
  );
}

export default Home;
