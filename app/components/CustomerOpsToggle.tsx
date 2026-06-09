import type { ViewMode } from "../types";

type CustomerOpsToggleProps = {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
};

export function CustomerOpsToggle({ value, onChange }: CustomerOpsToggleProps) {
  return (
    <div className="toggle-wrap" aria-label="Customer and operations view toggle">
      <button
        type="button"
        className={value === "customer" ? "toggle-button active" : "toggle-button"}
        onClick={() => onChange("customer")}
      >
        Customer View
      </button>
      <button
        type="button"
        className={value === "ops" ? "toggle-button active" : "toggle-button"}
        onClick={() => onChange("ops")}
      >
        Ops View
      </button>
    </div>
  );
}
