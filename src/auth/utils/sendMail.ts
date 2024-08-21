import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendMail {
  private transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendConfirmationEmail(to: string, token: string): Promise<void> {
    const subject = 'Email confirmation';
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            div{
                padding: 15px;
                text-align: center;
                background-color: #000000;
            }
            .header{
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 600;
                font-size: 28px;
                line-height: 43px;
                color: #9e9e9e;
            } 
            .text{
                font-family: 'Montserrat';
                font-style: normal;
                width: 400;
                text-align: center;
                font-weight: 400;
                font-size: 18px;
                line-height: 150%;
                width: 446px;
                color: #9e9e9e;
            }
            .confirm-link{
                font-family: 'Montserrat';
                text-decoration: none;
                font-weight: 400;
                font-size: 18px;
                line-height:  150%;
            }
            .text-div{
            display: flex;
            margin-left: 360px;
            
            }
        </style>
    </head>
    <body>
        
        <div>
            <h1 class="header">Job Match</h1>
            <div class="text-div" style="justify-content: center">
            <p class="text">
                Thank you for registering on our website,
                    <a style="color:#fba92c;"class ="confirm-link" href="http://localhost:${process.env.PORT}/email-confirmation/${token}">
                    click here
                    </a>
                    to confirm your email
            </p>
        </div>
        </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: '',
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const subject = 'Reset password';
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            div{
                padding: 15px;
                text-align: center;
                background-color: #000000;
            }
            .header{
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 600;
                font-size: 28px;
                line-height: 43px;
                color: #9e9e9e;
            } 
            .text{
                font-family: 'Montserrat';
                font-style: normal;
                width: 400;
                text-align: center;
                font-weight: 400;
                font-size: 18px;
                line-height: 150%;
                width: 446px;
                color: #9e9e9e;
            }
            .confirm-link{
                font-family: 'Montserrat';
                text-decoration: none;
                font-weight: 400;
                font-size: 18px;
                line-height:  150%;
            }
            .text-div{
            display: flex;
            margin-left: 360px;
            
            }
        </style>
    </head>
    <body>
        
        <div>
            <h1 class="header">Job Match</h1>
            <div class="text-div" style="justify-content: center">
            <p class="text">
                 You requested for reset password,
                    <a style="color:#fba92c;"class ="confirm-link" href="http://localhost:3000/reset-password/${token}">
                    click here
                    </a>
                    to reset your password
            </p>
        </div>
        </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: '',
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
