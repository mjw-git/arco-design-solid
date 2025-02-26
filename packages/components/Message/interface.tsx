import { JSX } from "solid-js";
export type InnerMessageParams = {
  type: "success" | "warn" | "info" | "error";
  text: string;
  duration?: number;
  timer?: NodeJS.Timeout | null;
  icon?: JSX.Element;
};
export type MessageParams = { duration?: number; icon?: JSX.Element };
