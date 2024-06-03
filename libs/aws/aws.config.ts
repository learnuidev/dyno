export interface AWSConfig {
  accessKeyId: string;
  secretKey: string;
}

export const awsConfig: AWSConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretKey: process.env.AWS_SECRET_ACCESS_KEY || "",
};
