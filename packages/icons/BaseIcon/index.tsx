import classNames from "classnames";
import { JSX, splitProps } from "solid-js";

const BaseIcon = (
  props: JSX.IntrinsicElements["span"] & { svgIcon: string }
) => {
  const [local, rest] = splitProps(props, ["svgIcon", "class"]);
  const mergeCls=classNames(local.class,'sld-icon-base')
  return <span {...rest} class={mergeCls} innerHTML={local.svgIcon} />;
};
export default BaseIcon;
