import { GetServerSideProps } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { ISsrData, ISsrStateMsg } from '.';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import KaKaoMap from '../components/KakaoMap/KakaoMap';

interface IEventDetailProps extends ISsrStateMsg {
  event?: ISsrData;
}

export default function EventDetail(props: IEventDetailProps) {
  const router = useRouter();
  const { success, message, event } = props;
  const address = '서울특별시 종로구 사직로 161';

  const content = `
  <p>안녕하세요!</p>
  <p>행사내용이 들어가는 공간입니다.</p>
  <p>이것은 <strong>DB</strong>에서 가져온 <em>HTML</em> 콘텐츠입니다.</p>
  <p>줄바꿈과 공백도 유지됩니다.</p>
  <p>목록으로 글자 테스트 잘려보이는데 아마도 글꼴 문제인듯</p>
`;

  // SSR에서 정보를 불러오기 실패 했을때 경고문과 새로고침 실행
  useEffect(() => {
    if (!success) {
      alert(`${message}에 의해 오류가 있습니다`);
      window.location.reload();
    }
  }, [success, message]);

  const handleScrollToTop = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      {event ? (
        <ul className="grid grid-cols-[30%,70%]  gap-x-8 gap-y-5 p-7 rounded-xl border-solid border-2">
          <li className="row-span-6 relative">
            {event.url ? (
              <Image src={event.url} alt={event.title} layout="fill" objectFit="contain" priority />
            ) : (
              <p className="">none image</p>
            )}
          </li>
          <li>{event.title}jdklfjaklsjdfkljlkasdfs dsfj kldsjaiofejlka fjasiojefijaflkj fjdslkavjoisaj</li>
          <li>2025.05.21 ~ 2025.05.31</li>
          <li>{address}</li>
          <li>
            <Link href={`https://korean.visitkorea.or.kr/kfes/list/wntyFstvlList.do`}>
              <a>url</a>
            </Link>
          </li>
          <li>서울특별시</li>
          <li>02-1234-5678</li>
        </ul>
      ) : (
        <div className="text-center text-5xl p-7 rounded-xl border-solid border-2">축제 일정이 없습니다.</div>
      )}
      <div className="my-5 p-7 rounded-xl border-solid border-2">
        <KaKaoMap address={address} />
      </div>
      <div className="my-5 p-7 rounded-xl border-solid border-2">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
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
    // https://jsonplaceholder.typicode.com/
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${eventId}`);
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
