import { GetServerSideProps } from 'next';
import { useCallback, useEffect } from 'react';
import { ISsrStateMsg } from '.';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import KaKaoMap from '../components/KakaoMap/KakaoMap';
import parse from 'html-react-parser';
import LinkSVG from '../public/images/link.svg';

/** 이벤트 데이터 리스트 */
export interface ISsrEventDetailData {
  /** 아이디 @example 2755016 */
  contentId: number;
  /** 홈페이지 @example "https://blog.naver.com/arahaman/223475522926" */
  homePage: string;
  /** 전화번호 @example "010-4452-3452" */
  tel: string;
  /** 전화번호이름 @example "강주마을" */
  telName: string;
  /** 입장가격 @example "유료(입장료 : 2,000원)/ 장애인, 미취학 아동, 법수면민, 만70세이상(무료입장)" */
  useTimeFestival: string;
  /** 후원사 @example "강주마을" */
  sponsor: string;
  /** 축제시간 @example "09:00~18:00" */
  playtime: string;
  /** 축제설명 @example "더 멋지게 돌아온 제 12회 함안 강주해바라기 축제는 6월 26일부터 이어지는 축제로써 다채로운 행사와 아름다운 해바라기 꽃을 바라보면서 감성과 재미를 더 할 수 있다." */
  overview: string;
  /** 축제내용 @example "1. 개막행사 : 식전공연, 개막식<br>\n2. 관람행사 : 해바라기 단지 내 꽃 관람<br>\n3. 체험행사 : 사진촬영 이벤트<br>\n4. 농특산물 판매, 먹거리 장터, 푸드트럭, 버스킹 공연 " */
  infoText: string;
  /** 제목 @example '강주해바라기 축제' */
  title: string;
  /** 이미지주소 @example 'http://tong.visitkorea.or.kr/cms/resource/88/3309588_image2_1.jpg' */
  thumbNailImage: string;
  /** 시작일 @example '2024-06-26' */
  startDate: string;
  /** 마감일 @example '2024-07-14' */
  endDate: string;
  /** 지역 @example '경상남도 함안군 강주4길 16 ' */
  venue: string;
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

  const handleScrollToTop = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      {event ? (
        <>
          <ul className="grid grid-cols-[30%,70%]  gap-x-8 gap-y-5 p-7 rounded-xl border-solid border-2">
            <li className="row-span-8 relative">
              {event.thumbNailImage ? (
                <Image src={event.thumbNailImage} alt={event.title} layout="fill" objectFit="contain" priority />
              ) : (
                <p className="">None Image</p>
              )}
            </li>
            <li className="text-4xl">{event.title}</li>
            <li className="text-2xl">
              {event.startDate} ~ {event.endDate}
            </li>
            {event.playtime && (
              <li>
                <span>{parse(event.playtime)}</span>
              </li>
            )}
            <li>{parse(event.useTimeFestival)}</li>
            <li className="flex items-center">
              <p className="mr-3">상세 주소 링크 : </p>
              <Link href={event.homePage}>
                <a>
                  <LinkSVG className="h-9 w-9" />
                </a>
              </Link>
            </li>
            <li className="flex items-center">
              <p className="mr-3">장소 :</p>
              {event.telName}
            </li>
            <li className="flex items-center">
              <p className="mr-3">전화번호 :</p>
              {event.tel}
            </li>
            <li className="flex items-center">
              <p className="mr-3">주소 :</p>
              {event.venue}
            </li>
          </ul>

          {/* 지도 영역 */}
          <div className="my-5 p-7 rounded-xl border-solid border-2">
            <KaKaoMap address={event.venue.trim()} />
          </div>
          {event.overview && (
            <div className="my-5 p-7 rounded-xl border-solid border-2">
              <h2 className="text-2xl mb-4">{`<행사설명>`}</h2>
              <p className="leading-8">{parse(event.overview)}</p>
            </div>
          )}
          {event.infoText && (
            <div className="my-5 p-7 rounded-xl border-solid border-2">
              <h2 className="text-2xl mb-4">{`<행사정보>`}</h2>
              <p className="leading-8">{parse(event.infoText)}</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-5xl p-7 rounded-xl border-solid border-2">축제 일정이 없습니다.</div>
      )}

      {/* 목록으로 버튼 */}
      <div className="flex justify-center my-5">
        <button
          onClick={handleScrollToTop}
          className="btn rounded-xl border-solid border-2 text-base bg-transparent font-normal"
        >
          목록으로
        </button>
      </div>
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_HOST}${process.env.NEXT_PUBLIC_BACK_HOST_LOCATION}/${eventId}`
    );
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
