import express, { Request, Response } from "express";
import { Resend } from "resend";
import { ReqBody } from "./src/types";
import cors from 'cors'

import bodyParser from 'body-parser';

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const resend = new Resend("re_4Eoit6Pr_7QFW31KGwuiDJEN8JKDQvBnD");

app.get("/", async (req: Request, res: Response) => {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["geecorelimited@gmail.com"],
      subject: "hello world",
      html: "<strong>it works!</strong>",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});



app.post('/mail', async(req:Request, res:Response)=>{


const { receivers, subject, sender, message }:ReqBody = req.body
if(!receivers){
    res.status(500).send('Receiver not defined');  
    return;
}


if(receivers.length<1){
    res.status(500).send('Minimum of 1 receiver is required');  
    return;
}

if(!subject){
    res.status(500).send('Subject is required');  
    return;
}


if(!sender){
    res.status(500).send('Sender is required');  
    return;
}



if(!message){
    res.status(500).send('Message is required');  
    return;
}



try {
    const data = await resend.emails.send({
      from: sender,
      to: receivers,
      subject: subject,
      html: message,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }







})




app.listen(3600, () => {
    console.log("Listening on http://localhost:3600");
  });