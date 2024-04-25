import { vi } from 'vitest';

global.document.execCommand = vi.fn((status: string) => !!status);

global.HTMLElement.prototype.isEqualNode = vi.fn();
