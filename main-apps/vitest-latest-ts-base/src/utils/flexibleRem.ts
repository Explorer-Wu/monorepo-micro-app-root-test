import { debounce } from 'lodash-es';
import { resolveScreenMode, roundScreenValue, screenAdapterConfig, type ScreenFitStrategy, type ScreenMode } from '../../screen-config/screenAdapter';

export interface ScreenAdapterState {
        dpr: number;
        viewportWidth: number;
        viewportHeight: number;
        layoutWidth: number;
        layoutHeight: number;
        scale: number;
        overscanScale: number;
        rem: number;
        bodyFontSize: number;
        screenMode: ScreenMode;
        minFallbackTriggered: boolean;
        safeAreaSize: {
                width: number;
                height: number;
                offsetX: number;
                offsetY: number;
        };
        overscanAreaSize: {
                width: number;
                height: number;
        };
        strategy: {
                content: ScreenFitStrategy;
                decoration: ScreenFitStrategy;
        };
}

type ScreenAdapterListener = (state: ScreenAdapterState) => void;

const SCREEN_ADAPTER_CHANGE_EVENT = 'screen-adapter:change';
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

function createInitialState(): ScreenAdapterState {
        const layoutWidth = screenAdapterConfig.designWidth;
        const layoutHeight = screenAdapterConfig.designHeight;

        return {
                dpr: 1,
                viewportWidth: layoutWidth,
                viewportHeight: layoutHeight,
                layoutWidth,
                layoutHeight,
                scale: 1,
                overscanScale: 1,
                rem: screenAdapterConfig.baseRemSize,
                bodyFontSize: screenAdapterConfig.baseRemSize,
                screenMode: 'exact-16-9',
                minFallbackTriggered: false,
                safeAreaSize: {
                        width: layoutWidth,
                        height: layoutHeight,
                        offsetX: 0,
                        offsetY: 0,
                },
                overscanAreaSize: {
                        width: layoutWidth,
                        height: layoutHeight,
                },
                strategy: {
                        content: screenAdapterConfig.contentFitStrategy,
                        decoration: screenAdapterConfig.overscanStrategy,
                },
        };
}

function getViewportSize() {
        const docEl = document.documentElement;
        const docBody = document.body;

        return {
                width: window.innerWidth || docBody?.clientWidth || docEl.clientWidth || screenAdapterConfig.designWidth,
                height: window.innerHeight || docBody?.clientHeight || docEl.clientHeight || screenAdapterConfig.designHeight,
        };
}

function buildScreenAdapterState(): ScreenAdapterState {
        const { width: viewportWidth, height: viewportHeight } = getViewportSize();
        const layoutWidth = Math.max(viewportWidth, screenAdapterConfig.minWidth);
        const layoutHeight = Math.max(viewportHeight, screenAdapterConfig.minHeight);
        const scale = roundScreenValue(Math.min(layoutWidth / screenAdapterConfig.designWidth, layoutHeight / screenAdapterConfig.designHeight));
        const overscanScale = roundScreenValue(Math.max(layoutWidth / screenAdapterConfig.designWidth, layoutHeight / screenAdapterConfig.designHeight));
        const safeAreaWidth = roundScreenValue(screenAdapterConfig.designWidth * scale);
        const safeAreaHeight = roundScreenValue(screenAdapterConfig.designHeight * scale);

        return {
                dpr: window.devicePixelRatio || 1,
                viewportWidth,
                viewportHeight,
                layoutWidth,
                layoutHeight,
                scale,
                overscanScale,
                rem: roundScreenValue(screenAdapterConfig.baseRemSize * scale),
                bodyFontSize: roundScreenValue(screenAdapterConfig.baseRemSize * scale),
                screenMode: resolveScreenMode(layoutWidth, layoutHeight),
                minFallbackTriggered: viewportWidth < screenAdapterConfig.minWidth || viewportHeight < screenAdapterConfig.minHeight,
                safeAreaSize: {
                        width: safeAreaWidth,
                        height: safeAreaHeight,
                        offsetX: roundScreenValue((layoutWidth - safeAreaWidth) / 2),
                        offsetY: roundScreenValue((layoutHeight - safeAreaHeight) / 2),
                },
                overscanAreaSize: {
                        width: roundScreenValue(screenAdapterConfig.designWidth * overscanScale),
                        height: roundScreenValue(screenAdapterConfig.designHeight * overscanScale),
                },
                strategy: {
                        content: screenAdapterConfig.contentFitStrategy,
                        decoration: screenAdapterConfig.overscanStrategy,
                },
        };
}

class ScreenAdapterService {
        private listeners = new Set<ScreenAdapterListener>();
        private state = createInitialState();
        private started = false;

