import type { ProductIssueType } from "../types";
import { issueLabels } from "../utils";

type IssueBadgeProps = {
  type?: ProductIssueType;
  label?: string;
  severity?: "High" | "Medium" | "Low";
};

export function IssueBadge({ type, label, severity }: IssueBadgeProps) {
  const resolvedLabel = label ?? (type ? issueLabels[type] : "Needs Review");
  const tone = severity ? severity.toLowerCase() : type ?? "neutral";

  return <span className={`issue-badge issue-${tone}`}>{resolvedLabel}</span>;
}
