import { Rects, Primary, Side, Direction, AnchorEnum } from "../types";
import { minMax } from "../util";

import { splitAnchor, getPrimaryDirection } from "../anchor";

type Scroll = { top: number; left: number };

function getPrimaryStyle(
  primary: Primary,
  rects: Rects,
  scroll: Scroll,
  triggerOffset: number
) {
  const prop = primary === "TOP" || primary === "BOTTOM" ? "top" : "left";
  const size = primary === "TOP" || primary === "BOTTOM" ? "height" : "width";

  if (primary === "TOP" || primary === "LEFT") {
    return {
      [prop]:
        rects.trigger[prop] -
        rects.layer[size] -
        (rects.relativeParent[prop] - scroll[prop]) -
        triggerOffset
    };
  }

  return {
    [prop]:
      rects.trigger[prop] +
      rects.trigger[size] -
      (rects.relativeParent[prop] - scroll[prop]) +
      triggerOffset
  };
}

function getCenter(
  rects: Rects,
  scroll: Scroll,
  offsetSecondary: number,
  prop: "top" | "left",
  size: "width" | "height"
) {
  return minMax(
    rects.trigger[prop] -
      rects.relativeParent[prop] +
      scroll[prop] +
      rects.trigger[size] / 2 -
      rects.layer[size] / 2 -
      offsetSecondary,
    getLimits(rects, scroll)[prop]
  );
}

function getLimits(rects: Rects, scroll: Scroll) {
  const topBase = rects.trigger.top - rects.relativeParent.top + scroll.top;
  const leftBase = rects.trigger.left - rects.relativeParent.left + scroll.left;

  return {
    top: {
      min: topBase - (rects.layer.height - rects.arrow.height),
      max: topBase + (rects.trigger.height - rects.arrow.height)
    },
    left: {
      min: leftBase - (rects.layer.width - rects.arrow.width),
      max: leftBase + (rects.trigger.width - rects.arrow.width)
    }
  };
}

function getSecondaryStyle(
  secondary: Side,
  rects: Rects,
  scroll: Scroll,
  offsetSecondary: number,
  primaryDirection: Direction
) {
  if (secondary === "CENTER") {
    const prop = primaryDirection === "X" ? "top" : "left";
    const size = primaryDirection === "X" ? "height" : "width";

    return {
      [prop]: getCenter(rects, scroll, offsetSecondary, prop, size)
    };
  }

  const prop = secondary === "TOP" || secondary === "BOTTOM" ? "top" : "left";
  const size =
    secondary === "TOP" || secondary === "BOTTOM" ? "height" : "width";

  if (secondary === "TOP" || secondary === "LEFT") {
    return {
      [prop]: minMax(
        rects.trigger[prop] -
          rects.relativeParent[prop] +
          scroll[prop] +
          offsetSecondary,
        getLimits(rects, scroll)[prop]
      )
    };
  }

  return {
    [prop]: minMax(
      rects.trigger[prop] +
        rects.trigger[size] -
        rects.layer[size] -
        (rects.relativeParent[prop] - scroll[prop]) -
        offsetSecondary,
      getLimits(rects, scroll)[prop]
    )
  };
}

type GetAbsolutePositionsArgs = {
  anchor: AnchorEnum;
  rects: Rects;
  scrollTop: number;
  scrollLeft: number;
  triggerOffset: number;
  offsetSecondary: number;
};

export default function getAbsolutePositions({
  anchor,
  rects,
  triggerOffset,
  offsetSecondary,
  scrollLeft,
  scrollTop
}: GetAbsolutePositionsArgs) {
  const scroll: Scroll = { left: scrollLeft, top: scrollTop };

  if (anchor === "CENTER") {
    return {
      top: getCenter(rects, scroll, 0, "top", "height"),
      left: getCenter(rects, scroll, 0, "left", "width")
    };
  }

  const { primary, secondary } = splitAnchor(anchor);
  const primaryDirection = getPrimaryDirection(anchor);

  return {
    ...getPrimaryStyle(primary, rects, scroll, triggerOffset),
    ...getSecondaryStyle(
      secondary,
      rects,
      scroll,
      offsetSecondary,
      primaryDirection
    )
  } as React.CSSProperties;
}
