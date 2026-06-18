/**
 * API Mock for Autism Tests Platform
 * Intercepts window.fetch calls to mock the backend entirely client-side.
 */
(function() {
    // Instantiate backend classes
    const assessment = new window.AutismAssessment();

    const originalFetch = window.fetch;

    window.fetch = async function(url, options) {
        // Only intercept requests to /api/ or api/
        const urlStr = url.toString();
        if (!urlStr.includes('/api/') && !urlStr.includes('api/')) {
            return originalFetch.apply(this, arguments);
        }

        console.log(`[API Mock] Intercepted fetch to: ${urlStr}`, options);

        // Normalize URL to extract paths
        // e.g. "/api/assessment/start" -> "assessment/start"
        // e.g. "/api/health" -> "health"
        const apiPath = urlStr.substring(urlStr.indexOf('api/') + 4);
        
        let responseBody = null;
        let status = 200;

        try {
            if (apiPath === 'health') {
                responseBody = {
                    status: 'healthy',
                    timestamp: new Date().toISOString(),
                    version: '1.0.0'
                };
            } else if (apiPath === 'tests') {
                responseBody = assessment.testEngine.getAvailableTests();
            } else if (apiPath === 'assessment/start') {
                const body = options && options.body ? JSON.parse(options.body) : {};
                const sessionId = assessment.startSession(body);
                responseBody = {
                    sessionId,
                    message: "Assessment session started"
                };
            } else if (apiPath.startsWith('assessment/') && apiPath.endsWith('/answer')) {
                const parts = apiPath.split('/');
                const sessionId = parts[1];
                const body = options && options.body ? JSON.parse(options.body) : {};
                const result = assessment.submitAnswer(sessionId, body);
                if (result.error) {
                    status = 400;
                    responseBody = { error: result.error };
                } else {
                    responseBody = result;
                }
            } else if (apiPath.startsWith('assessment/')) {
                const parts = apiPath.split('/');
                const sessionId = parts[1];
                const session = assessment.getSession(sessionId);
                if (!session) {
                    status = 404;
                    responseBody = { error: "Session not found" };
                } else {
                    responseBody = session;
                }
            } else {
                status = 404;
                responseBody = { error: "Not found" };
            }
        } catch (e) {
            console.error('[API Mock] Error processing request:', e);
            status = 500;
            responseBody = { error: e.message };
        }

        // Return a mocked Response object
        return new Response(JSON.stringify(responseBody), {
            status: status,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    
    console.log('🔌 Client-side API Mock successfully registered!');
})();
