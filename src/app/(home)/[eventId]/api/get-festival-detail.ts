import { IFestivalDetailData } from '@/types/festival/types-api';

export const festivalDetailService = {
  /**
   * 축제 목록을 가져오는 함수
   * @param {eventId} params {eventId:string} 축제 목록 파라미터
   * @returns {Promise<IFestivalListData[]>} 축제 목록 데이터
   */
  async getFestivalDetail({ eventId }: { eventId: string }): Promise<IFestivalDetailData> {
    const backHost = process.env.NEXT_PUBLIC_BACK_HOST;
    const backLocation = process.env.NEXT_PUBLIC_BACK_HOST_LOCATION;

    // 환경변수 체크
    if (!backHost || !backLocation) {
      throw new Error('환경 변수가 설정되지 않았습니다.');
    }

    const res = await fetch(`${backHost}${backLocation}/${eventId}`, {
      next: { revalidate: 0 }, // 캐시 비활성화
    });

    // 데이터 받기 실패
    if (!res.ok) {
      throw new Error(`축제 상세 정보를 불러올 수 없습니다 status: ${res.status}`);
    }

    return res.json();
  },
};
