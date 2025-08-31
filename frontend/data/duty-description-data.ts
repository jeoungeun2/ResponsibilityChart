export interface DutyDescriptionData {
  id: string;
  reportingPeriod: string;
  name: string;
  position: string;
  rank: string;
  submissionDate: string;
  status: 'approved' | 'pending' | 'writing';
  statusLabel: string;
  approvalDate: string;
}

export const dutyDescriptionData: DutyDescriptionData[] = [
  {
    id: "1",
    reportingPeriod: "2024.01",
    name: "김상현",
    position: "감사본부장",
    rank: "이사",
    submissionDate: "2024.01.15",
    status: "approved",
    statusLabel: "승인완료",
    approvalDate: "2024.01.20"
  },
  {
    id: "2",
    reportingPeriod: "2024.01",
    name: "박○○",
    position: "준법감시인",
    rank: "준법감시인",
    submissionDate: "2024.01.18",
    status: "pending",
    statusLabel: "승인대기",
    approvalDate: "-"
  },
  {
    id: "3",
    reportingPeriod: "2024.01",
    name: "최○○",
    position: "그룹장",
    rank: "부행장",
    submissionDate: "-",
    status: "writing",
    statusLabel: "작성중",
    approvalDate: "-"
  },
  {
    id: "4",
    reportingPeriod: "2024.01",
    name: "김○○",
    position: "그룹장",
    rank: "부행장",
    submissionDate: "2024.01.22",
    status: "approved",
    statusLabel: "승인완료",
    approvalDate: "2024.01.25"
  },
  {
    id: "5",
    reportingPeriod: "2024.01",
    name: "이○○",
    position: "그룹장",
    rank: "부행장",
    submissionDate: "2024.01.19",
    status: "pending",
    statusLabel: "승인대기",
    approvalDate: "-"
  },
  {
    id: "6",
    reportingPeriod: "2024.01",
    name: "정○○",
    position: "팀장",
    rank: "과장",
    submissionDate: "2024.01.16",
    status: "approved",
    statusLabel: "승인완료",
    approvalDate: "2024.01.21"
  },
  {
    id: "7",
    reportingPeriod: "2024.01",
    name: "한○○",
    position: "팀장",
    rank: "과장",
    submissionDate: "2024.01.17",
    status: "writing",
    statusLabel: "작성중",
    approvalDate: "-"
  },
  {
    id: "8",
    reportingPeriod: "2024.01",
    name: "윤○○",
    position: "팀장",
    rank: "과장",
    submissionDate: "2024.01.23",
    status: "pending",
    statusLabel: "승인대기",
    approvalDate: "-"
  },
  {
    id: "9",
    reportingPeriod: "2024.01",
    name: "송○○",
    position: "팀장",
    rank: "과장",
    submissionDate: "2024.01.24",
    status: "approved",
    statusLabel: "승인완료",
    approvalDate: "2024.01.26"
  },
  {
    id: "10",
    reportingPeriod: "2024.01",
    name: "임○○",
    position: "팀장",
    rank: "과장",
    submissionDate: "2024.01.25",
    status: "writing",
    statusLabel: "작성중",
    approvalDate: "-"
  },
  {
    id: "11",
    reportingPeriod: "2024.01",
    name: "강○○",
    position: "팀장",
    rank: "과장",
    submissionDate: "2024.01.26",
    status: "pending",
    statusLabel: "승인대기",
    approvalDate: "-"
  },
  {
    id: "12",
    reportingPeriod: "2024.01",
    name: "조○○",
    position: "팀장",
    rank: "과장",
    submissionDate: "2024.01.27",
    status: "approved",
    statusLabel: "승인완료",
    approvalDate: "2024.01.28"
  },
  {
    id: "13",
    reportingPeriod: "2024.01",
    name: "백○○",
    position: "팀장",
    rank: "과장",
    submissionDate: "2024.01.28",
    status: "writing",
    statusLabel: "작성중",
    approvalDate: "-"
  },
  {
    id: "14",
    reportingPeriod: "2024.01",
    name: "남○○",
    position: "팀장",
    rank: "과장",
    submissionDate: "2024.01.29",
    status: "pending",
    statusLabel: "승인대기",
    approvalDate: "-"
  },
  {
    id: "15",
    reportingPeriod: "2024.01",
    name: "서○○",
    position: "팀장",
    rank: "과장",
    submissionDate: "2024.01.30",
    status: "approved",
    statusLabel: "승인완료",
    approvalDate: "2024.01.31"
  }
];

// 필터 옵션 데이터
export const dutyFilterOptions = {
  reportingPeriod: [
    { value: "2024.01", label: "2024.01" },
    { value: "2024.02", label: "2024.02" },
    { value: "2024.03", label: "2024.03" },
    { value: "2024.04", label: "2024.04" },
    { value: "2024.05", label: "2024.05" },
    { value: "2024.06", label: "2024.06" },
    { value: "2024.07", label: "2024.07" },
    { value: "2024.08", label: "2024.08" },
    { value: "2024.09", label: "2024.09" },
    { value: "2024.10", label: "2024.10" },
    { value: "2024.11", label: "2024.11" },
    { value: "2024.12", label: "2024.12" }
  ],
  status: [
    { value: "approved", label: "승인완료" },
    { value: "pending", label: "승인대기" },
    { value: "writing", label: "작성중" }
  ]
};
