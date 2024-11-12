import systemDatabase from './system-database';
import tenantDatabase from './tenant-database';
import signup from './signup';
import gotenberg from './gotenberg';
import plaid from './plaid';
import lemonsqueezy from './lemonsqueezy';
import s3 from './s3';
import openExchange from './open-exchange';
import posthog from './posthog';

export const config = [
  systemDatabase,
  tenantDatabase,
  signup,
  gotenberg,
  plaid,
  lemonsqueezy,
  s3,
  openExchange,
  posthog,
];
