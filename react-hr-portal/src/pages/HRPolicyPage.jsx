import StaticPageLayout from './StaticPageLayout';

function HRPolicyPage() {
  return (
    <StaticPageLayout
      title="HR Policy"
      subtitle="Guidelines for responsible workforce management"
      points={[
        'Maintain accurate employee records and ensure confidentiality of sensitive information.',
        'Review leave requests promptly and document decisions clearly.',
        'Support onboarding by verifying employee details and preparing team access.',
        'Promote fair workplace practices and consistent communication across departments.',
      ]}
    />
  );
}

export default HRPolicyPage;
