import express from "express";
import { SNS } from "aws-sdk";
import { z, ZodError } from "zod";

const app = express();

app.use(express.json());

app.post("/nfe", async (req, res ) => {
    const reqBodySchema = z.object({
        url: z.string().url()
    })
    
    try {
        const { url } = reqBodySchema.parse(req.body);
        const sns = new SNS({
            region: "us-east-1",
        });
        const { MessageId } = await sns.publish({
            Message: JSON.stringify({ url }),
            TopicArn: process.env.AWS_TOPIC_ARN,
            MessageGroupId: "01"
        }).promise()
        if ( !MessageId ) {
            throw Error("Falha para publicar SNS mensagem");
        }

        return res.status(201).json({ message: true});
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: error.format(),
            });
        }
        return res.status(500).json({ message: "Internal Server Error"});
    }

    return res.status(200).json({
        message: "Hello World",
    });
});

app.listen(Number(process.env.PORT), () => {
    console.log(`HTTP Server está rodando na porta ${process.env.PORT}`);
});