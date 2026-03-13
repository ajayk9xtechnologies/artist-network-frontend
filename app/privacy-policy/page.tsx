// app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <div className="min-h-[calc(100dvh-80px)] bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1>Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: March 2026
          </p>
        </header>

        <section className="space-y-4 text-sm sm:text-base">
          <p>
            This Privacy Policy explains how Artist Network collects, uses, and
            protects your personal information when you use our website and
            services.
          </p>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as
              your name, contact details, profile information, and any content
              you upload. We may also collect usage data, device information,
              and log data when you access the platform.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <p>
              We use your information to operate and improve the platform, match
              artists with organisations, process communications and bookings,
              personalise your experience, and comply with legal obligations.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">3. Sharing of Information</h2>
            <p>
              We may share your information with other users as part of your
              public profile, with service providers who support our operations,
              or when required by law. We do not sell your personal information
              to third parties.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">4. Cookies &amp; Tracking</h2>
            <p>
              We may use cookies and similar technologies to remember your
              preferences, help you sign in, and analyse how the platform is
              used. You can usually control cookies through your browser
              settings, but disabling them may affect certain features.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">5. Data Security</h2>
            <p>
              We use appropriate technical and organisational measures to
              protect your information. However, no method of transmission over
              the Internet or electronic storage is completely secure, and we
              cannot guarantee absolute security.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">6. Your Rights</h2>
            <p>
              Depending on your location, you may have rights over your personal
              data, including the right to access, correct, or delete your
              information, or to object to or restrict certain processing.
              Contact us if you wish to exercise these rights.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">7. Children&apos;s Privacy</h2>
            <p>
              Our platform is not intended for children under 18. We do not
              knowingly collect personal information from children, and if we
              learn that we have done so, we will take steps to delete such
              information.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will update the &quot;Last updated&quot; date above. Your
              continued use of the platform after changes become effective
              constitutes your acceptance of the revised policy.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">9. Contact</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle
              your data, contact us at{" "}
              <a
                href="mailto:privacy@example.com"
                className="text-primary hover:underline"
              >
                privacy@example.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}