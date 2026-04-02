function StaticPageLayout({ title, subtitle, points }) {
  return (
    <section className="info-page slim-page">
      <div className="info-hero">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="feature-card full-width-card">
        <ul className="policy-list">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default StaticPageLayout;
