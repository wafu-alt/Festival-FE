'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { IHomeProps, ISsrData } from './page';

/**
 * 홈 페이지
 * @param events
 * @description 축제 이벤트 15개로 시작해서 무한 스크롤 추가로 불러온다
 */
export default function HomeClient({ props }: { props: IHomeProps }) {
  // props 파싱
  const { success, message, events } = props;
  // 세팅 되는 이벤트 데이터
  const [data, setData] = useState(events);
  // 이벤트 데이터 로딩 페이지 처음1 이후부터 호출해야하기에 기본:2 무한로딩 할때마다 +1
  const [page, setPage] = useState<number>(2);
  // 이벤트 데이터 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 이미지 src를 검증하기 위한 정규식
  const urlRegex = useMemo(() => {
    return new RegExp('^(http://tong.visitkorea.or.kr/cms/)([a-zA-Z0-9-_./]+)$');
  }, []);

  // SSR에서 정보를 불러오기 실패 했을때 경고문과 새로고침 실행
  useEffect(() => {
    if (!success) {
      alert(`${message}에 의해 오류가 있습니다.\n잠시후 다시 접속 부탁드립니다.`);
    }
  }, [success, message]);

  /** 이미지 src를 검증하는 함수 */
  const isURL = useCallback(
    (string: string) => {
      return urlRegex.test(string);
    },
    [urlRegex]
  );

  /** 데이터 로딩 함수 */
  const loadMoreData = useCallback(async () => {
    // 로딩 상태 변경
    setIsLoading(true);

    if (isLoading) {
      return;
    }

    // 요청할 데이터 수
    const limit = 15;

    try {
      // 데이터 호출
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_HOST}${process.env.NEXT_PUBLIC_BACK_HOST_LOCATION}?page=${page}&limit=${limit}`
      );
      const moreData = await res.json();

      // 기존 데이터 세팅 변경 moreData의 festivals만 선택해서 사용
      setData((currentData) => [...currentData, ...moreData]);

      // 페이지 변경
      setPage((currentPage) => currentPage + 1);
    } catch (error) {
      console.log('error', error);
    } finally {
      // 로딩 상태 변경
      setIsLoading(false);
    }
  }, [page, isLoading]);

  /** 감시 박스를 보이면 데이터를 로딩한다. */
  const { ref, inView } = useInView({
    threshold: 1.0,
    onChange: (inView) => {
      if (inView) {
        loadMoreData(); // 데이터 로딩
      }
    },
  });

  return (
    <>
      {/* 세로 방향 */}
      <div>
        {data && data.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
              {/* 각 이벤트 맵핑 */}
              {data.map((data: ISsrData, index: number) => (
                <li key={`${index}-${data.ContentId}`} className="relative border rounded-lg  p-4 ">
                  {/* 진행중인 이벤트일 경우 뱃지 표시자 붙음 */}
                  {data.Status == 'BEING' && (
                    <span className="badge badge-secondary absolute top-2 right-2 h-8 z-50 text-white">진행중</span>
                  )}

                  {/* 이벤트 정보 표시 */}
                  <Link href={`/${data.ContentId}`}>
                    {/* 축제 이미지 */}
                    <div className="relative w-full h-32 flex items-center justify-center">
                      {isURL(data.ThumbnailImage) ? (
                        <Image
                          src={data.ThumbnailImage}
                          alt={`${data.Title}의 이미지`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: 'contain' }}
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-1/2 bg-gray-100 text-gray-500">
                          이미지 없음
                        </div>
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
