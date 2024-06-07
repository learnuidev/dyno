// AWS
import CloudWatchLogs from "aws-sdk/clients/cloudwatchlogs";
import { awsConfig } from "@/libs/aws/aws.config";
import AWS from "aws-sdk";

AWS.config.update({
  region: "us-west-1",
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretKey,
});

export const cloudwatchLogs = new CloudWatchLogs({
  region: "us-east-1",
});
