/* @refresh reload */
import { For, render } from 'solid-js/web';
import * as i18n from '@solid-primitives/i18n';

import './index.css';
import App from './App';
import { Route, Router } from '@solidjs/router';
import { getRoutes } from './route';
import { createEffect, createSignal } from 'solid-js';
import en from './locale/en';
import zh from './locale/zh';
const root = document.getElementById('root');
export type Locale = 'en' | 'zh';
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

const Index = () => {
  const [locale, setLocale] = createSignal<Locale>('en');
  const [i18dict, setI18dict] = createSignal({});
  createEffect(() => {
    setI18dict(locale() === 'zh' ? zh : en);
  });
  const t = i18n.translator(i18dict);

  return (
    <Router root={App}>
      <For each={getRoutes(t, locale())}>
        {route => <Route path={route.path} component={route.component} />}
      </For>
    </Router>
  );
};

render(() => <Index />, root!);
