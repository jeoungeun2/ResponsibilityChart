// 관리조치 수행팀 정보 데이터 타입 정의
export interface ManagementActionData {
  id: string;
  managementActionCode: string;  // 관리조치코드
  managementAction: string;      // 관리조치
  department: string;            // 소관부서
  team: string;                  // 소관팀
  manager: string;               // 담당자
  reviewer: string;              // 리뷰어
}

// 샘플 데이터 (15개) - 관리조치 수행팀 정보
export const managementActionData: ManagementActionData[] = [
  {
    id: "1",
    managementActionCode: "MA-001",
    managementAction: "기준마련여부 점검",
    department: "ETF투자부문",
    team: "금융영업팀",
    manager: "김영수",
    reviewer: "박민정"
  },
  {
    id: "2",
    managementActionCode: "MA-002",
    managementAction: "효과적집행운영여부 점검",
    department: "ETF투자부문",
    team: "금융영업팀",
    manager: "이지현",
    reviewer: "박민정"
  },
  {
    id: "3",
    managementActionCode: "MA-003",
    managementAction: "임직원 준수여부 점검",
    department: "ETF투자부문",
    team: "운용팀",
    manager: "정수진",
    reviewer: "박민정"
  },
  {
    id: "4",
    managementActionCode: "MA-004",
    managementAction: "관리사항 및 미흡사항 조치",
    department: "ETF투자부문",
    team: "운용팀",
    manager: "최동현",
    reviewer: "박민정"
  },
  {
    id: "5",
    managementActionCode: "MA-005",
    managementAction: "조치이행여부 점검",
    department: "ETF투자부문",
    team: "리스크관리팀",
    manager: "한미영",
    reviewer: "박민정"
  },
  {
    id: "6",
    managementActionCode: "MA-006",
    managementAction: "교육 및 훈련 지원",
    department: "감사실",
    team: "내부감사팀",
    manager: "송태호",
    reviewer: "김철수"
  },
  {
    id: "7",
    managementActionCode: "MA-007",
    managementAction: "조서 및 제재조치결과 보고",
    department: "감사실",
    team: "내부감사팀",
    manager: "윤서연",
    reviewer: "김철수"
  },
  {
    id: "8",
    managementActionCode: "MA-008",
    managementAction: "기준마련여부 점검",
    department: "경영관리부문",
    team: "인사팀",
    manager: "강민호",
    reviewer: "이영희"
  },
  {
    id: "9",
    managementActionCode: "MA-009",
    managementAction: "효과적집행운영여부 점검",
    department: "경영관리부문",
    team: "재무팀",
    manager: "조현우",
    reviewer: "이영희"
  },
  {
    id: "10",
    managementActionCode: "MA-010",
    managementAction: "임직원 준수여부 점검",
    department: "경영관리부문",
    team: "회계팀",
    manager: "임소영",
    reviewer: "이영희"
  },
  {
    id: "11",
    managementActionCode: "MA-011",
    managementAction: "관리사항 및 미흡사항 조치",
    department: "경영관리부문",
    team: "회계팀",
    manager: "배준호",
    reviewer: "이영희"
  },
  {
    id: "12",
    managementActionCode: "MA-012",
    managementAction: "조치이행여부 점검",
    department: "공통",
    team: "개인정보보호팀",
    manager: "신예린",
    reviewer: "정민수"
  },
  {
    id: "13",
    managementActionCode: "MA-013",
    managementAction: "교육 및 훈련 지원",
    department: "공통",
    team: "내부통제팀",
    manager: "오세훈",
    reviewer: "정민수"
  },
  {
    id: "14",
    managementActionCode: "MA-014",
    managementAction: "조서 및 제재조치결과 보고",
    department: "공통",
    team: "내부통제팀",
    manager: "류지은",
    reviewer: "정민수"
  },
  {
    id: "15",
    managementActionCode: "MA-015",
    managementAction: "기준마련여부 점검",
    department: "공통",
    team: "내부통제팀",
    manager: "홍길동",
    reviewer: "정민수"
  }
];
