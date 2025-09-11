import { useAtomValue } from 'jotai/react';
import { themeAtom } from '../atoms/theme-atom';
import { useEffect } from 'react';

export function useThemeEffect() {
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);
}
