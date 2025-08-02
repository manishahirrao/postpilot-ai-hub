import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Search, Filter, Eye, Heart, Share2 } from 'lucide-react';

const blogArticles = [
  {
    id: 'linkedin-automation-boost-engagement',
    title: 'Boost Your LinkedIn Engagement with Automated Post Creation',
    excerpt: 'Maintaining a consistent LinkedIn presence can be challenging for busy professionals. Our LinkedIn automation tool uses GPT-powered content generation to create and schedule posts.',
    readTime: '5 min read',
    date: 'Dec 15, 2024',
    category: 'LinkedIn Automation',
    image: '/Blog1.jpeg',
    views: '2.4k',
    likes: '156'
  },
  {
    id: 'ai-resume-builder-stand-out',
    title: 'AI Resume Builder: Stand Out to Recruiters with a Polished AI-Enhanced Resume',
    excerpt: 'In a competitive job market, a well-crafted resume is crucial. An AI resume builder can transform your CV by correcting spelling/grammar and highlighting key skills.',
    readTime: '4 min read',
    date: 'Dec 19, 2024',
    category: 'AI Tools',
    image: '/Blog2.jpeg',
    views: '3.1k',
    likes: '203'
  },
  {
    id: 'job-description-matching-ai',
    title: 'Match the Right Candidates: How AI Improves Job Description Matching',
    excerpt: 'Traditional recruitment often results in mismatches. AI-powered job matching tools solve this by cross-referencing job descriptions with candidate profiles.',
    readTime: '6 min read',
    date: 'Dec 23, 2024',
    category: 'Recruitment',
    image: '/Blog3.jpeg',
    views: '1.8k',
    likes: '127'
  },
  {
    id: 'career-growth-tools-2025',
    title: 'Top 10 Career Growth Tools for 2025: AI and Automation You Need',
    excerpt: 'Staying competitive in 2025 means leveraging AI tools designed for career advancement. Here are ten must-have tools for professionals.',
    readTime: '7 min read',
    date: 'Jan 1, 2025',
    category: 'Career Growth',
    image: '/Blog5.jpeg',
    views: '4.2k',
    likes: '287'
  },
  {
    id: 'linkedin-video-content-automation',
    title: 'Maximizing LinkedIn with Automated Video Content Creation',
    excerpt: 'Video content is dominating LinkedIn feeds. Statistics show that video posts on LinkedIn drive 5× higher interaction rates than text posts.',
    readTime: '4 min read',
    date: 'Jan 19, 2025',
    category: 'LinkedIn Automation',
    image: '/Blog7.jpeg',
    views: '2.9k',
    likes: '192'
  },
  {
    id: 'future-job-search-ai-tools',
    title: 'The Future of Job Search: AI Tools for Resumes, Profiles, and Applications',
    excerpt: 'Job seekers can leverage AI at every step of their search. Research shows that AI-assisted resume writing can yield 7.8% more job offers.',
    readTime: '6 min read',
    date: 'Jan 27, 2025',
    category: 'Career Growth',
    image: '/Blog9.jpeg',
    views: '3.7k',
    likes: '245'
  },
  {
    id: 'linkedin-profile-optimization-ai',
    title: 'Optimizing Your LinkedIn Profile with AI for Better Career Outcomes',
    excerpt: 'In today\'s job market, a strong LinkedIn profile is essential. AI can help you optimize every section with keyword suggestions and improvements.',
    readTime: '4 min read',
    date: 'Feb 5, 2025',
    category: 'LinkedIn Automation',
    image: '/Blog11.jpeg',
    views: '2.1k',
    likes: '167'
  },
  {
    id: 'gpt-content-creation-linkedin',
    title: 'Content Creation with GPT: Crafting LinkedIn Posts that Convert',
    excerpt: 'Writing posts that drive action is easy with AI. Using GPT content generation, you can brainstorm headlines and outlines in seconds.',
    readTime: '4 min read',
    date: 'Feb 21, 2025',
    category: 'LinkedIn Automation',
    image: '/Blog15.jpeg',
    views: '1.6k',
    likes: '134'
  },
  {
    id: 'ai-career-development-analytics',
    title: 'Leveraging AI for Personalized Career Development and Analytics',
    excerpt: 'Modern career growth tools use AI to give employees tailored insights. AI platforms can map out personalized development plans.',
    readTime: '6 min read',
    date: 'Feb 28, 2025',
    category: 'Career Growth',
    image: '/Blog16.jpeg',
    views: '2.8k',
    likes: '211'
  },
  {
    id: 'linkedin-automation-networking',
    title: '10 Ways LinkedIn Automation Can Grow Your Professional Network',
    excerpt: 'Leveraging automation can supercharge your LinkedIn networking. Here are ten strategies to exponentially grow your LinkedIn network.',
    readTime: '7 min read',
    date: 'March 2, 2025',
    category: 'LinkedIn Automation',
    image: '/Blog17.jpeg',
    views: '3.5k',
    likes: '298'
  }
];

const categories = ['All', 'LinkedIn Automation', 'AI Tools', 'Career Growth', 'Recruitment'];

const FloatingElements = () => (
  <>
    <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-pulse"></div>
    <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
    <div className="absolute bottom-32 left-20 w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-red-400 opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
    <div className="absolute bottom-20 right-40 w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
  </>
);

const GradientOrb = ({ className, delay = 0 }) => (
  <div 
    className={`absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-xl animate-pulse ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  ></div>
);

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredArticles = blogArticles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <FloatingElements />
      
      {/* Background Orbs */}
      <GradientOrb className="top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2" delay={0} />
      <GradientOrb className="top-1/2 right-0 w-80 h-80 translate-x-1/2 -translate-y-1/2" delay={1000} />
      <GradientOrb className="bottom-0 left-1/2 w-72 h-72 -translate-x-1/2 translate-y-1/2" delay={2000} />

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="w-full h-full bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 border border-blue-200/50 shadow-lg backdrop-blur-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Latest Insights & Expert Tips
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Career Growth
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover expert insights, actionable strategies, and cutting-edge tools to accelerate your professional journey with AI-powered solutions.
            </p>

            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent shadow-lg"
                  />
                </div>
                
                <div className="flex gap-2 flex-wrap justify-center">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-blue-600 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <article 
                key={article.id} 
                className="group relative"
                onMouseEnter={() => setHoveredCard(article.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                  hoveredCard === article.id ? 'scale-105' : ''
                }`}>
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative">
                      {/* Placeholder for image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {article.title.charAt(0)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs">
                        <Eye className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-700">{article.views}</span>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span className="text-gray-700">{article.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Link to={`/blog/${article.id}`} className="block">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group/btn">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3D Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl -z-10 transform translate-y-4 translate-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-95"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/2 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals using AI-powered tools to accelerate their growth and land their dream jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 backdrop-blur-sm shadow-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;