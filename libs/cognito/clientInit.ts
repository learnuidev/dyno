"use client";

import { Amplify } from "aws-amplify";
import { awsConfig } from "../aws/aws.config";
// import awsExports from './aws-exports';
// import { awsConfig } from "@/lib/config";

const awsExports = {
  region: awsConfig?.awsRegion,
  userPoolId: awsConfig?.userPoolId,
  userPoolWebClientId: awsConfig?.userPoolWebClientId,
  graphqlEndpoint: awsConfig?.graphqlEndpoint,

  mandatorySignIn: true,
  authenticationType: "AMAZON_COGNITO_USER_POOLS",
};

Amplify.configure(awsExports);
