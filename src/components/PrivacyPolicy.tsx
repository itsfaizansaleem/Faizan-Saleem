import { motion } from 'motion/react';

export function PrivacyPolicy() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-32 bg-[var(--bg)] min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-400 text-lg">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-400 prose-headings:text-white prose-a:text-electric-blue">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Faizan Saleem Digital Agency ("we," "our," or "us"). We respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website, and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect several types of information from and about users of our Website, including:
          </p>
          <ul>
            <li><strong>Personal Data:</strong> Name, email address, phone number, and business details when you book a discovery call or subscribe to our newsletter.</li>
            <li><strong>Usage Data:</strong> Information about your internet connection, the equipment you use to access our Website, and usage details through cookies and analytics tools.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use information that we collect about you or that you provide to us, including any personal information:
          </p>
          <ul>
            <li>To present our Website and its contents to you.</li>
            <li>To provide you with information, products, or services that you request from us.</li>
            <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection.</li>
            <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
            <li>To evaluate business analytics and optimize programmatic advertising effectively.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. Our forms are secured using industry-standard encryption, and data is transmitted securely to our handling endpoints (Formspree).
          </p>

          <h2>5. Your Rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, or delete the personal information we have collected. If you wish to exercise these rights, please contact us at <strong>faizansaleem@email.com</strong>.
          </p>

          <h2>6. Changes to Our Privacy Policy</h2>
          <p>
            It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the Website home page.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            To ask questions or comment about this privacy policy and our privacy practices, contact us at: <br/>
            <strong>Email:</strong> faizansaleem@email.com <br/>
            <strong>Phone:</strong> +1 555-843-0010
          </p>
        </div>
      </div>
    </motion.section>
  );
}
