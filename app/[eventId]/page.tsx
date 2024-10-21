'use server';

import { ISsrStateMsg } from '../page';
import EventDetailClient from './EventDetailClient';

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

export interface IEventDetailProps extends ISsrStateMsg {
  event?: ISsrEventDetailData;
}

const getInitialEventDetail = async (eventId: string): Promise<IEventDetailProps> => {
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
      success: true,
      message: '',
      event: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export default async function EventDetail({ params }: { params: { eventId: string } }) {
  const initialEventDetail = await getInitialEventDetail(params.eventId);

  return <EventDetailClient props={initialEventDetail} />;
}
