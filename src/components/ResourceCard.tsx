import React from 'react';
import { BookOpen, Star, Eye, Heart, Download, Lock, Users, ArrowRight, Clock } from 'lucide-react';
import { Resource } from '../data/libraryContent';

interface ResourceCardProps {
  resource: Resource;
  onClick: (resource: Resource) => void;
  featured?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick, featured = false }) => {
  const getTypeStyle = (access: string) => {
    switch (access) {
      case 'free':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'premium':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'community':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (access: string) => {
    switch (access) {
      case 'premium':
        return <Lock className="w-4 h-4" />;
      case 'community':
        return <Users className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (featured) {
    return (
      <div
        className="group relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white overflow-hidden shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300"
        onClick={() => onClick(resource)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative space-y-6">
          <div className="flex items-center space-x-4">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
              {resource.access === 'free' ? 'Gratuito' : resource.access}
            </span>
            {resource.version && (
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                v{resource.version}
              </span>
            )}
            <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-sm font-semibold">
              ⭐ In Evidenza
            </span>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">{resource.title}</h3>
            <p className="text-xl text-indigo-100 leading-relaxed">{resource.subtitle}</p>
            <p className="text-indigo-200 text-sm">
              {resource.authors.map(a => a.name).join(', ')} • {resource.pages} pagine • {resource.language}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold">{resource.rating}</span>
            </div>
            {resource.downloads && (
              <div className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span className="font-semibold">{resource.downloads.toLocaleString()}</span>
              </div>
            )}
            {resource.likes && (
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">{resource.likes.toLocaleString()}</span>
              </div>
            )}
            {resource.views && (
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span className="font-semibold">{resource.views.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          <button className="group inline-flex items-center space-x-3 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg">Esplora Risorsa</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 transform hover:-translate-y-2 cursor-pointer"
      onClick={() => onClick(resource)}
    >
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border ${getTypeStyle(resource.access)}`}>
                {getTypeIcon(resource.access)}
                <span className="capitalize">{resource.access === 'free' ? 'Gratuito' : resource.access}</span>
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                {resource.difficulty}
              </span>
              {resource.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-semibold">
                  ⭐
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
              {resource.title}
            </h3>
            <p className="text-slate-600 font-medium">di {resource.authors.map(a => a.name).join(', ')}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 leading-relaxed text-lg line-clamp-3">
          {resource.description}
        </p>

        {/* Duration and Pages */}
        {(resource.duration || resource.pages) && (
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            {resource.duration && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{resource.duration}</span>
              </div>
            )}
            {resource.pages && (
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>{resource.pages} pagine</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {resource.tags.slice(0, 3).map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors duration-200"
            >
              #{tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg">
              +{resource.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold">{resource.rating}</span>
            </div>
            {resource.views && (
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span className="font-semibold">{resource.views > 1000 ? `${Math.round(resource.views/1000)}k` : resource.views}</span>
              </div>
            )}
          </div>
          <button className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            <span>Esplora</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;