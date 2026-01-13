# Gemini Instructions – Next.js Coming Soon App

## Project Goal

Create a **new Next.js application** using the **latest stable versions** of:

* Next.js (App Router)
* Tailwind CSS

The application must contain **only a single page**:

* `/` → Coming Soon page

The UI must **exactly match the provided reference** and the **screenshot included in the repository**.

Reference URL:

* [https://gather-v1-1-1077057199876.us-west1.run.app/](https://gather-v1-1-1077057199876.us-west1.run.app/)

A **custom logo** will be added to the project repository and must be used instead of the reference logo.

---

## UI Requirements (Strict)

* Pixel-accurate layout matching the reference
* Same spacing, alignment, typography, colors and visual hierarchy
* Responsive behavior identical to the reference
* Use Tailwind utility classes only (no external UI libraries)
* Dark/light appearance should follow the reference exactly

---


No additional pages, routes, or layouts should be created.

---

## Functionality Requirements

### 1. Email Notifications (SendGrid)

The Coming Soon page must allow users to submit their email address.

**Manual Setup Guide (Do NOT automate):**

* Use **SendGrid** for sending emails
* Create a SendGrid account manually
* Generate an API key from the SendGrid dashboard
* Store the API key in environment variables
* Implement email sending using a Next.js API route or Server Action

Expected behavior:

* Validate email input
* Send confirmation or notification email via SendGrid
* Handle errors gracefully

---

### 2. Google reCAPTCHA

Protect the email submission form using **Google reCAPTCHA**.

**Manual Setup Guide (Do NOT automate):**

* Register the site in Google reCAPTCHA Admin Console
* Choose the appropriate reCAPTCHA version (v2 or v3 based on implementation decision)
* Obtain **Site Key** and **Secret Key**
* Store keys in environment variables
* Validate reCAPTCHA token on the server before processing email submission

Expected behavior:

* Block form submission if reCAPTCHA validation fails
* Show user-friendly error messages

---

## Technical Constraints

* Use **Next.js App Router** (`app/` directory)
* Use **Server Actions or Route Handlers** for backend logic
* No client-side secrets
* Environment variables must be documented but not hardcoded
* Follow latest Next.js and Tailwind best practices

---

## Assets

* Logo will be provided in the repository
* Replace the reference logo with the provided logo
* Do not modify logo proportions or styling unless required by the reference UI

---

## Non-Goals

* No authentication
* No dashboard
* No database integration
* No CMS
* No extra pages or features

---

## Final Checklist

* [ ] UI matches reference exactly
* [ ] Logo replaced successfully
* [ ] SendGrid email flow works
* [ ] reCAPTCHA validation works
* [ ] Uses latest Next.js & Tailwind
* [ ] Clean, minimal codebase

---

**Important:**
The priority is **UI accuracy first**, followed by functionality. Any deviation from the reference UI is not acceptable.
