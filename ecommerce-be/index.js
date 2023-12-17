import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import nodemailer from "nodemailer";
import cors from 'cors';
import path from 'path';
import {fileURLToPath } from 'url';

//configure env
dotenv.config();

//database config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../ecommerce-fe/build')));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use('*', function (req, res) {
   res.sendFile(path.join(__dirname,'../ecommerce-fe/build/index.html'));
})





// Creating a transporter 
const transporter = nodemailer.createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
       user: 'elton.wunsch47@ethereal.email',
       pass: 'q48fAkauWycw7sSJh4'
   }
});


// Handle form submission and send email
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient-email@example.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});



//port
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
   console.log(`Server running on  mode on port ${PORT}`);
});
