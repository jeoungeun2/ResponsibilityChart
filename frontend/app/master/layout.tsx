export default function MasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 미들웨어에서 인증 처리하므로 여기서는 단순 레이아웃만 제공
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
