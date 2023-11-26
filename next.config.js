/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["s3-media2.fl.yelpcdn.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3-media2.fl.yelpcdn.com",
            },
        ]
    },
}

module.exports = nextConfig
