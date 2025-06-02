import Loading from "@/app/components/loading";
import QRISPaymentPage from "@/app/components/Qris";
import React, { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <QRISPaymentPage />
    </Suspense>
  );
}

export default page;
