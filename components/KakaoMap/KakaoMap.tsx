import { useEffect, useState } from 'react';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

interface IKaKaoMapProps {
  address: string;
}

interface IMarker {
  position: {
    lat: number;
    lng: number;
  };
}

export default function KaKaoMap(props: IKaKaoMapProps) {
  // 카카오맵 지도 중심 설정
  const center = { lat: 37.566826, lng: 126.9786567 };
  // props 파싱
  const { address } = props;
  // 카카오맵에 필요한 상태값
  const [marker, setMarker] = useState<IMarker>();
  const [map, setMap] = useState<kakao.maps.Map>();

  // 카카오맵에서 주소로 검색해서 좌표 세팅
  useEffect(() => {
    // 지도를 생성이 없으면 리턴
    if (!map) return;

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address, (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        /**
         * result[0]
         *  {
         *    ... ,
         *    "x": "126.57049341667" ,
         *    "y": "33.4506810661721"
         *  }
         *
         */

        // 지도 중심 위치를 재 랜더링
        const coords = new kakao.maps.LatLng(parseFloat(result[0].y), parseFloat(result[0].x));
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);

        // 결과값으로 받은 위치를 마커로 표시합니다
        setMarker({
          position: {
            lat: parseFloat(result[0].y), // 실수 변환
            lng: parseFloat(result[0].x),
          },
        });
      }
    });
  }, [map, address]);

  return (
    <>
      <Map
        center={center} // 기본 지도 중심 위치 세팅
        className="w-full h-[500px]"
        level={3}
        onCreate={setMap} // 재 랜더링해서 지도 중심 위치 세팅
      >
        {address && marker && <MapMarker position={marker.position}></MapMarker>}
        <MapTypeControl />
        <ZoomControl />
      </Map>
    </>
  );
}
