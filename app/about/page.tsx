import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-300 p-4">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold">About This Project</h1>
        <p className="text-lg">
          A Next.js weather dashboard featuring A/B testing.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Assumptions Made:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Session-Based Persistence Assumption - The requirement stated
            <i>
              "Persist variant selection per session and also persist Recent
              searches between sessions"
            </i>{" "}
            I interpreted "session" as the user's active time on the webpage,
            meaning data resets when they leave and return. Therefore, I used
            `sessionStorage` instead of `localStorage` to clear data on a new
            visit. If long-term persistence was intended, `localStorage` would
            be required.
          </li>
          <li>
            Error Handling Assumption - Since basic error handling was already
            provided, I assumed no additional handling was required for cases
            where the location API fails or returns an empty response (e.g.,
            when no matching city is found). As a result, I did not implement a
            custom user-facing message or alternative handling for these
            scenarios.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">
          Summary of Changes Made:
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Integrated OpenWeather API - Created an `api` folder with dedicated
            routes (`/api/location/search` and `/api/weather`) to fetch and
            process weather data on the server.
          </li>
          <li>
            Integrated Redux for State Management - Used Redux Toolkit to handle
            application state efficiently.
          </li>
          <li>
            Added `abTestSlice` for A/B Testing - Ensured A/B test variant is
            correctly stored in Redux and synced with session storage.
          </li>
          <li>
            Refactored Weather Display - Split into separate components for A/B
            testing (Variant A & B) to improve maintainability and flexibility.
          </li>
          <li>
            Implemented Dynamic Imports - Used Next.js `dynamic()` to lazy load
            weather variants, reducing bundle size and improving performance.
          </li>
          <li>
            Fixed Recent Searches Persistence - Resolved duplicate entries and
            ensured searches persist across sessions.
          </li>
          <li>
            Created `sessionStorageHandler.ts` - A utility to easily set, get,
            and remove session storage data.
          </li>
        </ul>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
