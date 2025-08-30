// 상태 카드 컴포넌트
const StatusCard = ({ title, value }: { 
  title: string; 
  value: string; 
}) => (
  <div className="bg-white border border-gray-200 p-6">
    <div className="text-left">
      <h3 className="text-base font-semibold text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold bg-gradient-to-r from-brand-200 to-brand-500 bg-clip-text text-transparent">{value}</p>
    </div>
  </div>
);

export default StatusCard;
