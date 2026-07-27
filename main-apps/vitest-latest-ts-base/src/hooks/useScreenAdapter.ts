import { useSyncExternalStore } from 'react';
import { getScreenAdapterState, subscribeScreenAdapter, type ScreenAdapterState } from '@/utils/flexibleRem';

export function useScreenAdapter(): ScreenAdapterState {
        return useSyncExternalStore(subscribeScreenAdapter, getScreenAdapterState, getScreenAdapterState);
}
