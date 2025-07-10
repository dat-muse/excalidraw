import type { GlobalPoint, LineSegment } from "@excalidraw/math";
import type { FrameNameBounds } from "excalidraw-custom/types";
import type { ElementsMap, ExcalidrawElement } from "./types";
export declare const shouldTestInside: (element: ExcalidrawElement) => boolean;
export type HitTestArgs = {
  point: GlobalPoint;
  element: ExcalidrawElement;
  threshold: number;
  elementsMap: ElementsMap;
  frameNameBound?: FrameNameBounds | null;
};
export declare const hitElementItself: ({
  point,
  element,
  threshold,
  elementsMap,
  frameNameBound,
}: HitTestArgs) => boolean;
export declare const hitElementBoundingBox: (
  point: GlobalPoint,
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  tolerance?: number
) => boolean;
export declare const hitElementBoundingBoxOnly: (
  hitArgs: HitTestArgs,
  elementsMap: ElementsMap
) => boolean;
export declare const hitElementBoundText: (
  point: GlobalPoint,
  element: ExcalidrawElement,
  elementsMap: ElementsMap
) => boolean;
/**
 * Intersect a line with an element for binding test
 *
 * @param element
 * @param line
 * @param offset
 * @returns
 */
export declare const intersectElementWithLineSegment: (
  element: ExcalidrawElement,
  elementsMap: ElementsMap,
  line: LineSegment<GlobalPoint>,
  offset?: number,
  onlyFirst?: boolean
) => GlobalPoint[];
/**
 * Check if the given point is considered inside the element's border
 *
 * @param point
 * @param element
 * @returns
 */
export declare const isPointInElement: (
  point: GlobalPoint,
  element: ExcalidrawElement,
  elementsMap: ElementsMap
) => boolean;
