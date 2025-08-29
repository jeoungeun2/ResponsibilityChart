// 책무배분관리 데이터 타입 정의
export interface ResponsibilityAllocationData {
  id: string;
  division: string;        // 책무구분
  code: string;            // 책무코드
  name: string;            // 책무명
  overview: string;        // 책무개요
  detailContent: string;   // 책무세부내용
  managementObligation: string; // 관리의무
}

// 샘플 데이터 (15개) - 책무배분관리용
export const responsibilityAllocationData: ResponsibilityAllocationData[] = [
  {
    id: "1",
    division: "경영",
    code: "AM-경영관리-C11",
    name: "경영지원업무와 관련된 책무",
    overview: "전사 전략기획·총괄, 회계·세무 및 내부 회계관리, 고유산업 운영관계",
    detailContent: "경영지원 업무 상황계획 수립 및 실행을 관리, 감독 대외 보고 및 제출에 대한 관리, 감독 예산관리 기준 수립 및 운영에 대한 관리, 감독 자금관리에",
    managementObligation: "인장 및 문서 보존·보관 관리, 보고업무 등 관련 기준 준수 여부에 대한 관리·감독"
  },
  {
    id: "2",
    division: "경영관리",
    code: "AM-경영관리-C12",
    name: "인사업무와 관련된 책무",
    overview: "전사 전략기획·총괄, 회계·세무 및 내부 회계관리, 고유산업 운영관계",
    detailContent: "인사업무 관련 정책 수립 및 실행을 관리, 감독 대외 보고 및 제출에 대한 관리, 감독 예산관리 기준 수립 및 운영에 대한 관리 감독 자금관리에",
    managementObligation: "-교육 계획 수립 및 운영에 대한 관리·감독-인사제도(채용 ·퇴직·표창·징계 등) 수립 및 운영에 대한 관리·감독 -임원 이 이며 민 진채 채무 변경에 대한 관리·감독인진원 겸직"
  },
  {
    id: "3",
    division: "재무",
    code: "AM-재무관리-C13",
    name: "재무관리와 관련된 책무",
    overview: "전사 재무전략 수립 및 실행, 자본구조 최적화, 투자 의사결정 지원",
    detailContent: "재무제표 작성 및 감사 실시, 자금조달 및 운용 계획 수립, 재무위험 관리 체계 구축 및 운영",
    managementObligation: "재무제표의 정확성 및 신뢰성 확보, 내부통제 기준 준수 여부 점검, 재무위험 관리 체계의 효과성 평가"
  },
  {
    id: "4",
    division: "정보",
    code: "AM-정보관리-C14",
    name: "정보시스템 관리와 관련된 책무",
    overview: "전사 정보시스템 전략 수립, IT 인프라 구축 및 운영, 정보보안 관리",
    detailContent: "정보시스템 개발 및 운영 표준 수립, 정보보안 정책 수립 및 실행, IT 자산 관리 및 예산 운영",
    managementObligation: "정보시스템의 안정성 및 보안성 확보, IT 관련 내부통제 기준 준수 여부 점검, 정보보안 사고 대응 체계 운영"
  },
  {
    id: "5",
    division: "법무",
    code: "AM-법무관리-C15",
    name: "법적 준수 관리와 관련된 책무",
    overview: "전사 법적 리스크 관리, 계약 검토 및 관리, 규정 준수 점검",
    detailContent: "법적 준수 체계 구축 및 운영, 계약서 검토 및 표준화, 법적 분쟁 대응 및 해결",
    managementObligation: "법적 준수 여부 정기 점검, 법적 리스크 식별 및 대응 체계 운영, 임직원 법적 준수 교육 실시"
  },
  {
    id: "6",
    division: "보안",
    code: "AM-보안관리-C16",
    name: "보안 관리와 관련된 책무",
    overview: "전사 물리적·정보적 보안 체계 구축, 보안 정책 수립 및 운영",
    detailContent: "보안 정책 및 절차 수립, 보안 교육 및 훈련 실시, 보안 사고 대응 및 조사",
    managementObligation: "보안 정책 준수 여부 점검, 보안 사고 발생 시 신속한 대응 및 보고, 보안 체계의 지속적 개선"
  },
  {
    id: "7",
    division: "품질",
    code: "AM-품질관리-C17",
    name: "품질 관리와 관련된 책무",
    overview: "전사 품질 경영 체계 구축, 품질 기준 수립 및 운영, 품질 개선 활동 관리",
    detailContent: "품질 경영 방침 수립, 품질 관리 절차 표준화, 품질 개선 프로젝트 관리",
    managementObligation: "품질 기준 준수 여부 점검, 품질 개선 활동의 효과성 평가, 품질 관련 교육 및 훈련 실시"
  },
  {
    id: "8",
    division: "환경",
    code: "AM-환경관리-C18",
    name: "환경 관리와 관련된 책무",
    overview: "전사 환경 경영 체계 구축, 환경 영향 평가 및 관리, 친환경 정책 수립",
    detailContent: "환경 경영 방침 수립, 환경 영향 최소화 방안 수립, 환경 관련 법규 준수 관리",
    managementObligation: "환경 관련 법규 준수 여부 점검, 환경 영향 최소화 활동의 효과성 평가, 환경 교육 및 홍보 실시"
  },
  {
    id: "9",
    division: "시설",
    code: "AM-시설관리-C19",
    name: "시설 관리와 관련된 책무",
    overview: "전사 시설 및 건물 관리, 유지보수 계획 수립 및 실행, 시설 안전 관리",
    detailContent: "시설 유지보수 계획 수립, 시설 안전 점검 및 개선, 시설 관련 예산 관리",
    managementObligation: "시설 안전성 정기 점검, 유지보수 계획의 적정성 및 실행 여부 점검, 시설 관련 안전 교육 실시"
  },
  {
    id: "10",
    division: "구매",
    code: "AM-구매관리-C20",
    name: "구매 관리와 관련된 책무",
    overview: "전사 구매 정책 수립, 공급업체 관리, 구매 프로세스 표준화",
    detailContent: "구매 정책 및 절차 수립, 공급업체 선정 및 평가, 구매 계약 관리",
    managementObligation: "구매 정책 준수 여부 점검, 공급업체 관리 체계의 효과성 평가, 구매 관련 내부통제 기준 준수 점검"
  },
  {
    id: "11",
    division: "물류",
    code: "AM-물류관리-C21",
    name: "물류 관리와 관련된 책무",
    overview: "전사 물류 전략 수립, 물류 네트워크 최적화, 물류 비용 관리",
    detailContent: "물류 전략 및 계획 수립, 물류 프로세스 표준화, 물류 성과 관리",
    managementObligation: "물류 프로세스의 효율성 및 안전성 점검, 물류 관련 내부통제 기준 준수 여부 점검, 물류 개선 활동 관리"
  },
  {
    id: "12",
    division: "고객",
    code: "AM-고객관리-C22",
    name: "고객 관리와 관련된 책무",
    overview: "전사 고객 서비스 전략 수립, 고객 만족도 관리, 고객 관계 관리",
    detailContent: "고객 서비스 정책 수립, 고객 만족도 조사 및 개선, 고객 불만 처리 체계 운영",
    managementObligation: "고객 서비스 품질 정기 점검, 고객 불만 처리의 적정성 및 신속성 평가, 고객 서비스 개선 활동 관리"
  },
  {
    id: "13",
    division: "마케팅",
    code: "AM-마케팅관리-C23",
    name: "마케팅 관리와 관련된 책무",
    overview: "전사 마케팅 전략 수립, 브랜드 관리, 마케팅 성과 관리",
    detailContent: "마케팅 전략 및 계획 수립, 브랜드 가치 관리, 마케팅 캠페인 효과성 평가",
    managementObligation: "마케팅 전략의 일관성 및 효과성 점검, 마케팅 관련 내부통제 기준 준수 여부 점검, 마케팅 성과 개선 활동 관리"
  },
  {
    id: "14",
    division: "연구개발",
    code: "AM-연구개발관리-C24",
    name: "연구개발 관리와 관련된 책무",
    overview: "전사 R&D 전략 수립, 연구 프로젝트 관리, 지적재산권 관리",
    detailContent: "R&D 전략 및 계획 수립, 연구 프로젝트 성과 관리, 지적재산권 확보 및 보호",
    managementObligation: "R&D 프로젝트의 진행 상황 및 성과 점검, 연구 관련 내부통제 기준 준수 여부 점검, R&D 성과 개선 활동 관리"
  },
  {
    id: "15",
    division: "지식",
    code: "AM-지식관리-C25",
    name: "지식 관리와 관련된 책무",
    overview: "전사 지식 관리 체계 구축, 지식 공유 및 활용 체계 운영, 지식 자산 관리",
    detailContent: "지식 관리 정책 및 절차 수립, 지식 공유 플랫폼 운영, 지식 자산의 체계적 관리",
    managementObligation: "지식 관리 체계의 효과성 점검, 지식 공유 활동의 활성화 정도 평가, 지식 자산의 보호 및 활용 체계 운영"
  }
];
