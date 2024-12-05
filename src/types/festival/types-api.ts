/** 축제 상태 */
export enum IFestivalStatus {
  /** 진행중 */
  BEING = 'BEING',
  /** 종료 */
  ENDED = 'ENDED',
  /** 예정 */
  UPCOMING = 'UPCOMING',
}

/** 축제 데이터 리스트 */
export interface IFestivalListData {
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
  /** 축제 상태 @example 'BEING' | 'UPCOMING' | 'ENDED' */
  Status: IFestivalStatus;
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

/** 서버 응답 상태 메세지 */
export interface IDataResponseStateMsg {
  success: boolean;
  message: string;
}

/** GET 축제 목록 파라미터 */
export interface IFetchFestivalParams {
  page: number;
  limit: number;
}

/** 축제 상세 데이터 */
export interface IFestivalDetailData {
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
