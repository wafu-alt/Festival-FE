import { useCallback, useMemo } from 'react';

export const useImageUrlValidator = () => {
  /** 이미지 src를 검증하기 위한 정규식 */
  const urlRegex = useMemo(() => {
    return new RegExp('^(http://tong.visitkorea.or.kr/cms/)([a-zA-Z0-9-_./]+)$');
  }, []);

  /** 이미지 src를 검증하는 함수 */
  const isURL = useCallback(
    (string: string) => {
      return urlRegex.test(string);
    },
    [urlRegex]
  );

  return { isURL };
};
