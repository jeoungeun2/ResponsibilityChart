// 책무 점검 관리 데이터 타입 정의
export interface ResponsibilityCheckManagementData {
  id: string;
  controlActivityCode: string;    // 통제활동코드
  controlActivityName: string;    // 통제활동명
  controlActivity: string;        // 통제활동
  responsibleDepartment: string;  // 담당부서
  responsibleTeam: string;        // 담당팀
  assignee: string;               // 담당자
  implementationDeadline: string; // 이행기한
  inspectionDate: string;         // 점검일자
  implementationStatus: '승인요청' | '미완료' | '완료'; // 이행상태
  inspectionStatus: '완료' | '진행중' | '미점검'; // 점검상태
  inspectionResult: '적정' | '보완필요' | '-'; // 점검결과
}

// 샘플 데이터 (15개) - 책무 점검 관리용
export const responsibilityCheckManagementData: ResponsibilityCheckManagementData[] = [
  {
    id: "1",
    controlActivityCode: "CE-지정책임-A1-A-001",
    controlActivityName: "내부통제기준등의 제....",
    controlActivity: "내부통제기준등의 제·개폐 사항을 검토하고 경영관리틴을 통해 이사회에 보고",
    responsibleDepartment: "준법감시실",
    responsibleTeam: "준법감시팀",
    assignee: "박○○",
    implementationDeadline: "2024-03-31",
    inspectionDate: "2024-03-15",
    implementationStatus: "승인요청",
    inspectionStatus: "완료",
    inspectionResult: "적정"
  },
  {
    id: "2",
    controlActivityCode: "EQ-금융업무-B1-B-002",
    controlActivityName: "신용리스크 관리체계...",
    controlActivity: "신용리스크 관리정책 수립 및 운영, 신용리스크 측정 및 모니터링 체계 구축",
    responsibleDepartment: "리스크관리부",
    responsibleTeam: "신용리스크팀",
    assignee: "김○○",
    implementationDeadline: "2024-03-30",
    inspectionDate: "2024-03-14",
    implementationStatus: "미완료",
    inspectionStatus: "진행중",
    inspectionResult: "-"
  },
  {
    id: "3",
    controlActivityCode: "CE-영업활동-A2-A-003",
    controlActivityName: "영업목표 수립 및 성과...",
    controlActivity: "영업목표 설정 프로세스 관리 및 성과 평가 체계 운영, 영업 활동 모니터링",
    responsibleDepartment: "영업기획그룹",
    responsibleTeam: "영업기획팀",
    assignee: "이○○",
    implementationDeadline: "2024-03-28",
    inspectionDate: "2024-03-13",
    implementationStatus: "승인요청",
    inspectionStatus: "완료",
    inspectionResult: "보완필요"
  },
  {
    id: "4",
    controlActivityCode: "CE-개인고객-A3-A-004",
    controlActivityName: "개인고객 대상 영업활...",
    controlActivity: "개인고객 영업활동 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "개인그룹",
    responsibleTeam: "개인영업팀",
    assignee: "최○○",
    implementationDeadline: "2024-03-25",
    inspectionDate: "2024-03-12",
    implementationStatus: "미완료",
    inspectionStatus: "미점검",
    inspectionResult: "-"
  },
  {
    id: "5",
    controlActivityCode: "CE-기업금융-A4-A-005",
    controlActivityName: "기업금융 영업활동 및...",
    controlActivity: "기업금융 영업 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "CIB그룹",
    responsibleTeam: "기업금융팀",
    assignee: "정○○",
    implementationDeadline: "2024-03-27",
    inspectionDate: "2024-03-11",
    implementationStatus: "승인요청",
    inspectionStatus: "완료",
    inspectionResult: "적정"
  },
  {
    id: "6",
    controlActivityCode: "CE-자산관리-A5-A-006",
    controlActivityName: "자산관리 업무 프로세...",
    controlActivity: "자산관리 업무 프로세스 표준화 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "자산관리그룹",
    responsibleTeam: "자산관리팀",
    assignee: "송○○",
    implementationDeadline: "2024-03-26",
    inspectionDate: "2024-03-10",
    implementationStatus: "미완료",
    inspectionStatus: "진행중",
    inspectionResult: "-"
  },
  {
    id: "7",
    controlActivityCode: "CE-투자운용-A6-A-007",
    controlActivityName: "투자운용 업무 프로세...",
    controlActivity: "투자운용 업무 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "투자운용그룹",
    responsibleTeam: "투자운용팀",
    assignee: "한○○",
    implementationDeadline: "2024-03-24",
    inspectionDate: "2024-03-09",
    implementationStatus: "승인요청",
    inspectionStatus: "완료",
    inspectionResult: "적정"
  },
  {
    id: "8",
    controlActivityCode: "CE-정보시스템-A7-A-008",
    controlActivityName: "정보시스템 보안 관리...",
    controlActivity: "정보시스템 보안 정책 수립 및 운영, 보안 취약점 점검 및 개선",
    responsibleDepartment: "IT그룹",
    responsibleTeam: "보안팀",
    assignee: "강○○",
    implementationDeadline: "2024-03-23",
    inspectionDate: "2024-03-08",
    implementationStatus: "미완료",
    inspectionStatus: "진행중",
    inspectionResult: "-"
  },
  {
    id: "9",
    controlActivityCode: "CE-인사관리-A8-A-009",
    controlActivityName: "인사관리 업무 프로세...",
    controlActivity: "인사관리 업무 프로세스 표준화 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "인사그룹",
    responsibleTeam: "인사관리팀",
    assignee: "윤○○",
    implementationDeadline: "2024-03-22",
    inspectionDate: "2024-03-07",
    implementationStatus: "승인요청",
    inspectionStatus: "완료",
    inspectionResult: "보완필요"
  },
  {
    id: "10",
    controlActivityCode: "CE-재무관리-A9-A-010",
    controlActivityName: "재무관리 업무 프로세...",
    controlActivity: "재무관리 업무 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "재무그룹",
    responsibleTeam: "재무관리팀",
    assignee: "임○○",
    implementationDeadline: "2024-03-21",
    inspectionDate: "2024-03-06",
    implementationStatus: "미완료",
    inspectionStatus: "미점검",
    inspectionResult: "-"
  },
  {
    id: "11",
    controlActivityCode: "CE-법무관리-A10-A-011",
    controlActivityName: "법무관리 업무 프로세...",
    controlActivity: "법무관리 업무 프로세스 표준화 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "법무그룹",
    responsibleTeam: "법무관리팀",
    assignee: "조○○",
    implementationDeadline: "2024-03-20",
    inspectionDate: "2024-03-05",
    implementationStatus: "승인요청",
    inspectionStatus: "완료",
    inspectionResult: "적정"
  },
  {
    id: "12",
    controlActivityCode: "CE-구매관리-A11-A-012",
    controlActivityName: "구매관리 업무 프로세...",
    controlActivity: "구매관리 업무 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "구매그룹",
    responsibleTeam: "구매관리팀",
    assignee: "백○○",
    implementationDeadline: "2024-03-19",
    inspectionDate: "2024-03-04",
    implementationStatus: "미완료",
    inspectionStatus: "진행중",
    inspectionResult: "-"
  },
  {
    id: "13",
    controlActivityCode: "CE-품질관리-A12-A-013",
    controlActivityName: "품질관리 업무 프로세...",
    controlActivity: "품질관리 업무 프로세스 표준화 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "품질그룹",
    responsibleTeam: "품질관리팀",
    assignee: "남○○",
    implementationDeadline: "2024-03-18",
    inspectionDate: "2024-03-03",
    implementationStatus: "승인요청",
    inspectionStatus: "완료",
    inspectionResult: "적정"
  },
  {
    id: "14",
    controlActivityCode: "CE-환경관리-A13-A-014",
    controlActivityName: "환경관리 업무 프로세...",
    controlActivity: "환경관리 업무 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "환경그룹",
    responsibleTeam: "환경관리팀",
    assignee: "서○○",
    implementationDeadline: "2024-03-17",
    inspectionDate: "2024-03-02",
    implementationStatus: "미완료",
    inspectionStatus: "미점검",
    inspectionResult: "-"
  },
  {
    id: "15",
    controlActivityCode: "CE-고객서비스-A14-A-015",
    controlActivityName: "고객서비스 업무 프로세...",
    controlActivity: "고객서비스 업무 프로세스 표준화 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "고객서비스그룹",
    responsibleTeam: "고객서비스팀",
    assignee: "황○○",
    implementationDeadline: "2024-03-16",
    inspectionDate: "2024-03-01",
    implementationStatus: "승인요청",
    inspectionStatus: "완료",
    inspectionResult: "보완필요"
  }
];
