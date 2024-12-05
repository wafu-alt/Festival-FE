import { IDataResponseStateMsg } from '@/types/festival/types-api';
import { IFestivalDetailData } from '@/types/festival/types-api';
import { festivalDetailService } from './api/get-festival-detail';
import FestivalInfoPage from './components/festival-info';
import FestivalHomeButton from './components/festival-home-button';

export interface IFestivalInfoProps extends IDataResponseStateMsg {
  event?: IFestivalDetailData;
}

/**
 * 축제 상세 데이터 불러오기
 * @param eventId 축제 이벤트 아이디
 * @returns 축제 상세 데이터
 */
const fetchFestivalDetailData = async (eventId: string): Promise<IFestivalInfoProps> => {
  try {
    // 데이터 파싱
    /**
     * data = {}
     */
    const data: IFestivalDetailData = await festivalDetailService.getFestivalDetail({ eventId });

    return {
      success: true,
      message: '',
      event: data,
    };
  } catch (error) {
    // 에러 발생 시 에러 메세지 반환
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    // 알 수 없는 에러 발생 시 에러 메세지 반환
    return {
      success: false,
      message: '알 수 없는 에러가 발생했습니다.',
    };
  }
};

/**
 * 홈 페이지 서버 컴포넌트
 * @description 축제 이벤트 15개로 시작해서 무한 스크롤 추가로 불러온다
 */
export default async function DetailServer({ params }: { params: Promise<{ eventId: string }> }) {
  // 파라미터 파싱
  const eventId = (await params).eventId;

  // 데이터 파싱
  const initialEvent = await fetchFestivalDetailData(eventId);

  return (
    <>
      <FestivalInfoPage {...initialEvent} />
      <FestivalHomeButton />
    </>
  );
}
