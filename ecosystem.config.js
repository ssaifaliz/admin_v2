module.exports = {
  apps: [
    {
      name: "admin_v2",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: "max", // Use all available CPU cores
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
    },
  ],
};

// module.exports = {
//   apps: [
//     {
//       name: "next-app", // Name of your application
//       script: "npm",
//       args: "run build && npm start", // Runs the build first, then starts the server
//       env: {
//         NODE_ENV: "production",
//         PORT: 4000, // You can specify the port here if needed
//       },
//     },
//   ],
// };
