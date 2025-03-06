import {
    ConsecutiveBreaker,
    ExponentialBackoff,
    retry,
    handleAll,
    circuitBreaker,
    wrap,
} from 'cockatiel';

// Create a retry policy with exponential backoff
const retryPolicy = retry(handleAll, {
    maxAttempts: 3,
    backoff: new ExponentialBackoff(),
});

// Circuit breaker policy that opens after 5 consecutive failures
// and attempts to half-open after 10 seconds
const circuitBreakerPolicy = circuitBreaker(handleAll, {
    halfOpenAfter: 10 * 1000, // Try to recover after 10 seconds
    breaker: new ConsecutiveBreaker(5), // Open after 5 consecutive failures
});

// Combine both policies
const combinedPolicy = wrap(retryPolicy, circuitBreakerPolicy);

// Add logging for monitoring
retryPolicy.onRetry((context) => {
    console.log(`Retry attempt #${context.attempt} after ${context.delay}ms`);
});

circuitBreakerPolicy.onBreak(() => {
    console.log('Circuit breaker opened - stopping further requests');
});

circuitBreakerPolicy.onHalfOpen(() => {
    console.log('Circuit breaker half-open - testing service availability');
});

circuitBreakerPolicy.onReset(() => {
    console.log('Circuit breaker reset - service is operational');
});

export default combinedPolicy;
