import type { ExcalidrawElement, NonDeletedExcalidrawElement, NonDeleted, ElementsMapOrArray } from "./types";
/**
 * @deprecated unsafe, use hashElementsVersion instead
 */
export declare const getSceneVersion: (elements: readonly ExcalidrawElement[]) => number;
/**
 * Hashes elements' versionNonce (using djb2 algo). Order of elements matters.
 */
export declare const hashElementsVersion: (elements: ElementsMapOrArray) => number;
export declare const hashString: (s: string) => number;
export declare const getVisibleElements: (elements: readonly ExcalidrawElement[]) => readonly NonDeletedExcalidrawElement[];
export declare const getNonDeletedElements: <T extends ExcalidrawElement>(elements: readonly T[]) => readonly NonDeleted<T>[];
export declare const isNonDeletedElement: <T extends ExcalidrawElement>(element: T) => element is NonDeleted<T>;
export declare const clearElementsForDatabase: (elements: readonly ExcalidrawElement[]) => ExcalidrawElement[];
export declare const clearElementsForExport: (elements: readonly ExcalidrawElement[]) => ExcalidrawElement[];
export declare const clearElementsForLocalStorage: (elements: readonly ExcalidrawElement[]) => ExcalidrawElement[];
export * from "./align";
export * from "./binding";
export * from "./bounds";
export * from "./collision";
export * from "./comparisons";
export * from "./containerCache";
export * from "./cropElement";
export * from "./delta";
export * from "./distance";
export * from "./distribute";
export * from "./dragElements";
export * from "./duplicate";
export * from "./elbowArrow";
export * from "./elementLink";
export * from "./embeddable";
export * from "./flowchart";
export * from "./fractionalIndex";
export * from "./frame";
export * from "./groups";
export * from "./heading";
export * from "./image";
export * from "./linearElementEditor";
export * from "./mutateElement";
export * from "./newElement";
export * from "./renderElement";
export * from "./resizeElements";
export * from "./resizeTest";
export * from "./Scene";
export * from "./selection";
export * from "./shape";
export * from "./showSelectedShapeActions";
export * from "./sizeHelpers";
export * from "./sortElements";
export * from "./store";
export * from "./textElement";
export * from "./textMeasurements";
export * from "./textWrapping";
export * from "./transformHandles";
export * from "./typeChecks";
export * from "./utils";
export * from "./zindex";
