// 관리조치 데이터 타입 정의
export interface ManagementActionData {
  id: string;
  name: string; // 성명
  managedOrg: string; // 관리대상조직
  dutyCode: string; // 책무코드
  duty: string; // 책무
  dutyDetailCode: string; // 책무세부코드
  dutyDetail: string; // 책무 세부내용
  managementObligationCode: string; // 관리의무코드
  managementObligation: string; // 관리의무
  actionCode: string; // 관리조치코드
  action: string; // 관리조치
  actionTypes: {
    standardCheck: boolean; // 기준마련 여부 점검
    executionCheck: boolean; // 기준의 효과적 집행·운영 여부 점검
    complianceCheck: boolean; // 임직원 준수 여부 점검
    managementAction: boolean; // 관리사항 및 미흡사항 조치
    implementationCheck: boolean; // 조치 이행 여부 점검
    educationSupport: boolean; // 교육 및 훈련지원
    investigationReport: boolean; // 조사 및 제재조치 결과보고
  };
  checkCycle: string; // 점검주기
  checkMonth: string; // 점검월
  evidence: string; // 증빙
}

export const sampleManagementActionData: ManagementActionData[] = [
  {
    id: "1",
    name: "이도현",
    managedOrg: "대표이사",
    dutyCode: "CE-지정책임-A1",
    duty: "책무구조도의 마련, 관리업무와 관련된 책무",
    dutyDetailCode: "CE-지정책임-A1-001",
    dutyDetail: "내부통제등의 취중 책임자로서 종괄적인 관리 조치 운영책임",
    managementObligationCode: "MO-001",
    managementObligation: "내부통제기준의 제·개정 및 운영",
    actionCode: "CE-지정책임-A1-001",
    action: "내부통제기준의 제·개정사항을 검토하고 경영관리틴을 통해 이사회에 보고",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: false,
      managementAction: false,
      implementationCheck: false,
      educationSupport: false,
      investigationReport: false
    },
    checkCycle: "발생시",
    checkMonth: "1월",
    evidence: "승인"
  },
  {
    id: "2",
    name: "김철수",
    managedOrg: "경영기획팀",
    dutyCode: "CE-지정책임-A2",
    duty: "경영전략 수립 및 실행",
    dutyDetailCode: "CE-지정책임-A2-001",
    dutyDetail: "전사 경영전략 수립 및 실행에 대한 종합 관리",
    managementObligationCode: "MO-002",
    managementObligation: "경영전략 수립 및 실행 관리",
    actionCode: "CE-지정책임-A2-001",
    action: "연간 경영계획 수립 및 실행 점검",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: true,
      managementAction: false,
      implementationCheck: true,
      educationSupport: false,
      investigationReport: false
    },
    checkCycle: "분기별",
    checkMonth: "3월",
    evidence: "보고서"
  },
  {
    id: "3",
    name: "이영희",
    managedOrg: "인사팀",
    dutyCode: "CE-지정책임-A3",
    duty: "인사정책 수립 및 운영",
    dutyDetailCode: "CE-지정책임-A3-001",
    dutyDetail: "전사 인사정책 수립 및 운영에 대한 관리",
    managementObligationCode: "MO-003",
    managementObligation: "인사정책 수립 및 운영 관리",
    actionCode: "CE-지정책임-A3-001",
    action: "인사정책 수립 및 운영 점검",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: true,
      investigationReport: false
    },
    checkCycle: "반기별",
    checkMonth: "6월",
    evidence: "점검보고서"
  },
  {
    id: "4",
    name: "박민수",
    managedOrg: "재무팀",
    dutyCode: "CE-지정책임-A4",
    duty: "재무관리 및 회계감사",
    dutyDetailCode: "CE-지정책임-A4-001",
    dutyDetail: "전사 재무관리 및 회계감사에 대한 종합 관리",
    managementObligationCode: "MO-004",
    managementObligation: "재무관리 및 회계감사 관리",
    actionCode: "CE-지정책임-A4-001",
    action: "재무제표 작성 및 감사 실시",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: false,
      investigationReport: true
    },
    checkCycle: "연간",
    checkMonth: "12월",
    evidence: "감사보고서"
  },
  {
    id: "5",
    name: "정수진",
    managedOrg: "영업팀",
    dutyCode: "CE-지정책임-A5",
    duty: "영업활동 관리 및 점검",
    dutyDetailCode: "CE-지정책임-A5-001",
    dutyDetail: "전사 영업활동에 대한 관리 및 점검",
    managementObligationCode: "MO-005",
    managementObligation: "영업활동 관리 및 점검",
    actionCode: "CE-지정책임-A5-001",
    action: "영업활동 내부통제 점검",
    actionTypes: {
      standardCheck: false,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: true,
      investigationReport: false
    },
    checkCycle: "분기별",
    checkMonth: "9월",
    evidence: "점검보고서"
  },
  {
    id: "6",
    name: "한지훈",
    managedOrg: "개발팀",
    dutyCode: "CE-지정책임-A6",
    duty: "개발 프로세스 관리",
    dutyDetailCode: "CE-지정책임-A6-001",
    dutyDetail: "소프트웨어 개발 프로세스에 대한 관리 및 점검",
    managementObligationCode: "MO-006",
    managementObligation: "개발 프로세스 관리",
    actionCode: "CE-지정책임-A6-001",
    action: "개발 프로세스 내부통제 점검",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: false,
      managementAction: true,
      implementationCheck: true,
      educationSupport: true,
      investigationReport: false
    },
    checkCycle: "월별",
    checkMonth: "매월",
    evidence: "점검보고서"
  },
  {
    id: "7",
    name: "최영수",
    managedOrg: "품질관리팀",
    dutyCode: "CE-지정책임-A7",
    duty: "품질관리 체계 운영",
    dutyDetailCode: "CE-지정책임-A7-001",
    dutyDetail: "전사 품질관리 체계 운영에 대한 관리",
    managementObligationCode: "MO-007",
    managementObligation: "품질관리 체계 운영 관리",
    actionCode: "CE-지정책임-A7-001",
    action: "품질관리 체계 운영 점검",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: true,
      investigationReport: true
    },
    checkCycle: "월별",
    checkMonth: "매월",
    evidence: "종합보고서"
  },
  {
    id: "8",
    name: "윤미영",
    managedOrg: "보안팀",
    dutyCode: "CE-지정책임-A8",
    duty: "정보보안 관리",
    dutyDetailCode: "CE-지정책임-A8-001",
    dutyDetail: "전사 정보보안 관리에 대한 종합 관리",
    managementObligationCode: "MO-008",
    managementObligation: "정보보안 관리",
    actionCode: "CE-지정책임-A8-001",
    action: "정보보안 정책 수립 및 운영",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: true,
      investigationReport: true
    },
    checkCycle: "분기별",
    checkMonth: "3월",
    evidence: "보안점검보고서"
  },
  {
    id: "9",
    name: "송태호",
    managedOrg: "법무팀",
    dutyCode: "CE-지정책임-A9",
    duty: "법적 준수 관리",
    dutyDetail: "전사 법적 준수에 대한 관리 및 점검",
    actionCode: "CE-지정책임-A9-001",
    action: "법적 준수 여부 점검",
    actionTypes: {
      standardCheck: true,
      executionCheck: false,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: true,
      investigationReport: true
    },
    dutyDetailCode: "CE-지정책임-A8-001",
    dutyDetail: "법적 준수 여부 점검 및 위반사항 조치",
    checkCycle: "반기별",
    evidence: "법무점검보고서"
  },
  {
    id: "10",
    name: "임지원",
    managedOrg: "구매팀",
    dutyCode: "CE-지정책임-A10",
    duty: "구매 프로세스 관리",
    dutyDetail: "전사 구매 프로세스에 대한 관리 및 점검",
    actionCode: "CE-지정책임-A10-001",
    action: "구매 프로세스 내부통제 점검",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: false,
      investigationReport: false
    },
    dutyDetailCode: "CE-지정책임-A8-001",
    dutyDetail: "구매 프로세스 운영 과정에서의 내부통제 점검",
    checkCycle: "분기별",
    evidence: "구매점검보고서"
  },
  {
    id: "11",
    name: "강동훈",
    managedOrg: "생산팀",
    dutyCode: "CE-지정책임-A11",
    duty: "생산 프로세스 관리",
    dutyDetail: "전사 생산 프로세스에 대한 관리 및 점검",
    actionCode: "CE-지정책임-A11-001",
    action: "생산 프로세스 내부통제 점검",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: true,
      investigationReport: false
    },
    dutyDetailCode: "CE-지정책임-A8-001",
    dutyDetail: "생산 프로세스 운영 과정에서의 종합적인 점검",
    checkCycle: "월별",
    evidence: "생산점검보고서"
  },
  {
    id: "12",
    name: "박소연",
    managedOrg: "마케팅팀",
    dutyCode: "CE-지정책임-A12",
    duty: "마케팅 활동 관리",
    dutyDetail: "전사 마케팅 활동에 대한 관리 및 점검",
    actionCode: "CE-지정책임-A12-001",
    action: "마케팅 활동 내부통제 점검",
    actionTypes: {
      standardCheck: false,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: true,
      investigationReport: false
    },
    dutyDetailCode: "CE-지정책임-A8-001",
    dutyDetail: "마케팅 활동 과정에서의 준수 여부 점검",
    checkCycle: "분기별",
    evidence: "마케팅점검보고서"
  },
  {
    id: "13",
    name: "김현우",
    managedOrg: "고객지원팀",
    dutyCode: "CE-지정책임-A13",
    duty: "고객지원 서비스 관리",
    dutyDetail: "전사 고객지원 서비스에 대한 관리 및 점검",
    actionCode: "CE-지정책임-A13-001",
    action: "고객지원 서비스 내부통제 점검",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: true,
      investigationReport: false
    },
    dutyDetailCode: "CE-지정책임-A8-001",
    dutyDetail: "고객지원 서비스 운영 과정에서의 종합적인 점검",
    checkCycle: "월별",
    evidence: "고객지원점검보고서"
  },
  {
    id: "14",
    name: "이수진",
    managedOrg: "연구개발팀",
    dutyCode: "CE-지정책임-A14",
    duty: "연구개발 프로세스 관리",
    dutyDetail: "전사 연구개발 프로세스에 대한 관리 및 점검",
    actionCode: "CE-지정책임-A14-001",
    action: "연구개발 프로세스 내부통제 점검",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: true,
      investigationReport: true
    },
    dutyDetailCode: "CE-지정책임-A8-001",
    dutyDetail: "연구개발 프로세스 운영 과정에서의 종합적인 점검",
    checkCycle: "반기별",
    evidence: "연구개발점검보고서"
  },
  {
    id: "15",
    name: "최준호",
    managedOrg: "물류팀",
    dutyCode: "CE-지정책임-A15",
    duty: "물류 프로세스 관리",
    dutyDetail: "전사 물류 프로세스에 대한 관리 및 점검",
    actionCode: "CE-지정책임-A15-001",
    action: "물류 프로세스 내부통제 점검",
    actionTypes: {
      standardCheck: true,
      executionCheck: true,
      complianceCheck: true,
      managementAction: true,
      implementationCheck: true,
      educationSupport: false,
      investigationReport: false
    },
    dutyDetailCode: "CE-지정책임-A8-001",
    dutyDetail: "물류 프로세스 운영 과정에서의 내부통제 점검",
    checkCycle: "분기별",
    evidence: "물류점검보고서"
  }
];
