import React, { useState } from 'react';
import { BookOpen, Users, Clock, Star, ArrowRight, Heart, Bookmark } from 'lucide-react';

interface KnowledgeCardProps {
  title: string;
  description: string;
  author: string;
  readTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  tags: string[];
  learningState?: 'exploring' | 'developing' | 'mastering' | 'sharing';
  collaborativeActivity?: boolean;
  onClick?: () => void;
  className?: string;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({
  title,
  description,
  author,
  readTime,
  difficulty,
  rating,
  tags,
  learningState = 'exploring',
  collaborativeActivity = false,
  onClick,
  className = ''
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getDifficultyConfig = () => {
    switch (difficulty) {
      case 'beginner':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Principiante'
        };
      case 'intermediate':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          label: 'Intermedio'
        };
      case 'advanced':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          label: 'Avanzato'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          label: 'Sconosciuto'
        };
    }
  };

  const getLearningStateConfig = () => {
    switch (learningState) {
      case 'exploring':
        return {
          color: 'var(--knowledge-emerging)',
          progress: 25,
          label: 'Esplorando'
        };
      case 'developing':
        return {
          color: 'var(--knowledge-developing)',
          progress: 50,
          label: 'Sviluppando'
        };
      case 'mastering':
        return {
          color: 'var(--knowledge-mastered)',
          progress: 75,
          label: 'Padroneggiando'
        };
      case 'sharing':
        return {
          color: 'var(--knowledge-shared)',
          progress: 100,
          label: 'Condividendo'
        };
      default:
        return {
          color: 'var(--knowledge-emerging)',
          progress: 0,
          label: 'Nuovo'
        };
    }
  };

  const difficultyConfig = getDifficultyConfig();
  const learningConfig = getLearningStateConfig();

  return (
    <div
      className={`
        group relative overflow-hidden
        bg-white rounded-3xl border-2 border-transparent
        shadow-lg hover:shadow-2xl
        transition-all duration-500 ease-out
        transform hover:-translate-y-2 hover:scale-[1.02]
        cursor-pointer
        ${collaborativeActivity ? 'community-active' : ''}
        ${className}
      `}
      onClick={onClick}
      data-learning-state={learningState}
    >
      {/* Knowledge Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: `${learningConfig.progress}%`,
            backgroundColor: learningConfig.color
          }}
        />
      </div>

      {/* Collaborative Presence Dots */}
      {collaborativeActivity && (
        <div className="absolute top-4 right-4 flex space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-200" />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-400" />
        </div>
      )}

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-3">
              <div className="flex items-center space-x-3">
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border
                  ${difficultyConfig.color}
                `}>
                  {difficultyConfig.label}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {learningConfig.label}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                {title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold">{rating}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${isLiked 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                }
              `}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
              }}
              className={`
                p-2 rounded-lg transition-all duration-300
                ${isBookmarked 
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                }
              `}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          <button className="
            group/btn inline-flex items-center space-x-2 
            px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
            text-white font-semibold rounded-xl 
            hover:from-indigo-700 hover:to-purple-700 
            transition-all duration-300 transform hover:scale-105
            shadow-lg hover:shadow-xl
          ">
            <BookOpen className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
            <span>Esplora</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="
        absolute inset-0 rounded-3xl 
        bg-gradient-to-r from-indigo-600/5 to-purple-600/5 
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-500
      " />

      {/* Learning State Indicator */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1 transition-all duration-1000"
        style={{ backgroundColor: learningConfig.color }}
      />
    </div>
  );
};

export default KnowledgeCard;