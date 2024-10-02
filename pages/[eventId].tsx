import { GetServerSideProps } from 'next';
import { useCallback, useEffect } from 'react';
import { ISsrStateMsg } from '.';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import KaKaoMap from '../components/KakaoMap/KakaoMap';
import parse from 'html-react-parser';
import LinkSVG from '../public/images/link.svg';

/** 축제 상세 데이터 */
export interface ISsrEventDetailData {
  /** 리스트 테이블 기본 키 @example 227 */
  Id: number;
  /** 아이디 @example 2615461 */
  ContentId: number;
  /** 제목 @example '경복궁 생과방' */
  Title: string;
  /** 시작일 @example '2024-09-03' */
  StartDate: string;
  /** 종료일 @example '2024-10-30' */
  EndDate: string;
  /** 홈페이지 @example "https://www.kh.or.kr/kha" */
  HomePage: string;
  /** 주소 @example '[03045] 서울특별시 종로구 사직로 161 (세종로)' */
  FullAddres: string;
  /** 행사 장소 @example 경복궁 생과방 */
  EventPlace: string;
  /** 주최자 @example "국가유산청" */
  PlanHost: string;
  /** 주최자 전화번호 @example "1522-2295" */
  PlanHostTel: string;
  /** 행사소개 @example "경복궁 소주방 전각에 위치한 '생과방'은 궁중의 육처소(六處所) 가운데 하나이며, '국왕과 왕비'의 후식과 별식을 준비하던 곳으로 '생물방'이라고도 불렸다. 경복궁 생과방 프로그램은 조선왕조실록의 내용을 토대로 실제 임금이 먹었던 궁중병과와 궁중약차를 오늘날에도 즐길 수 있도록 구성된 유료 체험 프로그램이다." */
  IntroText: string;
  /** 행사내용 @example "1. 궁중병과 및 궁중약차 시식체험(1일 4회)<br>\n - 1회 10:00~11:10(70분)<br>\n - 2회 11:40~12:50(70분)<br>\n - 3회 13:50~15:00(70분)<br>\n - 4회 15:30~16:40(70분)" */
  DetailText: string;
  /** 대문 이미지 @example 'http://tong.visitkorea.or.kr/cms/resource/99/2962999_image2_1.jpg' */
  FirstImage: string;
  /** 진행 시간 @example "10:00 ~ 19:00<br>개막식 09.02 13:30 ~ 15:40" */
  Playtime: string;
  /** 이용 요금 @example "유료 / 사전예매 15,000원<br>*50%할인 : 장애인, 국가유공자 해당" */
  Cost: string;
}

interface IEventDetailProps extends ISsrStateMsg {
  event?: ISsrEventDetailData;
}

