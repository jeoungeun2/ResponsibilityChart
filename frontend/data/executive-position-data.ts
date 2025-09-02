export interface ExecutivePositionData {
  id: string;
  name: string;
  jobTitle: string;
  employeeId: string;
  positionCode: string;
  position: string;
  positionStartDate: string;
  positionEndDate: string | null;
}

export const executivePositionSampleData: ExecutivePositionData[] = [
  {
    id: "1",
    name: "이도현",
    jobTitle: "대표이사",
    employeeId: "A05001",
    positionCode: "CEO001",
    position: "대표이사",
    positionStartDate: "2024.01.01",
    positionEndDate: null
  },
  {
    id: "2",
    name: "황준호",
    jobTitle: "상무",
    employeeId: "B06002",
    positionCode: "ETF001",
    position: "ETF투자부문장",
    positionStartDate: "2024.01.15",
    positionEndDate: null
  },
  {
    id: "3",
    name: "윤태섭",
    jobTitle: "실장",
    employeeId: "C07003",
    positionCode: "AUD001",
    position: "감사실장",
    positionStartDate: "2024.02.01",
    positionEndDate: null
  },
  {
    id: "4",
    name: "노지환",
    jobTitle: "상무",
    employeeId: "D08004",
    positionCode: "MGT001",
    position: "경영관리부문장",
    positionStartDate: "2024.01.20",
    positionEndDate: null
  },
  {
    id: "5",
    name: "정유진",
    jobTitle: "부문장",
    employeeId: "E09005",
    positionCode: "GLB001",
    position: "글로벌투자부문장",
    positionStartDate: "2024.02.15",
    positionEndDate: null
  },
  {
    id: "6",
    name: "임혜진",
    jobTitle: "이사대우",
    employeeId: "F10006",
    positionCode: "CNS001",
    position: "금융소비자보호실장",
    positionStartDate: "2024.03.01",
    positionEndDate: null
  },
  {
    id: "7",
    name: "김성철",
    jobTitle: "상무",
    employeeId: "G11007",
    positionCode: "RSK001",
    position: "리스크관리부문장",
    positionStartDate: "2024.01.10",
    positionEndDate: null
  },
  {
    id: "8",
    name: "박영수",
    jobTitle: "부문장",
    employeeId: "H12008",
    positionCode: "IT001",
    position: "IT시스템부문장",
    positionStartDate: "2024.02.20",
    positionEndDate: null
  },
  {
    id: "9",
    name: "최민아",
    jobTitle: "실장",
    employeeId: "I13009",
    positionCode: "FIN001",
    position: "재무관리실장",
    positionStartDate: "2024.03.15",
    positionEndDate: null
  },
  {
    id: "10",
    name: "이준혁",
    jobTitle: "팀장",
    employeeId: "J14010",
    positionCode: "HR001",
    position: "인사팀장",
    positionStartDate: "2024.01.25",
    positionEndDate: "2024.06.30"
  }
];
