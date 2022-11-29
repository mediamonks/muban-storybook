declare module '*.hbs?include';
declare module '*.json';
declare module '*.yml';
declare module '*.yaml' {
  const content: { [key: string]: any };
  export default content;
}

declare module 'lerp' {
  export default function lerp(oldValue: number, newValue: number, amount: number): number;
}

type Constructor<T = {}> = new (...args: any[]) => T;

declare module 'gsap/Draggable' {
  export default class Draggable {
    public static create: any;
    public static update: any;
    public static kill: any;
    public static applyBounds: any;

    [key: string]: any;
  }
}

declare module '*.glsl' {
  const exp: string;
  export default exp;
}

declare module '*.png' {
  const exp: string;
  export default exp;
}

declare module 'gsap/ScrollToPlugin' {
  export default class ScrollToPlugin {
    public static create: any;

    [key: string]: any;
  }
}

declare module 'fit-rect';

declare module 'dom-focus-lock' {
  export function on(element: HTMLElement): void;

  export function off(element: HTMLElement): void;
}

// declare const process: {
//   env: {
//     NODE_ENV: 'production' | 'development';
//   };
// };

interface Window {
  webpackPublicPath: string;
  onRecaptchaLoaded: () => void;
  Aem: boolean;
  ResizeObserver: typeof ResizeObserver;
  bodymovin?: import('lottie-web/build/player/lottie_light').LottiePlayer;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
}

type CSSOMString = string;
type FontFaceLoadStatus = 'unloaded' | 'loading' | 'loaded' | 'error';
type FontFaceSetStatus = 'loading' | 'loaded';

interface FontFace {
  family: CSSOMString;
  style: CSSOMString;
  weight: CSSOMString;
  stretch: CSSOMString;
  unicodeRange: CSSOMString;
  variant: CSSOMString;
  featureSettings: CSSOMString;
  variationSettings: CSSOMString;
  display: CSSOMString;
  readonly status: FontFaceLoadStatus;
  readonly loaded: Promise<FontFace>;
  load(): Promise<FontFace>;
}

interface FontFaceSet {
  readonly status: FontFaceSetStatus;
  readonly ready: Promise<FontFaceSet>;
  check(font: string, text?: string): Boolean;
  load(font: string, text?: string): Promise<FontFace[]>;
}

interface Document {
  fonts: FontFaceSet;
}

interface ResizeObserverOptions {
  /**
   * Sets which box model the observer will observe changes to. Possible values
   * are `content-box` (the default), and `border-box`.
   *
   * @default 'content-box'
   */
  box?: 'content-box' | 'border-box' | 'device-pixel-content-box' | undefined;
}

interface ResizeObserverSize {
  readonly inlineSize: number;
  readonly blockSize: number;
}

interface ResizeObserver {
  disconnect(): void;
  observe(target: Element, options?: ResizeObserverOptions): void;
  unobserve(target: Element): void;
}

declare var ResizeObserver: {
  new (callback: ResizeObserverCallback): ResizeObserver;
  prototype: ResizeObserver;
};

interface ResizeObserverCallback {
  (entries: ResizeObserverEntry[], observer: ResizeObserver): void;
}

interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize: ReadonlyArray<ResizeObserverSize>;
  readonly contentBoxSize: ReadonlyArray<ResizeObserverSize>;
  readonly devicePixelContentBoxSize: ReadonlyArray<ResizeObserverSize>;
}

type LoadTemplateImport<T> = Promise<{ default: (data?: T) => string }>;
