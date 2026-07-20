A10_CAT-012
🎬Video Explanation: fable-requirement-explanation.mp4


Fable – Ebook Sharing Platform
Project Overview and Discussion
Project Theme:
Fable is a digital platform that connects ebook lovers, readers, and collectors with talented writers. The platform allows users to browse, discover, and read original ebooks. Writers can upload and manage their creations after a one-time verification payment, while an admin oversees the entire system.
Why should we develop the project?
Traditional ebook reading is often limited to bookstores or libraries. An online ebook sharing platform democratizes access to literature, enables emerging writers to reach global audiences, and provides a secure, streamlined reading experience. The project demonstrates advanced MERN stack concepts including role-based access, payment integration, and interactive features and analytics.
How does the system work?
Users (Readers) browse ebooks, view details, purchase via Stripe, and track reading history.
Writers upload/manage their ebooks. They can publish/unpublish, edit, delete, and see sales history.
Admin manages users (role changes), all ebooks (publish/unpublish/delete), and all transactions.
Authentication uses JWT with email/password and Google login.
Dashboards are role-specific with CRUD operations, payment flows, and analytics.
Ensure the following things to get 100% mark (No mark will contain)
Include at least 20 meaningful commits on the client side & 12 meaningful commits on the server side with descriptive messages.
Include a README file with the project name, purpose, live URL, key features, and any npm packages you have used.
Secure Frontend configuration keys using environment variables.
Secure your MongoDB credentials using the environment variable.
Create a design that encourages recruiters. Color contrast should please the eye & ensure that the website has proper alignment, space, and the website does not express gobindo design.
If we found your project similar to any project of your module / conceptual / assignment. You will get 0 and may miss the chance of any upcoming reward.
Deployment Guideline
If your Deployment is not okay you will get 0 and may miss the chance of our upcoming rewards.
Ensure that your server is working perfectly on production and not throwing any CORS / 404 / 504 Errors.
Ensure that your Live Link is working perfectly and that it is not showing errors on Landing in your system.
⚠️ ensure that the page doesn't throw any error on reloading from any routes.
⚠️ Logged in User must not redirect to Login on reloading any private route
Layout & Page Structure
Navbar Requirements
Logo / site name (links to Home)
Navigation links: Home, Browse Ebooks, Dashboard, Login/Logout
Responsive mobile menu (hamburger icon)
Active route highlighting
Banner Section
Beautiful hero banner featuring digital ebook sharing art (Slider or Carousel preferred)
Footer Requirements
Copyright information
Quick links (About, Contact, Privacy Policy)
Social media icons (dummy links)
Newsletter signup placeholder (frontend only)
Authentication System
Registration Requirements
Users can register with email + password or Google Login (BetterAuth).
Required fields: Full Name, Email, Password, Confirm Password.
After registration, the option to choose a role between User (Reader) and Writer.
Email must be unique.
Successful registration returns a JWT token and redirects to Home.
Login Requirements
Login via email/password or Google.
For email/password: validate credentials, generate JWT (expires in 7 days).
Google Login: integrate BetterAuth to handle OAuth flow, then issue JWT.
Role-based redirection after login (users to Home, writers/admin to respective dashboards optional).
Logout clears token and client-side state.
Main Pages
Home Page
Hero Section – Large banner with tagline "Discover & Read Original Ebooks" and CTA button "Browse Ebooks".
Dynamic Section – "Featured Ebooks" (fetch latest 6 ebooks from DB, random or by admin selection).
Animation with Framer Motion – Hero text fade-in, ebook cards staggered reveal on scroll, hover scaling effects.
Extra Section 1 – "Top Writers" (display 3 writers with most sales, using avatar and name).
Extra Section 2 – "Ebook Genres" (grid of genres: Fiction, Mystery, Romance, Sci-Fi, Fantasy, Horror, etc., each linking to browse page with filter).
Browse Ebooks Page
Allow users (readers, writers, admin, guests) to explore, search, filter, and sort all available ebooks.
Public Access – No login required to view the page. However, purchase action require authentication.
Display Ebooks in Grid Layout
Each ebook card shows: cover image thumbnail, title, writer name, price, and a "Sold" badge if already purchased.
Responsive grid: 2 columns on mobile, 3 on tablet, 4 on desktop.
Loading & Error States
Skeleton cards while fetching.
Friendly message when no ebooks match filters.
Click on Ebook Card – Navigates to Ebook Details page.
Ebook Details Page
Show complete information about a single ebook and allow authenticated actions (purchase).
Public Read‑Only Preview – Anyone can view ebook details. Purchase require login + role/permissions.
Ebook Information Display
High‑resolution cover image (from imgBB)
Title
Writer name (clickable link to writer's profile or their ebook list)
Description (preview of content)
Price
Genre
Status (Available / Sold)
Date uploaded
Purchase Button
Disabled if: the buyer is the writer themselves.
On click: Redirect to Stripe Checkout. After successful payment, purchase history updated, and button replaced with "Already Purchased".
Full content becomes available after purchase.
Allow users to bookmark ebooks they are interested in reading or purchasing later.
Loading & Error States
Skeleton loader while fetching.
"Ebook not found" message for invalid ID.
Dashboard Layout
Dashboard for User (Role: user)
Route: /dashboard/user
Purchase History – Table with ebook name, writer, price, purchase date, status.
Purchased Ebooks – Gallery view of purchased ebooks (cover image, title, link to details).
Profile Management – view profile.
Bookmark Page - Gallery view of bookmarked ebooks
Dashboard for Writer (Role: writer)
Route: /dashboard/writer
Manage Ebooks – Table/list of own ebooks with columns: title, price, status (published/unpublished), actions (edit, delete, publish/unpublish).
Add Ebook – Form: title, description (full content), price, genre, cover image upload (imgBB).
Edit Ebook – Same form pre-filled.
Bookmark Page - Gallery view of bookmarked ebooks
Sales History – Table: ebook title, buyer name, purchase date, amount.
Dashboard for Admin (Role: admin)
Route: /dashboard/admin
Manage Users – Table: name, email, role, actions (change role to user/writer/admin, delete user).
Manage All Ebooks – Table with title, writer name, price, status, actions (publish/unpublish, delete).
View All Transactions – Table: transaction ID, type (publishing fee / purchase), user/writer email, amount, date.
Dashboard Home Page - 
Analytics Overview – Cards: total users, total writers, total ebooks sold, total revenue.
Charts – Monthly sales chart, ebooks by genre pie chart.
Other Requirements (You must do them to get 100% marks)
Image Upload: Use imgBB API for storing ebook cover images and profile pictures.
Payment System (Stripe): Ebook purchase: User clicks "Buy Now", Stripe Checkout session created with ebook price; after success, ebook marked as sold, purchase record stored.
Loading Page
Global loading spinner (centered, with brand color).
Skeleton loaders for ebook cards and table rows.
Used on dashboard data fetching, payment redirection, and ebook details.
Error Page
Custom 404 page with illustration, message "Page Not Found", and button to go home.
Error boundary fallback UI for runtime errors (display "Something went wrong. Reload.").
API error toasts (e.g., "Failed to load ebooks").
Dashboard UI Requirements
Responsive design for mobile and tablet screens
Consistent color theme
Full-width dashboard
Charts and graphs for quick data visualization
User profile section
Challenge Requirement Guideline
Search & Filtering (on Browse Ebooks page): Search by title/writer name. Filter by genre, price range (min-max), availability (in stock / sold). Sorting by newest, price low-high, price high-low.
Pagination (on Browse Ebooks page): Display ebooks in paginated format (e.g., 6–12 items per page). Navigation controls (next, previous, page numbers) for easy browsing. Can be implemented on frontend (client-side) or backend (server-side) based on developer preference.
What to Submit
Admin Email: admin@fable.com
Admin Password: Admin@123
Live Site Link: [Your deployed Vercel URL]
GitHub Repository {server}: [Backend Express.js repo link]
GitHub Repository {client}: [Next.js frontend repo link]
Optional Requirement Guideline
Wishlist System: Users can add/remove ebooks to a wishlist. The wishlist page shows saved items with the "Purchase" button. Stored in DB (User model has wishlist array of ebook IDs).
Email Notification (dummy): After successful purchase or publishing fee payment, the user receives a simulated email (console log / nodemailer with ethereum).
Dark Mode Toggle: Global dark mode switch (using next-themes) that persists in localStorage.


