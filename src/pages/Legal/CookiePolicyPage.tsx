
import React from 'react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600">Last updated: December 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">
              PostPilot uses cookies for several purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Track your activity to show you relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">Essential Cookies</h3>
              <p className="text-gray-700 mb-2">These cookies are essential for the operation of our website. Without these cookies, our website would not function properly.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Examples: Session management, security, load balancing</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">Analytics Cookies</h3>
              <p className="text-gray-700 mb-2">We use analytics cookies to understand how visitors use our website so we can improve it.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Examples: Google Analytics, page view tracking, user behavior analysis</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">Functional Cookies</h3>
              <p className="text-gray-700 mb-2">These cookies remember your preferences and provide enhanced functionality.</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Examples: Language preferences, theme settings, login status</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
            <p className="text-gray-700 mb-4">
              You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Most browsers allow you to view, manage, and delete cookies</li>
              <li>You can set your browser to refuse cookies entirely</li>
              <li>You can opt-out of specific cookie categories through our cookie preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              We may use third-party services that place cookies on your device. These services include:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Google Analytics for website analytics</li>
              <li>Social media platforms for social sharing features</li>
              <li>Advertising networks for targeted advertising</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Cookie Policy from time to time. When we do, we will post the updated policy on this page and update the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">Email: privacy@postpilot.com</p>
              <p className="text-gray-700">Address: 123 Business St, Suite 100, City, State 12345</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
