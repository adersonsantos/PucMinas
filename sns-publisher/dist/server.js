var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express = __toESM(require("express"));
var import_aws_sdk = require("aws-sdk");
var import_zod = require("zod");
var app = (0, import_express.default)();
app.use(import_express.default.json());
app.post("/nfe", async (req, res) => {
  const reqBodySchema = import_zod.z.object({
    url: import_zod.z.string().url()
  });
  try {
    const { url } = reqBodySchema.parse(req.body);
    const sns = new import_aws_sdk.SNS({
      region: "us-east-1"
    });
    const { MessageId } = await sns.publish({
      Message: JSON.stringify({ url }),
      TopicArn: process.env.AWS_TOPIC_ARN,
      MessageGroupId: "01"
    }).promise();
    if (!MessageId) {
      throw Error("Falha para publicar SNS mensagem");
    }
    return res.status(201).json({ message: true });
  } catch (error) {
    if (error instanceof import_zod.ZodError) {
      return res.status(400).json({
        message: error.format()
      });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({
    message: "Hello World"
  });
});
app.listen(Number(process.env.PORT), () => {
  console.log(`HTTP Server est\xE1 rodando na porta ${process.env.PORT}`);
});
