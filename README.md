Objectives

- What is React Router v4
- Explain what the BrowserRouter component is for
- Explain what the Link component is for
- Explain what Match and Miss components are for

<hr />

### React Router v4

You probably noticed that we list the version number for this library.
Typically version numbers and not super important as *most* changes between versions are backwards compatible,
however version 4.0.0 is a total rewrite of React Router.
The v4 API is not compatible with the previous version of this library.
This is important to note so that when you install react-router,
you ensure you are working with the version that matches the API documentation you are working from.

The new version of React Router is desinged so that routes are just components. Also in previous versions you needed to have some sort of top-level config defining all the routes of the application. While that top-level config is no longer necessary it is still an option. So for those whole like having a single source of truth defining the routes go ahead and include one.

Here is what the guys from React Router have to say about the rewrite:

>The big reason for this rewrite was 'Declarative Composability'. This means that routes are now just components. You might want to re-read that last sentence. This works really well in my demo app. The components themselves now define the composition of the UI.

<hr />

### Setup

To get started you'll need to spin up a new react app:

```
brunch new react-router-v4-demo -s brunch/with-react
```

Start out by replacing the boiler plate JSX in the **App.jsx** component with some layout components and importing them in:

>App.jsx

```jsx
import Footer from './layout/Footer';
import Header from './layout/Header';
import Main from './Main';
import React from 'react';

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
});

export default App;
```

You will now need to create those component files.

```bash
touch app/components/layout/Footer.jsx
touch app/components/layout/Header.jsx
touch app/components/Main.jsx
```

With those files created let's build out each component.

>Header.jsx

```jsx
import React from 'react';

const Header = React.createClass({
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>Earth 🌏</li>
            <li>Moon 🌕</li>
            <li>Mars 🔴</li>
          </ul>
        </nav>
        <hr />
      </header>
    )
  }
});

export default Header;
```

>Main.jsx

```jsx
import React from 'react';

const Main = React.createClass({
  render() {
    return (
      <main>
        <h2>Earth...</h2>
        <p>Home, sweet home.</p>
      </main>
    )
  }
});

export default Main;
```

>Footer.jsx

```jsx
import React from 'react';

const Footer = React.createClass({
  render() {
    return (
      <footer>
        <hr />
        &copy; Space is Rad! 🚀
      </footer>
    )
  }
});

export default Footer;
```

At this stage we can check to see that all the setup code is wired up properly by starting up a sever and opening the app in the browser.

```bash
npm start
```

If your page is not displaying, try to trace back the error to the root of the issue.
If you page works and your neighbor's does not, work with them to sort out the bug.

<hr />

#### Install React Router v4

With the setup complete we can move into getting React Router up and running.
To start off, install the react-router package.

```bash
npm install --save react-router@next
```

Currently v4 is still in the development stages so we use the `@next`suffix get the latest version of the Alpha branch.
Dobule check that you do in fact have the right version install by cating out your `package.json` file.
Under "dependencies" you should see something like this: `"react-router": "^4.0.0-alpha.5"`
*This may no longer be necessary in the near future.*

```bash
cat package.json
```

<hr />

### `<BrowserRouter />` Component

In the new version of React Router, everything is a component.
To start off render a `<BrowserRouter />` component at the root of you application.
You will want the *BrowserRouter* component to wrap the contents of your *App* component.
React Router's *BrowserRouter* may only have a single child.
That child though, can have multiple children of its own.

We will use ES6's *“destructuring-esq”* syntax to specifically import the `BrowserRouter` binding from the React Router module.

>App.jsx

```jsx
import { BrowserRouter } from 'react-router'; // 👈
import Footer from './layout/Footer';
import Header from './layout/Header';
import Main from './Main';
import React from 'react';

const App = React.createClass({
  render() {
    return (
      <BrowserRouter>  {/* 👈 */}
        <div>
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>  {/* 👈 */}
    )
  }
});

export default App;
```

<hr />

### `<Link />` Components

React Router provides a *Link* component that will provide some internal functionality and render an anchor tag to the view.
The Link API makes few props available to the component for things like styling,
checking if the link is "active" -- on the page it links to --
as well as manually setting the `location`.
The prop we are most interested in at this point is the `to` prop.
We will set the value of the `to` prop with the pathname or location we want to navigate to when clicked.

Update your Header component to include `<Link />` components.
Be sure to import in the `Link` binding from the React Router module.

>Header.jsx

```jsx
import { Link } from 'react-router';  // 👈
import React from 'react';

const Header = React.createClass({
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Earth 🌏</Link></li>         {/* 👈 */}
            <li><Link to='/moon'>Moon 🌕</Link></li>      {/* 👈 */}
            <li><Link to='/mars'>Mars 🔴</Link></li>      {/* 👈 */}
          </ul>
        </nav>
        <hr />
      </header>
    )
  }
});

export default Header;
```

Head over to your browser and test it out. When you click a link, the path in the address bar should update.
However, nothing on the page itself should change at this point.

<hr />

### `<Match />` Components

The *Match* component is where the magic really starts to happen.
When the URL updates, any *Match* components in the current context will check to see if the updated URL matches their `pattern` prop.
If the `location` does match the `pattern` of a `<Match />` it will render the corrisponding component set on that *Match's* `component` prop.

What this looks like in code...

