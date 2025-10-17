import React from "react";
import AkinBg from "../assets/akins.jpg";

const TermsConditions = () => {
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
              Terms & Conditions
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Welcome to{" "}
              <span className="text-blue-400 font-semibold">
                Akins Luxury Homes
              </span>
              . By accessing or using our website and services, you agree to
              comply with the following terms and conditions. Please read them
              carefully.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By using our website, you confirm that you have read,
                understood, and agree to these Terms and Conditions. If you do
                not agree, you must not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                2. Use of Our Services
              </h2>
              <p>
                You agree to use our platform only for lawful purposes and in a
                manner that does not infringe upon the rights or restrict the
                use of our services by others. Misuse, fraud, or unauthorized
                access is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                3. Property Listings & Accuracy
              </h2>
              <p>
                Akins Luxury Homes strives to provide accurate and updated
                property information. However, we do not guarantee that all
                listings, prices, or descriptions are completely error-free or
                current. We encourage users to verify details independently
                before making decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                4. Intellectual Property
              </h2>
              <p>
                All content, including text, images, graphics, and logos, are
                the property of Akins Luxury Homes and protected under
                intellectual property laws. You may not reproduce, modify, or
                distribute any content without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                5. Third-Party Links
              </h2>
              <p>
                Our website may include links to external websites or partners.
                Akins Luxury Homes is not responsible for the content, accuracy,
                or practices of third-party websites. Visiting external links is
                at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                Akins Luxury Homes shall not be held liable for any loss,
                damages, or expenses arising from your use of our website or
                services, including reliance on property information or
                third-party links.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                7. Changes to Terms
              </h2>
              <p>
                We may update these Terms & Conditions at any time to reflect
                operational or legal changes. Continued use of our website after
                updates implies acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                8. Governing Law
              </h2>
              <p>
                These Terms & Conditions are governed by the laws of the Federal
                Republic of Nigeria. Any disputes arising under these terms
                shall be resolved in Nigerian courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">
                9. Contact Information
              </h2>
              <p>
                For questions regarding these Terms & Conditions, please contact
                us at{" "}
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

export default TermsConditions;
