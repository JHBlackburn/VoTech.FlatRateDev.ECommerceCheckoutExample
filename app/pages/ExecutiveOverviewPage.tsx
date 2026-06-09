import productsData from "../data/products.json";
import rfpData from "../data/rfp.json";
import { KpiCard } from "../components/KpiCard";
import { ReadinessBadge } from "../components/ReadinessBadge";
import type { Product, Rfp } from "../types";
import { computeStats } from "../utils";

const products = productsData as Product[];
const rfp = rfpData as Rfp;
const stats = computeStats(products);

export function ExecutiveOverviewPage() {
  const readyPercent = Math.round((stats.rfpReady / stats.totalItems) * 100);
  const reviewPercent = 100 - readyPercent;

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Executive Overview</p>
          <h1>RFP Readiness Dashboard</h1>
          <p>
            This prototype shows a possible future-state layer around NetSuite:
            a clean RFP catalog, a portal-lite customer experience, and an
            operational readiness view for Total RESA's team. The data is
            synthetic and for discussion only.
          </p>
        </div>
        <ReadinessBadge label={rfp.status} tone="watch" />
      </section>

      <section className="overview-grid">
        <article className="card rfp-card">
          <div>
            <p className="eyebrow">Customer / RFP</p>
            <h2>{rfp.customerName}</h2>
            <p>{rfp.rfpName}</p>
          </div>
          <dl className="definition-grid">
            <div>
              <dt>Deadline</dt>
              <dd>{rfp.deadline}</dd>
            </div>
            <div>
              <dt>Mock portal</dt>
              <dd>{rfp.portalUrlMock}</dd>
            </div>
            <div className="wide-def">
              <dt>Buyer requirement</dt>
              <dd>{rfp.buyerRequirement}</dd>
            </div>
          </dl>
        </article>

        <article className="card next-step-card">
          <p className="eyebrow">Recommended Next Step</p>
          <h2>Run an Inventory + Punchout Readiness Spike</h2>
          <p>
            Confirm source systems, classify punchout requirements, and turn
            exceptions into fixed-price tickets.
          </p>
        </article>
      </section>

      <section className="kpi-grid" aria-label="RFP readiness metrics">
        <KpiCard label="Total Items" value={stats.totalItems} tone="blue" />
        <KpiCard label="RFP Ready" value={stats.rfpReady} tone="green" />
        <KpiCard label="Needs Review" value={stats.needsReview} tone="yellow" />
        <KpiCard
          label="NetSuite Matched"
          value={stats.netSuiteMatched}
          tone="green"
        />
        <KpiCard label="Price Conflicts" value={stats.priceConflicts} tone="red" />
        <KpiCard
          label="Missing Contract Price"
          value={stats.missingContractPrice}
          tone="red"
        />
      </section>

      <section className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Readiness Mix</p>
            <h2>RFP Ready vs Needs Review</h2>
          </div>
          <strong>{readyPercent}% ready</strong>
        </div>
        <div className="readiness-bar" aria-label="Readiness bar">
          <div
            className="readiness-ready"
            style={{ width: `${readyPercent}%` }}
            title="RFP Ready"
          />
          <div
            className="readiness-review"
            style={{ width: `${reviewPercent}%` }}
            title="Needs Review"
          />
        </div>
        <div className="bar-legend">
          <span>
            <i className="legend-dot ready-dot" /> RFP Ready
          </span>
          <span>
            <i className="legend-dot review-dot" /> Needs Review
          </span>
        </div>
      </section>

      <section className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Path To Automation</p>
            <h2>RFP Catalog to Punchout</h2>
          </div>
        </div>
        <div className="flow-diagram" aria-label="RFP readiness flow">
          <span>RFP Catalog</span>
          <span>Portal-Lite</span>
          <span>NetSuite-Backed Portal</span>
          <span>True Punchout</span>
        </div>
      </section>
    </div>
  );
}
