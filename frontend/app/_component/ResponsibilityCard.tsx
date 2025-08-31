// 책무구분 카드 컴포넌트
const ResponsibilityCard = ({ 
  title, 
  items
}: { 
  title: string; 
  items: Array<{ label: string; value: number }>;
}) => (
  <div className="bg-white border border-gray-200 p-4 min-h-[140px]">
    {/* 제목 */}
    <h3 className="text-lg font-semibold text-black text-left mb-3">
      {title}
    </h3>
    
    {/* 책무 항목들 */}
    <div className="space-y-1">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-gray-700 font-medium text-[15px]">{item.label}</span>
          <span className="text-xl font-semibold text-gray-900">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ResponsibilityCard;
