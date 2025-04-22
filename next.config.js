const path = require('path'); // Import path module

module.exports = {
  allowedDevOrigins: ['http://localhost:3000', 'http://192.168.56.1'], // Define allowed dev origins

  webpack(config, { isServer }) {
    // Resolve path aliases for better import handling
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname), // Root alias
      '@/calc': path.resolve(__dirname, 'calc'), // Alias for calc directory
    };

    // Allow .ts and .tsx extensions for TypeScript support
    config.resolve.extensions.push('.ts', '.tsx');

    // Fix server-side issues (e.g., Node.js modules like fs, path, os)
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,  // Don't include fs in the client bundle
        path: false, // Don't include path in the client bundle
        os: false,  // Don't include os in the client bundle
      };
    }

    return config; // Return the modified config
  },
};
