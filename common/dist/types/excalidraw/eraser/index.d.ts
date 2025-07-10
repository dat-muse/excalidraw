import { AnimatedTrail } from "../animated-trail";
import type { AnimationFrameHandler } from "../animation-frame-handler";
import type App from "../components/App";
export declare class EraserTrail extends AnimatedTrail {
    private elementsToErase;
    private groupsToErase;
    constructor(animationFrameHandler: AnimationFrameHandler, app: App);
    startPath(x: number, y: number): void;
    addPointToPath(x: number, y: number, restore?: boolean): string[];
    private updateElementsToBeErased;
    endPath(): void;
}
