import React from "react";
import type { ElementsMap, NonDeletedExcalidrawElement } from "@excalidraw/element/types";
import type { AppClassProperties } from "../types";
interface CustomHighlightCanvasButtonsProps {
    elements: readonly NonDeletedExcalidrawElement[];
    elementsMap: ElementsMap;
    app: AppClassProperties;
}
export declare const CustomHighlightCanvasButtons: React.FC<CustomHighlightCanvasButtonsProps>;
export {};
