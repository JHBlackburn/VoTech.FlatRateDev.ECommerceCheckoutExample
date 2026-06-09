import roadmapData from "../data/roadmap.json";
import { RoadmapStep } from "../components/RoadmapStep";
import type { RoadmapItem } from "../types";

const roadmap = roadmapData as RoadmapItem[];

export function RoadmapPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Crawl-Walk-Run Roadmap</p>
          <h1>From Catalog Cleanup to True Punchout</h1>
          <p>
            A staged path keeps the first decision small: prove the catalog,
            classify the RFP language, and choose the next ticket with cleaner
            information.
          </p>
        </div>
      </section>

      <section className="roadmap-timeline" aria-label="Roadmap timeline">
        {roadmap.map((item) => (
          <RoadmapStep key={item.step} item={item} />
        ))}
      </section>

      <section className="bottom-callout">
        The safest path is to start with the RFP catalog and readiness spike,
        then decide whether the next fixed-price ticket should be portal-lite,
        NetSuite reporting, item cleanup, or true punchout discovery.
      </section>
    </div>
  );
}
