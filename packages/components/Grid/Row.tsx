import { JSX, splitProps } from "solid-js";
import { RowProps } from "./interface";
import classNames from "classnames";
import { RowContext } from "./RowContext";

const BASE_PREFIX = "sld-row";
const Row: RowProps = (props) => {
  const [local, rest] = splitProps(props, ["gutter", "class", "style"]);
  const mergeCls = () => classNames(`${BASE_PREFIX}-container`, local.class);
  const horizontalGutter = () => {
    if (typeof local.gutter === "number") {
      return local.gutter;
    } else if (Array.isArray(local.gutter)) {
      return local.gutter[0] || 0;
    }
  };
  const verticalGutter = () => {
    if (typeof local.gutter === "number") {
      return 0;
    } else if (Array.isArray(local.gutter)) {
      return local.gutter[1] || 0;
    }
  };
  const gap = () => {
    if (typeof props.gutter === "number") {
      return {
        rowStyle: {
          "margin-left": `-${props.gutter / 2}px`,
          "margin-right": `-${props.gutter / 2}px`,
          ...(local.style as JSX.CSSProperties),
        },
      };
    } else if (Array.isArray(props.gutter)) {
      return {
        rowStyle: {
          "margin-left": `-${(props.gutter[0] || 0) / 2}px`,
          "margin-right": `-${(props.gutter[0] || 0) / 2}px`,
          "row-gap": `${props.gutter[1] || 0}px`,
          ...(local.style as JSX.CSSProperties),
        },
      };
    }
    return {
      ...(local.style as JSX.CSSProperties),
    };
  };
  return (
    <RowContext.Provider
      value={{
        horizontalGutter: horizontalGutter(),
        verticalGutter: verticalGutter(),
      }}
    >
      <div class={mergeCls()} style={gap()?.rowStyle} {...rest}>
        {props.children}
      </div>
    </RowContext.Provider>
  );
};
export default Row;
