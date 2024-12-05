'use server';

import { IFestivalListData } from '@/types/festival/types-api';
import { IFestivalListPageProps } from './components/festival-list';
import { festivalService } from './api/get-festival-list';
import FestivalListPage from './components/festival-list';

/**
 * 축제 데이터 불러오기
 * @returns IFestivalListPageProps
 */
const fetchFestivalListData = async (): Promise<IFestivalListPageProps> => {
  const page = 1; // 첫 페이지 설정
  const limit = 15; // 한 페이지당 데이터 양

  try {
    // 데이터 파싱
    /**
     * data =  [{}, {}, {} ...]
     */
    const data: IFestivalListData[] = await festivalService.getFestivals({ page, limit });

    return {
      success: true,
      message: '',
      events: data,
    };
  } catch (error) {
    // 에러 발생 시 에러 메세지 반환
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        events: [],
      };
    }

    // 알 수 없는 에러 발생 시 에러 메세지 반환
    return {
      success: false,
      message: '알 수 없는 에러가 발생했습니다.',
      events: [],
    };
  }
};

/**
 * 홈 페이지 서버 컴포넌트
 * @description 축제 이벤트 15개로 시작해서 무한 스크롤 추가로 불러온다
 */
export default async function HomeServer() {
  const initialEvents = await fetchFestivalListData();

  return (
    <>
      <FestivalListPage {...initialEvents} />
    </>
  );
}
