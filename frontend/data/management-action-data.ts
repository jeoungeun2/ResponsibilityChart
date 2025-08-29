// 관리행동 책무 데이터 타입 정의
export interface ManagementActionData {
  id: string;
  division: string;        // 부문구분
  responsibilityCode: string;  // 책무코드
  responsibility: string;      // 책무
  detailCode: string;      // 책무 세부코드
  detailContent: string;   // 책무 세부내용
}

// 샘플 데이터 (15개) - 이미지 데이터 기반
export const managementActionData: ManagementActionData[] = [
  {
    id: "1",
    division: "ETF투자부문",
    responsibilityCode: "ET-금융영업-B1",
    responsibility: "집합투자업무와 관련된 책무",
    detailCode: "ET-금융영업-B1-A",
    detailContent: "집합투자 운용준칙 수립 및 리스크관리 업무를 관리·감독할 책임 (ETF투자부문에 한함)"
  },
  {
    id: "2",
    division: "ETF투자부문",
    responsibilityCode: "ET-금융영업-B1",
    responsibility: "집합투자업무와 관련된 책무",
    detailCode: "ET-금융영업-B1-B",
    detailContent: "집합투자 운용 및 운용지시 업무를 관리·감독할 책임 (ETF투자부문에 한함)"
  },
  {
    id: "3",
    division: "ETF투자부문",
    responsibilityCode: "ET-금융영업-B1",
    responsibility: "집합투자업무와 관련된 책무",
    detailCode: "ET-금융영업-B1-C",
    detailContent: "집합투자 외부감응 모니터링 및 보고업무를 관리·감독할 책임 (ETF투자부문에 한함)"
  },
  {
    id: "4",
    division: "ETF투자부문",
    responsibilityCode: "ET-금융영업-B2",
    responsibility: "투자자문업무와 관련된 책무",
    detailCode: "ET-금융영업-B2-A",
    detailContent: "투자자문 계약자산의 자문 운용을 관리·감독할 책임 (ETF투자부문에 한함)"
  },
  {
    id: "5",
    division: "ETF투자부문",
    responsibilityCode: "ET-금융영업-B3",
    responsibility: "투자일임업무와 관련된 책무",
    detailCode: "ET-금융영업-B3-A",
    detailContent: "투자일임 계약자산의 자문 및 운용을 관리·감독할 책임 (ETF투자부문에 한함)"
  },
  {
    id: "6",
    division: "감사실",
    responsibilityCode: "AU-지정책임-A2",
    responsibility: "내부감사업무와 관련된 책무",
    detailCode: "AU-지정책임-A2-A",
    detailContent: "내부감사체계 구축 및 운영을 관리·감독할 책임"
  },
  {
    id: "7",
    division: "감사실",
    responsibilityCode: "AU-지정책임-A2",
    responsibility: "내부감사업무와 관련된 책무",
    detailCode: "AU-지정책임-A2-B",
    detailContent: "내부통제제도(내부통제시스템, 자금세탁방지제도) 평가 및 보고를 관리·감독할 책임"
  },
  {
    id: "8",
    division: "경영관리부문",
    responsibilityCode: "AM-경영관리-C2",
    responsibility: "인사업무와 관련된 책무",
    detailCode: "AM-경영관리-C2-A",
    detailContent: "인사업무 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "9",
    division: "경영관리부문",
    responsibilityCode: "AM-경영관리-C4",
    responsibility: "고유자산 운용업무와 관련된 책무",
    detailCode: "AM-경영관리-C4-A",
    detailContent: "고유자산 관련 제도 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "10",
    division: "경영관리부문",
    responsibilityCode: "AM-경영관리-C5",
    responsibility: "건전성 및 재무관리 업무와 관련된 책무",
    detailCode: "AM-경영관리-C5-A",
    detailContent: "건전성 및 재무관리 업무 기준 및 절차를 관리·감독할 책임"
  },
  {
    id: "11",
    division: "경영관리부문",
    responsibilityCode: "AM-경영관리-C9",
    responsibility: "회계·세무 업무와 관련된 책무",
    detailCode: "AM-경영관리-C9-A",
    detailContent: "회계·세무 정책 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "12",
    division: "공통",
    responsibilityCode: "CA-지정책임-A8",
    responsibility: "개인정보 보호업무와 관련된 책무",
    detailCode: "CA-지정책임-A8-A",
    detailContent: "개인정보 보호(채용/인사) 처리 절차를 관리·감독할 책임"
  },
  {
    id: "13",
    division: "공통",
    responsibilityCode: "CA-지정책임-A12",
    responsibility: "소관 조직 관련업무와 관련된 책무",
    detailCode: "CA-지정책임-A12-A",
    detailContent: "소관 조직, 업무와 관련된 내부통제기준이 적정하게 마련되었는지 여부를 점검할 책임"
  },
  {
    id: "14",
    division: "공통",
    responsibilityCode: "CA-지정책임-A12",
    responsibility: "소관 조직 관련업무와 관련된 책무",
    detailCode: "CA-지정책임-A12-B",
    detailContent: "소관 조직, 업무와 관련된 의사결정 과정 및 예방통을 관리·감독할 책임"
  },
  {
    id: "15",
    division: "공통",
    responsibilityCode: "CA-지정책임-A12",
    responsibility: "소관 조직 관련업무와 관련된 책무",
    detailCode: "CA-지정책임-A12-C",
    detailContent: "소관 조직, 업무와 관련된 내부통제 점검 결과에 따른 개선 등 후속조치 이행 및 임직원 교육·훈련 등을 지원할 책임"
  }
];
