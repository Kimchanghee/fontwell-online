#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { BaseStaticSiteStack } from '../../../shared/infrastructure/BaseStack';

const app = new App();

new BaseStaticSiteStack(app, 'FontWellStack', {
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION || 'us-east-1',
  },
  domain: 'fontwell.online',
  buildOutputDir: '../dist',
  languages: ['ko', 'en', 'ja', 'zh', 'de', 'fr'],
  description: 'FontWell — Free fonts, icons, templates search',
});

app.synth();
