const { exec } = require("child_process");

if (process.platform === "win32") {
  exec(
    "npm install @next/swc-win32-x64-msvc@14.2.4",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
}
