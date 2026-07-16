import attractionsData from '../data/attractions.json'

// JSON 기반 관광지 데이터 접근 로직을 분리해 둔 서비스입니다.
// 추후 API로 교체할 때 이 파일만 바꾸면 됩니다.
export const getAttractions = () => attractionsData

export const getAttractionsByDistrict = (districtName) => {
  return attractionsData.filter((item) => item.district === districtName)
}
