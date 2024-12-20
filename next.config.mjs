
import createMDX from "@next/mdx"
import withBundleAnalyzer from "@next/bundle-analyzer"
import path from "node:path";

const withMDX = createMDX({
    // Add markdown plugins here, as desired
})

const nextConfig = (phase, {defaultConfig}) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        // output: 'export',

        /* config options here */
        ...defaultConfig,
        pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
        webpack: ((config, opts) => {

            // config.resolve.alias["flowbite-react"] = path.resolve('./node_modules/flowbite-react');
            config.resolve.alias["flowbite"] = path.resolve('./node_modules/flowbite');

            return config;
        })
    }

    // console.log("default config ", nextConfig)

    nextConfig.transpilePackages = ["nodoku-core", "nodoku-components", "nodoku-flowbite", "nodoku-mambaui"]

    return withBundleAnalyzer({enabled: process.env.ANALYZE === 'true', openAnalyzer: true, analyzerMode: "static"})(withMDX(nextConfig))
}

export default nextConfig;