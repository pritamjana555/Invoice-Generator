import { NewInvoiceForm } from "@/app/new/component/NewInvoiceForm";
import { Suspense } from "react";

const Page = () => (
  <div className="min-h-screen max-[760px]:sticky max-[760px]:top-0 flex items-center md:flex-row flex-col-reverse h-full max-[760px]:h-[176vh] max-[760px]:min-h-[100vh]">
    <Suspense>
      <NewInvoiceForm />
    </Suspense>
  </div>
);

export default Page;
