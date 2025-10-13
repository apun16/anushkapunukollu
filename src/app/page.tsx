import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-6 pb-12 sm:p-12">
      {/* Navbar */}
      <nav className="max-w-4xl w-full mx-auto mb-8">
        <div className="flex justify-between items-center">
          <a 
            href="/" 
            className="text-base hover:underline underline-offset-4 transition-all duration-200"
            style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
          >
            anushka
          </a>
          <div className="flex gap-8">
            <a 
              href="/projects" 
              className="text-base hover:underline underline-offset-4 transition-all duration-200"
              style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
            >
              projects
            </a>
            <a 
              href="/bookshelf" 
              className="text-base hover:underline underline-offset-4 transition-all duration-200"
              style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
            >
              bookshelf
            </a>
            <a 
              href="/rabbit-holes" 
              className="text-base hover:underline underline-offset-4 transition-all duration-200"
              style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}
            >
              rabbit holes
            </a>
          </div>
        </div>
      </nav>

      <main className="flex flex-col gap-6 items-center sm:items-start max-w-4xl w-full mx-auto">

        <div className="w-full flex">
          <h1 className="text-4xl sm:text-5xl font-bold text-right max-w-md leading-tight" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
            hi im anushka!
          </h1>
        </div>

        <div className="w-full">
          <h2 className="text-lg mb-3 font-bold" style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}>
            currently
          </h2>
          
          <ul className="space-y-3 text-base leading-relaxed" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
            <li className="flex flex-wrap items-center">
              <span className="mr-2">↳</span>
              <span>cs&nbsp;@</span>
              
              <a
                href="https://uwaterloo.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center underline underline-offset-4 hover:bg-[#AFE1AF] transition-all duration-300 ml-1 rounded-sm highlight-reveal"
              >
                <Image
                  src="/waterloo_logo.png"
                  alt="University of Waterloo logo"
                  width={20}
                  height={20}
                  className="inline-block mr-1"
                />
                <span>University&nbsp;of&nbsp;Waterloo</span>
              </a>
              <span className="ml-1">as&nbsp;a&nbsp;Ted&nbsp;Rogers&nbsp;Future&nbsp;Leader&nbsp;Scholar</span>
            </li>
            <li className="flex flex-wrap items-center">
              <span className="mr-2">↳</span>
              <span>spending&nbsp;time&nbsp;</span>
              <a
                href="https://devpost.com/anushka16"
                className="underline underline-offset-4 hover:bg-[#F88379] transition-all duration-300 rounded-sm highlight-reveal"
                target="_blank"
                rel="noopener noreferrer"
              >
                hacking
              </a> 
              <span>&nbsp;+&nbsp;</span>
              <span className="underline underline-offset-4 hover:bg-[#F88379] transition-all duration-300 rounded-sm cursor-default highlight-reveal">
                competitive&nbsp;programming
              </span>          
              <span>&nbsp;+&nbsp;going&nbsp;down&nbsp;</span>
              <a 
                href="/rabbit-holes" 
                className="underline underline-offset-4 hover:bg-[#F88379] transition-all duration-300 rounded-sm highlight-reveal"
              >
                rabbit&nbsp;holes
              </a>
              <span>&nbsp;about&nbsp;different&nbsp;ideas&nbsp;at&nbsp;3AM</span>
            </li>
          </ul>
        </div>
        <div className="w-full text-base leading-relaxed" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
          <p>          
            I love creating for the people around me, whether it's by using code or paper. I find the most meaning in crossing between disciplines and discovering how they overlap. The one driving force behind all my interests, from history to math to materials science, is my curiosity to understand the world and make resources more accessible.
          </p>
        </div>

        <div className="w-full">
          <hr className="border-gray-300" />
        </div>

        <div className="w-full">
   <h2
     className="text-lg mb-3 font-bold"
     style={{ fontFamily: 'Satoshi-Bold, Satoshi-Variable, system-ui, sans-serif' }}
   >
     in the past . . .
   </h2>
  <ul className="space-y-3 text-base leading-relaxed" style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}>
  <li className="flex items-start">
  <span className="mr-2">↳</span>
  <span className="flex-1">
    developed tools that distribute multilingual content for some of my favourite creators as a software engineering intern{' '}
    <span className="inline-flex items-center">
      @{' '}
      <a
        href="https://www.aviewint.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center underline underline-offset-4 hover:bg-[#AFE1AF] transition-all duration-300 rounded-sm highlight-reveal ml-1"
      >
        <Image
          src="/Aview_logo.jpeg"
          alt="Aview International logo"
          width={20}
          height={20}
          className="inline-block mr-1"
        />
        <span>Aview International</span>
      </a>
    </span>
  </span>
