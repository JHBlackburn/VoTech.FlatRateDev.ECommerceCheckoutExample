import issuesData from "../data/issues.json";
import productsData from "../data/products.json";
import { IssueBadge } from "../components/IssueBadge";
import type { Issue, Product } from "../types";
import { issueGroups, issueLabels } from "../utils";

const issues = issuesData as Issue[];
const products = productsData as Product[];

const suggestedTickets = [
  {
    name: "Punchout Requirement Classification",
    why: "Prevents portal-lite, true punchout, and procurement protocol work from being scoped as the same thing.",
    acceptance:
      "RFP language reviewed, buyer procurement platform identified, true punchout vs portal-lite recommendation documented."
  },
  {
    name: "SKU / NetSuite Crosswalk Cleanup",
    why: "Creates the item mapping needed before any NetSuite-backed order automation is safe.",
    acceptance:
      "Every RFP item has internal item number, manufacturer model, customer SKU, vendor SKU, and NetSuite item id where applicable."
  },
  {
    name: "Customer Price Rule Audit",
    why: "Keeps buyer-facing contract pricing from exposing missing or conflicting values.",
    acceptance:
      "Each RFP item has approved contract price, pricing owner, and conflict status resolved."
  },
  {
    name: "Portal-Lite Static Prototype",
    why: "Gives Total RESA and the customer a concrete screen-share artifact before integration scope is committed.",
    acceptance:
      "Buyer can browse approved items, add items to request, and submit a non-integrated order request."
  }
];

export function IssuesPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Data Readiness / Exception Queue</p>
          <h1>Exceptions Become Fixed-Price Tickets</h1>
          <p>
            This view turns messy catalog, pricing, punchout, and NetSuite
            readiness questions into scoped follow-up work.
          </p>
        </div>
      </section>

      <section className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Section 1</p>
            <h2>Executive Issue Register</h2>
          </div>
        </div>
        <div className="issue-register">
          {issues.map((issue) => (
            <article className="issue-card" key={issue.id}>
              <div className="issue-card-header">
                <IssueBadge label={issue.severity} severity={issue.severity} />
                <span>{issue.relatedArea}</span>
              </div>
              <h3>{issue.title}</h3>
              <p>{issue.impact}</p>
              <strong>{issue.suggestedTicket}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Section 2</p>
            <h2>Product Exceptions</h2>
          </div>
        </div>
        <div className="exception-grid">
          {issueGroups.map((group) => {
            const matchingProducts = products.filter((product) =>
              product.issues.includes(group.type)
            );

            return (
              <article className="exception-group" key={group.type}>
                <div className="exception-heading">
                  <h3>{group.title}</h3>
                  <IssueBadge
                    type={group.type}
                    label={`${matchingProducts.length} item${
                      matchingProducts.length === 1 ? "" : "s"
                    }`}
                  />
                </div>
                {matchingProducts.length === 0 ? (
                  <p className="muted-copy">
                    No current products tagged with {issueLabels[group.type]}.
                  </p>
                ) : (
                  <ul className="product-exception-list">
                    {matchingProducts.map((product) => (
                      <li key={product.id}>
                        <strong>{product.itemNumber}</strong>
                        <span>{product.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Section 3</p>
            <h2>Suggested FRD Tickets</h2>
          </div>
        </div>
        <div className="ticket-grid">
          {suggestedTickets.map((ticket) => (
            <article className="ticket-card" key={ticket.name}>
              <h3>{ticket.name}</h3>
              <p>{ticket.why}</p>
              <div className="acceptance-box">
                <span>Acceptance</span>
                <p>{ticket.acceptance}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
