import InputSection from "@/components/input-section";
import Visualizer from "@/components/visual-section";

export default function Home() {
  return (
    <main className="w-full gap-5 flex flex-col lg:flex-row">
      <div className="lg:w-2/5 w-full">
        <InputSection />
      </div>
      <div className="lg:w-3/5 w-full">
        <Visualizer />
      </div>
    </main>
  );
}
