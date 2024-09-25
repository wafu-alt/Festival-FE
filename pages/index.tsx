import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/** 이벤트 데이터 리스트 */
export interface ISsrData {
  /** 리스트 테이블 기본 키 @example 81 */
  Id: number;
  /** 고유아이디 @example 2485661 */
  ContentId: number;
  /** 관광타입 @example 15 */
  ContentType: number;
  /** 제목 @example '양화진 근대사 뱃길탐방' */
  Title: string;
  /** 시작일 @example '2024-06-26' */
  StartDate: string;
  /** 종료일 @example '2024-07-14' */
  EndDate: string;
  /** 이벤트 상태 @example 'BEING' | 'UPCOMING' | 'ENDED' */
  Status: 'BEING' | 'UPCOMING' | 'ENDED';
  /** 지역 + 군,구 @example '서울특별시 마포구' */
  ShortAddres: string;
  /** 지역코드 @example 1 */
  AreaCode: number;
  /** 군,구 코드 @example 13 */
  CityCode: number;
  /** 공공데이터에서 가져온 생성날짜 @example '2017-03-15 16:44' */
  ExternalApiCreateDate: string;
  /** 공공데이터에서 수정날짜 @example '2024-07-05 06:36' */
  ExternalApiUpdateDate: string;
  /** 생성날짜 @example '2024-09-05 21:31' */
  CreateDate: string;
  /** 수정날짜 @example '2024-09-05 21:31' */
  UpdateDate: string;
  /** 이미지주소 @example 'http://tong.visitkorea.or.kr/cms/resource/88/3309588_image2_1.jpg' */
  ThumbnailImage: string;
}

/** SSR에서의 상대메세지를 받음  */
export interface ISsrStateMsg {
  success: boolean;
  message: string;
}

interface IHomeProps extends ISsrStateMsg {
  events: ISsrData[];
}

/**
 * 홈 페이지
 * @param events
 * @description 축제 이벤트 15개로 시작해서 무한 스크롤 추가로 불러온다
 */
export default function Home(props: IHomeProps) {
  // props 파싱
  const { success, message, events } = props;
  // 세팅 되는 이벤트 데이터
  const [data, setData] = useState(events);
  // 이벤트 데이터 로딩 페이지 기본:1 무한로딩 할때마다 +1
  const [page, setPage] = useState<number>(1);
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
              {data.map((data, index) => (
                <li key={`${index}-${data.ContentId}`} className="relative border rounded-lg  p-4 ">
                  {/* 진행중인 이벤트일 경우 뱃지 표시자 붙음 */}
                  {data.Status == 'BEING' && (
                    <span className="badge badge-secondary absolute top-2 right-2 h-8 z-50 text-white">진행중</span>
                  )}

                  {/* 이벤트 정보 표시 */}
                  <Link href={`/${data.ContentId}`}>
                    <a>
                      {/* 축제 이미지 */}
                      <div className="relative w-full h-32 flex items-center justify-center">
                        {isURL(data.ThumbnailImage) ? (
                          <Image
                            src={data.ThumbnailImage}
                            alt={`${data.Title}의 이미지`}
                            layout="fill"
                            objectFit="contain"
                            loading="lazy"
                          />
                        ) : (
                          <p className="">None Image</p>
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
                    </a>
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

export const getServerSideProps: GetServerSideProps<IHomeProps> = async (context) => {
  const page = 1; // 첫 페이지 설정
  const limit = 15; // 한 페이지당 데이터 양

  try {
    // 환경변수 가져오지 못할 때 에러 발생
    if (!process.env.NEXT_PUBLIC_BACK_HOST) {
      throw new Error('NEXT_PUBLIC_BACK_HOST 환경 변수가 설정되지 않았습니다.');
    }
    if (!process.env.NEXT_PUBLIC_BACK_HOST_LOCATION) {
      throw new Error('NEXT_PUBLIC_BACK_HOST_LOCATION 환경 변수가 설정되지 않았습니다.');
    }

    // 데이터 호출
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_HOST}${process.env.NEXT_PUBLIC_BACK_HOST_LOCATION}?page=${page}&limit=${limit}`
    );

    // 데이터 받기 실패
    if (!res.ok) {
      throw new Error('전체 축제 일정을 불러올 수 없습니다');
    }

    // 데이터 파싱
    /**
     * data =  [{}, {}, {} ...]
     */
    const data = await res.json();

    return {
      props: {
        success: true,
        message: '',
        events: data,
      },
    };
  } catch (error: any) {
    return {
      props: {
        success: false,
        message: error.message,
        events: [],
      },
    };
  }
};