</li>


    <li className="flex items-start">
      <span className="mr-2">↳</span>
      <span className="flex-1">
        was a future tech software engineering intern @{' '}
        <a
          href="https://www.nokia.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center underline underline-offset-4 hover:bg-[#AFE1AF] transition-all duration-300 rounded-sm highlight-reveal ml-1"
        >
          <Image
            src="/Nokia_logo.jpeg"
            alt="Nokia logo"
            width={20}
            height={20}
            className="inline-block mr-1"
          />
          <span>Nokia</span>
        </a>{' '}
        on their Network Service Platform's Analytics team
      </span>
    </li>

    <li className="flex items-start">
      <span className="mr-2">↳</span>
      <span className="flex-1">
        built a biodegradable hydrogel using sugarcane bagasse (a byproduct of extracting juice from sugarcane) to help revitalize degraded soil; created to find an alternative to chemical fertilizers
      </span>
    </li>

    <li className="flex items-start ml-6">
      <span className="mr-2">•</span>
      <span className="flex-1">raised $30k+ from Emergent Ventures, the 1517 fund, and Rideau Hall Foundation.</span>
    </li>

    <li className="flex items-start">
      <span className="mr-2">↳</span>
      <span className="flex-1">
        led 2 national financial literacy non-profits:{' '}
        <a
          href="#"
          className="inline-flex items-center underline underline-offset-4 hover:bg-[#AFE1AF] transition-all duration-300 rounded-sm highlight-reveal ml-1"
        >
          <Image
            src="/fuse_logo.jpeg"
            alt="FUSE Society logo"
            width={20}
            height={20}
            className="inline-block mr-1"
          />
          <span>FUSE Society</span>
        </a>{' '}
        +{' '}
        <a
          href="#"
          className="inline-flex items-center underline underline-offset-4 hover:bg-[#AFE1AF] transition-all duration-300 rounded-sm highlight-reveal ml-1"
        >
          <Image
            src="/TargetAlpha_logo.jpeg"
            alt="Target Alpha logo"
            width={20}
            height={20}
            className="inline-block mr-1"
          />
          <span>Target Alpha</span>
        </a>
        ; we collectively reached 10,000 high school students and partnered with TD, Binance, & the University of Toronto!
      </span>
    </li>

    <li className="flex items-start">
      <span className="mr-2">↳</span>
      <span className="flex-1">
        photographed 100s of people and objects in daily life. It helped me see beauty in the mundane & the rule of 3rd in everything
      </span>
    </li>
  </ul>
</div>

        <div className="w-full">
          <hr className="border-gray-300" />
        </div>

        <footer className="w-full flex flex-col items-center gap-4 mt-4">
          <div className="flex gap-[24px] flex-wrap items-center justify-center">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all duration-200"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Resume
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all duration-200"
              href="https://github.com/apun16/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Github
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all duration-200"
              href="https://www.linkedin.com/in/apunukollu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              LinkedIn
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all duration-200"
              href="mailto:anushka.punukollu@uwaterloo.ca"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Email
            </a>
          </div>
          <p className="text-sm text-gray-600" style={{ fontFamily: 'Satoshi-Regular, Satoshi-Variable, system-ui, sans-serif' }}>
            © 2025 Anushka Punukollu
          </p>
        </footer>
      </main>
    </div>
  );
}