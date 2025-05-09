# 🏋️‍♂️ ProgressPulse

A full-stack web application designed to help physical therapy patients and therapists track rehabilitation progress, log exercises and update notes.

---

## 🚀 Features

- **User Roles:** Patient & Therapist (or Trainer)
- **Authentication:** Secure login/signup using Passport.js
- **Dashboards/pages:**
  - **Patients:** View exercise plans, log comments give physical therapist feedback on your progress.
  - **Therapists:** Assign exercises, monitor patient logs/comments, adjust treatment plans if needed.
- **CRUD Functionality:**
  - **Exercises:** Add/edit exercises with notes on what to focus on if needed.
  - **Goals:** Define and update rehabilitation plans and notes.

---

## 🛠 Tech Stack

| Layer      | Technology                           |
|------------|---------------------------------------|
| **Frontend** | EJS Templates, CSS                  |
| **Backend**  | Node.js, Express.js                 |
| **Database** | MongoDB                             |
| **Auth**     | Passport.js                         |

---

## 📦 Installation & Setup

1. **Clone the Repository**
   
   git clone https://github.com/maxcharles2/demo-day-pt-rehab-tracker.git (or fork and use your link up to you)
   cd demo-day-pt-rehab-tracker
   open up project in your IDE (VS Code or otherwise)

3. **Node modules**
   
   use npm install to make sure the necessary packages are there

4. **Start the server**
   
   node server or node server.js

5. **Sign up**
   
   Create an account

6. **Sign in**
   
   Use your login information to enter your page

7. **Role (patient)**
   
   If you are a patient, write in the input area to create a note for your physical therapist to see and if you need to update your note, make your edit in the input field and press the       button to update the message

8. **Role (physical therapist)**
   
   If you are a physical therapist, enter out the field exercises to keep an inventory of the exercises that you want to use. Next fill out the other field for the plan so your plan can appear on the screen for your patient. Patients will be able to add notes for your feedback so if that's needed fill out the fields and press the button to update the field as needed.

