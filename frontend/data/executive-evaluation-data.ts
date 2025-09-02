export interface ExecutiveEvaluationData {
  id: string;
  name: string;
  jobTitle: string;
  employeeId: string;
  position: string;
  managedOrganization: string;
  evaluationStatus: 'completed' | 'in-progress' | 'not-evaluated';
  evaluationCompletionDate: string | null;
  evaluationResult?: string;
  judgmentReason?: string;
  supportingDocuments?: Array<{
    fileName: string;
    uploadDateTime: string;
  }>;
  notificationCount?: number;
}

export const executiveEvaluationSampleData: ExecutiveEvaluationData[] = [
  {
    id: '1',
    name: '이도현',
    jobTitle: '대표이사',
    employeeId: 'A05001',
    position: '대표이사',
    managedOrganization: '대표이사',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-15',
    evaluationResult: '적격',
    judgmentReason: '경영진으로서의 리더십과 의사결정 능력이 우수하며, 회사의 지속가능한 성장을 위한 전략적 비전을 제시하고 있습니다.',
    supportingDocuments: [
      { fileName: '이도현_평가서.pdf', uploadDateTime: '2024-03-14 14:30:25' },
      { fileName: '이도현_증빙서류.zip', uploadDateTime: '2024-03-14 15:45:12' }
    ]
  },
  {
    id: '2',
    name: '황준호',
    jobTitle: 'ETF투자부문장',
    employeeId: 'B06002',
    position: '상무',
    managedOrganization: 'ETF투자부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-12',
    evaluationResult: '적격',
    judgmentReason: 'ETF 투자 분야에서 전문성을 보유하고 있으며, 부문의 성과 향상에 기여하고 있습니다.',
    supportingDocuments: [
      { fileName: '황준호_평가서.pdf', uploadDateTime: '2024-03-11 16:20:18' }
    ]
  },
  {
    id: '3',
    name: '윤태섭',
    jobTitle: '감사실장',
    employeeId: 'C07003',
    position: '실장',
    managedOrganization: '감사실',
    evaluationStatus: 'in-progress',
    evaluationCompletionDate: null,
    evaluationResult: '평가 진행중',
    judgmentReason: '감사 업무 수행 능력은 우수하나, 추가적인 검토가 필요한 사항이 있어 평가를 진행 중입니다.',
    supportingDocuments: [
      { fileName: '윤태섭_중간평가서.pdf', uploadDateTime: '2024-03-05 10:15:30' }
    ],
    notificationCount: 8
  },
  {
    id: '4',
    name: '노지환',
    jobTitle: '경영관리부문장',
    employeeId: 'D08004',
    position: '상무',
    managedOrganization: '경영관리부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-10',
    evaluationResult: '적격'
  },
  {
    id: '5',
    name: '정유진',
    jobTitle: '글로벌투자부문장',
    employeeId: 'E09005',
    position: '부문장',
    managedOrganization: '글로벌투자부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-08',
    evaluationResult: '적격',
    notificationCount: 9
  },
  {
    id: '6',
    name: '임혜진',
    jobTitle: '금융소비자보호실장',
    employeeId: 'F10006',
    position: '이사대우',
    managedOrganization: '금융소비자보호실',
    evaluationStatus: 'not-evaluated',
    evaluationCompletionDate: null
  },
  {
    id: '7',
    name: '김성철',
    jobTitle: '리스크관리부문장',
    employeeId: 'G11007',
    position: '상무',
    managedOrganization: '리스크관리부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-05',
    evaluationResult: '비적격'
  },
  {
    id: '8',
    name: '박영수',
    jobTitle: 'IT시스템부문장',
    employeeId: 'H12008',
    position: '부문장',
    managedOrganization: 'IT시스템부문',
    evaluationStatus: 'in-progress',
    evaluationCompletionDate: null
  },
  {
    id: '9',
    name: '최민지',
    jobTitle: '인사총무부문장',
    employeeId: 'I13009',
    position: '상무',
    managedOrganization: '인사총무부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-03-01',
    evaluationResult: '적격'
  },
  {
    id: '10',
    name: '강동훈',
    jobTitle: '법무실장',
    employeeId: 'J14010',
    position: '실장',
    managedOrganization: '법무실',
    evaluationStatus: 'not-evaluated',
    evaluationCompletionDate: null
  },
  {
    id: '11',
    name: '윤서연',
    jobTitle: '홍보실장',
    employeeId: 'K15011',
    position: '실장',
    managedOrganization: '홍보실',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-02-28'
  },
  {
    id: '12',
    name: '송태호',
    jobTitle: '기획전략부문장',
    employeeId: 'L16012',
    position: '상무',
    managedOrganization: '기획전략부문',
    evaluationStatus: 'in-progress',
    evaluationCompletionDate: null
  },
  {
    id: '13',
    name: '한지은',
    jobTitle: '고객서비스부문장',
    employeeId: 'M17013',
    position: '부문장',
    managedOrganization: '고객서비스부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-02-25'
  },
  {
    id: '14',
    name: '조현우',
    jobTitle: '연구개발부문장',
    employeeId: 'N18014',
    position: '상무',
    managedOrganization: '연구개발부문',
    evaluationStatus: 'not-evaluated',
    evaluationCompletionDate: null
  },
  {
    id: '15',
    name: '이미라',
    jobTitle: '재무회계부문장',
    employeeId: 'O19015',
    position: '부문장',
    managedOrganization: '재무회계부문',
    evaluationStatus: 'completed',
    evaluationCompletionDate: '2024-02-20'
  }
];

export const evaluationStatusOptions = [
  { value: 'completed', label: '완료', color: 'bg-blue-300' },
  { value: 'in-progress', label: '진행중', color: 'bg-yellow-300' },
  { value: 'not-evaluated', label: '미평가', color: 'bg-gray-300' }
];

export const getEvaluationStatusDisplay = (status: ExecutiveEvaluationData['evaluationStatus']) => {
  const option = evaluationStatusOptions.find(opt => opt.value === status);
  return option || evaluationStatusOptions[2];
};
