/**
 * shark-guardEnv
 *
 * A lightweight utility to validate required environment variables at application startup.
 * Automatically loads `.env` file using `dotenv`.
 * If any required variable is missing or empty, the process exits immediately (or throws an error if configured).
 *
 * @module shark-env-guard
 */

// Load environment variables from .env file (if exists)
import dotenv from "dotenv";
dotenv.config();

/**
 * Validates that all required environment variables are present and non-empty.
 *
 * @param {string[]} requiredVars - An array of required environment variable names (e.g., ['DB_URL', 'API_KEY'])
 * @param {Object} [options] - Optional configuration
 * @param {boolean} [options.throwOnError=false] - If true, throws an Error instead of exiting the process
 *
 * @throws {Error} If `throwOnError` is true and any required variable is missing
 *
 * @example
 * // Basic usage (exits process on missing vars)
 * guardEnv(['PORT', 'DB_URL']);
 *
 * @example
 * // Throw error instead (useful in tests)
 * try {
 *   guardEnv(['SECRET'], { throwOnError: true });
 * } catch (err) {
 *   console.error(err.message);
 * }
 */
export function envGuard(requiredVars, options = {}) {
  const missing = [];

  // Check each required variable
  for (const varName of requiredVars) {
    if (process.env[varName] == null || process.env[varName] === "") {
      missing.push(varName);
    }
  }

  // If any are missing, handle the error
  if (missing.length > 0) {
    const errorMsg = `❌ Missing required environment variables: ${missing.join(
      ", "
    )}`;
    console.error(errorMsg);

    if (options.throwOnError) {
      throw new Error(errorMsg);
    } else {
      process.exit(1); // Exit immediately for safety in production
    }
  }

  console.log("✅ All required environment variables are present.");
}

// Export the function for use in other modules
export default { envGuard };
