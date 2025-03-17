/* @refresh reload */
import { For, render } from 'solid-js/web';
import * as i18n from '@solid-primitives/i18n';
import en from './locale/en';
import './index.css';
import App from './App';
import { Route, Router } from '@solidjs/router';
import { getRoutes } from './route';
import { createEffect, createSignal, useContext } from 'solid-js';

import ConfigContext from './context/configContext';
import { BaseRecordDict, Translator } from '@solid-primitives/i18n';
const root = document.getElementById('root');
export type Locale = 'en' | 'zh';
if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  );
}

const Index = () => {
  const context = useContext(ConfigContext);

  const t = () => i18n.translator(() => context?.dict?.());
  const routes = () => {
    const route_list = getRoutes(
      t() as Translator<BaseRecordDict, string>,
      context.lang?.() || 'en'
    );
    const result: any[] = [];
    function getItems(routeItem: any) {
      if (!routeItem.path && !routeItem.items) {
        return;
      }
      if (routeItem.path) {
        result.push(routeItem);
      }
      if (routeItem.items) {
        for (const item of routeItem.items) {
          getItems(item);
        }
      }
    }
    for (const item of route_list) {
      getItems(item);
    }
    return result;
  };
  return (
    <Router root={App}>
      <For each={routes()}>{route => <Route path={route.path} component={route.component} />}</For>
    </Router>
  );
};

render(() => <Index />, root!);
