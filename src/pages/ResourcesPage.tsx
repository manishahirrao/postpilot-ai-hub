
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, HelpCircle, MessageCircle, Video, FileText, Users } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const blogPosts = [
    {
      title: 'The Ultimate Guide to LinkedIn Content Strategy in 2025',
      excerpt: 'Learn how to create content that drives engagement and builds your professional brand.',
      author: 'Sarah Chen',
      date: 'Dec 15, 2024',
      readTime: '8 min read',
      category: 'Strategy'
    },
    {
      title: 'How to Write Resume Bullet Points That Get You Hired',
      excerpt: 'Transform weak job descriptions into powerful achievements that catch recruiters\' attention.',
      author: 'Michael Rodriguez',
      date: 'Dec 12, 2024',
      readTime: '6 min read',
      category: 'Resume Tips'
    },
    {
      title: 'AI-Powered Job Search: Finding Hidden Opportunities',
      excerpt: 'Discover how AI can help you find job opportunities you never knew existed.',
      author: 'Emily Johnson',
      date: 'Dec 10, 2024',
      readTime: '10 min read',
      category: 'Job Search'
    },
    {
      title: 'Building Your Personal Brand on LinkedIn: A Step-by-Step Guide',
      excerpt: 'Everything you need to know about establishing yourself as a thought leader.',
      author: 'David Kim',
      date: 'Dec 8, 2024',
      readTime: '12 min read',
      category: 'Personal Branding'
    },
    {
      title: 'The Future of Recruiting: How AI is Changing the Game',
      excerpt: 'Understand how artificial intelligence is transforming talent acquisition.',
      author: 'Lisa Wang',
      date: 'Dec 5, 2024',
      readTime: '7 min read',
      category: 'Industry Trends'
    }
  ];

  const helpTopics = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: 'Getting Started',
      description: 'Learn the basics of using PostPilot',
      articles: 12
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: 'LinkedIn Integration',
      description: 'Connect and manage your LinkedIn account',
      articles: 8
    },
    {
      icon: <Video className="w-6 h-6 text-purple-600" />,
      title: 'Content Creation',
      description: 'Master AI-powered content generation',
      articles: 15
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-orange-600" />,
      title: 'Troubleshooting',
      description: 'Solutions to common issues',
      articles: 6
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Resources &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Learning Center
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need to master LinkedIn, advance your career, and get the most out of PostPilot.
          </p>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog</h3>
                <p className="text-gray-600 mb-4">
                  Expert insights, tips, and strategies for career growth and LinkedIn success.
                </p>
                <Button variant="outline">
                  Read Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Help Center</h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step guides, tutorials, and answers to frequently asked questions.
                </p>
                <Button variant="outline">
                  Get Help
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-gray-600 mb-4">
                  Need personalized help? Our support team is ready to assist you.
                </p>
                <Link to="/support">
                  <Button variant="outline">
                    Contact Support
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600">
              Stay up-to-date with the latest career advice and industry insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Help Center Topics
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to your questions organized by topic
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpTopics.map((topic, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">{topic.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                  <p className="text-sm text-blue-600 font-medium">{topic.articles} articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Video Tutorials
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Watch step-by-step video guides to master PostPilot's features and maximize your LinkedIn presence.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Getting Started with PostPilot (5 min)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Creating Your First LinkedIn Post (8 min)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Resume Enhancement Tutorial (12 min)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Advanced Job Matching Tips (10 min)</span>
                </li>
              </ul>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Watch Tutorials
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div className="relative">
              <Card className="bg-white shadow-2xl">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Video className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        PostPilot Masterclass
                      </h3>
                      <p className="text-gray-600">45 minutes of expert tips</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Play Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Informed
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest career tips, product updates, and industry insights delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
