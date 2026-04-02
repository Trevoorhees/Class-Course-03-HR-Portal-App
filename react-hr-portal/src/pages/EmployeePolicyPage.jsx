import StaticPageLayout from './StaticPageLayout';

function EmployeePolicyPage() {
  return (
    <StaticPageLayout
      title="Employee Policy"
      subtitle="Standards and expectations for portal use"
      points={[
        'Employees should keep their personal and contact details updated in the portal.',
        'Leave requests must include accurate dates, leave type, and a brief reason.',
        'User credentials should be protected and not shared with anyone else.',
        'Employees are encouraged to review portal announcements and policy updates regularly.',
      ]}
    />
  );
}

export default EmployeePolicyPage;
