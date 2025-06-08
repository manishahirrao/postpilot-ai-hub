// import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';

// // ... (existing interfaces remain the same)

// const CompanyRegisterPage: React.FC = () => {
//   // ... (existing state and refs remain the same)

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
//             <span className="text-white text-4xl">LN</span>
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//             Company LinkedIn Onboarding
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Complete your company profile to unlock LinkedIn marketing success. 
//             All fields marked with * are required.
//           </p>
//         </div>

//         {/* Progress Indicator */}
//         <div className="mb-10">
//           <div className="flex items-center justify-between mb-2">
//             <div className="text-sm font-medium text-blue-600">Company Profile</div>
//             <div className="text-sm font-medium text-gray-400">Content Strategy</div>
//             <div className="text-sm font-medium text-gray-400">Integration</div>
//             <div className="text-sm font-medium text-gray-400">Review</div>
//           </div>
//           <div className="h-2 bg-gray-200 rounded-full">
//             <div className="h-full w-1/4 bg-blue-600 rounded-full"></div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Organization Profile & Access */}
//           <div className="border-b border-gray-200 p-6 md:p-8">
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                 <span className="text-blue-600 font-bold">1</span>
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Organization Profile & Access</h2>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="companyName">
//                   Company Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="companyName"
//                   name="companyName"
//                   required
//                   value={formData.companyName}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="linkedinUrl">
//                   LinkedIn Page URL *
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
//                     linkedin.com/company/
//                   </div>
//                   <input
//                     type="text"
//                     id="linkedinUrl"
//                     name="linkedinUrl"
//                     required
//                     value={formData.linkedinUrl.replace('https://linkedin.com/company/', '')}
//                     onChange={handleInputChange}
//                     className="w-full pl-40 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Brand & Visual Identity */}
//           <div className="border-b border-gray-200 p-6 md:p-8 bg-blue-50">
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                 <span className="text-blue-600 font-bold">2</span>
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Brand & Visual Identity</h2>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Official Logo Upload *
//                 </label>
//                 <div 
//                   className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
//                     filePreview.logo 
//                       ? 'border-green-500 bg-green-50' 
//                       : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
//                   }`}
//                   onClick={() => logoRef.current?.click()}
//                 >
//                   <input
//                     type="file"
//                     className="hidden"
//                     ref={logoRef}
//                     onChange={(e) => handleFileChange(e, 'logo')}
//                   />
//                   <div className="flex flex-col items-center justify-center">
//                     <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
//                       <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
//                       </svg>
//                     </div>
//                     <p className="font-medium text-gray-700">
//                       {filePreview.logo ? filePreview.logo.name : 'Click to upload logo'}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       PNG, JPG, SVG (Max 5MB)
//                     </p>
//                   </div>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-gray-700 font-medium mb-2">
//                   Banner/Cover Image Upload
//                 </label>
//                 <div 
//                   className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
//                     filePreview.banner 
//                       ? 'border-green-500 bg-green-50' 
//                       : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
//                   }`}
//                   onClick={() => bannerRef.current?.click()}
//                 >
//                   <input
//                     type="file"
//                     className="hidden"
//                     ref={bannerRef}
//                     onChange={(e) => handleFileChange(e, 'banner')}
//                   />
//                   <div className="flex flex-col items-center justify-center">
//                     <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
//                       <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                       </svg>
//                     </div>
//                     <p className="font-medium text-gray-700">
//                       {filePreview.banner ? filePreview.banner.name : 'Click to upload banner'}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Recommended: 1584×396px
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="primaryColor">
//                   Primary Brand Color *
//                 </label>
//                 <div className="flex items-center">
//                   <div 
//                     className="w-12 h-12 rounded-lg mr-4 cursor-pointer shadow-sm border border-gray-300"
//                     style={{ backgroundColor: formData.primaryColor }}
//                     onClick={() => document.getElementById('primaryColor')?.click()}
//                   ></div>
//                   <div className="flex-1">
//                     <input
//                       type="color"
//                       id="primaryColor"
//                       className="sr-only"
//                       value={formData.primaryColor}
//                       onChange={(e) => handleColorChange(e.target.value, 'primary')}
//                     />
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono"
//                       value={formData.primaryColor}
//                       onChange={(e) => handleColorChange(e.target.value, 'primary')}
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="secondaryColor">
//                   Secondary Brand Color
//                 </label>
//                 <div className="flex items-center">
//                   <div 
//                     className="w-12 h-12 rounded-lg mr-4 cursor-pointer shadow-sm border border-gray-300"
//                     style={{ backgroundColor: formData.secondaryColor }}
//                     onClick={() => document.getElementById('secondaryColor')?.click()}
//                   ></div>
//                   <div className="flex-1">
//                     <input
//                       type="color"
//                       id="secondaryColor"
//                       className="sr-only"
//                       value={formData.secondaryColor}
//                       onChange={(e) => handleColorChange(e.target.value, 'secondary')}
//                     />
//                     <input
//                       type="text"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg font-mono"
//                       value={formData.secondaryColor}
//                       onChange={(e) => handleColorChange(e.target.value, 'secondary')}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="form-group">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="brandVoice">
//                 Brand Voice Guidelines *
//               </label>
//               <div className="relative">
//                 <select
//                   id="brandVoice"
//                   name="brandVoice"
//                   required
//                   value={formData.brandVoice}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 >
//                   <option value="">Select brand voice...</option>
//                   <option value="formal">Formal & Professional</option>
//                   <option value="innovative">Innovative & Forward-thinking</option>
//                   <option value="empathetic">Empathetic & Human-centered</option>
//                   <option value="authoritative">Authoritative & Expert</option>
//                   <option value="friendly">Friendly & Approachable</option>
//                   <option value="bold">Bold & Disruptive</option>
//                   <option value="educational">Educational & Informative</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Business Objectives & KPIs */}
//           <div className="border-b border-gray-200 p-6 md:p-8">
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                 <span className="text-blue-600 font-bold">3</span>
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Business Objectives & KPIs</h2>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-3">
//                 Primary Goals * (Select all that apply)
//               </label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                 {[
//                   { id: 'leadGen', value: 'lead-generation', label: 'Lead Generation' },
//                   { id: 'thoughtLeadership', value: 'thought-leadership', label: 'Thought Leadership' },
//                   { id: 'talentAttraction', value: 'talent-attraction', label: 'Talent Attraction' },
//                   { id: 'brandAwareness', value: 'brand-awareness', label: 'Brand Awareness' },
//                   { id: 'customerEngagement', value: 'customer-engagement', label: 'Customer Engagement' },
//                   { id: 'productAwareness', value: 'product-awareness', label: 'Product Awareness' }
//                 ].map(item => (
//                   <div key={item.id} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={item.id}
//                       name="goals"
//                       value={item.value}
//                       checked={formData.goals.includes(item.value)}
//                       onChange={handleCheckboxChange}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <label htmlFor={item.id} className="ml-2 text-gray-700">
//                       {item.label}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="postingFrequency">
//                   Posting Cadence (per week) *
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="postingFrequency"
//                     name="postingFrequency"
//                     required
//                     value={formData.postingFrequency}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                   >
//                     <option value="">Select frequency...</option>
//                     <option value="1">1 post per week</option>
//                     <option value="2">2 posts per week</option>
//                     <option value="3">3 posts per week</option>
//                     <option value="4">4 posts per week</option>
//                     <option value="5">5 posts per week (daily)</option>
//                     <option value="7">Multiple posts daily</option>
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                     </svg>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="monthlyBudget">
//                   Monthly Marketing Budget (Optional)
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
//                     $
//                   </div>
//                   <input
//                     type="number"
//                     id="monthlyBudget"
//                     name="monthlyBudget"
//                     placeholder="e.g. 5000"
//                     value={formData.monthlyBudget}
//                     onChange={handleInputChange}
//                     className="w-full pl-8 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Target Audience & Segments */}
//           <div className="border-b border-gray-200 p-6 md:p-8 bg-blue-50">
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                 <span className="text-blue-600 font-bold">4</span>
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Target Audience & Segments</h2>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="buyerPersonas">
//                 Buyer Personas / Audience Segments *
//               </label>
//               <textarea
//                 id="buyerPersonas"
//                 name="buyerPersonas"
//                 placeholder="e.g. CFOs in manufacturing companies (500-5000 employees), SMB founders in tech sector, HR directors in healthcare..."
//                 required
//                 value={formData.buyerPersonas}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
//               />
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="industryType">
//                   Industry Type *
//                 </label>
//                 <select
//                   id="industryType"
//                   name="industryType"
//                   required
//                   value={formData.industryType}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 >
//                   <option value="">Select industry...</option>
//                   <option value="technology">Technology</option>
//                   <option value="healthcare">Healthcare</option>
//                   <option value="finance">Finance & Banking</option>
//                   <option value="manufacturing">Manufacturing</option>
//                   <option value="retail">Retail & E-commerce</option>
//                   <option value="consulting">Consulting</option>
//                   <option value="education">Education</option>
//                   <option value="real-estate">Real Estate</option>
//                   <option value="marketing">Marketing & Advertising</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="productService">
//                   Product/Service Type *
//                 </label>
//                 <select
//                   id="productService"
//                   name="productService"
//                   required
//                   value={formData.productService}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 >
//                   <option value="">Select type...</option>
//                   <option value="saas">SaaS/Software</option>
//                   <option value="physical-product">Physical Product</option>
//                   <option value="professional-services">Professional Services</option>
//                   <option value="consulting">Consulting</option>
//                   <option value="platform">Platform/Marketplace</option>
//                   <option value="agency">Agency Services</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="companySize">
//                   Company Size
//                 </label>
//                 <select
//                   id="companySize"
//                   name="companySize"
//                   value={formData.companySize}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 >
//                   <option value="">Select size...</option>
//                   <option value="startup">Startup (1-50)</option>
//                   <option value="small">Small (51-200)</option>
//                   <option value="medium">Medium (201-1000)</option>
//                   <option value="large">Large (1000+)</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Content Pillars & Themes */}
//           <div className="border-b border-gray-200 p-6 md:p-8">
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                 <span className="text-blue-600 font-bold">5</span>
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Content Pillars & Themes</h2>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-gray-700 font-medium mb-3">
//                 Content Pillars * (Select 3-5 core themes)
//               </label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
//                 {[
//                   { id: 'productUpdates', value: 'product-updates', label: 'Product Updates' },
//                   { id: 'industryInsights', value: 'industry-insights', label: 'Industry Insights' },
//                   { id: 'customerSuccess', value: 'customer-success', label: 'Customer Success' },
//                   { id: 'companyNews', value: 'company-news', label: 'Company News' },
//                   { id: 'thoughtLeadership2', value: 'thought-leadership', label: 'Thought Leadership' },
//                   { id: 'howTo', value: 'educational', label: 'Educational/How-to' },
//                   { id: 'behindScenes', value: 'behind-scenes', label: 'Behind the Scenes' },
//                   { id: 'partnerships', value: 'partnerships', label: 'Partnerships & Events' }
//                 ].map(item => (
//                   <div key={item.id} className="flex items-start">
//                     <input
//                       type="checkbox"
//                       id={item.id}
//                       name="contentPillars"
//                       value={item.value}
//                       checked={formData.contentPillars.includes(item.value)}
//                       onChange={handleCheckboxChange}
//                       className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <label htmlFor={item.id} className="ml-2 text-gray-700">
//                       {item.label}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="form-group">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="examplePosts">
//                 Example Posts or Competitive Benchmarks
//               </label>
//               <textarea
//                 id="examplePosts"
//                 name="examplePosts"
//                 placeholder="Share links to successful posts from your company or competitors that inspire your content direction..."
//                 value={formData.examplePosts}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
//               />
//             </div>
//           </div>

