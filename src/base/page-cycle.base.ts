import { JSMLUpdater } from '../core/updater';
import { JSMLPageFragment } from '../core/fragment';
import { JSMLElement } from '../interfaces';

export abstract class JSMLPageCycle {
  abstract updater?: JSMLUpdater;

  abstract render(): JSMLElement[];
  abstract onStart?(currentInstance: JSMLPageCycle): void;
  abstract onRender?(pageFragment: JSMLPageFragment): void;
  abstract onUpdate?(): void;
}
