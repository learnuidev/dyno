import { awsConfig } from "@/libs/aws/aws.config";
import AWS from "aws-sdk";
import Lambda from "aws-sdk/clients/lambda";

export const maxDuration = 60;

AWS.config.update({
  region: "us-west-1",
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretKey,
});

export const lambda = new Lambda({
  region: "us-east-1",
});
