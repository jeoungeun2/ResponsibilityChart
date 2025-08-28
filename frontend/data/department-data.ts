// 책무 데이터 타입 정의
export interface DutyData {
  id: string;
  category: string;        // 채무구분
  code: string;            // 채무코드
  name: string;            // 채무
  detailCode: string;      // 채무 세부코드
  detailContent: string;   // 채무 세부내용
}

// 샘플 데이터 (15개)
export const sampleData: DutyData[] = [
  {
    id: "1",
    category: "경영관리",
    code: "AM-경영관리-C11",
    name: "경영지원업무와 관련된 책무",
    detailCode: "AM-경영관리-C11-A",
    detailContent: "경영지원 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "2",
    category: "인사관리",
    code: "AM-인사관리-C12",
    name: "인사관리업무와 관련된 책무",
    detailCode: "AM-인사관리-C12-A",
    detailContent: "인사관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "3",
    category: "재무관리",
    code: "AM-재무관리-C13",
    name: "재무관리업무와 관련된 책무",
    detailCode: "AM-재무관리-C13-A",
    detailContent: "재무관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "4",
    category: "정보관리",
    code: "AM-정보관리-C14",
    name: "정보관리업무와 관련된 책무",
    detailCode: "AM-정보관리-C14-A",
    detailContent: "정보관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "5",
    category: "법무관리",
    code: "AM-법무관리-C15",
    name: "법무관리업무와 관련된 책무",
    detailCode: "AM-법무관리-C15-A",
    detailContent: "법무관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "6",
    category: "보안관리",
    code: "AM-보안관리-C16",
    name: "보안관리업무와 관련된 책무",
    detailCode: "AM-보안관리-C16-A",
    detailContent: "보안관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "7",
    category: "품질관리",
    code: "AM-품질관리-C17",
    name: "품질관리업무와 관련된 책무",
    detailCode: "AM-품질관리-C17-A",
    detailContent: "품질관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "8",
    category: "환경관리",
    code: "AM-환경관리-C18",
    name: "환경관리업무와 관련된 책무",
    detailCode: "AM-환경관리-C18-A",
    detailContent: "환경관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "9",
    category: "시설관리",
    code: "AM-시설관리-C19",
    name: "시설관리업무와 관련된 책무",
    detailCode: "AM-시설관리-C19-A",
    detailContent: "시설관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "10",
    category: "구매관리",
    code: "AM-구매관리-C20",
    name: "구매관리업무와 관련된 책무",
    detailCode: "AM-구매관리-C20-A",
    detailContent: "구매관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "11",
    category: "물류관리",
    code: "AM-물류관리-C21",
    name: "물류관리업무와 관련된 책무",
    detailCode: "AM-물류관리-C21-A",
    detailContent: "물류관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "12",
    category: "고객관리",
    code: "AM-고객관리-C22",
    name: "고객관리업무와 관련된 책무",
    detailCode: "AM-고객관리-C22-A",
    detailContent: "고객관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "13",
    category: "마케팅관리",
    code: "AM-마케팅관리-C23",
    name: "마케팅관리업무와 관련된 책무",
    detailCode: "AM-마케팅관리-C23-A",
    detailContent: "마케팅관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "14",
    category: "연구개발관리",
    code: "AM-연구개발관리-C24",
    name: "연구개발관리업무와 관련된 책무",
    detailCode: "AM-연구개발관리-C24-A",
    detailContent: "연구개발관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  },
  {
    id: "15",
    category: "지식관리",
    code: "AM-지식관리-C25",
    name: "지식관리업무와 관련된 책무",
    detailCode: "AM-지식관리-C25-A",
    detailContent: "지식관리 업무 관련 기준 수립 및 운영을 관리·감독할 책임"
  }
];
