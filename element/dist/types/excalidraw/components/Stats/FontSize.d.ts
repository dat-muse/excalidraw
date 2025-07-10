import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import type { AppState } from "../../types";
interface FontSizeProps {
    element: ExcalidrawElement;
    scene: Scene;
    appState: AppState;
    property: "fontSize";
}
declare const FontSize: ({ element, scene, appState, property }: FontSizeProps) => import("react/jsx-runtime").JSX.Element | null;
export default FontSize;
