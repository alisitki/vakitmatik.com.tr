import { randomBytes, scryptSync } from "node:crypto";
import { stdin, stdout, stderr, exit } from "node:process";

function readPassword() {
  if (process.argv[2]) {
    return Promise.resolve(process.argv[2]);
  }

  return new Promise((resolve) => {
    stdout.write("Dashboard password: ");
    stdin.setEncoding("utf8");
    stdin.once("data", (value) => resolve(value.trim()));
  });
}

const password = await readPassword();

if (!password || password.length < 12) {
  stderr.write("Password must be at least 12 characters.\n");
  exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64, {
  N: 16384,
  r: 8,
  p: 1,
});

stdout.write(`scrypt:16384:8:1:${salt.toString("base64url")}:${hash.toString("base64url")}\n`);
