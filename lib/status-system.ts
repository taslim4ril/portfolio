// The transaction status system behind the i-Bank redesign.
//
// The case study argues that status is not a detail, it is the product. This
// is the evidence for that: every state a transfer can be in, what moves it
// between them, and the gap between what the system knows and what a customer
// is allowed to be told.

export type StatusTone = "neutral" | "progress" | "good" | "warn" | "bad";

export type StatusState = {
  id: string;
  name: string;
  /** Word for word, what the customer sees. */
  copy: string;
  /** The sentence under it, where there is one. */
  detail?: string;
  /** What puts a transfer into this state. */
  trigger: string;
  tone: StatusTone;
  /** Nothing moves out of a terminal state on its own. */
  terminal?: boolean;
  /** Longer note, for the states that carry the argument. */
  note?: string;
};

export const states: StatusState[] = [
  {
    id: "initiated",
    name: "Initiated",
    copy: "Transfer started",
    detail: "We have your instruction. Nothing has left your account yet.",
    trigger: "Customer submits the transfer form.",
    tone: "progress",
    note: "The second sentence exists because the first one is ambiguous about money. A customer who abandons here needs to know they have not been charged.",
  },
  {
    id: "awaiting-auth",
    name: "Awaiting authentication",
    copy: "Waiting for your approval",
    detail: "Check your registered device. This step protects the transfer.",
    trigger: "Transfer amount or beneficiary triggers the authentication policy.",
    tone: "progress",
    note: "The old portal said Processing here, which is false. Nothing is processing. The bank is waiting on the customer, and saying so is the difference between patience and a support call.",
  },
  {
    id: "auth-expired",
    name: "Authentication expired",
    copy: "Approval window closed",
    detail: "Nothing was sent. Start the transfer again when you are ready.",
    trigger: "Authentication not completed inside the policy window.",
    tone: "warn",
    note: "Failure copy has one job: say whether money moved. Everything else is secondary.",
  },
  {
    id: "submitted",
    name: "Submitted to beneficiary bank",
    copy: "Sent to the receiving bank",
    detail: "Out of our hands now. Most arrive within minutes.",
    trigger: "Authentication cleared and the instruction left the bank.",
    tone: "progress",
    note: "Naming the handover matters. From here the delay is somebody else's, and a customer who understands that stops re-running the transfer.",
  },
  {
    id: "pending-beneficiary",
    name: "Pending at beneficiary bank",
    copy: "Waiting at the receiving bank",
    detail: "We will update this as soon as they confirm.",
    trigger: "Receiving institution has acknowledged but not settled.",
    tone: "progress",
  },
  {
    id: "settled",
    name: "Settled",
    copy: "Transfer complete",
    detail: "Funds have reached the beneficiary.",
    trigger: "Settlement confirmation received.",
    tone: "good",
    note: "Deliberately not a visually final state. A reversal can arrive hours later, and a screen that has already thrown confetti has no room left to walk it back.",
  },
  {
    id: "failed-funds",
    name: "Failed, insufficient funds",
    copy: "Not enough available balance",
    detail: "Nothing was sent. Your available balance may be lower than your book balance.",
    trigger: "Debit declined at posting.",
    tone: "bad",
    terminal: true,
    note: "Available against book balance is the single most common confusion in the whole product, so the state carries the explanation rather than leaving it to a help article.",
  },
  {
    id: "failed-bank",
    name: "Failed, beneficiary bank unavailable",
    copy: "The receiving bank could not be reached",
    detail: "Nothing left your account. You can try again now or later.",
    trigger: "Receiving institution rejected or timed out at the rail.",
    tone: "bad",
    terminal: true,
  },
  {
    id: "failed-limit",
    name: "Failed, limit exceeded",
    copy: "Above your transfer limit",
    detail: "Nothing was sent. Your daily limit resets at midnight, or you can raise it in settings.",
    trigger: "Amount breaches a daily, per-transaction, or channel limit.",
    tone: "bad",
    terminal: true,
    note: "The only failure state with a route out of it, so the route is in the message rather than a click away.",
  },
  {
    id: "reversed",
    name: "Reversed",
    copy: "Transfer returned",
    detail: "The funds are back in your account. The receiving bank returned them.",
    trigger: "Beneficiary bank returns a settled transfer.",
    tone: "warn",
    terminal: true,
    note: "This state is the reason Settled cannot be terminal. It arrives after a customer has been told the transfer completed, sometimes hours after, and the interface has to be able to contradict itself gracefully.",
  },
  {
    id: "timed-out",
    name: "Timed out, outcome unknown",
    copy: "We are still confirming this one",
    detail:
      "Do not send it again yet. Your balance will show the outcome, and we will update this within 24 hours.",
    trigger: "No response from the rail inside the confirmation window.",
    tone: "warn",
    note: "The state most interfaces never draw, and the one that generates every duplicate transfer in the product. The system genuinely does not know the outcome, so the copy cannot claim one. What it can do is tell the customer the single most useful thing: do not do it again, and here is where the truth will appear. The instruction not to retry is doing more work than any other sentence in this table.",
  },
  {
    id: "flagged",
    name: "Flagged for review",
    copy: "This transfer needs a quick check",
    detail: "We will contact you if we need anything. No action needed right now.",
    trigger: "Transaction monitoring rules matched.",
    tone: "warn",
    note: "Compliance limits what can be said here almost to the word. The customer cannot be told what matched or why, so the design's whole contribution is tone: calm, specific about what happens next, and free of anything that reads as an accusation.",
  },
];

