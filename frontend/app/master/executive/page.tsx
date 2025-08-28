import Ui from "./ui";
import H1 from "@/components/layouts/h1";

export default async function ExecutivePage() {
  return(
    <div className="">
      <H1 title="임원 목록" />
      <Ui />
    </div>
  );
}