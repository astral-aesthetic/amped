import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  path: string;
  color: string;
  iconHoverColor: string;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon: Icon,
  label,
  path,
  color,
  iconHoverColor
}) => {
  const iconRef = useRef<SVGSVGElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link
      to={path}
      className="group relative p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
      onMouseEnter={() => {
        setIsHovering(true);
        if (iconRef.current) {
          iconRef.current.style.color = iconHoverColor;
        }
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        if (iconRef.current) {
          iconRef.current.style.color = 'white';
        }
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
      <div className="relative">
        <Icon 
          ref={iconRef}
          className="w-8 h-8 transition-all duration-200 mb-2 group-hover:scale-110" 
          style={{color: 'white'}}
        />
        <p className="text-sm text-white font-medium">{label}</p>
      </div>
    </Link>
  );
};

export default QuickActionButton;
