import { PageFragment } from '../core/fragment.core';
import { Component } from '../interfaces';

export abstract class PagePhase {
  abstract render(): Component[];
  abstract onStart?(currentInstance: PagePhase): void;
  abstract onRender?(pageFragment: PageFragment): void;
  abstract onUpdate?(): void;
}
