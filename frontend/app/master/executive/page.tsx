import Ui from "./ui";
import H1 from "@/components/layouts/h1";
import CommonBreadcrumb from "./_components/Breadcrumb";
import Header from "./_components/Header";

export default async function ExecutivePage() {
  return(
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <CommonBreadcrumb />
        <H1 title="임원 목록" />
        <Ui />
      </div>
    </div>
  );
}