export default function EventDetail(props: IEventDetailProps) {
  const router = useRouter();
  const { success, message, event } = props;

  // SSR에서 정보를 불러오기 실패 했을때 경고문과 새로고침 실행
  useEffect(() => {
    if (!success) {
      alert(`${message}에 의해 오류가 있습니다.\n잠시후 다시 접속 부탁드립니다.`);
    }
  }, [success, message]);

  /** 목록으로 버튼 > 홈으로 이동한다 */
  const handleScrollToTop = useCallback(() => {
    router.push('/');
  }, [router]);

  /** html이 포함한 string이 string 아닐경우 빈 string으로 return하여 에러를 예방한다 */
  const checkParseString = useCallback((content?: string) => {
    if (typeof content === 'string') {
      return parse(content);
    }
    return '';
  }, []);

  return (
    <>
      {event ? (
        <article className="space-y-5">
          <section className="p-4 lg:p-7 rounded-xl border-solid border-2 overflow-x-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[30%,70%] gap-6">
              {/* 이미지 섹션 */}
              <figure className="relative w-full h-64 lg:h-full min-h-[250px]">
                {event.FirstImage ? (
                  <Image src={event.FirstImage} alt={event.Title} layout="fill" objectFit="contain" priority />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">이미지 없음</div>
                )}
              </figure>

              {/* 내용 섹션 */}
              <div className="space-y-4">
                <header>
                  <h1 className="text-2xl lg:text-4xl font-bold break-words">{event.Title}</h1>
                  <p className="text-xl lg:text-2xl">
                    {event.StartDate} ~ {event.EndDate}
                  </p>
                </header>

                {/* 정보 섹션 */}
                <dl className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-x-4 gap-y-2">
                  {event.Playtime && (
                    <>
                      <dt className="font-semibold text-gray-400 whitespace-nowrap">진행 시간 :</dt>
                      <dd className="break-words">{checkParseString(event.Playtime)}</dd>
                    </>
                  )}
                  <dt className="font-semibold text-gray-400 whitespace-nowrap">이용 요금 :</dt>
                  <dd className="break-words">{checkParseString(event.Cost)}</dd>
                  {event.HomePage && (
                    <>
                      <dt className="font-semibold text-gray-400 whitespace-nowrap">홈페이지 :</dt>
                      <dd>
                        <Link href={event.HomePage}>
                          <a className="text-blue-500 hover:text-blue-700 break-all">
                            <LinkSVG className="h-5 w-5 inline-block mr-1" />
                            <span className="align-middle">웹사이트</span>
                          </a>
                        </Link>
                      </dd>
                    </>
                  )}
                  <dt className="font-semibold text-gray-400 whitespace-nowrap">장소 :</dt>
                  <dd className="break-words">{event.EventPlace}</dd>
                  <dt className="font-semibold text-gray-400 whitespace-nowrap">주최자 :</dt>
                  <dd className="break-words">{checkParseString(event.PlanHost)}</dd>
                  <dt className="font-semibold text-gray-400 whitespace-nowrap">연락처 :</dt>
                  <dd className="break-words">{event.PlanHostTel}</dd>
                  <dt className="font-semibold text-gray-400 whitespace-nowrap">주소 :</dt>
                  <dd className="break-words">{event.FullAddres}</dd>
                </dl>
              </div>
            </div>
          </section>

          {/* 지도 영역 */}
          {event.FullAddres && (
            <section className="my-5 p-7 rounded-xl border-solid border-2">
              <h2 className="sr-only">행사 위치</h2>
              <KaKaoMap address={event.FullAddres.split(']')[1].trim()} />
            </section>
          )}

          {/* 행사 소개 */}
          {event.IntroText && (
            <section className="my-5 p-7 rounded-xl border-solid border-2">
              <h2 className="text-2xl mb-4">행사소개</h2>
              <p className="leading-8">{checkParseString(event.IntroText)}</p>
            </section>
          )}

          {/* 행사 내용 */}
          {event.DetailText && (
            <section className="my-5 p-7 rounded-xl border-solid border-2">
              <h2 className="text-2xl mb-4">행사내용</h2>
              <p className="leading-8">{checkParseString(event.DetailText)}</p>
            </section>
          )}
        </article>
      ) : (
        <div className="text-center text-5xl p-7 rounded-xl border-solid border-2">축제 상세 정보가 없습니다.</div>
      )}

      {/* 목록으로 버튼 */}
      <nav className="flex justify-center my-5">
        <button
          onClick={handleScrollToTop}
          className="btn rounded-xl border-solid border-2 text-base bg-transparent font-normal"
        >
          목록으로
        </button>
      </nav>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<IEventDetailProps> = async (context) => {
  const { eventId } = context.query;

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
      `${process.env.NEXT_PUBLIC_BACK_HOST}${process.env.NEXT_PUBLIC_BACK_HOST_LOCATION}/${eventId}`
    );

    // 데이터 받기 실패
    if (!res.ok) {
      throw new Error('해당 상세 정보를 불러올 수 없습니다');
    }

    // 데이터 파싱
    /**
     * data = {}
     */
    const data = await res.json();

    return {
      props: {
        success: true,
        message: '',
        event: data,
      },
    };
  } catch (error: any) {
    return {
      props: {
        success: false,
        message: error.message,
      },
    };
  }
};
