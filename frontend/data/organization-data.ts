// 조직도 데이터 타입 정의
export interface OrganizationData {
  id: string;
  orgCodeLv1: string;        // 관리대상조직코드 Lv1
  orgNameLv1: string;        // 관리대상조직명
  deptCodeLv2: string;       // 소관부서/본부코드 Lv2
  deptNameLv2: string;       // 소관부서/본부명
  teamCodeLv3: string;       // 소관팀코드 Lv3
  teamNameLv3: string;       // 소관팀명
  effectiveStartDate: string; // 적용시작일자
  effectiveEndDate: string;   // 적용종료일자
  registrationDate: string;  // 등록일자
}

// 조직도 샘플 데이터
export const organizationSampleData: OrganizationData[] = [
  {
    id: "1",
    orgCodeLv1: "ET",
    orgNameLv1: "ETF투자부문",
    deptCodeLv2: "ET01",
    deptNameLv2: "ETF투자부",
    teamCodeLv3: "ET011",
    teamNameLv3: "ETF운용팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  },
  {
    id: "2",
    orgCodeLv1: "ET",
    orgNameLv1: "ETF투자부문",
    deptCodeLv2: "ET02",
    deptNameLv2: "LDI/리서치본부",
    teamCodeLv3: "ET021",
    teamNameLv3: "체계운용팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  },
  {
    id: "3",
    orgCodeLv1: "AU",
    orgNameLv1: "자산운용부문",
    deptCodeLv2: "AU01",
    deptNameLv2: "자산운용부",
    teamCodeLv3: "AU011",
    teamNameLv3: "자산운용팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  },
  {
    id: "4",
    orgCodeLv1: "AM",
    orgNameLv1: "자산관리부문",
    deptCodeLv2: "AM01",
    deptNameLv2: "자산관리부",
    teamCodeLv3: "AM011",
    teamNameLv3: "자산관리팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  },
  {
    id: "5",
    orgCodeLv1: "GI",
    orgNameLv1: "글로벌투자부문",
    deptCodeLv2: "GI01",
    deptNameLv2: "글로벌투자부",
    teamCodeLv3: "GI011",
    teamNameLv3: "글로벌투자팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  },
  {
    id: "6",
    orgCodeLv1: "CP",
    orgNameLv1: "금융소비자보호실",
    deptCodeLv2: "CP01",
    deptNameLv2: "금융소비자보호실",
    teamCodeLv3: "CP011",
    teamNameLv3: "소비자보호팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  },
  {
    id: "7",
    orgCodeLv1: "IT",
    orgNameLv1: "IT부문",
    deptCodeLv2: "IT01",
    deptNameLv2: "IT개발부",
    teamCodeLv3: "IT011",
    teamNameLv3: "시스템개발팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  },
  {
    id: "8",
    orgCodeLv1: "IT",
    orgNameLv1: "IT부문",
    deptCodeLv2: "IT02",
    deptNameLv2: "IT인프라부",
    teamCodeLv3: "IT021",
    teamNameLv3: "인프라관리팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  },
  {
    id: "9",
    orgCodeLv1: "HR",
    orgNameLv1: "인사부문",
    deptCodeLv2: "HR01",
    deptNameLv2: "인사부",
    teamCodeLv3: "HR011",
    teamNameLv3: "인사관리팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  },
  {
    id: "10",
    orgCodeLv1: "FI",
    orgNameLv1: "재무부문",
    deptCodeLv2: "FI01",
    deptNameLv2: "재무부",
    teamCodeLv3: "FI011",
    teamNameLv3: "재무관리팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  },
  {
    id: "11",
    orgCodeLv1: "LE",
    orgNameLv1: "법무부문",
    deptCodeLv2: "LE01",
    deptNameLv2: "법무부",
    teamCodeLv3: "LE011",
    teamNameLv3: "법무관리팀",
    effectiveStartDate: "2025-01-01",
    effectiveEndDate: "2025-12-31",
    registrationDate: "2025-01-01"
  }
];
