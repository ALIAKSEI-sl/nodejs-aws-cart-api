import * as path from 'path';
import * as dotenv from 'dotenv';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

dotenv.config();

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const {
      DB = '',
      DB_HOST = '',
      DB_PORT = '',
      DB_PASSWORD ='',
      DB_USERNAME = ''
    } = process.env;

    const cartServiceLambda = new lambda.Function(this, 'CartServiceLambda', {
        handler: 'main.handler',
        timeout: cdk.Duration.seconds(10),
        runtime: lambda.Runtime.NODEJS_20_X,
        environment: { DB, DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD },
        code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'dist/src')),
      }
    );

    const api = new apigateway.RestApi(this, 'CartServiceApi', {
      restApiName: 'CartServiceApi',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    api.root.addProxy({ defaultIntegration: new apigateway.LambdaIntegration(cartServiceLambda) });
    new cdk.CfnOutput(this, 'CartServiceUrl', { value: api.url });
  }
}
