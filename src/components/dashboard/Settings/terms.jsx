const Terms = () => {
    return <div style={{ maxHeight: '50vh', overflowY: 'auto', padding:'40px 20px 20px', }}>
        <div className="p-6 max-w-4xl mx-auto text-gray-800" style={{display:'flex', flexDirection:'column', gap:20}}>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Eligibility</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>You must be at least 18 years old (or the age of majority in your jurisdiction).</li>
                    <li>You must provide accurate personal and payment information.</li>
                    <li>You must agree to Stripe’s <a href="https://stripe.com/connect-account/legal" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Connected Account Agreement</a>.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Account and Payment Setup</h2>
                <p>You are required to create a Stripe Connected Account through our platform. Stripe will handle all payouts, and you are responsible for ensuring the accuracy of your payout information.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Fees and Payouts</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>We may charge a service fee or commission per transaction, which will be disclosed before onboarding.</li>
                    <li>Stripe manages payout schedules based on their own rules.</li>
                    <li>Transaction fees are governed by Stripe's pricing policies.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Taxes and Compliance</h2>
                <p>You are solely responsible for all applicable taxes on the income you receive. We recommend consulting a tax professional. Compliance with local laws is your responsibility.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Fraud and Chargebacks</h2>
                <p>You must not engage in fraudulent activities. You are responsible for any chargebacks or disputes and we may suspend your account if we detect any suspicious activity.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Restrictions and Prohibited Use</h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>No unlawful or prohibited activities using Stripe or our platform.</li>
                    <li>Do not provide false or misleading information.</li>
                    <li>No bypassing our platform to collect direct payments from students.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
                <p>We reserve the right to suspend or terminate your account for any violation of these Terms or Stripe policies. You may also terminate your account at any time.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. Limitation of Liability</h2>
                <p>We are not responsible for any losses or issues arising from your use of Stripe or our platform. Stripe operates independently and handles all payment processing.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">9. Amendments</h2>
                <p>We may update these Terms at any time. You will be notified of significant changes. Continued use of the platform indicates acceptance of the revised Terms.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
                <p>If you have questions or concerns, please contact us at <span className="font-medium">support@tutrx.org</span>.</p>
            </section>
        </div>
    </div>
}

export default Terms