        private readonly handleResize = debounce(
                () => {
                        this.refresh();
                },
                screenAdapterConfig.resizeDebounceMs,
                {
                        maxWait: screenAdapterConfig.resizeMaxWaitMs,
                        leading: false,
                        trailing: true,
                },
        );

        private readonly handlePageShow = (event: PageTransitionEvent) => {
                if (event.persisted) {
                        this.refresh();
                }
        };

        start(): ScreenAdapterState {
                if (!isBrowser) {
                        return this.state;
                }

                if (!this.started) {
                        window.addEventListener('resize', this.handleResize);
                        window.addEventListener('pageshow', this.handlePageShow);
                        this.started = true;
                }

                return this.refresh();
        }

        stop() {
                if (!isBrowser || !this.started) {
                        return;
                }

                window.removeEventListener('resize', this.handleResize);
                window.removeEventListener('pageshow', this.handlePageShow);
                this.handleResize.cancel();
                this.started = false;
        }

        subscribe = (listener: ScreenAdapterListener) => {
                this.listeners.add(listener);

                if (!this.started && isBrowser) {
                        this.start();
                }

                return () => {
                        this.listeners.delete(listener);
                };
        };

        getState = () => this.state;

        refresh = () => {
                if (!isBrowser) {
                        return this.state;
                }

                const nextState = buildScreenAdapterState();
                this.state = nextState;
                this.applyToDocument(nextState);
                this.emit(nextState);
                return nextState;
        };

        private emit(state: ScreenAdapterState) {
                this.listeners.forEach(listener => listener(state));
                window.dispatchEvent(
                        new CustomEvent<ScreenAdapterState>(SCREEN_ADAPTER_CHANGE_EVENT, {
                                detail: state,
                        }),
                );
        }

        private applyToDocument(state: ScreenAdapterState) {
                const docEl = document.documentElement;
                const docBody = document.body;

                docEl.style.fontSize = `${state.rem}px`;
                docEl.style.setProperty('--screen-design-width', `${screenAdapterConfig.designWidth}px`);
                docEl.style.setProperty('--screen-design-height', `${screenAdapterConfig.designHeight}px`);
                docEl.style.setProperty('--screen-min-width', `${screenAdapterConfig.minWidth}px`);
                docEl.style.setProperty('--screen-min-height', `${screenAdapterConfig.minHeight}px`);
                docEl.style.setProperty('--screen-scale', `${state.scale}`);
                docEl.style.setProperty('--screen-overscan-scale', `${state.overscanScale}`);
                docEl.style.setProperty('--screen-rem', `${state.rem}px`);
                docEl.style.setProperty('--screen-safe-area-width', `${state.safeAreaSize.width}px`);
                docEl.style.setProperty('--screen-safe-area-height', `${state.safeAreaSize.height}px`);
                docEl.style.setProperty('--screen-safe-area-offset-x', `${state.safeAreaSize.offsetX}px`);
                docEl.style.setProperty('--screen-safe-area-offset-y', `${state.safeAreaSize.offsetY}px`);
                docEl.style.setProperty('--screen-overscan-width', `${state.overscanAreaSize.width}px`);
                docEl.style.setProperty('--screen-overscan-height', `${state.overscanAreaSize.height}px`);
                docEl.style.setProperty('--screen-layout-width', `${state.layoutWidth}px`);
                docEl.style.setProperty('--screen-layout-height', `${state.layoutHeight}px`);
                docEl.dataset.screenMode = state.screenMode;
                docEl.dataset.screenMinFallback = String(state.minFallbackTriggered);
                docEl.dataset.screenContentFit = state.strategy.content;
                docEl.dataset.screenDecorationFit = state.strategy.decoration;

                if (docBody) {
                        docBody.style.fontSize = `${state.bodyFontSize}px`;
                }
        }
}

export const screenAdapterService = new ScreenAdapterService();

export function getScreenAdapterState() {
        return screenAdapterService.getState();
}

export function subscribeScreenAdapter(listener: ScreenAdapterListener) {
        return screenAdapterService.subscribe(listener);
}

export function startScreenAdapterService() {
        return screenAdapterService.start();
}

export function stopScreenAdapterService() {
        screenAdapterService.stop();
}

export function refreshScreenAdapter() {
        return screenAdapterService.refresh();
}

export function winScale(): number {
        return screenAdapterService.getState().scale;
}

export function winFontSize(px: number): number {
        return roundScreenValue(px * winScale());
}

export function setDocElFontSize() {
        return screenAdapterService.refresh().rem;
}

export function setBodyFontSize() {
        return screenAdapterService.refresh().bodyFontSize;
}

export { SCREEN_ADAPTER_CHANGE_EVENT };
