require('dotenv').config();

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  connectionString:
		process.env.DATABASE_URL || 'postgres://pciywrubfjgbyc:41b4709df73f13ae4a8928a6d479fcf4a9dd2aed21e6b25de7573f63c05d90d2@ec2-3-211-149-196.compute-1.amazonaws.com:5432/d7pe60vj9vkohl'
}
