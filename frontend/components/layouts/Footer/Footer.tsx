import { footerLinks } from './data';

const DEFAULT_DESCRIPTION = `© 2025 PwC. All rights reserved. PwC refers to the US member firm of the PwC network or one of its subsidiaries or affiliates.`;

const Footer = ({
  description = DEFAULT_DESCRIPTION,
  data = footerLinks,
}: {
  description?: string;
  data?: { title: string; href: string; target?: string }[];
}) => {
  return (
    <div className=" px-8 flex flex-col items-start justify-start w-full text-brand-grey-400 border-t py-4 relative">
      <div className="text-sm">{description}</div>
      <span className="flex flex-row text-sm gap-2">
        {data.map((item, index) => (
          <span key={'footer' + index}>
            <a
              href={item.href}
              className="hover:underline text-pwc-blue-500 "
              target={item.target}
              rel="noopener noreferrer"
            >
              {item.title}
            </a>
            {index !== data.length - 1 && <span className="ml-2">|</span>}
          </span>
        ))}
      </span>
      
      {/* 로고 이미지 - 오른쪽에 위치 */}
      <img 
        src="/images/logo_black.png" 
        alt="Logo" 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-20 h-7 w-auto"
      />
    </div>
  );
};

export default Footer;
