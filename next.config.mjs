const exportForHostinger = process.env.HOSTINGER_EXPORT === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  ...(exportForHostinger
    ? { output: 'export' }
    : {
        async headers() {
          return [{
            source: '/:path*',
            headers: [{ key: 'X-Goodshrub-Preview', value: 'nextjs' }],
          }];
        },
      }),
};

export default nextConfig;
