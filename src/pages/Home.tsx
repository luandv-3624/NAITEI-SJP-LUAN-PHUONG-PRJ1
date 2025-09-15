import { useGetProfile } from '@/features/auth';
import { Info } from '@/features/home';
import { LangSelector } from '@/features/locale';
import { ThemeToggle } from '@/features/theme';

export function Home() {
  const { data: user } = useGetProfile();

  return (
    <div>
      <h1>This is Home</h1>
      <Info />
      <ThemeToggle />
      <LangSelector />
      {user && (
        <div>
          <p>{user.name}</p>
        </div>
      )}
    </div>
  );
}
