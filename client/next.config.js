module.exports = {
    webpack(config) {
        //svg
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg')
          );
        
        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: [{
                    loader: '@svgr/webpack',
                    options: {
                        typescript: true,
                        ext: 'tsx'
                    }
                }],
            }
        )
        
        return config;
    }
 }