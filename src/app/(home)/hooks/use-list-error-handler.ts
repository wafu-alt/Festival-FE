import { useEffect } from 'react';

export const useListErrorHandler = (success: boolean, message: string) => {
  useEffect(() => {
    if (!success) {
      alert(`${message}에 의해 오류가 있습니다.\n잠시후 다시 접속 부탁드립니다.`);
    }
  }, [success, message]);
};
