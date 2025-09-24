import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from './ui/dialog';

function ModalLoading({ loading = false }: { loading?: boolean }) {
  return (
    <Dialog open={loading}>
      <DialogPortal data-slot='dialog-portal'>
        <DialogOverlay />
        <DialogPrimitive.Content
          data-slot='dialog-content'
          className={cn(
            'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
            'aspect-square size-30 bg-transparent border-none outline-none shadow-none',
          )}
        >
          <DialogTitle hidden />
          <DialogDescription hidden />
          <div className='flex items-center justify-center'>
            <div className='h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent' />
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

export default ModalLoading;
