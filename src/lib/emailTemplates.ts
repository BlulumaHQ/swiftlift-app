/**
 * SwiftLift Email Templates — System Definition
 * 
 * These templates define the content structure for all automated emails.
 * They are NOT connected to an email sending service yet.
 * Placeholders use {{VARIABLE}} syntax for future integration.
 * 
 * Contact: support@swiftlift.app
 */

export const EMAIL_TEMPLATES = {
  // ─── 1. Auto-Response (after form submission) ───
  autoResponse: {
    subject: "[SwiftLift] Request Received — Project ID {{PROJECT_ID}}",
    body: `Hi {{First Name}},

Thanks for your request — we've received your details successfully.

Your Project ID: {{PROJECT_ID}}

We're currently creating 2 live website preview concepts for your business.

You can expect them within 48 hours.

No action is needed for now — we'll email you as soon as they're ready.

If you'd like to send additional materials (logo, photos, references), you can reply to this email anytime.

— SwiftLift
support@swiftlift.app`,
  },

  // ─── 2. Preview Delivery ───
  previewDelivery: {
    subject: "[SwiftLift Preview Ready] Project ID {{PROJECT_ID}}",
    body: `Hi {{First Name}},

We've prepared 2 live website preview concepts for your business:

Preview A:
{{PREVIEW_A_URL}}

Preview B:
{{PREVIEW_B_URL}}

Both versions are fully interactive — you can open them on desktop or mobile.

—

Next step:

Choose the version you prefer, and we'll finalize it for you.

To proceed, complete your order here:
{{PAYMENT_LINK}}

—

Once payment is confirmed, we'll move into the revision and launch phase.

Let us know which version you'd like to go with.

— SwiftLift`,
  },

  // ─── 3. Payment Confirmation ───
  paymentConfirmation: {
    subject: "[SwiftLift Payment Confirmed] Project ID {{PROJECT_ID}}",
    body: `Hi {{First Name}},

Your payment has been received — thank you.

We're now moving into the revision and launch phase.

—

What happens next:

1. You'll receive a revision form to submit your updates
2. We'll apply your changes and finalize the site
3. Once approved, we'll deploy your website

—

Hosting & domain:

If you already have a domain or hosting, we'll guide you through the connection process.

We also offer free hosting with SwiftLift (no hidden fees).

Optional: Managed hosting is available, which includes ongoing updates and support.

—

Next step:

Please complete the revision form here:
{{REVISION_FORM_LINK}}

—

If you have any questions, just reply to this email.

— SwiftLift
support@swiftlift.app`,
  },
} as const;

/**
 * SwiftLift Stripe Checkout Metadata Structure
 * 
 * Required metadata fields for all Stripe checkout sessions:
 * - project_id:        SWL-XXXXXX format identifier
 * - customer_email:    Client's email address
 * - company_name:      Client's business name
 * - selected_package:  "starter" | "growth"
 * - selected_preview:  "A" | "B"
 */
export interface StripeCheckoutMetadata {
  project_id: string;
  customer_email: string;
  company_name: string;
  selected_package: "starter" | "growth";
  selected_preview: "A" | "B";
}

/**
 * SwiftLift Workflow Steps
 * 
 * Step 1: User submits request
 * Step 2: User sees confirmation + Project ID
 * Step 3: Auto email is sent (autoResponse template)
 * Step 4: Internal team creates 2 previews
 * Step 5: Preview email sent (previewDelivery template)
 * Step 6: User selects version + pays
 * Step 7: Payment confirmed email sent (paymentConfirmation template)
 * Step 8: User submits revisions
 * Step 9: Final build + deployment
 */
export const WORKFLOW_STEPS = [
  "User submits request",
  "User sees confirmation + Project ID",
  "Auto-response email sent",
  "Internal team creates 2 previews",
  "Preview delivery email sent",
  "User selects version + pays",
  "Payment confirmation email sent",
  "User submits revisions",
  "Final build + deployment",
] as const;
