import type {
  AppState,
  NormalizedZoomValue,
  NullableGridSize,
  PointerDownState,
} from "excalidraw-custom/types";
import type { NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import type { Scene } from "./Scene";
export declare const dragSelectedElements: (
  pointerDownState: PointerDownState,
  _selectedElements: NonDeletedExcalidrawElement[],
  offset: {
    x: number;
    y: number;
  },
  scene: Scene,
  snapOffset: {
    x: number;
    y: number;
  },
  gridSize: NullableGridSize
) => void;
export declare const getDragOffsetXY: (
  selectedElements: NonDeletedExcalidrawElement[],
  x: number,
  y: number
) => [number, number];
export declare const dragNewElement: ({
  newElement,
  elementType,
  originX,
  originY,
  x,
  y,
  width,
  height,
  shouldMaintainAspectRatio,
  shouldResizeFromCenter,
  zoom,
  scene,
  widthAspectRatio,
  originOffset,
  informMutation,
}: {
  newElement: NonDeletedExcalidrawElement;
  elementType: AppState["activeTool"]["type"];
  originX: number;
  originY: number;
  x: number;
  y: number;
  width: number;
  height: number;
  shouldMaintainAspectRatio: boolean;
  shouldResizeFromCenter: boolean;
  zoom: NormalizedZoomValue;
  scene: Scene;
  /** whether to keep given aspect ratio when `isResizeWithSidesSameLength` is
        true */
  widthAspectRatio?: number | null | undefined;
  originOffset?:
    | {
        x: number;
        y: number;
      }
    | null
    | undefined;
  informMutation?: boolean | undefined;
}) => void;
