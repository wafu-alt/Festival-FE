'use client';

import { IFestivalListData, IDataResponseStateMsg } from '@/types/festival/types-api';
import { useListErrorHandler } from '../../hooks/use-list-error-handler';
import { useFestivalInfiniteScroll } from '../../hooks/use-festival-infinite-scroll';
import FestivalCard from '../festival-card';

export interface IFestivalListPageProps extends IDataResponseStateMsg {
  events: IFestivalListData[];
}

/**
 * 홈 페이지
 * @param events
 * @description 축제 이벤트 15개로 시작해서 무한 스크롤 추가로 불러온다
 */
export default function FestivalListPage({ success, message, events }: IFestivalListPageProps) {
  useListErrorHandler(success, message);
  const { data, isLoading, ref } = useFestivalInfiniteScroll(events);

  return (
    <>
      {/* 세로 방향 */}
      <div>
        {data && data.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
              {/* 각 이벤트 맵핑 */}
              {data.map((data: IFestivalListData, index: number) => (
                <FestivalCard data={data} index={index} key={`${index}-${data.ContentId}`} />
              ))}
            </ul>

            {/* 로딩 상태 UI */}
            {isLoading && (
              <div className="flex items-center justify-center my-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}

            {/* 감시 박스 */}
            <div ref={ref}></div>
          </>
        ) : (
          // 데이터가 비어 있을 경우
          <div className="text-center text-5xl">축제 일정이 없습니다.</div>
        )}
      </div>
    </>
  );
}
