import { type AnimationFrameHandler } from "../animation-frame-handler";
import { AnimatedTrail } from "../animated-trail";
import type App from "../components/App";
export declare class LassoTrail extends AnimatedTrail {
    private intersectedElements;
    private enclosedElements;
    private elementsSegments;
    private canvasTranslate;
    private keepPreviousSelection;
    constructor(animationFrameHandler: AnimationFrameHandler, app: App);
    startPath(x: number, y: number, keepPreviousSelection?: boolean): void;
    selectElementsFromIds: (ids: string[]) => void;
    addPointToPath: (x: number, y: number, keepPreviousSelection?: boolean) => void;
    private updateSelection;
    endPath(): void;
}
