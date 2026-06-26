# A.R.Agarwal International School Website

Complete school website with:
- Homepage with all sections
- About Us page
- Admission Form page (with email notifications via EmailJS)
- Parent Login page (demo login)
- Admin Dashboard page (to view all admission applications)

## How to Use

### Viewing the Website
Just open `index.html` in your favorite browser!

### Pages
- **index.html**: Homepage
- **about.html**: About the school
- **admission.html**: Online admission form
- **login.html**: Parent login (demo credentials: `parent` / `demo123`)
- **admin.html**: Admin dashboard to view all admission applications

## Setting Up Email Notifications (Optional)
To have the admission form send email notifications to your inbox:

1. **Create a free account at EmailJS**: https://www.emailjs.com/
2. **Add a new email service** (Gmail, Outlook, etc.)
3. **Create a new template** with variables like:
   - {{studentName}}
   - {{fatherName}}
   - {{email}}
   - {{phone}}
   - etc.
4. **Get your credentials**:
   - Public Key (Account → API Keys)
   - Service ID
   - Template ID
5. **Open admission.html** and replace these lines with your actual credentials:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```

## Storage
- Admission applications are saved in your browser's localStorage
- You can view them in the Admin Dashboard (admin.html)

## Features
- Responsive design (works on mobile and desktop)
- Smooth animations
- Form validation
- Local storage for applications
- Parent login with demo credentials
