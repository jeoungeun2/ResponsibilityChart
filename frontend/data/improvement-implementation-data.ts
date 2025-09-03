// 미흡사항개선 이행내역 데이터 타입 정의
export interface ImprovementImplementationData {
  id: string;
  managementActionCode: string;   // 관리조치코드
  managementAction: string;       // 관리조치
  responsibleDepartment: string;  // 소관부서
  responsibleTeam: string;        // 소관팀
  assignee: string;               // 담당자
  reviewer: string;               // 리뷰어
  responsibleExecutive: string;   // 담당임원
  deficiency: string;             // 미흡사항
  improvementPlan: string;        // 개선계획
  improvementPlanRegistrationDate: string; // 개선계획등록일
  improvementImplementationResult: string; // 개선계획이행결과
  implementationResultDate: string; // 이행결과작성일
  approvalStatus: '승인대기' | '승인완료' | '반려' | '미등록'; // 이행결과결재상태
}

// 샘플 데이터 (15개) - 미흡사항개선 이행내역용
export const improvementImplementationData: ImprovementImplementationData[] = [
  {
    id: "1",
    managementActionCode: "BD-경영관리-C1",
    managementAction: "내부통제기준등의 제·개폐 사항을 검토하고 경영관리틴을 통해 이사회에 보고",
    responsibleDepartment: "준법감시실",
    responsibleTeam: "준법감시팀",
    assignee: "박○○",
    reviewer: "김○○",
    responsibleExecutive: "김대표",
    deficiency: "내부통제기준 변경 시 이사회 보고 절차가 명확하지 않음",
    improvementPlan: "내부통제기준 변경 프로세스를 문서화하고 이사회 보고 절차를 명확히 정의",
    improvementPlanRegistrationDate: "2024-03-15",
    improvementImplementationResult: "내부통제기준 변경 가이드라인 수립 완료",
    implementationResultDate: "2024-03-25",
    approvalStatus: "승인완료"
  },
  {
    id: "2",
    managementActionCode: "EQ-금융업무-B1",
    managementAction: "신용리스크 관리정책 수립 및 운영, 신용리스크 측정 및 모니터링 체계 구축",
    responsibleDepartment: "리스크관리부",
    responsibleTeam: "신용리스크팀",
    assignee: "김○○",
    reviewer: "이○○",
    responsibleExecutive: "이부사장",
    deficiency: "신용리스크 측정 모델의 정확성이 부족함",
    improvementPlan: "신용리스크 측정 모델을 업데이트하고 검증 절차를 강화",
    improvementPlanRegistrationDate: "2024-03-14",
    improvementImplementationResult: "신용리스크 측정 모델 v2.0 개발 및 적용",
    implementationResultDate: "2024-03-28",
    approvalStatus: "승인대기"
  },
  {
    id: "3",
    managementActionCode: "CE-영업활동-A1",
    managementAction: "영업목표 설정 프로세스 관리 및 성과 평가 체계 운영, 영업 활동 모니터링",
    responsibleDepartment: "영업기획그룹",
    responsibleTeam: "영업기획팀",
    assignee: "이○○",
    reviewer: "최○○",
    responsibleExecutive: "최상무",
    deficiency: "영업목표 설정 시 시장 분석이 부족함",
    improvementPlan: "시장 분석 체계를 구축하고 영업목표 설정에 반영",
    improvementPlanRegistrationDate: "2024-03-13",
    improvementImplementationResult: "시장 분석 프레임워크 수립 및 영업목표 설정 프로세스 개선",
    implementationResultDate: "2024-03-30",
    approvalStatus: "반려"
  },
  {
    id: "4",
    managementActionCode: "CE-개인고객-A1",
    managementAction: "개인고객 영업활동 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "개인그룹",
    responsibleTeam: "개인영업팀",
    assignee: "최○○",
    reviewer: "정○○",
    responsibleExecutive: "정이사",
    deficiency: "개인고객 상담 시 고객정보 보호 절차가 미흡함",
    improvementPlan: "고객정보 보호 가이드라인을 수립하고 직원 교육 실시",
    improvementPlanRegistrationDate: "2024-03-12",
    improvementImplementationResult: "고객정보 보호 매뉴얼 제작 및 전 직원 교육 완료",
    implementationResultDate: "2024-03-22",
    approvalStatus: "승인완료"
  },
  {
    id: "5",
    managementActionCode: "CE-기업금융-A1",
    managementAction: "기업금융 영업 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "CIB그룹",
    responsibleTeam: "기업금융팀",
    assignee: "정○○",
    reviewer: "송○○",
    responsibleExecutive: "송이사",
    deficiency: "기업 대출 심사 시 리스크 평가 기준이 일관되지 않음",
    improvementPlan: "기업 대출 심사 기준을 통일하고 심사 프로세스를 표준화",
    improvementPlanRegistrationDate: "2024-03-11",
    improvementImplementationResult: "기업 대출 심사 매뉴얼 개정 및 심사원 교육 실시",
    implementationResultDate: "2024-03-26",
    approvalStatus: "승인완료"
  },
  {
    id: "6",
    managementActionCode: "CE-자산관리-A1",
    managementAction: "자산관리 업무 프로세스 표준화 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "자산관리그룹",
    responsibleTeam: "자산관리팀",
    assignee: "송○○",
    reviewer: "한○○",
    responsibleExecutive: "한이사",
    deficiency: "자산 배분 전략 수립 시 리스크 관리가 부족함",
    improvementPlan: "리스크 기반 자산 배분 모델을 도입하고 모니터링 체계 구축",
    improvementPlanRegistrationDate: "2024-03-10",
    improvementImplementationResult: "리스크 기반 자산 배분 시스템 구축 및 운영",
    implementationResultDate: "2024-03-24",
    approvalStatus: "승인대기"
  },
  {
    id: "7",
    managementActionCode: "CE-투자운용-A1",
    managementAction: "투자운용 업무 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "투자운용그룹",
    responsibleTeam: "투자운용팀",
    assignee: "한○○",
    reviewer: "강○○",
    responsibleExecutive: "강이사",
    deficiency: "투자 성과 분석 시 벤치마크 비교가 부족함",
    improvementPlan: "투자 성과 분석 체계를 개선하고 벤치마크 비교 기능 강화",
    improvementPlanRegistrationDate: "2024-03-09",
    improvementImplementationResult: "투자 성과 분석 시스템 업그레이드 및 벤치마크 데이터 연동",
    implementationResultDate: "2024-03-23",
    approvalStatus: "승인완료"
  },
  {
    id: "8",
    managementActionCode: "CE-정보시스템-A1",
    managementAction: "정보시스템 보안 정책 수립 및 운영, 보안 취약점 점검 및 개선",
    responsibleDepartment: "IT그룹",
    responsibleTeam: "보안팀",
    assignee: "강○○",
    reviewer: "윤○○",
    responsibleExecutive: "윤이사",
    deficiency: "시스템 보안 점검 주기가 불규칙함",
    improvementPlan: "정기적인 보안 점검 일정을 수립하고 자동화 도구 도입",
    improvementPlanRegistrationDate: "2024-03-08",
    improvementImplementationResult: "보안 점검 자동화 시스템 구축 및 정기 점검 일정 수립",
    implementationResultDate: "2024-03-21",
    approvalStatus: "승인완료"
  },
  {
    id: "9",
    managementActionCode: "CE-인사관리-A1",
    managementAction: "인사관리 업무 프로세스 표준화 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "인사그룹",
    responsibleTeam: "인사관리팀",
    assignee: "윤○○",
    reviewer: "임○○",
    responsibleExecutive: "임이사",
    deficiency: "직원 성과 평가 기준이 모호함",
    improvementPlan: "성과 평가 기준을 명확히 하고 평가 프로세스를 개선",
    improvementPlanRegistrationDate: "2024-03-07",
    improvementImplementationResult: "성과 평가 매뉴얼 개정 및 평가자 교육 실시",
    implementationResultDate: "2024-03-20",
    approvalStatus: "반려"
  },
  {
    id: "10",
    managementActionCode: "CE-재무관리-A1",
    managementAction: "재무관리 업무 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "재무그룹",
    responsibleTeam: "재무관리팀",
    assignee: "임○○",
    reviewer: "조○○",
    responsibleExecutive: "조이사",
    deficiency: "예산 집행 모니터링이 실시간으로 이루어지지 않음",
    improvementPlan: "실시간 예산 집행 모니터링 시스템을 구축하고 알림 기능 추가",
    improvementPlanRegistrationDate: "2024-03-06",
    improvementImplementationResult: "예산 집행 모니터링 대시보드 구축 및 운영",
    implementationResultDate: "2024-03-19",
    approvalStatus: "승인완료"
  },
  {
    id: "11",
    managementActionCode: "CE-법무관리-A1",
    managementAction: "법무관리 업무 프로세스 표준화 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "법무그룹",
    responsibleTeam: "법무관리팀",
    assignee: "조○○",
    reviewer: "백○○",
    responsibleExecutive: "백이사",
    deficiency: "계약서 검토 시 법적 리스크 분석이 부족함",
    improvementPlan: "계약서 검토 체크리스트를 수립하고 법적 리스크 분석 프로세스 강화",
    improvementPlanRegistrationDate: "2024-03-05",
    improvementImplementationResult: "계약서 검토 매뉴얼 제작 및 법무팀 교육 완료",
    implementationResultDate: "2024-03-18",
    approvalStatus: "승인완료"
  },
  {
    id: "12",
    managementActionCode: "CE-구매관리-A1",
    managementAction: "구매관리 업무 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "구매그룹",
    responsibleTeam: "구매관리팀",
    assignee: "백○○",
    reviewer: "남○○",
    responsibleExecutive: "남이사",
    deficiency: "공급업체 선정 시 평가 기준이 일관되지 않음",
    improvementPlan: "공급업체 평가 기준을 통일하고 선정 프로세스를 표준화",
    improvementPlanRegistrationDate: "2024-03-04",
    improvementImplementationResult: "공급업체 평가 매뉴얼 개정 및 평가위원 교육 실시",
    implementationResultDate: "2024-03-17",
    approvalStatus: "승인대기"
  },
  {
    id: "13",
    managementActionCode: "CE-품질관리-A1",
    managementAction: "품질관리 업무 프로세스 표준화 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "품질그룹",
    responsibleTeam: "품질관리팀",
    assignee: "남○○",
    reviewer: "서○○",
    responsibleExecutive: "서이사",
    deficiency: "품질 관리 지표가 업무 특성을 반영하지 못함",
    improvementPlan: "업무별 맞춤형 품질 지표를 개발하고 측정 체계 구축",
    improvementPlanRegistrationDate: "2024-03-03",
    improvementImplementationResult: "업무별 품질 지표 체계 수립 및 측정 시스템 구축",
    implementationResultDate: "2024-03-16",
    approvalStatus: "승인완료"
  },
  {
    id: "14",
    managementActionCode: "CE-환경관리-A1",
    managementAction: "환경관리 업무 프로세스 관리 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "환경그룹",
    responsibleTeam: "환경관리팀",
    assignee: "서○○",
    reviewer: "황○○",
    responsibleExecutive: "황이사",
    deficiency: "환경 영향 평가가 정기적으로 이루어지지 않음",
    improvementPlan: "정기적인 환경 영향 평가 일정을 수립하고 평가 체계 구축",
    improvementPlanRegistrationDate: "2024-03-02",
    improvementImplementationResult: "환경 영향 평가 매뉴얼 제작 및 정기 평가 일정 수립",
    implementationResultDate: "2024-03-15",
    approvalStatus: "승인완료"
  },
  {
    id: "15",
    managementActionCode: "CE-고객서비스-A1",
    managementAction: "고객서비스 업무 프로세스 표준화 및 내부통제 기준 준수 여부 점검",
    responsibleDepartment: "고객서비스그룹",
    responsibleTeam: "고객서비스팀",
    assignee: "황○○",
    reviewer: "박○○",
    responsibleExecutive: "박이사",
    deficiency: "고객 불만 처리 시 응답 시간이 길어짐",
    improvementPlan: "",
    improvementPlanRegistrationDate: "",
    improvementImplementationResult: "",
    implementationResultDate: "",
    approvalStatus: "미등록"
  }
];
