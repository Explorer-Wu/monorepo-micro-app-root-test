import { showToast } from './uiToast';

// Short-circuit / circuit-breaker for repeated OpenAI 429s
const OPENAI_429_WINDOW_MS = 60_000; // 1 minute
const OPENAI_429_MAX = 4; // threshold to trip
const OPENAI_BLOCK_MS = 30_000; // block duration

let openai429Count = 0;
let first429At = 0;
let blockedUntil = 0;

// Only run in browser
if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input: RequestInfo, init?: RequestInit) => {
        try {
            const url = typeof input === 'string' ? input : (input as Request).url;

            // If we've tripped the breaker for OpenAI, short-circuit responses
            if (url.includes('api.openai.com') && Date.now() < blockedUntil) {
                try { showToast('AI 接口限流（短期阻断），已暂停请求。', 5000); } catch (e) {}
                return new Response(JSON.stringify({ error: 'rate_limited' }), {
                    status: 429,
                    statusText: 'Too Many Requests',
                    headers: { 'content-type': 'application/json' },
                });
            }

            const response = await originalFetch(input, init as any);

            try {
                if (url.includes('api.openai.com')) {
                    if (response.status === 429) {
                        const now = Date.now();
                        if (!first429At || now - first429At > OPENAI_429_WINDOW_MS) {
                            // reset window
                            first429At = now;
                            openai429Count = 1;
                        } else {
                            openai429Count += 1;
                        }

                        try { showToast('AI 接口限流 (429)，部分功能已暂时不可用。', 7000); } catch (e) {}

                        if (openai429Count >= OPENAI_429_MAX) {
                            blockedUntil = Date.now() + OPENAI_BLOCK_MS;
                            try { showToast('AI 请求已被暂时阻断，稍后自动恢复。', 7000); } catch (e) {}
                        }
                    } else {
                        // successful or other status -> reset counters
                        openai429Count = 0;
                        first429At = 0;
                    }
                }
            } catch (e) {
                // ignore URL parsing errors
            }

            return response;
        } catch (err) {
            // network errors
            try { showToast('网络错误：无法连接到 AI 服务。', 7000); } catch (e) {}
            throw err;
        }
    };
}
