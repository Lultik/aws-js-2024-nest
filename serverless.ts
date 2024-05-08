import type { AWS } from '@serverless/typescript';
import 'dotenv/config';

const serverlessConfiguration: AWS = {
  service: 'cart-service-2',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-central-1',
    profile: 'aws-js',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_USERNAME: process.env.DB_USERNAME,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_NAME: process.env.DB_NAME,
    },
  },
  functions: {
    main: {
      handler: `dist/main.handler`,
      events: [
        {
          http: {
            method: 'ANY',
            path: '/{any+}',
            cors: true,
            authorizer: {
              type: 'TOKEN',
              name: 'authorization-service-dev-basicAuthorizer',
              arn: 'arn:aws:lambda:eu-central-1:891377171169:function:authorization-service-dev-basicAuthorizer',
              resultTtlInSeconds: 0,
              identitySource: 'method.request.header.Authorization',
              identityValidationExpression: '.*',
            },
          },
        },
      ],
    },
  },
  package: { individually: true },
  resources: {
    Resources: {
      GatewayResponse: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters: {
            'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
            'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
          },
          ResponseType: 'DEFAULT_4XX',
          RestApiId: { Ref: 'ApiGatewayRestApi' },
        },
      },
    },
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
