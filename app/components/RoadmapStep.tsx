import type { RoadmapItem } from "../types";

type RoadmapStepProps = {
  item: RoadmapItem;
};

export function RoadmapStep({ item }: RoadmapStepProps) {
  return (
    <article className="roadmap-step">
      <div className="roadmap-number">{item.step}</div>
      <div className="roadmap-body">
        <div className="roadmap-heading">
          <h2>{item.name}</h2>
          <div className="roadmap-tags">
            <span>Effort: {item.effort}</span>
            <span>Risk: {item.risk}</span>
          </div>
        </div>
        <p>{item.description}</p>
        <div>
          <span className="panel-label">Example deliverables</span>
          <ul className="deliverable-list">
            {item.exampleDeliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
