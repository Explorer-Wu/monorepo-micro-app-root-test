export function showToast(message: string, duration = 5000) {
    try {
        const existing = document.getElementById('global-toast-container');
        let container = existing as HTMLDivElement | null;
        if (!container) {
            container = document.createElement('div');
            container.id = 'global-toast-container';
            container.style.position = 'fixed';
            container.style.right = '12px';
            container.style.top = '12px';
            container.style.zIndex = '99999';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.gap = '8px';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.background = 'rgba(0,0,0,0.75)';
        toast.style.color = '#fff';
        toast.style.padding = '10px 14px';
        toast.style.borderRadius = '6px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.maxWidth = '320px';
        toast.style.fontSize = '13px';
        toast.style.lineHeight = '1.2';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 180ms ease, transform 180ms ease';
        toast.style.transform = 'translateY(-6px)';

        container.appendChild(toast);

        // animate in
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        const remove = () => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-6px)';
            setTimeout(() => {
                toast.remove();
                if (container && container.childElementCount === 0) container.remove();
            }, 220);
        };

        const timer = setTimeout(remove, duration);
        toast.addEventListener('click', () => {
            clearTimeout(timer);
            remove();
        });

        return () => {
            clearTimeout(timer);
            remove();
        };
    } catch (err) {
        // If DOM is not available or other error, silently ignore
        // This keeps the app from crashing in SSR or test envs
        // eslint-disable-next-line no-console
        console.error('showToast failed:', err);
        return () => {};
    }
}
