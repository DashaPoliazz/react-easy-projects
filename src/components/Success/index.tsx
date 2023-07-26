import React from "react";

interface Props {
  count: number;
  onBack: () => void;
}

export const Success: React.FC<Props> = ({ count, onBack }) => {
  return (
    <div className="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Success!</h3>
      <p>All {count} users have received invitations.</p>
      <button onClick={onBack} className="send-invite-btn">
        Back
      </button>
    </div>
  );
};
