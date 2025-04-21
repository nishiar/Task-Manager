const nextConfig = {
  experimental: {
    turbo: true,
  },
  allowedDevOrigins: ['http://localhost:3000', 'http://192.168.56.1'], // 👈 add this

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      '@/calc': path.resolve(__dirname, 'calc'),
    };
    config.resolve.extensions.push('.ts', '.tsx'); 
    return config;
  },
};
