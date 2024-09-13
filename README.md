# AI Content Generator

AI Content Generator is a tool that utilizes the power of Google Gemini Generative AI to help users generate creative content based on predefined templates. The project includes user authentication, content generation, and subscription management features, all seamlessly integrated using Clerk User Management and a subscription billing model. This project is built for scalability and ease of use, allowing users to log in via Google, GitHub, or email and access powerful content generation features.

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Authentication & User Management](#authentication--user-management)
5. [Dashboard Overview](#dashboard-overview)
   - [Templates](#templates)
   - [History](#history)
   - [Billing](#billing)
   - [Settings](#settings)
6. [Content Generation Process](#content-generation-process)
7. [Subscription Plans](#subscription-plans)

---

## Features

- **User Authentication**: Secure authentication using Google, GitHub, or email-based login via Clerk's User Management platform.
- **Template-Based AI Content Generation**: Choose from predefined templates to generate custom content using Google Gemini Generative AI.
- **Editable Results**: Modify AI-generated content directly in the result editor.
- **Content History**: View and copy previously generated AI content.
- **Subscription Plans**: Free and paid monthly subscription plans, with usage limits.
- **User Settings**: Manage user profiles, add multiple email addresses, and connect multiple accounts (Google and GitHub).

---

## Technologies

- **Frontend**: Next.js, TailwindCSS, Shadcn, Lucide React Icons, Toast UI React Editor
- **Backend**: Google Gemini Generative AI, Drizzle ORM, Clerk User Management Platform
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Clerk (Google, GitHub, and email-based login)
- **Payment Processing**: Stripe (for monthly subscriptions)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dipankar-techcraft-1991/ai-content-generator.git
   cd ai-content-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Add your Clerk, Stripe, and Google Gemini Generative AI credentials in `.env.local` file.

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

6. Open your browser and navigate to `https://ai-content-generator-weld.vercel.app`.

---

## Authentication & User Management

This project uses [Clerk](https://clerk.dev/) for user authentication and profile management, providing seamless login/signup functionality through Google, GitHub, and email-based authentication.

- **Login/Signup Options**: Users can sign in with Google, GitHub, or email.

---

## Dashboard Overview

### 1. Templates (/dashboard)

The dashboard features a list of predefined templates that users can choose from to generate AI content. After selecting a template, users are redirected to a content creation page where they can fill out a form based on the selected template and generate content.

- **Form Section**: Customize content generation by filling in specific details based on the selected template.
- **Result Editor**: View and edit the generated AI content in real time.
- **Copy Functionality**: Easily copy the AI-generated content for use elsewhere.

### 2. History (/dashboard/history)

The history page provides a searchable list of previously generated AI content. Each entry includes the generated result and options to copy the content directly.

- **Searchable AI History**: Allows users to find and revisit previous AI-generated content.
- **Copy Feature**: Users can copy previously generated AI responses for future use.

### 3. Billing (/dashboard/billing)

This page offers two subscription plans:

- **Free Plan**: Users can generate up to 20,000 words per month.
- **Monthly Subscription Plan**: For $9.99 per month, users can generate up to 100,000 words.
- Users can switch between plans at any time, and Stripe is used for secure payment processing.

### 4. Settings (/dashboard/settings)

The settings page allows users to manage their profile, update their photo, and connect or disconnect additional accounts (Google or GitHub). The platform uses Clerk for user profile management.

- **Profile Management**: Users can update their personal details and profile picture.
- **Multiple Account Connections**: Connect multiple authentication providers like Google and GitHub to a single account.

---

## Content Generation Process

1. **Template Selection**: Users select a predefined template from the dashboard.
2. **Form Submission**: Users provide relevant information in the form, which is used to generate content.
3. **AI Content Generation**: The system sends the data to the Google Gemini Generative AI API to generate content.
4. **Result Display**: The generated content is displayed in the Result Editor, where it can be edited and copied.

---

## Subscription Plans

- **Free Plan**: Provides users with 20,000 words per month.
- **Monthly Subscription Plan**: For $9.99/month, users can generate up to 100,000 words.
- **Billing**: Managed through Stripe, ensuring secure and easy payments.

---

## Conclusion

AI Content Generator is a highly scalable and easy-to-use platform for generating AI-driven content. Whether you're on a free or paid subscription plan, you can generate and edit high-quality content based on your needs, all with a seamless and secure authentication process.
