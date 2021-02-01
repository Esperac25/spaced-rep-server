module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL
    || 'postgres://pciywrubfjgbyc:41b4709df73f13ae4a8928a6d479fcf4a9dd2aed21e6b25de7573f63c05d90d2@ec2-3-211-149-196.compute-1.amazonaws.com:5432/d7pe60vj9vkohl',
  JWT_SECRET: process.env.JWT_SECRET || 'spaced-repetition-jwt-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}
