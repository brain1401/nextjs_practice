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

  async redirects() { //redirect 설정 | redirect는 A를 B로 다시 대리고 가는 느낌
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
  },

  async rewrite() { //rewrite는 복잡하고 거추장한 url을 쉬운 url로 대체하는 것이다.
    return [
      {
        source: 'items/:slug',
        destination: '/products/:slug',
      }
    ];
  }

}

module.exports = nextConfig
