import React, { useEffect } from 'react';
import styled from 'styled-components';
const { kakao } = window;

const StyledMap = styled.div`
  width: 600px;
  height: 600px;
  margin: 0 auto;
  margin-top: 30px;
  border: 3px solid #eee;
  box-shadow: 0 2px 3px #ccc;
`;

const Map = () => {
  useEffect(() => {
    const container = document.querySelector('#map');
    const options = {
      center: new kakao.maps.LatLng(37.57123325991645, 126.9911719400817),
      level: 6,
    };
    // 지도 생성
    const map = new kakao.maps.Map(container, options);

    // 지도 컨트롤러 생성
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤러 추가
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 확대 축소 컨트롤러 생성
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커 위치 지정
    const markerPosition = new kakao.maps.LatLng(
      37.57123325991645,
      126.9911719400817
    );

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도에 표시
    marker.setMap(map);

    // 인포윈도우 콘텐츠
    const iwContent = '<div style="padding:5px;">단성사<br>KG IT Bank</div>';
    const iwPosition = new kakao.maps.LatLng(
      37.57123325991645,
      126.9911719400817
    );
    const iwRemovable = true;

    // 인포윈도우 생성
    const infoWindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    // 지도에 마우스오버 이벤트 hook
    kakao.maps.event.addListener(
      marker,
      'mouseover',
      makeOverListener(map, marker, infoWindow)
    );
    // 지도에 마우스아웃 이벤트 hook
    kakao.maps.event.addListener(
      marker,
      'mouseout',
      makeOutListener(infoWindow)
    );
  }, []);

  // 마우스오버 이벤트
  const makeOverListener = (map, marker, infoWindow) => {
    return () => {
      infoWindow.open(map, marker);
    };
  };
  // 마우스아웃 이벤트
  const makeOutListener = (infoWindow) => {
    return () => {
      infoWindow.close();
    };
  };

  return <StyledMap id='map'></StyledMap>;
};

export default Map;
