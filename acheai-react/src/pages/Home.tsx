import { Logo } from "@/components/organisms/atoms/Logo";
import { Navbar } from "@/components/organisms/organisms/Navigation/Navbar";

export function Home() {

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center px-6 py-12 max-w-xl">
          <div className="flex justify-center">
            <Logo className='w-64 h-64' />
          </div>
          <h2 id="manchete" className="text-3xl font-bold mt-8 text-gray-900">
            Onde você quer ir hoje?
          </h2>

          <p className="text-lg text-gray-600 mt-4">
            O melhor da gastronomia e entretenimento em um só lugar.
          </p>

          <a
            href="/estabelecimentos"
            className="inline-block mt-6 px-6 py-3 sm:w-64 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Encontrar
          </a>
        </div>
      </div>

    </>
  );

}