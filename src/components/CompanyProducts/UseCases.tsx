
import React from 'react';

interface UseCase {
  title: string;
  description: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  icon: string;
}

interface UseCasesProps {
  title: string;
  subtitle: string;
  useCases: UseCase[];
}

const UseCases = ({ title, subtitle, useCases }: UseCasesProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{useCase.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {useCase.title}
                  </h3>
                  <span className="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">
                    {useCase.industry}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {useCase.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
                  <p className="text-gray-600 text-sm">{useCase.challenge}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
                  <p className="text-gray-600 text-sm">{useCase.solution}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Results</h4>
                  <ul className="space-y-1">
                    {useCase.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start text-sm text-gray-600">
                        <svg className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
