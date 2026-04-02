function AboutPage() {
  return (
    <section className="info-page">
      <div className="info-hero">
        <h1>About the HR Portal</h1>
        <p>
          This HR portal is a responsive React application that helps HR teams manage employee profiles,
          review leave requests, and support onboarding, while also giving employees a simple place to
          register, review policy information, and submit requests.
        </p>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <h3>Authentication</h3>
          <p>Separate login and signup flows with role-based access for HR and employees.</p>
        </article>
        <article className="feature-card">
          <h3>Employee Management</h3>
          <p>HR can add, update, and delete employee records stored in JSON Server.</p>
        </article>
        <article className="feature-card">
          <h3>Leave Management</h3>
          <p>Employees can request leave and HR can approve or reject requests from a dashboard.</p>
        </article>
      </div>
    </section>
  );
}

export default AboutPage;
