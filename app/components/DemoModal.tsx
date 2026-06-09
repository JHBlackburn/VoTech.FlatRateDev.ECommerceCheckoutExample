type DemoModalProps = {
  open: boolean;
  onClose: () => void;
};

export function DemoModal({ open, onClose }: DemoModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-request-created"
      >
        <div className="modal-header">
          <h2 id="order-request-created">Order Request Created</h2>
          <button type="button" onClick={onClose} aria-label="Close modal">
            Close
          </button>
        </div>
        <p>
          In a real implementation, this could route to one of several next steps:
        </p>
        <ol>
          <li>Email Total RESA sales/ops</li>
          <li>Generate a NetSuite-ready CSV</li>
          <li>Create a draft NetSuite sales order</li>
          <li>Route exceptions to manual review</li>
        </ol>
      </div>
    </div>
  );
}
