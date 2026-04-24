/**
 * Shown when the app is running inside an iframe (e.g. embedded in Fusion)
 * and using standalone auth. Cognite login cannot run in a frame;
 * the user must open the app in its own tab.
 */
export const OpenInNewTabMessage = () => {
  const openInNewTab = () => {
    window.open(window.location.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Open in a new tab to sign in
        </h1>
        <p className="text-gray-600">
          Cognite login can’t run inside a frame. Open this app in its own tab
          so sign-in works.
        </p>
        <button
          type="button"
          onClick={openInNewTab}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Open in new tab
        </button>
      </div>
    </div>
  );
};
