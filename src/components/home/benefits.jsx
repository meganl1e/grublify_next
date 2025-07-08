"use client";
import Image from 'next/image';
import { useEffect } from 'react';

export default function Benefits({ data, loading }) {

  // Show loading state
  if (loading) {
    return <section className=""></section>;
  }

  // Guard: If there's an error or no data after loading
  if (!loading && !data) {
    return <div>No benefits found</div>;
  }

  // useEffect(() => {
  //   // Your code to run when benedits changes
  //   console.log("benefits changed:", data);
  //   // ...other logic...
  // }, [data]);


  return (
    <div className="bg-white">

      <div className="flex-1 py-8">

        {/* sub headline */}
        <section className="relative py-10 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-semibold mb-12 text-secondary">
              Your Dog Deserves <span className="text-primary">The Best</span>
            </h2>
          </div>


          <div className="flex flex-col gap-12 max-w-5xl mx-auto">
            {data.benefits.map((benefit, idx) => (
              <section
                key={benefit.id}
                className={`flex flex-col md:flex-row items-center ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""} gap-8`}
              >
                <div className="h-[300px] overflow-hidden rounded-md md:w-1/2">
                <Image
                  src={benefit.image.url}
                  alt={benefit.image.alternativeText}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-md"
                />
                </div>
                <div className="space-y-6 md:w-1/2">
                  <h3 className="text-3xl font-medium text-secondary/90">
                    {benefit.title}
                  </h3>
                  <p className="text-xl text-secondary/80">
                    {benefit.description}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
};


// <section className="flex flex-col md:flex-row items-center gap-12">
//   <div className="flex-1">
//     <div className="h-[300px] overflow-hidden rounded-md">
//       {/* <Image
//         src="https://images.unsplash.com/photo-1634898635164-fbe5425b9d86?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         width={600}
//         height={400}
//         alt="dog"
//         /> */}
//       <img
//         src="https://images.unsplash.com/photo-1634898635164-fbe5425b9d86?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="woman"
//         className="w-full h-full object-cover object-bottom rounded-md"
//       />
//     </div>

//   </div>
//   <div className="flex-1 space-y-6">
//     <h3 className="text-3xl font-medium text-secondary/90">
//       Simple recipes for your pup
//     </h3>
//     <p className="text-xl text-secondary/80">
//       Easy homemade recipes and nutrition packs for complete, balanced meals
//     </p>
//   </div>
// </section>

// <section className="flex flex-col md:flex-row items-center gap-12">
//   <div className="flex-1 space-y-6">
//     <h3 className="text-3xl font-medium text-secondary/90">
//       Complete nutrition, no guesswork
//     </h3>
//     <p className="text-xl text-secondary/80">
//       Our recipes meet AAFCO standards, ensuring your dog gets all the essential vitamins and minerals
//     </p>
//   </div>
//   <div className="flex-1">
//     <img
//       src="https://plus.unsplash.com/premium_photo-1718652417723-9a2bf74e28c3?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//       alt="woman "
//       className="w-full h-full object-cover object-bottom rounded-md"
//     />
//   </div>
// </section>