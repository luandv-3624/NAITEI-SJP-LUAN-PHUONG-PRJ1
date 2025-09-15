import { tokenService } from '@/api/token-service';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { isLoginAtom } from '../atomts';

export function useSilentRefresh() {
  const [isLoading, setLoading] = useState(true);
  const setIsLogin = useSetAtom(isLoginAtom);

  useEffect(() => {
    (async () => {
      const isSuccess = await tokenService.initiateSilentRefresh();

      if (isSuccess) {
        setIsLogin(true);
      }

      setLoading(false);
    })();
  }, []);

  return { isLoading };
}
