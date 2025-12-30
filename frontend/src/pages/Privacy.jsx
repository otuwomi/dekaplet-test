import React from 'react';

const Privacy = () => {
  return (
    <div className="dark-container">
      <section className="section-padding pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="display-large mb-8">Privacy Policy</h1>
          <p className="body-medium text-[var(--text-muted)] mb-12">
            Last updated: August 2025
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="heading-1 mb-4">1. Introduction</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                Dekaplet ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our crypto payment gateway and wallet services.
              </p>
            </div>

            <div>
              <h2 className="heading-1 mb-4">2. Information We Collect</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 body-medium text-[var(--text-secondary)] ml-4">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Business information (company name, tax ID, business address)</li>
                <li>Financial information (bank account details for withdrawals)</li>
                <li>Identity verification documents (for KYC/AML compliance)</li>
                <li>Transaction data (payment amounts, wallet addresses, timestamps)</li>
                <li>Technical data (IP address, browser type, device information)</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-1 mb-4">3. How We Use Your Information</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 body-medium text-[var(--text-secondary)] ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send transaction notifications</li>
                <li>Verify your identity and comply with KYC/AML regulations</li>
                <li>Detect and prevent fraud, abuse, and security incidents</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you technical notices and policy updates</li>
                <li>Analyze usage patterns and improve user experience</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-1 mb-4">4. Data Security</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-2 body-medium text-[var(--text-secondary)} ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Multi-signature wallet protection</li>
                <li>Cold storage for the majority of crypto assets</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication protocols</li>
                <li>24/7 monitoring for suspicious activities</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-1 mb-4">5. Information Sharing</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 body-medium text-[var(--text-secondary)] ml-4">
                <li>Service providers who assist in our operations (under strict confidentiality)</li>
                <li>Law enforcement or regulatory authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
                <li>Third parties in connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-1 mb-4">6. Your Rights</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 body-medium text-[var(--text-secondary)] ml-4">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your data (subject to legal obligations)</li>
                <li>Object to processing of your personal information</li>
                <li>Withdraw consent where processing is based on consent</li>
                <li>Lodge a complaint with a data protection authority</li>
              </ul>
            </div>

            <div>
              <h2 className="heading-1 mb-4">7. Data Retention</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                We retain your information for as long as necessary to provide our services and comply with legal obligations. Transaction records are retained for a minimum of 7 years as required by financial regulations.
              </p>
            </div>

            <div>
              <h2 className="heading-1 mb-4">8. International Transfers</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </div>

            <div>
              <h2 className="heading-1 mb-4">9. Cookies and Tracking</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can manage cookie preferences through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="heading-1 mb-4">10. Changes to This Policy</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="heading-1 mb-4">11. Contact Us</h2>
              <p className="body-medium text-[var(--text-secondary)] mb-4">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] mt-4">
                <p className="body-medium text-[var(--text-secondary)]">
                  Email: privacy@dekaplet.com<br />
                  Address: 123 Crypto Street, San Francisco, CA 94102, United States
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;