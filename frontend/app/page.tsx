import { auth } from "@/auth";
import { signOut } from "@/auth";
import Link from "next/link";
import DashboardCard from "./_component/DashboardCard";
import ResponsibilityCard from "./_component/ResponsibilityCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./_component/table";
import { executiveResponsibilityData } from "@/data/executive-responsibility-data";

export default async function Home() {
  // 정적 빌드를 위해 auth() 호출 제거
  // const session = await auth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className=" mx-auto space-y-4 p-8">
        <div className="grid grid-cols-4 gap-4">
          <DashboardCard
            title="관리조치 이행"
            value="302"
            subtitle="/475개"
            titleColor="text-blue-800"
            valueColor="text-blue-800"
            subtitleColor="text-gray-500"
            image="/images/complete3.png"
          />
          <DashboardCard
            title="관리조치 미이행"
            value="173"
            subtitle="/475명"
            titleColor="text-red-700"
            valueColor="text-red-700"
            subtitleColor="text-gray-500"
            image="/images/!2.png"
          />
          <DashboardCard
            title="점검결과 : 적정"
            value="293"
            subtitle="/302건"
            titleColor="text-black"
            valueColor="text-black"
            subtitleColor="text-gray-500"
            image="/images/check (3).png"
          />
          <DashboardCard
            title="점검결과 : 보완필요"
            value="9"
            subtitle="/302건"
            titleColor="text-black"
            valueColor="text-black"
            subtitleColor="text-gray-500"
            image="/images/alert-sign.png"
          />
        </div>

        {/* 책무구분 카드들 */}
        <div className="grid grid-cols-4 gap-4">
          <ResponsibilityCard
            title="책무구분"
            items={[
              { label: "지점책임", value: 21 },
              { label: "금융업무", value: 57 },
              { label: "경영관리", value: 43 }
            ]}
          />
          <ResponsibilityCard
            title="관리조치 현황"
            items={[
              { label: "이행완료", value: 302 },
              { label: "미이행", value: 173 },
              { label: "진행중", value: 0 }
            ]}
          />
          <ResponsibilityCard
            title="점검결과"
            items={[
              { label: "적정", value: 293 },
              { label: "보완필요", value: 9 },
              { label: "미점검", value: 0 }
            ]}
          />
          <ResponsibilityCard
            title="부서별 현황"
            items={[
              { label: "영업부서", value: 45 },
              { label: "관리부서", value: 38 },
              { label: "기타부서", value: 27 }
            ]}
          />
        </div>

        {/* 임원별 책무 및 관리조치 현황 테이블 */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="px-4 py-4">
            <h3 className="text-base font-semibold text-gray-900">임원별 책무 및 관리조치 현황</h3>
          </div>
          <div className="px-4 pb-4">
            <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-16">No.</TableHead>
                <TableHead>임원</TableHead>
                <TableHead className="text-right">책무(수)</TableHead>
                <TableHead className="text-right">관리조치(수)</TableHead>
                <TableHead className="text-right">관리조치 이행</TableHead>
                <TableHead className="text-right">이행률</TableHead>
                <TableHead className="text-right">관리조치 미이행</TableHead>
                <TableHead className="text-right">미이행률</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {executiveResponsibilityData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell className="font-medium">{row.executive}</TableCell>
                  <TableCell className="text-right">{row.responsibilityCount}</TableCell>
                  <TableCell className="text-right">{row.managementActionCount}</TableCell>
                  <TableCell className="text-right">{row.completedActions}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-blue-800">
                      {row.completionRate.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{row.uncompletedActions}</TableCell>
                  <TableCell className="text-right">
                    <span className="text-red-700">
                      {row.nonCompletionRate.toFixed(2)}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>
      </div>
    </div>
  );
}