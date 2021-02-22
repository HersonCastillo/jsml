**JSML (JavaScript Markup Language)**

Sometimes we find ourselves with the need to use some of the new technologies but our learning with them can be difficult at first, because we do not know how they work.
This is a small library for web interfaces, very flat that extracts basic concepts from modern frameworks, such as React, Angular, Vue, etc.

PS: This library is not recommended at all for projects in production and less for large-scale projects.

PS 2: The name is currently a joke, dont take serious.

How you can use it?

    npm i --save @duox/jsml

`app.ts`
```javascript
import { IRoute, PageElement } from '@duox/jsml';

const Span = (text: string) => ({
  tag: 'span',
  child: text
});

export const App = (): PageElement => ({
  body: [
    Span('Hi World!')
  ],
});

```

`main.ts`

```javascript
import { Page } from '@duox/jsml';
import { App } from './app';

const appContainer = document.querySelector('#app');

const mainPage = new Page(App, appContainer);

mainPage.render();
```

Or also you can use a routing system, for example:

`app.ts`
```javascript
import { IRoute, PageElement } from '@duox/jsml';
import { HomePage } from './home.page';

const routes: IRoute[] = [
  {
    default: true,
    page: HomePage,
    path: 'home',
    onLeave: () => {
      console.log('Leave');
    },
    onLoad: () => {
      console.log('Load');

      return true;
    },
  }
];

export const App = (): PageElement => ({ routes });
```

Enjoy!