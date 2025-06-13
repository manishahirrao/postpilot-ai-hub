
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
<<<<<<< HEAD
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/product/linkedin-posts" className="text-gray-300 hover:text-white">LinkedIn Posts</Link></li>
              <li><Link to="/product/resume-builder" className="text-gray-300 hover:text-white">Resume Builder</Link></li>
              <li><Link to="/product/job-matcher" className="text-gray-300 hover:text-white">Job Matcher</Link></li>
              <li><Link to="/product/career-analytics" className="text-gray-300 hover:text-white">Career Analytics</Link></li>
=======
            <h3 className="text-lg font-semibold mb-4">Personal Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/product/linkedin-posts" className="text-gray-300 hover:text-white transition-colors">
               LinkedIn Post Builder
                </Link>
              </li>
              <li>
                <Link to="/product/resume-builder" className="text-gray-300 hover:text-white transition-colors">
                  Resume Enhancer
                </Link>
              </li>
              <li>
                <Link to="/product/job-matcher" className="text-gray-300 hover:text-white transition-colors">
                  Career Match
                </Link>
              </li>
              <li>
                <Link to="/product/career-analytics" className="text-gray-300 hover:text-white transition-colors">
                  Career Insights & Tips
                </Link>
              </li>
>>>>>>> f6197df ("upadte")
            </ul>
          </div>
          
          <div>
<<<<<<< HEAD
            <h3 className="text-lg font-semibold mb-4">Company Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/products/automations" className="text-gray-300 hover:text-white">Workflow Automation</Link></li>
              <li><Link to="/products/support" className="text-gray-300 hover:text-white">AI Customer Support</Link></li>
              <li><Link to="/products/voice-agents" className="text-gray-300 hover:text-white">AI Voice Agents</Link></li>
              <li><Link to="/products/ads-generator" className="text-gray-300 hover:text-white">Ads Generator</Link></li>
              <li><Link to="/product/free-job-postings" className="text-gray-300 hover:text-white">Free Job Postings</Link></li>
              <li><Link to="/product/hiring-outsourcing" className="text-gray-300 hover:text-white">Hiring Outsourcing</Link></li>
=======
            <h3 className="text-lg font-semibold mb-4">Business Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/product/free-job-postings" className="text-gray-300 hover:text-white transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/product/hiring-outsourcing" className="text-gray-300 hover:text-white transition-colors">
                  Hire Assist
                </Link>
              </li>
              <li>
                <Link to="/product/linkedin-posts" className="text-gray-300 hover:text-white transition-colors">
                  AI Post Builder
                </Link>
              </li>
               <li>
                <Link to="/product/automation-page" className="text-gray-300 hover:text-white transition-colors">
                 AI Workflow
                </Link>
              </li>
               <li>
                <Link to="/product/voice-agent" className="text-gray-300 hover:text-white transition-colors">
                  Voice Agent
                </Link>
              </li>
               <li>
                <Link to="/product/ads-generator" className="text-gray-300 hover:text-white transition-colors">
                  Ad Copy AI
                </Link>
              </li>
               <li>
                <Link to="/product/support" className="text-gray-300 hover:text-white transition-colors">
                  AI Customer Support Page
                  </Link>
                
              </li>
>>>>>>> f6197df ("upadte")
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/about/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              <li><Link to="/about/management" className="text-gray-300 hover:text-white">Management</Link></li>
              <li><Link to="/about/investors" className="text-gray-300 hover:text-white">Investors</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white">Help Center</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; 2024 PostPilot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
