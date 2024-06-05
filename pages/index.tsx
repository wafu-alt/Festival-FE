import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/** 이벤트 데이터 리스트 */
export interface ISsrData {
  /** 앨범분류 @example 1 */
  albumId: number;
  /** 아이디 @example 15 */
  id: number;
  /** 제목 @example 'harum dicta similique quis dolore earum ex qui' */
  title: string;
  /** 이미지주소 @example 'https://via.placeholder.com/600/f9cee5' */
  url: string;
  /** 작은 이미지주소 @example 'https://via.placeholder.com/150/f9cee5' */
  thumbnailUrl: string;
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
  const [data, setData] = useState(events);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  // SSR에서 정보를 불러오기 실패 했을때 경고문과 새로고침 실행
  useEffect(() => {
    if (!success) {
      alert(`${message}에 의해 오류가 있습니다`);
      window.location.reload();
    }
  }, [success, message]);

  /** 데이터 로딩 함수 */
  const loadMoreData = useCallback(async () => {
    // 로딩 상태 변경
    setIsLoading(true);

    if (isLoading) {
      return;
    }

    try {
      // 데이터 호출
      const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${page + 1}/photos`);

      const moreData = await res.json();

      // 기존 데이터 세팅 변경
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
              {data.map((data, index) => (
                <li
                  key={`${index}.${data.albumId}-${data.id}-${data.url}`}
                  className="border rounded-lg overflow-hidden p-4 "
                >
                  <Link href={`/${data.id}`}>
                    <a>
                      <div className="relative w-full h-32 flex items-center justify-center">
                        {data.url ? (
                          <Image src={data.url} alt={data.title} layout="fill" objectFit="contain" priority />
                        ) : (
                          <p className="">none image</p>
                        )}
                      </div>
                      <div className="mt-2">
                        {/* 축제 제목 */}
                        <h2 className="text-lg font-semibold">{data.title}</h2>
                        {/* 축제 기간 */}
                        <p className="text-sm text-gray-600">{`2030.05.20 ~ 2030.05.25`}</p>
                        {/* 축제 주소 */}
                        <p className="text-sm text-gray-600">{'서울특별시 용산구'}</p>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Loading indicator */}
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
  const limit = 15; // 처음 가져오는 데이터 양
  const page = 1; // 첫 페이지 설정

  try {
    // https://jsonplaceholder.typicode.com/
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums/1/photos`);
    const data = await res.json();
    // 데이터가 너무 많아서 앞의 데이터 15개만 선택함
    const events = data.slice(0, 15);

    return {
      props: {
        success: true,
        message: '',
        events: events,
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
