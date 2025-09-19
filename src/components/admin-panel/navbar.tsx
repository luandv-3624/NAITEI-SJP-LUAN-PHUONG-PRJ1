import { SheetMenu } from '@/components/admin-panel/sheet-menu';
import { LangSelector } from '@/features/locale';
import { ThemeToggle } from '@/features/theme';
import { MenuLayout } from '@/types/menu-layout';

interface NavbarProps {
  title: string;
  menuLayout: MenuLayout;
}

export function Navbar({ title, menuLayout }: NavbarProps) {
  return (
    <header className='sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary'>
      <div className='mx-4 sm:mx-8 flex h-14 items-center'>
        <div className='flex items-center space-x-4 lg:space-x-0'>
          <SheetMenu menuLayout={menuLayout} />
          <h1 className='font-bold'>{title}</h1>
        </div>
        <div className='flex flex-1 items-center justify-end gap-2'>
          <LangSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
