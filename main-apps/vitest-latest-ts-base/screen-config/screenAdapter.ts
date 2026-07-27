import screenAdapterConfigJson from './screenAdapter.config.json';

export type ScreenFitStrategy = 'contain' | 'cover-safe';
export type ScreenMode = 'exact-16-9' | 'wide-screen' | 'narrow-screen';

interface ScreenAdapterConfig {
        designWidth: number;
        designHeight: number;
        minWidth: number;
        minHeight: number;
        aspectRatio: number;
        contentFitStrategy: ScreenFitStrategy;
        overscanStrategy: ScreenFitStrategy;
        baseRemSize: number;
        postcssRootValue: number;
        precision: number;
        modeTolerance: number;
        resizeDebounceMs: number;
        resizeMaxWaitMs: number;
}

const rawConfig = screenAdapterConfigJson as ScreenAdapterConfig;

export const screenAdapterConfig = Object.freeze({
        ...rawConfig,
        aspectRatio: rawConfig.aspectRatio || rawConfig.designWidth / rawConfig.designHeight,
});

export function roundScreenValue(value: number): number {
        const factor = 10 ** screenAdapterConfig.precision;
        return Math.round(value * factor) / factor;
}

export function resolveScreenMode(width: number, height: number): ScreenMode {
        const ratio = width / height;
        const delta = Math.abs(ratio - screenAdapterConfig.aspectRatio);

        // 16:9 标准屏模式
        if (delta <= screenAdapterConfig.modeTolerance) {
                return 'exact-16-9';
        }
        // 宽屏模式 ｜ 窄屏模式
        return ratio > screenAdapterConfig.aspectRatio ? 'wide-screen' : 'narrow-screen';
}
