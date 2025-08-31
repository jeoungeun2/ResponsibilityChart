export interface ExecutiveData {
  id: string;
  name: string;
  position: string;
  jobTitle: string;
  employeeId: string;
  phoneNumber: string;
  email: string;
  managedOrganization: string;
  term: string;
  hasConcurrentPosition: string;
  concurrentPositionDetails?: string;
}

export const executiveSampleData: ExecutiveData[] = [
  {
    id: "1",
    name: "이도현",
    position: "대표이사",
    jobTitle: "대표이사",
    employeeId: "A05001",
    phoneNumber: "02-3456-7001",
    email: "lee.dohyun@corp.com",
    managedOrganization: "대표이사",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "없음"
  },
  {
    id: "2",
    name: "황준호",
    position: "ETF투자부문장",
    jobTitle: "상무",
    employeeId: "A11002",
    phoneNumber: "02-3456-7012",
    email: "hwang.junho@corp.com",
    managedOrganization: "ETF투자부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "있음",
    concurrentPositionDetails: "ETF운용위원회 위원"
  },
  {
    id: "3",
    name: "윤태섭",
    position: "감사실장",
    jobTitle: "실장",
    employeeId: "A10001",
    phoneNumber: "02-3456-7004",
    email: "yoon.taeseob@corp.com",
    managedOrganization: "감사실",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "없음"
  },
  {
    id: "4",
    name: "김민수",
    position: "자산운용부문장",
    jobTitle: "상무",
    employeeId: "A12001",
    phoneNumber: "02-3456-7015",
    email: "kim.minsu@corp.com",
    managedOrganization: "자산운용부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "있음",
    concurrentPositionDetails: "투자심의위원회 위원"
  },
  {
    id: "5",
    name: "박지영",
    position: "자산관리부문장",
    jobTitle: "상무",
    employeeId: "A13001",
    phoneNumber: "02-3456-7018",
    email: "park.jiyoung@corp.com",
    managedOrganization: "자산관리부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "없음"
  },
  {
    id: "6",
    name: "최동현",
    position: "글로벌투자부문장",
    jobTitle: "상무",
    employeeId: "A14001",
    phoneNumber: "02-3456-7021",
    email: "choi.donghyun@corp.com",
    managedOrganization: "글로벌투자부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "있음",
    concurrentPositionDetails: "해외투자심의위원회 위원"
  },
  {
    id: "7",
    name: "정수진",
    position: "IT부문장",
    jobTitle: "상무",
    employeeId: "A15001",
    phoneNumber: "02-3456-7024",
    email: "jung.sujin@corp.com",
    managedOrganization: "IT부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "없음"
  },
  {
    id: "8",
    name: "한승우",
    position: "인사부문장",
    jobTitle: "상무",
    employeeId: "A16001",
    phoneNumber: "02-3456-7027",
    email: "han.seungwoo@corp.com",
    managedOrganization: "인사부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "있음",
    concurrentPositionDetails: "인사위원회 위원"
  },
  {
    id: "9",
    name: "송미라",
    position: "재무부문장",
    jobTitle: "상무",
    employeeId: "A17001",
    phoneNumber: "02-3456-7030",
    email: "song.mira@corp.com",
    managedOrganization: "재무부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "없음"
  },
  {
    id: "10",
    name: "강현우",
    position: "법무부문장",
    jobTitle: "상무",
    employeeId: "A18001",
    phoneNumber: "02-3456-7033",
    email: "kang.hyunwoo@corp.com",
    managedOrganization: "법무부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "있음",
    concurrentPositionDetails: "법무위원회 위원"
  },
  {
    id: "11",
    name: "임서연",
    position: "리스크관리팀장",
    jobTitle: "팀장",
    employeeId: "A11003",
    phoneNumber: "02-3456-7036",
    email: "lim.seoyeon@corp.com",
    managedOrganization: "ETF투자부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "없음"
  },
  {
    id: "12",
    name: "오준호",
    position: "시스템개발팀장",
    jobTitle: "팀장",
    employeeId: "A15002",
    phoneNumber: "02-3456-7039",
    email: "oh.junho@corp.com",
    managedOrganization: "IT부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "없음"
  },
  {
    id: "13",
    name: "윤서아",
    position: "인프라팀장",
    jobTitle: "팀장",
    employeeId: "A15003",
    phoneNumber: "02-3456-7042",
    email: "yoon.seoa@corp.com",
    managedOrganization: "IT부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "없음"
  },
  {
    id: "14",
    name: "배준석",
    position: "인사팀장",
    jobTitle: "팀장",
    employeeId: "A16002",
    phoneNumber: "02-3456-7045",
    email: "bae.junseok@corp.com",
    managedOrganization: "인사부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "없음"
  },
  {
    id: "15",
    name: "조은영",
    position: "재무팀장",
    jobTitle: "팀장",
    employeeId: "A17002",
    phoneNumber: "02-3456-7048",
    email: "cho.eunyoung@corp.com",
    managedOrganization: "재무부문",
    term: "2024.01.01 ~ 2026.12.31",
    hasConcurrentPosition: "없음"
  }
];
