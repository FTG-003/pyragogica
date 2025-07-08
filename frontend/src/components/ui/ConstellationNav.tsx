import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Brain, Users, Search, Settings } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  position: { x: number; y: number };
  connections: string[];
  active?: boolean;
}

interface ConstellationNavProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
  className?: string;
}

const ConstellationNav: React.FC<ConstellationNavProps> = ({
  currentPage,
  onNavigate,
  className = ''
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      position: { x: 50, y: 30 },
      connections: ['library', 'chatbot'],
      active: currentPage === 'home'
    },
    {
      id: 'library',
      label: 'Biblioteca',
      icon: BookOpen,
      position: { x: 20, y: 60 },
      connections: ['home', 'chatbot', 'search'],
      active: currentPage === 'library'
    },
    {
      id: 'chatbot',
      label: 'AI Assistant',
      icon: Brain,
      position: { x: 80, y: 60 },
      connections: ['home', 'library', 'community'],
      active: currentPage === 'chatbot'
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      position: { x: 50, y: 90 },
      connections: ['chatbot', 'search'],
      active: false
    },
    {
      id: 'search',
      label: 'Ricerca',
      icon: Search,
      position: { x: 15, y: 20 },
      connections: ['library', 'community'],
      active: false
    },
    {
      id: 'settings',
      label: 'Impostazioni',
      icon: Settings,
      position: { x: 85, y: 20 },
      connections: [],
      active: false
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getConnectionPath = (from: NavItem, to: NavItem) => {
    const fromX = from.position.x;
    const fromY = from.position.y;
    const toX = to.position.x;
    const toY = to.position.y;
    
    // Create a curved path
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const controlX = midX + (Math.random() - 0.5) * 20;
    const controlY = midY + (Math.random() - 0.5) * 20;
    
    return `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;
  };

  const isConnected = (itemId: string) => {
    if (!hoveredItem) return false;
    const hoveredNavItem = navItems.find(item => item.id === hoveredItem);
    return hoveredNavItem?.connections.includes(itemId) || itemId === hoveredItem;
  };

  return (
    <div className={`relative w-full h-64 ${className}`}>
      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.3" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Render connections */}
        {navItems.map(item => 
          item.connections.map(connectionId => {
            const connectedItem = navItems.find(nav => nav.id === connectionId);
            if (!connectedItem) return null;
            
            const isHighlighted = isConnected(item.id) || isConnected(connectionId);
            
            return (
              <path
                key={`${item.id}-${connectionId}`}
                d={getConnectionPath(item, connectedItem)}
                stroke={isHighlighted ? "url(#connectionGradient)" : "rgb(203, 213, 225)"}
                strokeWidth={isHighlighted ? "2" : "1"}
                fill="none"
                opacity={isHighlighted ? 1 : 0.3}
                filter={isHighlighted ? "url(#glow)" : "none"}
                className="transition-all duration-300"
              />
            );
          })
        )}
        
        {/* Constellation lines to mouse (when hovering) */}
        {hoveredItem && (
          <line
            x1={navItems.find(item => item.id === hoveredItem)?.position.x}
            y1={navItems.find(item => item.id === hoveredItem)?.position.y}
            x2={mousePosition.x * 100 / window.innerWidth}
            y2={mousePosition.y * 100 / window.innerHeight}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            opacity="0.2"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        )}
      </svg>
      
      {/* Navigation items */}
      {navItems.map(item => {
        const Icon = item.icon;
        const isHovered = hoveredItem === item.id;
        const isConnectedToHovered = isConnected(item.id);
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`
              absolute transform -translate-x-1/2 -translate-y-1/2
              w-12 h-12 rounded-2xl
              flex items-center justify-center
              transition-all duration-300 ease-out
              ${item.active 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-110' 
                : 'bg-white text-gray-600 hover:text-indigo-600 shadow-md hover:shadow-lg'
              }
              ${isHovered ? 'scale-125 shadow-2xl' : ''}
              ${isConnectedToHovered && !isHovered ? 'scale-105 shadow-lg' : ''}
              border-2 border-white
              hover:border-indigo-200
            `}
            style={{
              left: `${item.position.x}%`,
              top: `${item.position.y}%`,
              zIndex: isHovered ? 50 : item.active ? 30 : 10
            }}
            title={item.label}
          >
            <Icon className={`
              w-6 h-6 transition-all duration-300
              ${isHovered ? 'scale-110' : ''}
            `} />
            
            {/* Active indicator */}
            {item.active && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            )}
            
            {/* Hover label */}
            {isHovered && (
              <div className="
                absolute top-full mt-2 left-1/2 transform -translate-x-1/2
                px-3 py-1 bg-gray-900 text-white text-sm rounded-lg
                whitespace-nowrap pointer-events-none
                animate-fade-in
              ">
                {item.label}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900" />
              </div>
            )}
            
            {/* Connection pulse */}
            {isConnectedToHovered && !isHovered && (
              <div className="absolute inset-0 rounded-2xl bg-indigo-400 opacity-20 animate-ping" />
            )}
          </button>
        );
      })}
      
      {/* Background constellation effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ConstellationNav;