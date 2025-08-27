// import {data} from './data';


const DEFAULT_DESCRIPTION = `© 2025 PwC. All rights reserved. PwC refers to the US member firm of the PwC network or one of its subsidiaries or affiliates.`;

const Footer = ({
  description = DEFAULT_DESCRIPTION,
  data = [],
}: {
  description?: string;
  data?: { title: string; href: string; target?: string }[];
}) => {
  return (
    <div className=" px-4 flex flex-col items-start justify-start w-full h-16  text-brand-grey-400 border-t pt-4 ">
      <div className="text-pwc-caption">{description}</div>
      <span className="flex flex-row text-pwc-caption gap-2">
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
    </div>
  );
};

export default Footer;
