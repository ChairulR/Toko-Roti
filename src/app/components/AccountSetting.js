import React from "react";


import React from "react";

/**
 * Renders a list of account settings options for the user.
 *
 * @component
 * @returns {JSX.Element} The account settings buttons list.
 * @author wign
 */

function AccountSetting() {
  return (
    <div className="space-y-3 mt-6">
      <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
        <span className="font-medium">Ubah Password</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
        <span className="font-medium">Notifikasi</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
        <span className="font-medium">Alamat Pengiriman</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-right"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

export default AccountSetting;
