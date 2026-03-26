import Image from "next/image";

export default function TryGrublifyPage() {
  return (
    <div className="flex-1 py-8 md:py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-5">
          <div className="min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary text-left mb-2">
              Get Free Homemade Dog Food from Grublify!
            </h1>
            <p className="text-secondary/80 text-left text-sm md:text-base">
              Fill out the form below to receive 2 Grublify nutrition packs and an exclusive tote bag!
            </p>
          </div>

          <div className="shrink-0 w-24 md:w-32">
            <Image
              src="/try-grublify.png"
              alt="Try Grublify"
              width={500}
              height={1000}
              className="w-full h-auto max-h-40 md:max-h-64 rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="w-full bg-white rounded-lg overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScE_OEBaaykd1xLxHkDLEDfDdRXtFGwsxNJlnBpG14jL1yqNg/viewform?embedded=true"
            width="100%"
            height="2600"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            className="w-full min-h-[2600px] md:min-h-[1941px]"
            style={{ border: 0 }}
            title="Try Grublify Form"
          >
            Loading...
          </iframe>
        </div>
      </div>
    </div>
  );
}