export type Transition = { from: string; to: string; on: string };

export const transitions: Transition[] = [
  { from: "initiated", to: "awaiting-auth", on: "Policy requires approval" },
  { from: "initiated", to: "failed-funds", on: "Debit declined" },
  { from: "initiated", to: "failed-limit", on: "Limit breached" },
  { from: "initiated", to: "flagged", on: "Monitoring rule matched" },
  { from: "awaiting-auth", to: "submitted", on: "Approved in time" },
  { from: "awaiting-auth", to: "auth-expired", on: "Window elapsed" },
  { from: "auth-expired", to: "initiated", on: "Customer restarts" },
  { from: "submitted", to: "pending-beneficiary", on: "Receiving bank acknowledges" },
  { from: "submitted", to: "failed-bank", on: "Rail rejects or times out" },
  { from: "submitted", to: "timed-out", on: "No response in window" },
  { from: "pending-beneficiary", to: "settled", on: "Settlement confirmed" },
  { from: "pending-beneficiary", to: "timed-out", on: "No response in window" },
  { from: "timed-out", to: "settled", on: "Late confirmation arrives" },
  { from: "timed-out", to: "failed-bank", on: "Late rejection arrives" },
  { from: "settled", to: "reversed", on: "Beneficiary bank returns funds" },
  { from: "flagged", to: "submitted", on: "Review cleared" },
  { from: "flagged", to: "failed-bank", on: "Review blocked" },
];

/** Where the system's truth and the customer's view come apart, and why. */
export const disclosure: {
  system: string;
  surfaced: string;
  why: string;
}[] = [
  {
    system: "Flagged by transaction monitoring, rule ID and score attached",
    surfaced: "This transfer needs a quick check",
    why: "Naming the rule teaches somebody how to stay under it. The constraint is absolute and it is the correct one.",
  },
  {
    system: "Insufficient available balance, book balance sufficient, lien held",
    surfaced: "Not enough available balance, with the book balance difference explained",
    why: "The mechanism can be described because it is the customer's own money and their own lien. Withholding it here creates a support call for no security gain.",
  },
  {
    system: "Beneficiary bank returned a specific rejection code",
    surfaced: "The receiving bank could not be reached",
    why: "The codes are not ours to interpret publicly, and a customer cannot act on them. The one actionable fact, that nothing left the account, leads instead.",
  },
  {
    system: "No response from the rail; outcome genuinely unresolved",
    surfaced: "We are still confirming this one, do not send it again yet",
    why: "The rare case where the system knows nothing more than the customer. The honest version is also the useful one, because the duplicate transfer is the real risk.",
  },
  {
    system: "Authentication step failed three times, device fingerprint mismatch",
    surfaced: "Approval window closed, nothing was sent",
    why: "Confirming a fingerprint mismatch tells an attacker their guess was close. The customer only needs to know their money is untouched.",
  },
];

export const emptyStates: { screen: string; copy: string; why: string }[] = [
  {
    screen: "Frequent transactions, no tab selected",
    copy: "You are yet to select a tab",
    why: "Was an accident of the original build, then became a decision: the panel is deliberately blank until you choose, rather than defaulting to a tab and implying that is your most used one.",
  },
  {
    screen: "Transaction history, no results in range",
    copy: "Nothing in this date range",
    why: "Says the filter is empty, not that the account is. The distinction matters when someone is looking for a payment they are worried about.",
  },
  {
    screen: "Beneficiary list, none saved",
    copy: "No saved beneficiaries yet",
    why: "Yet does real work. It marks the state as early rather than broken.",
  },
];