Update your *Main* component to include <Match /> components for Earth, Moon and Mars.

```bash
touch app/components/Earth.jsx
touch app/components/Moon.jsx
touch app/components/Mars.jsx
```

>Main.jsx

```jsx
import Earth from './Earth';          //👈
import Mars from './Mars';            //👈
import { Match } from 'react-router'; //👈
import Moon from './Moon';            //👈
import React from 'react';

const Main = React.createClass({
  render() {
    return (
      <main>
        <Match pattern="/" component={Earth} />     {/* 👈 */}
        <Match pattern="/moon" component={Moon} />  {/* 👈 */}
        <Match pattern="/mars" component={Mars} />  {/* 👈 */}
      </main>
    )
  }
});

export default Main;
```

And build out the corrisponding components...

>Earth.jsx

```jsx
import React from 'react';

const Earth = React.createClass({
  render() {
    return (
      <main>
        Earth
      </main>
    )
  }
});

export default Earth;
```

>Moon.jsx

```jsx
import React from 'react';

const Moon = React.createClass({
  render() {
    return (
      <main>
        Moon
      </main>
    )
  }
});

export default Moon;
```

>Mars.jsx

```jsx
import React from 'react';

const Mars = React.createClass({
  render() {
    return (
      <main>
        Mars
      </main>
    )
  }
});

export default Mars;
```

Head over to the browswer and test it out. It works... kinda.
We have an issue though that no matter which path we are on our *Earth* component is always rendering.
This is happening because the base path for both "/moon" and "/mars" includes "/" which is our path for Earth.

Update your *Match* component for Earth to utilize the *Match* component's `exactly` prop.

> Main.jsx (snippet...)

```jsx
<Match pattern="/" exactly component={Earth} />
```

Our Match component is now only matching when the pattern is `exactly` "/" and not anything more.

#### Note:

The Match API provides a few other props, one of interest is the `render` prop.
If you are wanting to pass props to child a component the `render` prop is the one you may want to look into.
More about that in the Bonus section.

<hr />

### `<Miss />` Component

React Router also provides a component for when a none of your *Match* components match the current `location`.
This component is called *Miss*. It works much in the same way as *Match*, but doesn't require a `pattern/' prop.

Right below your `<Match />` components, add a `<Miss /> component.

>Main.jsx

```jsx
import Earth from './Earth';
import Mars from './Mars';
import { Match, Miss } from 'react-router'; //👈
import Moon from './Moon';
import NotFound from './NotFound';
import React from 'react';

const Main = React.createClass({
  render() {
    return (
      <main>
        <Match pattern="/" exactly component={Earth} />
        <Match pattern="/moon" component={Moon} />
        <Match pattern="/mars" component={Mars} />
        <Miss component={NotFound} />   {/* 👈 */}
      </main>
    )
  }
});

export default Main;
```

Be sure to also import the `Miss` binding in with your `Match` binding, as well as the new *NotFound* component.
Lastly create a NotFound component.

```bash
touch app/components/NotFound.jsx
```

>NotFound.jsx

```jsx
import React from 'react';

const NotFound = React.createClass({
  render() {
    return (
      <main>
        Lost in space...
      </main>
    )
  }
});

export default NotFound;
```

<hr />

#### Fin
That is it for the basics of React Router's new v4 API. Go toss it into a project of your own to test it out on a larger scale. No doubt you've got some state in your project. To handle passing around props, take a peek at the Bonus below.

<hr />
<hr />

## Bonus
### Passing State Through Match Components
I am fairly certain that the following is the preferred pattern for passing props through *Match* components, though feel free to correct me if you find/know otherwise.

Where as before with *Match* we use the `component` prop, here we are using the `render` prop and passing it a function that will be called at render time.
Our function here is just going to return a `<Home />` component.
We are then also providing that component with props.
The first line in our *Home* component is using the rest operator in conjunction with destructuring.
This will pass in all the key value pairs of our `state` object in as props.
On the next line we are we are passing a function, `handleAddToCart`, defined on the current component to *Home*
On the line after that we are passing the function `handleAuth`, defined on a parent component, to the *Home* component.

> Sample.jsx

```jsx
<Match pattern="/" exactly render={
  () => <Home
    { ...this.state }
    handleAddToCart={this.handleAddToCart}
    handleAuth={this.props.handleAuth}
  />
}/>
```

<hr />

#### 📚 Resources:
- [React Router - Docs](https://react-router.now.sh/)
- [Paul Sherman - Blog](http://www.pshrmn.com/tutorials/react/react-router/)
- [Passing Props to Child Components - SO](http://stackoverflow.com/questions/40426822/passing-props-to-children-components-with-react-router-v4)

👈 = updated code
`{/* This is a JSX comment */}`

<hr />

Further talking points...

1. `location` is data that represents where the visitor is
1. what is `history` and how is it used
1. navigation prompts
1. redirects

<hr />
<hr />

# Brunch + React + Babel/ES6

This is a modern JS skeleton with React for [Brunch](http://brunch.io).

## Installation

Clone this repo manually or use `brunch new dir -s brunch/with-react`

## Getting started

* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * Brunch plugins and app dependencies: `npm install`
* Run:
    * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `brunch build --production` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `public/`.
    * [Brunch site](http://brunch.io), [Getting started guide](https://github.com/brunch/brunch-guide#readme)
