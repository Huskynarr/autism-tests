# Deployment Guide

## Production Deployment

### Prerequisites
- Node.js 14+ installed on server
- PM2 or similar process manager
- Reverse proxy (nginx recommended)
- SSL certificate for HTTPS

### Environment Setup

1. **Create production environment file:**
```bash
# .env.production
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-secure-random-string-here
LOG_LEVEL=warn
```

2. **Install production dependencies:**
```bash
npm ci --only=production
```

### PM2 Deployment

1. **Install PM2:**
```bash
npm install -g pm2
```

2. **Create PM2 configuration:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'autism-tests',
    script: 'src/index.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

3. **Start with PM2:**
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
}
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  autism-tests:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Cloud Deployment

### Heroku
```bash
# Install Heroku CLI and login
heroku create autism-tests-app
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=your-secret-here
git push heroku main
```

### Vercel
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ]
}
```

### AWS EC2
1. Launch EC2 instance with Node.js
2. Clone repository
3. Install dependencies
4. Configure security groups for port 3000/80/443
5. Set up CloudWatch for monitoring
6. Use Application Load Balancer for scaling

## Monitoring and Logging

### Health Monitoring
```bash
# Check application health
curl https://your-domain.com/api/health

# Monitor with PM2
pm2 monit

# View logs
pm2 logs autism-tests
```

### Performance Monitoring
- Use PM2 Plus for advanced monitoring
- Set up CloudWatch/DataDog for metrics
- Monitor response times and error rates
- Track memory usage and CPU utilization

## Security Considerations

1. **Environment Variables:**
   - Never commit sensitive data
   - Use strong session secrets
   - Rotate secrets regularly

2. **HTTPS:**
   - Always use HTTPS in production
   - Implement HSTS headers
   - Use strong SSL configurations

3. **Rate Limiting:**
   - Implement rate limiting for APIs
   - Monitor for abuse patterns
   - Set up DDoS protection

4. **Updates:**
   - Keep dependencies updated
   - Monitor for security vulnerabilities
   - Implement automated security scanning

## Backup Strategy

1. **Application Code:**
   - Use Git for version control
   - Tag releases for rollback capability

2. **Session Data:**
   - Sessions are temporary by design
   - No persistent data backup needed
   - Consider logging for analytics

3. **Configuration:**
   - Backup environment configurations
   - Document deployment procedures
   - Maintain infrastructure as code