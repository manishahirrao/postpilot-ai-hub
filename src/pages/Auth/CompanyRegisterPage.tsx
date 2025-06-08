import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const industryOptions = [
  'Technology',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Education',
  'Other',
];

const goalsOptions = [
  'Lead Generation',
  'Thought Leadership',
  'Talent Attraction',
  'Brand Awareness',
  'Customer Engagement',
];

const postingCadenceUnits = ['per week', 'per month'];

const CompanyRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    linkedInUrl: '',
    logoFile: null,
    bannerFile: null,
    primaryColor: '#2563eb',
    secondaryColor: '#3b82f6',
    brandVoice: '',
    goals: [],
    postingFrequency: '',
    postingFrequencyUnit: 'per week',
    buyerPersonas: '',
    contentThemes: ['', '', '', '', ''],
    examplePosts: '',
    industryType: '',
    productServiceType: '',
    integrationDetails: '',
  });

  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox' && name === 'goals') {
      const newGoals = checked
        ? [...formData.goals, value]
        : formData.goals.filter((goal) => goal !== value);
      setFormData((prev) => ({ ...prev, goals: newGoals }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
    } else if (name.startsWith('contentTheme')) {
      const index = parseInt(name.replace('contentTheme', ''), 10);
      const newThemes = [...formData.contentThemes];
      newThemes[index] = value;
      setFormData((prev) => ({ ...prev, contentThemes: newThemes }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can call API to register company
    // Simulating API delay with setTimeout
    setNotification(null);
    setTimeout(() => {
      setNotification('Company account created successfully!');
      setTimeout(() => {
        navigate('/Home/LoginCompanyPage');
      }, 2000); // Redirect after 2 seconds
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg my-10">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">
        Company Registration
      </h2>

      {notification && (
        <div
          className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center font-semibold"
          role="alert"
        >
          {notification}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Organization Profile */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-2">
            Organization Profile & Access
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-700 font-medium mb-1 block">Company Name *</span>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="Your company name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-medium mb-1 block">LinkedIn Page URL *</span>
              <input
                type="url"
                name="linkedInUrl"
                value={formData.linkedInUrl}
                onChange={handleChange}
                required
                placeholder="https://linkedin.com/company/your-company"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
        </section>

        {/* Brand & Visual Identity */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-2">
            Brand & Visual Identity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-700 font-medium mb-1 block">Official Logo File *</span>
              <input
                type="file"
                name="logoFile"
                accept="image/*"
                onChange={handleChange}
                required
                className="block w-full text-gray-600"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-medium mb-1 block">Official Banner File *</span>
              <input
                type="file"
                name="bannerFile"
                accept="image/*"
                onChange={handleChange}
                required
                className="block w-full text-gray-600"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium mb-1 block">Primary Brand Color *</span>
              <input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
                required
                className="w-16 h-10 p-0 border rounded cursor-pointer"
                title="Choose primary brand color"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-medium mb-1 block">Secondary Brand Color *</span>
              <input
                type="color"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleChange}
                required
                className="w-16 h-10 p-0 border rounded cursor-pointer"
                title="Choose secondary brand color"
              />
            </label>
          </div>
          <label className="block mt-6">
            <span className="text-gray-700 font-medium mb-1 block">Brand Voice Guidelines *</span>
            <textarea
              name="brandVoice"
              value={formData.brandVoice}
              onChange={handleChange}
              rows={3}
              required
              placeholder='e.g. "formal", "innovative", "empathetic"'
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </label>
        </section>

        {/* Business Objectives & KPIs */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-2">
            Business Objectives & KPIs
          </h3>
          <fieldset className="mb-6">
            <legend className="text-gray-700 font-medium mb-2">Goals *</legend>
            <div className="flex flex-wrap gap-4">
              {goalsOptions.map((goal) => (
                <label
                  key={goal}
                  className="inline-flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="goals"
                    value={goal}
                    checked={formData.goals.includes(goal)}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-800">{goal}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block">
            <span className="text-gray-700 font-medium mb-1 block">Posting Cadence *</span>
            <div className="flex space-x-3 items-center mt-1 max-w-xs">
              <input
                type="number"
                min="1"
                name="postingFrequency"
                value={formData.postingFrequency}
                onChange={handleChange}
                required
                placeholder="Number"
                className="border border-gray-300 rounded-md px-4 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="postingFrequencyUnit"
                value={formData.postingFrequencyUnit}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {postingCadenceUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </section>

        {/* Target Audience & Segments */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-2">
            Target Audience & Segments
          </h3>
          <label className="block">
            <span className="text-gray-700 font-medium mb-1 block">
              Buyer Personas / Audience Segments *
            </span>
            <textarea
              name="buyerPersonas"
              value={formData.buyerPersonas}
              onChange={handleChange}
              rows={3}
              required
              placeholder='e.g. "CFOs in manufacturing", "SMB founders"'
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </label>
        </section>

        {/* Content Pillars & Themes */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-2">
            Content Pillars & Themes
          </h3>
          <p className="mb-3 text-gray-600">Please provide 3 to 5 core themes:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <input
                key={i}
                type="text"
                name={`contentTheme${i}`}
                value={formData.contentThemes[i]}
                onChange={handleChange}
                placeholder={`Theme ${i + 1}`}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <label className="block mt-6">
            <span className="text-gray-700 font-medium mb-1 block">
              Example Posts or Competitive Benchmarks
            </span>
            <textarea
              name="examplePosts"
              value={formData.examplePosts}
              onChange={handleChange}
              rows={3}
              placeholder="Provide links or descriptions of example posts or benchmarks"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </label>
        </section>

        {/* Additional Info */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-4 border-b border-blue-200 pb-2">
            Additional Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <label className="block">
              <span className="text-gray-700 font-medium mb-1 block">Industry Type *</span>
              <select
                name="industryType"
                value={formData.industryType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select industry type
                </option>
                {industryOptions.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700 font-medium mb-1 block">Product/Service Type *</span>
              <input
                type="text"
                name="productServiceType"
                value={formData.productServiceType}
                onChange={handleChange}
                required
                placeholder="Describe your main product/service"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-medium mb-1 block">Integration Details</span>
              <textarea
                name="integrationDetails"
                value={formData.integrationDetails}
                onChange={handleChange}
                rows={3}
                placeholder="Details about integrations or APIs"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </label>
          </div>
        </section>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Register Company
        </button>
      </form>
    </div>
  );
};

export default CompanyRegistrationForm;
