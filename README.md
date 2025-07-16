# AliʻiLuau - Authentic Hawaiian Luau Experience

A modern, responsive website for AliʻiLuau, an authentic Hawaiian luau experience in Oahu, Hawaii. This website integrates with Trybooking for seamless ticket booking and event management.

*Last updated: July 15, 2025*

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: Trybooking API
- **Email Service**: Nodemailer
- **Deployment**: Vercel (recommended)

## Features

- Responsive design with Hawaiian-inspired color palette
- Seamless Trybooking integration for ticket booking
- Real-time event availability display
- Interactive booking calendar
- Testimonial slider
- Newsletter signup with email confirmation
- Contact form with automated email notifications
- Email service integration for customer communications
- Comprehensive information about the luau experience

## Pages

- **Home**: Overview, upcoming events, testimonials, newsletter signup
- **About**: Company history, mission, team, cultural commitment
- **Experience**: Details about the luau experience, food, performances
- **Booking**: Interactive calendar with Trybooking widget integration, FAQs
- **Contact**: Contact form, location information, FAQs

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd alii-luau
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Trybooking API credentials
   TRYBOOKING_API_KEY=your_api_key
   TRYBOOKING_SECRET_KEY=your_secret_key
   TRYBOOKING_REGION=au
   TRYBOOKING_DEMO_EVENT_ID=your_demo_event_id
   TRYBOOKING_DEMO_ACCOUNT_ID=your_demo_account_id
   
   # Next.js environment variables
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   
   # Email service configuration
   EMAIL_SERVICE=smtp  # or sendgrid, mailchimp, etc.
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email_user
   EMAIL_PASSWORD=your_email_password
   EMAIL_FROM=info@aliiliau.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Trybooking Integration

This project uses Trybooking's API for event management and ticket booking. The integration includes:

- Server-side API calls using Next.js API routes to keep credentials secure
- Embedded Trybooking widget for seamless booking experience
- Real-time availability status display
- Fallback demo data for development and error handling

## Deployment

The easiest way to deploy this application is using [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.
