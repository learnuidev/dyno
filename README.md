# Dyno

dyno is an open source next gen dynamodb client

Chapters

1. Deployment
2. Local Development

## 1 Deployment

### 1. Deploy Backend

Clone and install and deploy [dyno-api](https://github.com/learnuidev/dyno-api)

### 2. Deploy Frontend

#### 2.1 Populate `.env.local`

```sh
# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# FONT AWESOME
FONT_AWESOME_TOKEN=

# AWS COGNITO
NEXT_PUBLIC_AWS_REGION=
NEXT_PUBLIC_AWS_COGNITO_USERPOOL_ID=
NEXT_PUBLIC_AWS_COGNITO_WEBCLIENT_ID=


```

This is need to talk to dynamodb

---

## 2. Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Features

1. Search
2. Clone
3. Compare
4. Clear [Coming Soon]
5. ETL [Coming Soon]
6. Dynolog [Coming Soon]
7. Integrations (google spreadsheet, airtable etc) [Coming Soon]
8. History [Coming Soon]
