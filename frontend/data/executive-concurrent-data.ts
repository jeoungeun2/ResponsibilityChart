export interface ExecutiveConcurrentData {
  id: string;
  name: string;
  jobTitle: string;
  employeeId: string;
  hasInternalConcurrent: string; // "있음" | "없음"
  internalConcurrentPosition: string | null;
  hasExternalConcurrent: string; // "있음" | "없음"
  externalConcurrentIndustry: string | null;
  externalConcurrentCompany: string | null;
  externalConcurrentJobTitle: string | null;
  externalConcurrentPosition: string | null;
}

export const executiveConcurrentSampleData: ExecutiveConcurrentData[] = [
  {
    id: "1",
    name: "이도현",
    jobTitle: "대표이사",
    employeeId: "A05001",
    hasInternalConcurrent: "없음",
    internalConcurrentPosition: null,
    hasExternalConcurrent: "있음",
    externalConcurrentIndustry: "금융업",
    externalConcurrentCompany: "한국금융협회",
    externalConcurrentJobTitle: "이사",
    externalConcurrentPosition: "비상임이사"
  },
  {
    id: "2",
    name: "황준호",
    jobTitle: "상무",
    employeeId: "B06002",
    hasInternalConcurrent: "있음",
    internalConcurrentPosition: "리스크관리위원회 위원",
    hasExternalConcurrent: "없음",
    externalConcurrentIndustry: null,
    externalConcurrentCompany: null,
    externalConcurrentJobTitle: null,
    externalConcurrentPosition: null
  },
  {
    id: "3",
    name: "윤태섭",
    jobTitle: "실장",
    employeeId: "C07003",
    hasInternalConcurrent: "있음",
    internalConcurrentPosition: "준법감시위원회 위원장",
    hasExternalConcurrent: "있음",
    externalConcurrentIndustry: "교육업",
    externalConcurrentCompany: "한국감사학회",
    externalConcurrentJobTitle: "이사",
    externalConcurrentPosition: "비상임이사"
  },
  {
    id: "4",
    name: "노지환",
    jobTitle: "상무",
    employeeId: "D08004",
    hasInternalConcurrent: "없음",
    internalConcurrentPosition: null,
    hasExternalConcurrent: "없음",
    externalConcurrentIndustry: null,
    externalConcurrentCompany: null,
    externalConcurrentJobTitle: null,
    externalConcurrentPosition: null
  },
  {
    id: "5",
    name: "정유진",
    jobTitle: "부문장",
    employeeId: "E09005",
    hasInternalConcurrent: "있음",
    internalConcurrentPosition: "투자위원회 위원",
    hasExternalConcurrent: "있음",
    externalConcurrentIndustry: "투자업",
    externalConcurrentCompany: "글로벌인베스트먼트",
    externalConcurrentJobTitle: "자문위원",
    externalConcurrentPosition: "투자자문위원"
  },
  {
    id: "6",
    name: "임혜진",
    jobTitle: "이사대우",
    employeeId: "F10006",
    hasInternalConcurrent: "있음",
    internalConcurrentPosition: "소비자보호위원회 위원장",
    hasExternalConcurrent: "없음",
    externalConcurrentIndustry: null,
    externalConcurrentCompany: null,
    externalConcurrentJobTitle: null,
    externalConcurrentPosition: null
  },
  {
    id: "7",
    name: "김성철",
    jobTitle: "상무",
    employeeId: "G11007",
    hasInternalConcurrent: "없음",
    internalConcurrentPosition: null,
    hasExternalConcurrent: "있음",
    externalConcurrentIndustry: "컨설팅업",
    externalConcurrentCompany: "리스크매니지먼트코리아",
    externalConcurrentJobTitle: "고문",
    externalConcurrentPosition: "전략고문"
  },
  {
    id: "8",
    name: "박영수",
    jobTitle: "부문장",
    employeeId: "H12008",
    hasInternalConcurrent: "있음",
    internalConcurrentPosition: "IT위원회 위원장",
    hasExternalConcurrent: "있음",
    externalConcurrentIndustry: "IT업",
    externalConcurrentCompany: "한국핀테크협회",
    externalConcurrentJobTitle: "이사",
    externalConcurrentPosition: "기술자문이사"
  },
  {
    id: "9",
    name: "최민아",
    jobTitle: "실장",
    employeeId: "I13009",
    hasInternalConcurrent: "없음",
    internalConcurrentPosition: null,
    hasExternalConcurrent: "없음",
    externalConcurrentIndustry: null,
    externalConcurrentCompany: null,
    externalConcurrentJobTitle: null,
    externalConcurrentPosition: null
  },
  {
    id: "10",
    name: "이준혁",
    jobTitle: "팀장",
    employeeId: "J14010",
    hasInternalConcurrent: "있음",
    internalConcurrentPosition: "노사협의회 위원",
    hasExternalConcurrent: "없음",
    externalConcurrentIndustry: null,
    externalConcurrentCompany: null,
    externalConcurrentJobTitle: null,
    externalConcurrentPosition: null
  }
];
