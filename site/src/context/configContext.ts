import { BaseRecordDict, Translator } from '@solid-primitives/i18n';
import { Accessor, createContext } from 'solid-js';
export type Locale = 'en-US' | 'zh-CN';

export default createContext<{
  lang?: Accessor<Locale>;
  dict?: Accessor<Record<string, any>>;
}>({});
