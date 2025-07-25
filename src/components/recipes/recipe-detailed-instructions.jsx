

const RecipeDetailedInstructions = ({ data }) => {


  return (
    <div className="">

        {/* Title */}
        <h1 className="text-4xl font-bold text-secondary mb-6">Detailed Instructions</h1>

          {/* Detailed Instuctions */}
          {data.map((step) => (
            <section key={step.id} className="mb-8">

              {/* title of step */}
              <h3 className="font-semibold text-secondary text-2xl">{step.title}</h3>

              {/* text of step */}
              {step.text.map((p, pIndex) => (
                <p key={pIndex} className="text-secondary mb-2">
                  {p.children.map((child, cIdx) =>
                    child.bold ? (
                      <strong key={cIdx}>{child.text}</strong>
                    ) : (
                      <span key={cIdx}>{child.text}</span>
                    )
                  )}
                </p>
              ))}
              <div className="">
              {/* Step Images */}
                {step.images && step.images.length > 0 && (
                  <div className="flex flex-wrap sm:flex-nowrap flex-col sm:flex-row items-center mb-4 gap-4">
                    {step.images.map((img) => (
                      <img
                        key={img.id}
                        src={
                          // Use the best available format, fallback to original
                          img.formats?.medium?.url ||
                          img.formats?.small?.url ||
                          img.formats?.thumbnail?.url ||
                          img.url
                        }
                        alt={img.alternativeText || img.name || step.title}
                        className="rounded-lg object-cover w-full sm:w-1/2 lg:w-1/2"
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}

    </div>
  );
};

export default RecipeDetailedInstructions;
