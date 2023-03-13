package com.niit.emailservice.service;

import com.niit.emailservice.model.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private JavaMailSender javamailSender;

    @Value("${spring.mail.username}") private String sender;


    public String sendMail(Email email) {

        try
        {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(email.getReceiver());
            mailMessage.setText(email.getMessageBody());
            mailMessage.setSubject(email.getSubject());

            javamailSender.send(mailMessage);
            return "Mail sent Successfully...";
        }
        catch (Exception e)
        {
            return "Error while sending Mail";
        }

    }

}
