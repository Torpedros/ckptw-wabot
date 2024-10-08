const APIs = {
    fasturl: {
        baseURL: "https://fastrestapis.fasturl.cloud/"
    },
    nyxs: {
        baseURL: "https://api.nyxs.pw"
    },
    ngodingaja: {
        baseURL: "https://api.ngodingaja.my.id"
    },
    ryzendesu: {
        baseURL: "https://apis.ryzendesu.vip"
    },
    sandipbaruwal: {
        baseURL: "https://sandipbaruwal.onrender.com"
    },
    ssa: {
        baseURL: "https://ssa-api.vercel.app"
    },
    vyturex: {
        baseURL: "https://www.api.vyturex.com"
    },
    widipe: {
        baseURL: "https://widipe.com"
    }
};

exports.createAPIUrl = (apiNameOrURL, endpoint, params = {}, apiKeyParamName) => {
    const api = APIs[apiNameOrURL];

    if (!api) {
        try {
            const url = new URL(apiNameOrURL);
            apiNameOrURL = url;
        } catch (error) {
            throw new Error(`Invalid API name or custom URL: ${apiNameOrURL}`);
        }
    }

    const queryParams = new URLSearchParams(params);

    if (apiKeyParamName && api && "APIKey" in api) queryParams.set(apiKeyParamName, api.APIKey);

    const apiUrl = new URL(endpoint, api ? api.baseURL : apiNameOrURL.origin);
    apiUrl.search = queryParams.toString();

    return apiUrl.toString();
};

exports.listUrl = () => {
    return APIs;
}