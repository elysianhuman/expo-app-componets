
const fetchWithTimeout = async (url, options = {}, timeout = 35000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return response;
    } catch (error) {
        if (error.name === 'AbortError') {
            const timeoutError = new Error('Request timeout. Please check your server.');
            timeoutError.code = 'TIMEOUT';
            throw timeoutError;
        }

        // 👇 Handle invalid hostname / network failure
        if (error.message === 'Network request failed') {
            const networkError = new Error(
                'Unable to connect. Please check your hostname or server connection.'
            );
            networkError.code = 'NETWORK_ERROR';
            throw networkError;
        }

        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};

export const companyList = async (hostname) => {
    try {


        if (!hostname) {
            const error = new Error('Hostname not found.');
            error.code = -1;
            throw error;
        }

        const response = await fetchWithTimeout(
            `${hostname}/focus8API/List/Company`
        );

        if (!response.ok) {
            const error = new Error(`HTTP error: ${response.status}`);
            error.code = response.status;
            throw error;
        }

        const result = await response.json();

        if (result.result !== 1) {
            const error = new Error(result.message || 'Request failed');
            error.code = result.result;
            throw error;
        }

        const companies = result?.data ?? [];

        return {
            ...result,
            data: companies,
            isEmpty: companies.length === 0,
        };
    } catch (error) {
        console.error('Company list error:', error.message);
        throw error;
    }
};


export const executeSqlQuery = async (sessionId, hostname, query) => {
    if (!query || !sessionId) {
        throw new Error("Query and SessionId are required");
    }

    if (!hostname) {
        throw new Error("Hostname is required");
    }

    try {
        const response = await fetchWithTimeout(
            `${hostname}/focus8API/utility/ExecuteSqlQuery`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    fSessionId: sessionId,
                },
                body: JSON.stringify({
                    data: [{ Query: query }],
                }),
            },
            60000
        );

        if (!response.ok) {
            const error = new Error(`HTTP error: ${response.status}`);
            error.code = response.status;
            throw error;
        }

        const result = await response.json();

        if (result.result !== 1) {
            const error = new Error(result.message || "Request failed");
            error.code = result.result;
            throw error;
        }

        const table = result.data?.[0]?.Table ?? [];

        return {
            ...result,
            data: table,
            isEmpty: table.length === 0,
        };

    } catch (error) {
        console.error("executeSqlQuery error:", error.message);
        throw error;
    }
};


