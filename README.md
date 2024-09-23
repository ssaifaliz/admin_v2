This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Admin 

- Introduction
- Folder Structure
- Components
    -  Modals
    -  Options
    -  Schedule Table
    -  User Table
- Global State Management
- API Integration
    -  Login & Logout Routes
- Middleware
- Latest commits history and features
  
## Introduction

This documentation provides an in-depth overview of the admin frontend project, detailing the setup, structure, and functionality of various components and modules. This project is built using Next.js, leveraging React for building user interfaces and Tailwind CSS for styling.

## Folder Structure
The project is organized into the following main directories:

`app`: Contains Next.js pages and API routes.

-	(authorized): Protected pages that require user authentication.
-	(dashboard): Contains the dashboard-related pages and layout.
-	api: API routes for login and logout functionality.
-	
`components`: Reusable UI components.

-	modals: Contains modal components for various actions like inviting users, publishing shifts, editing, and deleting users.
-	options.tsx: Includes UI controls for the dashboard, such as the calendar view toggle, search bar, and buttons for inviting users or publishing shifts.
-	scheduleTable: Displays the schedule in a tabular format.
-	userTable: Displays user information in a table with options to edit or delete users.
-	tabs: Contains various tabs like departments, positions, roles, shifts, swap requests, and users.

`lib`: Utility functions for handling tasks like encryption, decryption, and session management.

`public`: Static assets such as images and icons.

`styles`: Global and component-specific CSS styles.

`utils`: Context providers and global state management.

## Components

### Modals

#### DeleteUserModal

The `DeleteUserModal` component confirms and handles the deletion of a user. It accepts the following props:


`deleteUserModal`: Boolean flag to control the modal's visibility.


`closeDeleteUserModal`: Function to close the modal and handle the deletion logic.

This modal displays a confirmation message and options to either delete the user or cancel the action. Upon confirmation, it triggers the deletion logic and updates the user list accordingly.

#### EditUserModal

The `EditUserModal` component provides a form for editing user details, such as email, department, and position. It accepts the following props:


`editUserModal`: Boolean flag to control the modal's visibility.

`closeEditUserModal`: Function to close the modal.

The form uses Formik for form state management and Yup for validation. It includes fields for the user’s email, department, and position, and validates these inputs before submission.

#### InviteUserModal

The `InviteUserModal` component allows for inviting new users by providing a form to enter their details. It accepts the following props:

`inviteUserModal`: Boolean flag to control the modal's visibility.

`closeInviteUserModal`: Function to close the modal.

The form includes fields for the user’s name, email, department, and role. State management is handled using Formik, and input validation is implemented with Yup. This modal facilitates adding new users to the system.

#### PublishShiftModal

The `PublishShiftModal` component provides a form for publishing a new shift. It accepts the following props:
`publishShiftModal`: Boolean flag to control the modal's visibility.

`closePublishShiftModal`: Function to close the modal.

The form includes fields for selecting the shift type, date, location, department, and position. Formik is used for managing form state, and Yup handles validation.

### Options

The `Options` component includes several UI controls for the dashboard:

*Calendar View Toggle*: Allows users to switch between viewing the schedule and the user list.

*Date Picker*: Displays the current month and allows users to select different weeks.

*Buttons for Actions*: Includes buttons to invite users or publish shifts, depending on the current view.

*Search Bar*: Provides a search input for filtering users or shifts.

*Multi-Select Dropdown*: Allows for selecting multiple options from a dropdown list.

### Schedule Table

The `ScheduleTable` component displays the schedule in a table format. It includes rows for each shift and columns for various details like shift type, location, and assigned personnel. This component allows users to visualize and manage the shift schedule effectively.

### User Table

The UserTable component lists users along with their details, such as department, position, and status. It provides options to edit or delete users through corresponding modals. The table includes functionality for sorting and filtering users based on different criteria.

## Global State Management

Global state management is handled using React's Context API. The `StateProvider` component wraps the application and provides global state, which includes:

`isCalenderView`: Boolean flag to toggle between calendar view and user list view.

`publishShiftModal`: Boolean flag to control the visibility of the Publish Shift modal.

`inviteUserModal`: Boolean flag to control the visibility of the Invite User modal.

`setCalenderVIew`: Function to update the calendar view state.

`setPublishShiftModal`: Function to update the publish shift modal state.

`setInviteUserModal`: Function to update the invite user modal state.

## API Integration

### Login & Logout Routes

The login/logout routes handle user login/logout requests. It receives the user's email and password, validates the credentials, and creates a session. If the login is successful, it returns a success message and sets a session cookie. It also clears the session cookie and returns a success message. If the login fails, it returns a failure message with a status of 401.

## Latest commits history and features 

The recent commits (by July the 2nd) include restructuring the project, integrating modals into the dashboard, and refining the user experience. Here’s a summary:

### Finalized admin panel:

- implemented essential API routes for login and logout.
- added user authentication with session management.
- created modals for assigning shifts, inviting users, editing users, and deleting users.
- updated global CSS styles and package dependencies.

### Structure adjusted for additional CRUDs page:

- restructured the directory layout for better organization.
- added a new CRUDs page under the authorized section.
- created a new layout component for the dashboard.
- updated existing components to align with the new structure.

### Start integrating modals with dashboard:

- integrated various modals within the dashboard component.
- added state management for showing and hiding modals.
- enhanced the user table to include edit and delete actions.
- improved the overall layout and styling of the dashboard.

### Done with calling most of the modals in right place:

- finalized the integration of all modals in the appropriate places within the dashboard.
- enhanced the global state context to include modal visibility states.
- refined user experience by ensuring seamless transitions and interactions with modals.
- made minor adjustments and bug fixes to improve stability and performance.

### Edit Swap Request Modal:

- introduced a modal for editing swap requests, with validation & state management
- implemented tabs for managing departments, positions, roles, shifts, swap requests, and users.
- updated package-lock.json with new dependencies, including react-select.
- modified UserTable for better integration of edit and delete modals.


