
require('dotenv').config();

module.exports = {
  apps : [{
    name: 'Hash#51',
    script: './server/index.js',
    watch: '.',
    env_production: {
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
      MONGO_PASS: process.env.MONGO_PASS,
      SECRET: process.env.SECRET,
      PORT: process.env.PORT,
      YOUTUBE_API: process.env.YOUTUBE_API
    }
  },
    {
      name: 'Webpack',
      script: 'npm run dev',
      watch: '.',
      env_production: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        MONGO_PASS: process.env.MONGO_PASS,
        SECRET: process.env.SECRET,
        PORT: process.env.PORT,
        YOUTUBE_API: process.env.YOUTUBE_API
      }
  }],

  deploy : {
    production : {
      user : 'ubuntu',
      host : 'ec2-13-59-110-86.us-east-2.compute.amazonaws.com',
//      key: '~/.ssh/id_rsa',
      ref  : 'origin/main',
      repo : 'git@github.com:DDR-Greenfield/Hash51-2.0.git',
      path : '/home/ubuntu/Hash51-2.0',
      env_production: {
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        MONGO_PASS: process.env.MONGO_PASS,
        SECRET: process.env.SECRET,
        PORT: process.env.PORT,
        YOUTUBE_API: process.env.YOUTUBE_API
      },
      ssh_options: "StrictHostKeyChecking=no",
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run restart',
      'pre-setup': ''
    }
  }
};


