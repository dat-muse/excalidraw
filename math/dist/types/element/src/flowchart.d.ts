import type { AppState, PendingExcalidrawElements } from "@excalidraw/excalidraw/types";
import { type ElementsMap, type ExcalidrawBindableElement, type ExcalidrawElement, type ExcalidrawFlowchartNodeElement } from "./types";
import type { Scene } from "./Scene";
type LinkDirection = "up" | "right" | "down" | "left";
export declare const getLinkDirectionFromKey: (key: string) => LinkDirection;
export declare const getPredecessors: (node: ExcalidrawBindableElement, elementsMap: ElementsMap, direction: LinkDirection) => ExcalidrawBindableElement[];
export declare const addNewNodes: (startNode: ExcalidrawFlowchartNodeElement, appState: AppState, direction: LinkDirection, scene: Scene, numberOfNodes: number) => ExcalidrawElement[];
export declare class FlowChartNavigator {
    isExploring: boolean;
    private sameLevelNodes;
    private sameLevelIndex;
    private direction;
    private visitedNodes;
    clear(): void;
    exploreByDirection(element: ExcalidrawElement, elementsMap: ElementsMap, direction: LinkDirection): ExcalidrawElement["id"] | null;
}
export declare class FlowChartCreator {
    isCreatingChart: boolean;
    private numberOfNodes;
    private direction;
    pendingNodes: PendingExcalidrawElements | null;
    createNodes(startNode: ExcalidrawFlowchartNodeElement, appState: AppState, direction: LinkDirection, scene: Scene): void;
    clear(): void;
}
export declare const isNodeInFlowchart: (element: ExcalidrawFlowchartNodeElement, elementsMap: ElementsMap) => boolean;
export {};
