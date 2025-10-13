import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

export default function RabbitHoles() {
  return (
    <div className="font-sans min-h-screen p-6 pb-12 sm:p-12">
      <Navbar currentPage="rabbit-holes" />
      
      <main className="flex flex-col gap-6 items-center sm:items-start max-w-4xl w-full mx-auto">
        <div className="w-full">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
            rabbit holes i'm currently falling down
          </h1>
          <p
            className="text-lg mt-2"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            work in progress :)
          </p>
          <div
            className="mt-4"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
          <p className="mb-2 font-semibold">current topics I'm interested in 📜</p>
          <ul className="list-disc list-inside space-y-1">
            <li>dying languages</li>
            <li>how art historians use chemistry to date, authenticate, and catch forgeries</li>
            <li>ethics of progress</li>
            <li>the physical geography of the internet</li>
            <li>evolution of computing</li>
            <li>open source software</li>
          </ul>
        </div>
        </div>
        <div className="w-full">
          <hr className="border-gray-300" />
        </div>
        <Footer />
      </main>
    </div>
  );
}
