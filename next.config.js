/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "s3-media0.fl.yelpcdn.com",
            "s3-media1.fl.yelpcdn.com",
            "s3-media2.fl.yelpcdn.com",
            "s3-media3.fl.yelpcdn.com",
            "s3-media4.fl.yelpcdn.com",
            "s3-media5.fl.yelpcdn.com"
        ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fl.yelpcdn.com",
            },
        ]
    },
}

module.exports = nextConfig
