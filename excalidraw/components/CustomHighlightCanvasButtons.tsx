import React from "react";

import { sceneCoordsToViewportCoords } from "@excalidraw/common";

import { getElementAbsoluteCoords } from "@excalidraw/element";

import type {
  ElementsMap,
  NonDeletedExcalidrawElement,
} from "@excalidraw/element/types";

import { getSelectedElements } from "../scene";

import { ElementCanvasButton } from "./MagicButton";
import { useExcalidrawAppState, useExcalidrawActionManager } from "./App";

import type { AppClassProperties } from "../types";

// Custom icons
const HighlightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ClearIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zM7 6h10v13H7V6zm2 2v9h2V8H9zm4 0v9h2V8h-2z" />
  </svg>
);

const DuplicateHighlightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
  </svg>
);

interface CustomHighlightCanvasButtonsProps {
  elements: readonly NonDeletedExcalidrawElement[];
  elementsMap: ElementsMap;
  app: AppClassProperties;
}

export const CustomHighlightCanvasButtons: React.FC<
  CustomHighlightCanvasButtonsProps
> = ({ elements, elementsMap, app }) => {
  const appState = useExcalidrawAppState();
  const actionManager = useExcalidrawActionManager();

  const selectedElements = getSelectedElements(elements, appState);

  // Don't show if no elements selected or in certain states
  if (
    selectedElements.length === 0 ||
    appState.contextMenu ||
    appState.newElement ||
    appState.resizingElement ||
    appState.isRotating ||
    appState.openMenu ||
    appState.viewModeEnabled ||
    appState.editingTextElement
  ) {
    return null;
  }

  // Check if selection is a group that contains arrow with start and end points
  const isGroupWithArrowAndPoints = () => {
    // Must have more than one element (indicating a group selection)
    if (selectedElements.length <= 1) {
      return false;
    }

    // Check if there's an arrow with both start and end bindings in the selection
    const hasArrowWithPoints = selectedElements.some((el) => {
      return (
        el.type === "arrow" &&
        el.startBinding !== null &&
        el.endBinding !== null
      );
    });

    return hasArrowWithPoints;
  };

  // Only show custom buttons if we have a group with arrow and connection points
  if (!isGroupWithArrowAndPoints()) {
    return null;
  }

  // Get the first selected element to position buttons near
  const targetElement = selectedElements[0];

  // Check if any selected elements are highlighted
  const hasHighlighted = selectedElements.some(
    (el) => el.backgroundColor === "#ffe066" && el.strokeColor === "#ff6b6b",
  );

  const executeCustomAction = (actionName: string) => {
    console.log(`🎨 Executing custom action: ${actionName}`);
    const action =
      actionManager.actions[actionName as keyof typeof actionManager.actions];
    if (action) {
      actionManager.executeAction(action, "ui");
    }
  };

  // Custom positioning logic - place buttons below the center of the group
  const getCustomContainerCoords = () => {
    // Calculate bounding box of all selected elements (group)
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    selectedElements.forEach((element) => {
      const [x1, y1] = getElementAbsoluteCoords(element, elementsMap);
      const x2 = x1 + element.width;
      const y2 = y1 + element.height;

      minX = Math.min(minX, x1);
      minY = Math.min(minY, y1);
      maxX = Math.max(maxX, x2);
      maxY = Math.max(maxY, y2);
    });

    // Center X position of the group
    const groupCenterX = (minX + maxX) / 2;
    // Bottom Y position of the group
    const groupBottomY = maxY;

    const { x: viewportX, y: viewportY } = sceneCoordsToViewportCoords(
      { sceneX: groupCenterX, sceneY: groupBottomY },
      appState,
    );

    // Center the buttons container horizontally
    const x = viewportX - appState.offsetLeft;
    const y = viewportY - appState.offsetTop + 10; // Small gap below group
    return { x, y };
  };

  const { x, y } = getCustomContainerCoords();

  return (
    <div
      className="excalidraw-canvas-buttons"
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        background: "transparent",
        boxShadow: "none",
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        transform: "translateX(-50%)", // Center horizontally
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.375rem",
          padding: "5px",
          boxShadow: "0px 2px 4px 0 rgb(0 0 0 / 30%)",
          zIndex: "var(--zIndex-canvasButtons)",
          background: "var(--island-bg-color)",
          borderRadius: "var(--border-radius-lg)",
        }}
      >
        {/* Custom Highlight Button */}
        <ElementCanvasButton
          title="Apply custom highlight effect"
          icon={HighlightIcon}
          checked={hasHighlighted}
          onChange={() => executeCustomAction("customHighlight")}
        />
        Ask Arisa
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.375rem",
          padding: "5px",
          boxShadow: "0px 2px 4px 0 rgb(0 0 0 / 30%)",
          zIndex: "var(--zIndex-canvasButtons)",
          background: "var(--island-bg-color)",
          borderRadius: "var(--border-radius-lg)",
        }}
      >
        {/* Duplicate & Highlight Button */}
        <ElementCanvasButton
          title="Duplicate and highlight"
          icon={DuplicateHighlightIcon}
          checked={false}
          onChange={() => executeCustomAction("duplicateAndHighlight")}
        />
        Duplicate & Highlight
      </div>

      {/* Clear Highlight Button - only show if there are highlighted elements */}
      {hasHighlighted && (
        <ElementCanvasButton
          title="Clear highlight effect"
          icon={ClearIcon}
          checked={false}
          onChange={() => executeCustomAction("clearHighlight")}
        />
      )}
    </div>
  );
};
