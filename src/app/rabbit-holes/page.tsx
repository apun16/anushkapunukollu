import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

export default function RabbitHoles() {
  return (
    <div className="font-sans min-h-screen p-6 pb-12 sm:p-12">
      <Navbar currentPage="rabbit-holes" />
      
      <main className="flex flex-col gap-6 items-center sm:items-start max-w-4xl w-full mx-auto">
        <div className="w-full">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
            rabbit holes
          </h1>
        </div>
        <div className="w-full">
          <hr className="border-gray-300" />
        </div>
        <Footer />
      </main>
    </div>
  );
}
