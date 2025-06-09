
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/product/linkedin-posts" className="text-gray-300 hover:text-white">LinkedIn Posts</Link></li>
              <li><Link to="/product/resume-builder" className="text-gray-300 hover:text-white">Resume Builder</Link></li>
              <li><Link to="/product/job-matcher" className="text-gray-300 hover:text-white">Job Matcher</Link></li>
              <li><Link to="/product/career-analytics" className="text-gray-300 hover:text-white">Career Analytics</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company Solutions</h3>
            <ul className="space-y-2">
              <li><Link to="/products/automations" className="text-gray-300 hover:text-white">Workflow Automation</Link></li>
              <li><Link to="/products/support" className="text-gray-300 hover:text-white">AI Customer Support</Link></li>
              <li><Link to="/products/voice-agents" className="text-gray-300 hover:text-white">AI Voice Agents</Link></li>
              <li><Link to="/products/ads-generator" className="text-gray-300 hover:text-white">Ads Generator</Link></li>
              <li><Link to="/product/free-job-postings" className="text-gray-300 hover:text-white">Free Job Postings</Link></li>
              <li><Link to="/product/hiring-outsourcing" className="text-gray-300 hover:text-white">Hiring Outsourcing</Link></li>
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
