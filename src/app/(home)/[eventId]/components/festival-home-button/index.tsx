'use client';

import { useRouter } from 'next/navigation';

/**
 * '목록으로' 버튼
 * @description 리스트 페이지로 이동한다
 */
export default function FestivalHomeButton() {
  const router = useRouter();

  return (
    // 목록으로 버튼
    <div className="flex justify-center my-5">
      <button
        onClick={() => router.push('/')}
        className="btn rounded-xl border-solid border-2 text-base bg-transparent font-normal"
      >
        목록으로
      </button>
    </div>
  );
}
