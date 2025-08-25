import about_hero from "../../../public/about_hero.jpg";
import about_mission from "../../../public/about_mission.jpg";
import about_family from "../../../public/about_family.png";
import CallToAction from "@/components/home/call-to-action";

export default function About() {
  return (
    <div className="flex-1">

      {/* Mission Section */}
      <section className="relative py-8 px-4 md:py-24 md:px-6 bg-primary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-10 text-secondary">
              95% of homemade meals <br />are <span className="text-primary">nutritionally incomplete*</span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-secondary max-w-xl mx-auto">
              We’re raising the bar(k) on homemade nutrition
            </p>
          </div>
        </div>
        {/* Absolute on md+, static and centered on mobile */}
        <a
          href="https://www.ucdavis.edu/news/homemade-dog-food-recipes-can-be-risky-business-study-finds"
          target="_blank"
          rel="noopener noreferrer"
          className="
            block
            mt-8
            text-xs text-gray-500 hover:underline
            text-center
            md:absolute md:bottom-4 md:right-4 md:mt-0 md:text-right
          "
        >
          *Source: “Evaluation of recipes for home-prepared diets for dogs and cats,” Journal of the American Veterinary Medical Association, 2013
        </a>
      </section>


      {/* Intro Section */}
      <section className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-secondary/90 text-white flex items-center justify-center p-8">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our mission</h1>
            <p className="text-lg md:text-xl text-justify">
              We believe that proper nutrition is not a privilege, but a fundamental necessity for every dog's well-being.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={about_hero.src}
            alt="Dog enjoying fresh food"
            className="w-full h-[300px] md:h-[500px] object-cover object-center"
          />
        </div>
      </section>

      {/* Intro Section */}
      <section className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={about_mission.src}
            alt="Dog enjoying fresh food"
            className="hidden md:block w-full h-[300px] md:h-[500px] object-cover object-center"
          />
        </div>
        <div className="w-full md:w-1/2 bg-secondary/90 text-white flex items-center justify-center p-8">
          <div className="max-w-lg text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our approach</h1>
            <p className="text-lg md:text-xl text-justify">
            Grublify makes homemade dog food easy and complete with AAFCO-standard nutrition packs, so every pet parent can confidently serve balanced meals, every day.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 px-4 bg-primary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary text-center mb-6">
            Our Story
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <p className="text-lg md:text-xl text-secondary/80 text-justify">
              We’re a couple of <span className="font-bold">dog-obsessed parents</span> who wanted to give our Shiba Inu, Creed the best life ever! And that starts with the foods he eats. When deciding what to feed him, we learned a surprising truth:
              A {" "}
              <a 
                href="https://www.ucdavis.edu/news/homemade-dog-food-recipes-can-be-risky-business-study-finds" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline text-blue-600 hover:text-blue-800"
                title="Read the UC Davis study on homemade dog food nutrition"
              >
                 UC Davis study 
              </a>
              {" "} found that <span className="font-bold">95% of homemade dog food recipes are missing essential nutrients</span> dogs need to thrive.

            </p>
            <p className="text-lg md:text-xl text-secondary/80 text-justify">
            We want to make it easy for pet parents to serve homemade meals that are actually <span className="font-bold">complete, balanced, and meet AAFCO standards</span>. Now, every dog can enjoy fresh homemade food prepped by their personal chef (that's you), and every pet parent can <span className="font-bold">feed with confidence that their dog is getting the nutrition they deserve.</span>
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <img
              src={about_family.src}
              alt="Our journey with Grublify"
              className="h-[300px] md:h-[400px] object-cover object-center rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Join the Waitlist Section */}
      {/* <section className="py-12 px-4 bg-secondary/90 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Waitlist</h2>
          <p className="text-lg md:text-xl mb-6">
            Be the first to know when our Nutrition Pack - Essentials launches!
          </p>
          <a
            href="/waitlist"
            className="inline-block bg-primary text-secondary font-bold py-3 px-6 rounded-md hover:bg-primary/80"
          >
            Join the Waitlist
          </a>
        </div>
      </section> */}

      <CallToAction />
    </div>
  );
}