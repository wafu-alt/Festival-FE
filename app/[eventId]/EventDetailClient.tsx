'use client';

import { useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import KaKaoMap from '../../components/KakaoMap/KakaoMap';
import parse from 'html-react-parser';
import LinkSVG from '../../public/images/link.svg';
import { IEventDetailProps } from './page';

export default function EventDetailClient({ props }: { props: IEventDetailProps }) {
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
                  <Image
                    src={event.FirstImage}
                    alt={event.Title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
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
                        <Link href={event.HomePage} className="text-blue-500 hover:text-blue-700 break-all">
                          <LinkSVG className="h-5 w-5 inline-block mr-1" />
                          <span className="align-middle">웹사이트</span>
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
