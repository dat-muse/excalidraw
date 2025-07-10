import { randomId, arrayToMap } from "@excalidraw/common";
import { newElementWith, duplicateElements } from "@excalidraw/element";
import { CaptureUpdateAction } from "@excalidraw/element";
import { isTextElement } from "@excalidraw/element";

import { ToolButton } from "../components/ToolButton";
import { t } from "../i18n";
import { getSelectedElements } from "../scene";

import { register } from "./register";

// Simple API call function
const callApi = async (action: string, data: any) => {
  try {
    console.log(`🌐 API Call: ${action}`, data);

    // Dùng JSONPlaceholder làm demo API - thay bằng URL thật của bạn
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action,
        elementData: data,
        timestamp: Date.now(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    console.log(`✅ API Response:`, result);

    return { success: true, data: result };
  } catch (error) {
    console.error(`❌ API Error:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Custom icon
const HighlightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const actionCustomHighlight = register({
  name: "customHighlight",
  label: "Custom Highlight",
  icon: HighlightIcon,
  trackEvent: { category: "element", action: "highlight" },

  perform: async (elements, appState, _, app) => {
    console.log("🎨 Custom Highlight action triggered!");
    const selectedElements = getSelectedElements(elements, appState);

    if (selectedElements.length === 0) {
      return {
        elements,
        appState: {
          ...appState,
          errorMessage: "Please select elements to highlight",
        },
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      };
    }

    // Prepare API data
    const elementIds = selectedElements.map((el) => el.id);
    const apiData = {
      elementIds,
      action: "highlight",
      colors: { background: "#ffe066", stroke: "#ff6b6b" },
    };

    console.log("🔄 Calling API...");

    try {
      // Call API
      const apiResponse = await callApi("highlight", apiData);

      if (!apiResponse.success) {
        return {
          elements,
          appState: {
            ...appState,
            errorMessage: `API Error: ${apiResponse.error}`,
            toast: {
              message: `❌ API failed: ${apiResponse.error}`,
              closable: true,
            },
          },
          captureUpdate: CaptureUpdateAction.IMMEDIATELY,
        };
      }

      // Update elements với highlight
      const updatedElements = elements.map((element) => {
        if (appState.selectedElementIds[element.id]) {
          return newElementWith(element, {
            backgroundColor: "#ffe066",
            strokeColor: "#ff6b6b",
            strokeWidth: Math.max(element.strokeWidth, 2),
          });
        }
        return element;
      });

      return {
        elements: updatedElements,
        appState: {
          ...appState,
          toast: {
            message: `✅ Highlighted ${selectedElements.length} element(s) and saved to API!`,
            closable: true,
          },
        },
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      };
    } catch (error) {
      console.error("API call failed:", error);
      return {
        elements,
        appState: {
          ...appState,
          errorMessage: "Failed to connect to server",
          toast: {
            message: "❌ Network error. Highlight not saved.",
            closable: true,
          },
        },
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      };
    }
  },

  predicate: (elements, appState) => {
    return Object.keys(appState.selectedElementIds).length > 0;
  },

  PanelComponent: ({ elements, appState, updateData }) => {
    const selectedElements = getSelectedElements(elements, appState);
    const isHighlighted = selectedElements.some(
      (el) => el.backgroundColor === "#ffe066" && el.strokeColor === "#ff6b6b",
    );

    return (
      <ToolButton
        type="button"
        icon={HighlightIcon}
        aria-label="Highlight selected elements"
        title="Apply custom highlight effect to selected elements"
        onClick={() => updateData(null)}
        selected={isHighlighted}
        className="custom-highlight-button"
      />
    );
  },
});

export const actionClearHighlight = register({
  name: "clearHighlight",
  label: "Clear Highlight",
  trackEvent: { category: "element", action: "clear-highlight" },

  perform: async (elements, appState, _, app) => {
    console.log("🧹 Clear Highlight action triggered!");
    const selectedElements = getSelectedElements(elements, appState);

    if (selectedElements.length === 0) {
      return {
        elements,
        appState: {
          ...appState,
          errorMessage: "Please select elements to clear highlight",
        },
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      };
    }

    // Call API
    const elementIds = selectedElements.map((el) => el.id);
    console.log("🔄 Calling clear API...");

    try {
      const apiResponse = await callApi("clear", { elementIds });

      if (!apiResponse.success) {
        return {
          elements,
          appState: {
            ...appState,
            toast: {
              message: `❌ API failed: ${apiResponse.error}`,
              closable: true,
            },
          },
          captureUpdate: CaptureUpdateAction.IMMEDIATELY,
        };
      }

      // Clear highlight
      const updatedElements = elements.map((element) => {
        if (appState.selectedElementIds[element.id]) {
          return newElementWith(element, {
            backgroundColor: "transparent",
            strokeColor: "#1e1e1e",
            strokeWidth: 1,
          });
        }
        return element;
      });

      return {
        elements: updatedElements,
        appState: {
          ...appState,
          toast: {
            message: `✅ Cleared ${selectedElements.length} element(s) and updated API!`,
            closable: true,
          },
        },
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      };
    } catch (error) {
      console.error("API call failed:", error);
      return {
        elements,
        appState: {
          ...appState,
          toast: {
            message: "❌ Network error. Clear not saved.",
            closable: true,
          },
        },
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      };
    }
  },

  predicate: (elements, appState) => {
    const selectedElements = getSelectedElements(elements, appState);
    return selectedElements.some(
      (el) => el.backgroundColor === "#ffe066" && el.strokeColor === "#ff6b6b",
    );
  },

  PanelComponent: ({ elements, appState, updateData }) => {
    const selectedElements = getSelectedElements(elements, appState);
    const hasHighlighted = selectedElements.some(
      (el) => el.backgroundColor === "#ffe066" && el.strokeColor === "#ff6b6b",
    );

    if (!hasHighlighted) {
      return null;
    }

    return (
      <ToolButton
        type="button"
        icon={<span>🧹</span>}
        aria-label="Clear highlight from selected elements"
        title="Remove custom highlight effect"
        onClick={() => updateData(null)}
        className="clear-highlight-button"
      />
    );
  },
});

export const actionDuplicateAndHighlight = register({
  name: "duplicateAndHighlight",
  label: "Duplicate & Highlight",
  trackEvent: { category: "element", action: "duplicate-highlight" },

  perform: async (elements, appState, _, app) => {
    console.log("🎨 Duplicate & Highlight action triggered!");
    const selectedElements = getSelectedElements(elements, appState);

    if (selectedElements.length === 0) {
      return {
        elements,
        appState: {
          ...appState,
          errorMessage: "Please select elements to duplicate and highlight",
        },
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      };
    }

    // Call API
    const elementIds = selectedElements.map((el) => el.id);
    console.log("🔄 Calling duplicate API...");

    try {
      const apiResponse = await callApi("duplicate", {
        elementIds,
        action: "duplicate",
        colors: { background: "#66d9ef", stroke: "#a6e22e" },
      });

      // Duplicate elements (regardless của API result)
      const { duplicatedElements, elementsWithDuplicates } = duplicateElements({
        type: "in-place",
        elements,
        idsOfElementsToDuplicate: arrayToMap(selectedElements),
        appState,
        randomizeSeed: true,
        overrides: ({ origElement }) => ({
          x: origElement.x + 50,
          y: origElement.y + 50,
          backgroundColor: "#66d9ef",
          strokeColor: "#a6e22e",
          strokeWidth: Math.max(origElement.strokeWidth, 2),
        }),
      });

      const newSelectedElementIds = duplicatedElements.reduce((acc, el) => {
        acc[el.id] = true;
        return acc;
      }, {} as Record<string, true>);

      const message = apiResponse.success
        ? `✅ Duplicated ${selectedElements.length} element(s) and logged to API!`
        : `⚠️ Duplicated locally but API failed: ${apiResponse.error}`;

      return {
        elements: elementsWithDuplicates,
        appState: {
          ...appState,
          selectedElementIds: newSelectedElementIds,
          toast: {
            message,
            closable: true,
          },
        },
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      };
    } catch (error) {
      console.error("API call failed:", error);

      // Still duplicate even if API fails
      const { duplicatedElements, elementsWithDuplicates } = duplicateElements({
        type: "in-place",
        elements,
        idsOfElementsToDuplicate: arrayToMap(selectedElements),
        appState,
        randomizeSeed: true,
        overrides: ({ origElement }) => ({
          x: origElement.x + 50,
          y: origElement.y + 50,
          backgroundColor: "#66d9ef",
          strokeColor: "#a6e22e",
          strokeWidth: Math.max(origElement.strokeWidth, 2),
        }),
      });

      const newSelectedElementIds = duplicatedElements.reduce((acc, el) => {
        acc[el.id] = true;
        return acc;
      }, {} as Record<string, true>);

      return {
        elements: elementsWithDuplicates,
        appState: {
          ...appState,
          selectedElementIds: newSelectedElementIds,
          toast: {
            message: "⚠️ Duplicated locally but network error",
            closable: true,
          },
        },
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      };
    }
  },

  predicate: (elements, appState) => {
    return Object.keys(appState.selectedElementIds).length > 0;
  },

  PanelComponent: ({ elements, appState, updateData }) => {
    return (
      <ToolButton
        type="button"
        icon={<span>🎨</span>}
        aria-label="Duplicate and highlight selected elements"
        title="Create highlighted duplicates of selected elements"
        onClick={() => updateData(null)}
        className="duplicate-highlight-button"
      />
    );
  },
});
