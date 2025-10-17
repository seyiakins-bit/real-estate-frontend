import React, { useState } from "react";
import AkinBg from "../assets/akins.jpg";

const faqs = [
  {
    question: "What types of properties does Akins Luxury Homes offer?",
    answer:
      "We specialize in luxury real estate, including high-end apartments, waterfront villas, penthouses, and commercial spaces. Each property is carefully selected to meet our standards of quality, prestige, and long-term value.",
  },
  {
    question: "How can I schedule a property viewing?",
    answer:
      "You can book a private tour directly through our website's contact form or by calling our office. One of our property advisors will reach out to confirm a convenient date and time.",
  },
  {
    question: "Do you assist with real estate investment in Nigeria and abroad?",
    answer:
      "Yes. Akins Luxury Homes provides tailored investment advisory services for both local and international clients looking to grow and protect their real estate portfolio.",
  },
  {
    question: "What is the process for listing my property with Akins Luxury Homes?",
    answer:
      "Simply contact us via our contact page or email. Our valuation team will schedule an inspection, guide you through our listing process, and ensure your property receives premium market exposure.",
  },
  {
    question: "Are your services available to international clients?",
    answer:
      "Absolutely. We work with clients across the globe and provide remote consultation, digital tours, and investment advisory for buyers, sellers, and investors abroad.",
  },
];

const Question = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-gray-100"
      style={{ backgroundImage: `url(${AkinBg})` }}
    >
      {/* Dark overlay */}
      <div className="bg-black bg-opacity-70 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 py-16 w-full">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about Akins Luxury Homes, our services,
              and how we bring your real estate goals to life.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-80 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-[1.01]"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>
                  <span className="text-blue-400 text-2xl">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-5 text-gray-300 border-t border-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer message */}
          <div className="text-center text-gray-400 border-t border-gray-700 pt-8 mt-12">
            <p>
              Didn’t find your question?{" "}
              <a
                href="/contact"
                className="text-blue-400 hover:underline font-medium"
              >
                Contact us
              </a>{" "}
              — we’re happy to help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