//           {/* Integration Details */}
//           <div className="p-6 md:p-8">
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                 <span className="text-blue-600 font-bold">6</span>
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800">Integration Details</h2>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="crmIntegration">
//                   CRM Integration
//                 </label>
//                 <select
//                   id="crmIntegration"
//                   name="crmIntegration"
//                   value={formData.crmIntegration}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 >
//                   <option value="">Select CRM...</option>
//                   <option value="salesforce">Salesforce</option>
//                   <option value="hubspot">HubSpot</option>
//                   <option value="pipedrive">Pipedrive</option>
//                   <option value="zoho">Zoho CRM</option>
//                   <option value="other">Other</option>
//                   <option value="none">No CRM Integration</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label className="block text-gray-700 font-medium mb-2" htmlFor="analyticsTools">
//                   Analytics Tools
//                 </label>
//                 <select
//                   id="analyticsTools"
//                   name="analyticsTools"
//                   value={formData.analyticsTools}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 >
//                   <option value="">Select tools...</option>
//                   <option value="google-analytics">Google Analytics</option>
//                   <option value="linkedin-analytics">LinkedIn Analytics</option>
//                   <option value="hootsuite">Hootsuite Insights</option>
//                   <option value="sprout-social">Sprout Social</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="form-group">
//               <label className="block text-gray-700 font-medium mb-2" htmlFor="additionalNotes">
//                 Additional Notes or Requirements
//               </label>
//               <textarea
//                 id="additionalNotes"
//                 name="additionalNotes"
//                 placeholder="Any specific requirements, constraints, or additional information we should know..."
//                 value={formData.additionalNotes}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
//               />
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="bg-gray-50 px-6 py-5 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row justify-between items-center">
//               <button 
//                 type="button" 
//                 className="px-6 py-3 text-gray-600 font-medium rounded-lg hover:text-gray-800 mb-3 sm:mb-0"
//               >
//                 Save Draft
//               </button>
//               <button 
//                 type="submit" 
//                 className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
//               >
//                 Complete Onboarding
//               </button>
//             </div>
//           </div>
//         </form>
        
//         <div className="mt-8 text-center text-gray-500 text-sm">
//           <p>Your information is securely stored and will only be used to optimize your LinkedIn marketing efforts.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyRegisterPage;