import AddTour from "@/components/dasboard/AddTour";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import UpdateTour from "@/components/dasboard/main/UpdateTour";

const metadata = {
  title: "Dashboard-add-tour || ViaTour - Travel & Tour Reactjs Template",
  description: "ViaTour - Travel & Tour Reactjs Template",
};

export default function DBAddTourPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <main>
        <AddTour />
      </main>
    </>
  );
}
