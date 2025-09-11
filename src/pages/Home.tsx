import { Info } from '@/features/home';
import { LangSelector } from '@/features/locale';
import { ThemeToggle } from '@/features/theme';

export function Home() {
  return (
    <div>
      <h1>This is Home</h1>
      <Info />
      <ThemeToggle />
      <LangSelector />
    </div>
  );
}
