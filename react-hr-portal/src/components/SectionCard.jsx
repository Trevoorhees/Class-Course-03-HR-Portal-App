function SectionCard({ title, children, actions }) {
  return (
    <section className="section-card">
      <div className="section-card-header">
        <h3>{title}</h3>
        {actions ? <div className="section-card-actions">{actions}</div> : null}
      </div>
      <div>{children}</div>
    </section>
  );
}

export default SectionCard;
