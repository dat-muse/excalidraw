import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { ColorPickerColor, ColorPaletteCustom } from "@excalidraw/common";
export declare const getColorNameAndShadeFromColor: ({ palette, color, }: {
    palette: ColorPaletteCustom;
    color: string | null;
}) => {
    colorName: ColorPickerColor;
    shade: number | null;
} | null;
export declare const colorPickerHotkeyBindings: string[];
export declare const isCustomColor: ({ color, palette, }: {
    color: string;
    palette: ColorPaletteCustom;
}) => boolean;
export declare const getMostUsedCustomColors: (elements: readonly ExcalidrawElement[], type: "elementBackground" | "elementStroke", palette: ColorPaletteCustom) => string[];
export type ActiveColorPickerSectionAtomType = "custom" | "baseColors" | "shades" | "hex" | null;
export declare const activeColorPickerSectionAtom: import("jotai/vanilla/atom").PrimitiveAtom<ActiveColorPickerSectionAtomType> & {
    init: ActiveColorPickerSectionAtomType;
};
export declare const isColorDark: (color: string, threshold?: number) => boolean;
export type ColorPickerType = "canvasBackground" | "elementBackground" | "elementStroke";
