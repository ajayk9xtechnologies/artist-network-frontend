// app/terms/page.tsx
export default function TermsPage() {
    return (
      <div className="min-h-[calc(100dvh-80px)] bg-background px-4 py-10">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <header className="space-y-2">
            <h1>Terms of Service</h1>
            <p className="text-sm text-muted-foreground">
              Last updated: March 2026
            </p>
          </header>
  
          <section className="space-y-4 text-sm sm:text-base">
            <p>
              Welcome to Artist Network. By accessing or using our platform, you
              agree to be bound by these Terms of Service. Please read them
              carefully before using the website or any related services.
            </p>
  
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">1. Overview</h2>
              <p>
                Artist Network is a marketplace that connects artists and
                organisations in the hospitality and events industry. We provide
                tools to help you discover, communicate, and manage bookings, but
                we do not act as an employer, agent, or guarantor for either
                party.
              </p>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">2. Eligibility</h2>
              <p>
                To use the platform, you must be at least 18 years old and have
                the legal capacity to enter into binding agreements in your
                jurisdiction. By creating an account, you represent and warrant
                that this information is true.
              </p>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">3. Accounts &amp; Profiles</h2>
              <p>
                You are responsible for maintaining the confidentiality of your
                login credentials and for all activities that occur under your
                account. You agree to provide accurate, current, and complete
                information in your profile and to keep it up to date.
              </p>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">4. Bookings &amp; Payments</h2>
              <p>
                Any agreements, bookings, or payments between artists and
                organisations are entered into directly between those parties.
                Artist Network is not a party to those agreements and is not
                responsible for performance, cancellations, or disputes unless
                expressly stated otherwise in separate documentation.
              </p>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">5. Acceptable Use</h2>
              <p>
                You agree not to misuse the platform or help anyone else to do so.
                This includes, but is not limited to, attempting to gain
                unauthorised access, posting illegal or harmful content, harassing
                other users, or interfering with the normal functioning of the
                service.
              </p>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">6. Termination</h2>
              <p>
                We may suspend or terminate your access to the platform at any
                time, without prior notice, if we reasonably believe you have
                violated these Terms or are otherwise causing harm to the
                platform or its users.
              </p>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">7. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. When we do, we will
                update the &quot;Last updated&quot; date above. Your continued
                use of the platform after changes become effective constitutes
                your acceptance of the revised Terms.
              </p>
            </div>
  
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">8. Contact</h2>
              <p>
                If you have any questions about these Terms, you can reach us at{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-primary hover:underline"
                >
                  support@example.com
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  }