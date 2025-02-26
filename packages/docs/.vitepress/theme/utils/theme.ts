export const setupThemeWatcher = () => {
  // 监听 VitePress 主题变化
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.removeAttribute('arco-theme');
    }
  });

  // 观察 html 元素的 class 变化
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  // 初始化主题
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    document.body.setAttribute('arco-theme', 'dark');
  }

  return () => observer.disconnect();
};