/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ]
  },

  async redirects() { //redirect 설정 
    return [
      {
        source: "/products/deleted_forever",
        destination: "/products",
        permanent: true, //이 permanet값에 따라서 Search Engine이 다르게 상호작용한다.
      },
      {
        source: "/products/deleted_temp",
        destination: "/products",
        permanent: false,
      },
    ];

  }
}

module.exports = nextConfig
