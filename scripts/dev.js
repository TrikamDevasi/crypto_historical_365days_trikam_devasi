const { spawn } = require('child_process');
const path = require('path');

console.log('Starting backend server and frontend client concurrently...');

const backend = spawn('npm', ['run', 'server'], {
  shell: true,
  cwd: path.join(__dirname, '..')
});

const frontend = spawn('npm', ['run', 'dev'], {
  shell: true,
  cwd: path.join(__dirname, '..', 'crypto-dashboard')
});

backend.stdout.on('data', (data) => {
  process.stdout.write(`[Server] ${data}`);
});

backend.stderr.on('data', (data) => {
  process.stderr.write(`[Server ERROR] ${data}`);
});

frontend.stdout.on('data', (data) => {
  process.stdout.write(`[Client] ${data}`);
});

frontend.stderr.on('data', (data) => {
  process.stderr.write(`[Client ERROR] ${data}`);
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
