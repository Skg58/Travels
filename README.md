<p align="center">
  <img src="app/favicon.ico" width="50" alt="Travels Icon" />
</p>
<h1 align="center">Travels — Explore India</h1>

Travels is a comprehensive, modern travel booking web application designed to help users effortlessly explore, plan, and book trips across India. Built with the latest technologies like Next.js App Router and Tailwind CSS, it combines speed, scalability, and a beautiful responsive design to deliver a seamless user experience.

## 🚀Features

- 🗺️ Explore travel destinations across India
- 🧾 Book packages with details like date, pickup location, etc.
- 📦 Destination-based pricing
- 💸 Coupon code discounts(with dynamic coupon validation)
- 💳 Secure payment integration (Razorpay)
- 🔐 Sign in securely using NextAuth.js
- 📈 Dynamic, scalable backend with fast performance
- 📱 Mobile-responsive UI
- ⚙️ Modern Next.js App Router structure
- 🧩 Modern UI with shadcn/ui and Lordicon
- ⚡ Achieve high performance scores on Google Lighthouse (99+ scores in Performance, Accessibility, Best Practices, and SEO)

---

## 🛠️ Tech Stack

- **Frontend**: React (Next.js App Router)
- **Styling**: Tailwind CSS
- **Backend**: Serverless API Routes (Next.js)
- **Database**: MongoDB (with Mongoose)
- **Authentication**: NextAuth.js
- **Payments**: Razorpay


## 🧰 Built With

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?logo=razorpay&logoColor=00E5FF)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000?logo=auth0&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📸 Screenshots

| Home Page | Booking Page | 
|-----------|--------------|
| ![Home1](public/readme_ss/Home1.png) ![Home2](public/readme_ss/Home2.png) | ![Booki](public/readme_ss/Booki.png) ![payment1](public/readme_ss/payment1.png) |


| My-Booking Page  |  Packages Page
|-----------|--------------|
| ![my-bookin](public/readme_ss/my-booking.png)| ![package](public/readme_ss/package.png)   |

|Success Page   | Loading...
|-----------|--------------|
| ![HomeSuccess1](public/readme_ss/Success.png)|![loading](public/readme_ss/loading.png)   |

## 📄 License

This project is licensed under the [MIT License](LICENSE).  
© 2025 skg58

---
## 📦 Setup Instructions
### 1. Development Installation

If you want to contribute or modify the code, clone and run it locally.

### 2. Clone and Install Dependencies

```bash
git clone https://github.com/skg58/travels.git
cd travels
npm install
```



### 3. Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
MONGODB_URI=your_mongodb_connection_string

NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

NODE_ENV=development
NEXT_PUBLIC_URL=http://localhost:3000

# If using GitHub/Google for auth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_secret
GOOGLE_ID=your_google_id
GOOGLE_SECRET=your_google_secret
```

### 4. Run Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment (Vercel + MongoDB Atlas)

### ➤ 1-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/skg58/travels)

### ➤ Add Environment Variables on Vercel

Same as in `.env.local`, set these in **Project Settings → Environment Variables**.

---

## 📧 Contact

Made with ❤️ by [[skg58]](https://github.com/skg58/Travels)


