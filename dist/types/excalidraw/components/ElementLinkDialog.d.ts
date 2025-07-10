import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { Scene } from "@excalidraw/element";
import "./ElementLinkDialog.scss";
import type { AppProps, UIAppState } from "../types";
declare const ElementLinkDialog: ({ sourceElementId, onClose, appState, scene, generateLinkForSelection, }: {
    sourceElementId: ExcalidrawElement["id"];
    appState: UIAppState;
    scene: Scene;
    onClose?: (() => void) | undefined;
    generateLinkForSelection: AppProps["generateLinkForSelection"];
}) => import("react/jsx-runtime").JSX.Element;
export default ElementLinkDialog;
