const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false;
const hostname = "localhost";
// const hostname = "finhouse.deltastorm.pl";
const port = 80;
//? when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;

            if (pathname === "/a") {
                await app.render(req, res, "/a", query);
            } else if (pathname === "/b") {
                await app.render(req, res, "/b", query);
            } else {
                await handle(req, res, parsedUrl);
            }
        } catch (err) {
            console.error("Error occurred handling", req.url, err);
            res.statusCode = 500;
            res.end("internal server error");
        }
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});

//- ---

//? Stand alone

// process.env.NODE_ENV = "production";
// process.chdir(__dirname);
// const NextServer = require("next/dist/server/next-server").default;
// const http = require("http");
// const path = require("path");

// // Make sure commands gracefully respect termination signals (e.g. from Docker)
// process.on("SIGTERM", () => process.exit(0));
// process.on("SIGINT", () => process.exit(0));

// let handler;

// const server = http.createServer(async (req, res) => {
//     try {
//         await handler(req, res);
//     } catch (err) {
//         console.error(err);
//         res.statusCode = 500;
//         res.end("internal server error");
//     }
// });
// const currentPort = parseInt(process.env.PORT, 10) || 3000;

// server.listen(currentPort, (err) => {
//     if (err) {
//         console.error("Failed to start server", err);
//         process.exit(1);
//     }
//     const addr = server.address();
//     const nextServer = new NextServer({
//         hostname: "localhost",
//         port: currentPort,
//         dir: path.join(__dirname),
//         dev: false,
//         conf: {
//             env: {},
//             webpack: null,
//             webpackDevMiddleware: null,
//             eslint: { ignoreDuringBuilds: false },
//             typescript: {
//                 ignoreBuildErrors: false,
//                 tsconfigPath: "tsconfig.json",
//             },
//             distDir: "./.next",
//             cleanDistDir: true,
//             assetPrefix: "",
//             configOrigin: "next.config.js",
//             useFileSystemPublicRoutes: true,
//             generateEtags: true,
//             pageExtensions: ["tsx", "ts", "jsx", "js"],
//             target: "server",
//             poweredByHeader: true,
//             compress: true,
//             analyticsId: "",
//             images: {
//                 deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//                 imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//                 path: "/_next/image",
//                 loader: "default",
//                 domains: [],
//                 disableStaticImages: false,
//                 minimumCacheTTL: 60,
//                 formats: ["image/webp"],
//                 dangerouslyAllowSVG: false,
//                 contentSecurityPolicy:
//                     "script-src 'none'; frame-src 'none'; sandbox;",
//             },
//             devIndicators: {
//                 buildActivity: true,
//                 buildActivityPosition: "bottom-right",
//             },
//             onDemandEntries: { maxInactiveAge: 15000, pagesBufferLength: 2 },
//             amp: { canonicalBase: "" },
//             basePath: "",
//             sassOptions: {},
//             trailingSlash: false,
//             i18n: null,
//             productionBrowserSourceMaps: false,
//             optimizeFonts: true,
//             excludeDefaultMomentLocales: true,
//             serverRuntimeConfig: {},
//             publicRuntimeConfig: {},
//             reactStrictMode: true,
//             httpAgentOptions: { keepAlive: true },
//             outputFileTracing: true,
//             staticPageGenerationTimeout: 60,
//             swcMinify: false,
//             experimental: {
//                 cpus: 15,
//                 sharedPool: true,
//                 plugins: false,
//                 profiling: false,
//                 isrFlushToDisk: true,
//                 workerThreads: false,
//                 pageEnv: false,
//                 optimizeCss: false,
//                 nextScriptWorkers: false,
//                 scrollRestoration: false,
//                 externalDir: false,
//                 reactRoot: true,
//                 disableOptimizedLoading: false,
//                 gzipSize: true,
//                 swcFileReading: true,
//                 craCompat: false,
//                 esmExternals: true,
//                 isrMemoryCacheSize: 52428800,
//                 serverComponents: false,
//                 fullySpecified: false,
//                 outputFileTracingRoot: "",
//                 outputStandalone: true,
//                 images: { layoutRaw: false },
//                 trustHostHeader: false,
//             },
//             configFileName: "next.config.js",
//         },
//     });
//     handler = nextServer.getRequestHandler();

//     console.log("Listening on port", currentPort);
// });
