export interface MeetingData {
  id: string;
  meetingBody: string; // 주관회의체
  roleType: string; // 위원장/위원
  meetingFrequency: string; // 개최주기
  mainDecisions: string; // 주요심의의결사항
  employeeId: string; // 사번
  name: string; // 성명
  effectiveStartDate: string; // 적용시작일자
  effectiveEndDate: string | null; // 적용종료일자
}

export const meetingSampleData: MeetingData[] = [
  {
    id: "1",
    meetingBody: "이사회",
    roleType: "위원장",
    meetingFrequency: "월 1회",
    mainDecisions: "경영전략, 투자승인, 예산승인",
    employeeId: "A05001",
    name: "이도현",
    effectiveStartDate: "2024.01.01",
    effectiveEndDate: null
  },
  {
    id: "2",
    meetingBody: "이사회",
    roleType: "위원",
    meetingFrequency: "월 1회",
    mainDecisions: "경영전략, 투자승인, 예산승인",
    employeeId: "B06002",
    name: "황준호",
    effectiveStartDate: "2024.01.15",
    effectiveEndDate: null
  },
  {
    id: "3",
    meetingBody: "리스크관리위원회",
    roleType: "위원장",
    meetingFrequency: "월 2회",
    mainDecisions: "리스크관리정책, 위험한도설정",
    employeeId: "G11007",
    name: "김성철",
    effectiveStartDate: "2024.02.01",
    effectiveEndDate: null
  },
  {
    id: "4",
    meetingBody: "리스크관리위원회",
    roleType: "위원",
    meetingFrequency: "월 2회",
    mainDecisions: "리스크관리정책, 위험한도설정",
    employeeId: "B06002",
    name: "황준호",
    effectiveStartDate: "2024.02.01",
    effectiveEndDate: null
  },
  {
    id: "5",
    meetingBody: "감사위원회",
    roleType: "위원장",
    meetingFrequency: "분기 1회",
    mainDecisions: "내부감사계획, 감사결과보고",
    employeeId: "C07003",
    name: "윤태섭",
    effectiveStartDate: "2024.01.01",
    effectiveEndDate: null
  },
  {
    id: "6",
    meetingBody: "투자위원회",
    roleType: "위원장",
    meetingFrequency: "월 1회",
    mainDecisions: "투자심의, 포트폴리오관리",
    employeeId: "E09005",
    name: "정유진",
    effectiveStartDate: "2024.01.20",
    effectiveEndDate: null
  },
  {
    id: "7",
    meetingBody: "투자위원회",
    roleType: "위원",
    meetingFrequency: "월 1회",
    mainDecisions: "투자심의, 포트폴리오관리",
    employeeId: "B06002",
    name: "황준호",
    effectiveStartDate: "2024.01.20",
    effectiveEndDate: null
  },
  {
    id: "8",
    meetingBody: "IT위원회",
    roleType: "위원장",
    meetingFrequency: "분기 1회",
    mainDecisions: "IT전략수립, 시스템도입승인",
    employeeId: "H12008",
    name: "박영수",
    effectiveStartDate: "2024.03.01",
    effectiveEndDate: null
  },
  {
    id: "9",
    meetingBody: "소비자보호위원회",
    roleType: "위원장",
    meetingFrequency: "분기 1회",
    mainDecisions: "소비자보호정책, 민원처리방안",
    employeeId: "F10006",
    name: "임혜진",
    effectiveStartDate: "2024.02.15",
    effectiveEndDate: null
  },
  {
    id: "10",
    meetingBody: "경영관리위원회",
    roleType: "위원장",
    meetingFrequency: "월 1회",
    mainDecisions: "경영관리정책, 조직운영방안",
    employeeId: "D08004",
    name: "노지환",
    effectiveStartDate: "2024.01.10",
    effectiveEndDate: null
  }
];
