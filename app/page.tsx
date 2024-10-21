'use server';

import HomeClient from './HomeClient';

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

export interface IHomeProps extends ISsrStateMsg {
  events: ISsrData[];
}

const getInitialEvents = async (): Promise<IHomeProps> => {
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
      success: true,
      message: '',
      events: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      events: [],
    };
  }
};

/**
 * 홈 페이지
 * @param events
 * @description 축제 이벤트 15개로 시작해서 무한 스크롤 추가로 불러온다
 */
export default async function Home() {
  const initialEvents = await getInitialEvents();

  return <HomeClient props={initialEvents} />;
}
