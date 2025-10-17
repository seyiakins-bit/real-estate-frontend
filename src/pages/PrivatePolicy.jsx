import React from "react";
import AkinBg from "../assets/akins.jpg";

const PrivatePolicy = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-gray-100"
      style={{ backgroundImage: `url(${AkinBg})` }}
    >
      {/* Dark overlay */}
      <div className="bg-black bg-opacity-70 min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 py-16 w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us at{" "}
              <span className="text-blue-400 font-semibold">
                Akins Luxury Homes
              </span>
              . This policy explains how we collect, use, and protect your
              personal information when you interact with our website and
              services.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                1. Information We Collect
              </h2>
              <p>
                We collect personal information that you provide to us directly,
                such as your name, email, phone number, and property preferences.
                We may also collect data automatically, including IP addresses,
                browser type, and site usage analytics, to improve user
                experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                Your information is used to deliver personalized property
                recommendations, respond to inquiries, process transactions, and
                enhance our website performance. We may also use it for
                marketing purposes with your consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                3. Data Protection & Security
              </h2>
              <p>
                Akins Luxury Homes employs industry-standard security measures to
                protect your information from unauthorized access, loss, or
                misuse. However, please note that no online transmission is
                completely secure, and we cannot guarantee absolute safety.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                4. Cookies & Tracking
              </h2>
              <p>
                We use cookies to enhance your browsing experience and analyze
                site traffic. You can adjust your browser settings to disable
                cookies, but some website features may not function properly
                without them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                5. Sharing Your Information
              </h2>
              <p>
                We do not sell or rent your personal data. We may share
                information with trusted partners and service providers to help
                us deliver our services, in compliance with data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                6. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal
                data. You may also opt out of marketing communications at any
                time by contacting us directly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                7. Updates to This Policy
              </h2>
              <p>
                We may update this Privacy Policy occasionally to reflect
                changes in our practices or for legal reasons. All updates will
                be posted on this page with the effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                8. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or your data,
                please contact us at{" "}
                <span className="text-blue-400 font-medium">
                  info@akinsluxuryhomes.com
                </span>
                .
              </p>
            </section>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default PrivatePolicy;
