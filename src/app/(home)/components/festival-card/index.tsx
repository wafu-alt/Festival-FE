import { IFestivalListData } from '@/types/festival/types-api';
import { useImageUrlValidator } from '../../hooks/use-image-url-validator';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function FestivalCard({ data, index }: { data: IFestivalListData; index: number }) {
  const { isURL } = useImageUrlValidator();
  const [imageError, setImageError] = useState(false);

  return (
    <li key={`${index}-${data.ContentId}`} className="relative border rounded-lg  p-4 ">
      {/* 진행중인 이벤트일 경우 뱃지 표시자 붙음 */}
      {data.Status == 'BEING' && (
        <span className="badge badge-secondary absolute top-2 right-2 h-8 z-50 text-white">진행중</span>
      )}

      {/* 이벤트 정보 표시 */}
      <Link href={`/${data.ContentId}`}>
        {/* 축제 이미지 */}
        <div className="relative w-full h-32 flex items-center justify-center">
          {isURL(data.ThumbnailImage) && !imageError ? (
            <Image
              src={data.ThumbnailImage}
              alt={`${data.Title}의 이미지`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'contain' }}
              onError={() => setImageError(true)} // 서버에서 이미지 불러오기 실패 시 이미지 에러 상태 변경
              priority={true} // Next.js의 LCP경고 반영
            />
          ) : (
            <div className="flex items-center justify-center h-full w-1/2 bg-gray-100 text-gray-500">이미지 없음</div>
          )}
        </div>
        {/* 축제 정보 */}
        <div className="mt-2">
          {/* 축제 제목 */}
          <h2 className="text-lg font-semibold">{data.Title}</h2>
          {/* 축제 기간 */}
          <p className="text-sm text-gray-600">
            {data.StartDate} ~ {data.EndDate}
          </p>
          {/* 축제 주소 */}
          <p className="text-sm text-gray-600">{data.ShortAddres}</p>
        </div>
      </Link>
    </li>
  );
}
