**JSML (JavaScript Markup Language)**

Sometimes we find ourselves with the need to use some of the new technologies but our learning with them can be difficult at first, because we do not know how they work.
This is a small library for web interfaces, very flat that extracts basic concepts from modern frameworks, such as React, Angular, Vue, etc.

PS: This library is not recommended at all for projects in production and less for large-scale projects.

PS 2: The name is currently a joke, dont take serious.

**Version 2 released**

Check our online [documentation](https://jsml-docs.herokuapp.com/#home)! (stills in development, made on JSML)

How you can use it?

    npm i --save @duox/jsml

`app.ts`
```typescript
import { Component, PagePhase, Page } from '@duox/jsml';
import { Span } from '../components/span';

@Page()
export class App implements PagePhase {
  render(): Component[] {
    return [
      Span('Hola Mundo!'),
    ];
  }
}
```

`main.ts`

```typescript
import { PageResolver } from '@duox/jsml';
import { App } from './pages/app';

const appContainer = document.querySelector('#app') as HTMLElement;

const app = new PageResolver(App, appContainer);

app.render();
```

Or also you can use a routing system, for example:

`app.ts`
```typescript
import {
  Component,
  PagePhase,
  Route,
  Page,
  Routes
} from '@duox/jsml';
import { Container } from '../components/container';
import { HomePage } from './home.page';

const routes: Route[] = [
  {
    Page: HomePage,
    default: true,
    path: 'home',
  }
];

@Routes({
  routes,
  zoneId: "main[key='main-navigation']"
})
@Page()
export class App implements PagePhase {
  render(): Component[] {
    return [
      Container({
        key: 'main-navigation'
      }),
    ];
  }
}
```

Enjoy!