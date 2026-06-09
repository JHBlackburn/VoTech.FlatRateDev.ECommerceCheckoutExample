type KpiCardProps = {
  label: string;
  value: string | number;
  detail?: string;
  tone?: "neutral" | "green" | "yellow" | "red" | "blue";
};

export function KpiCard({ label, value, detail, tone = "neutral" }: KpiCardProps) {
  return (
    <article className={`kpi-card kpi-${tone}`}>
      <p className="kpi-label">{label}</p>
      <strong className="kpi-value">{value}</strong>
      {detail ? <span className="kpi-detail">{detail}</span> : null}
    </article>
  );
}
