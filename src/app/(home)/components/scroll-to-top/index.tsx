'use client';
import { useCallback } from 'react';
import TopArrowSVG from '@public/images/top_arrow.svg';

export default function ScrollToTop() {
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    /* 상단으로 이동 버튼 */
    <div className="fixed right-[2%] bottom-[2%] z-[100]">
      <button onClick={handleScrollToTop} className="btn btn-circle bg-transparent ">
        <TopArrowSVG className="h-9 w-9 " />
      </button>
    </div>
  );
}
