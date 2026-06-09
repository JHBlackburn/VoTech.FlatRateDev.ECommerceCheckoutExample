import { readinessLabel, readinessTone } from "../utils";

type ReadinessBadgeProps = {
  score?: number;
  label?: string;
  tone?: "ready" | "watch" | "review" | "not-ready" | "matched" | "neutral";
};

export function ReadinessBadge({ score, label, tone }: ReadinessBadgeProps) {
  const resolvedTone = tone ?? (score === undefined ? "neutral" : readinessTone(score));
  const resolvedLabel =
    label ?? (score === undefined ? "Needs Review" : readinessLabel(score));

  return (
    <span className={`badge badge-${resolvedTone}`}>
      {resolvedLabel}
      {score !== undefined ? <span className="badge-score">{score}</span> : null}
    </span>
  );
}
