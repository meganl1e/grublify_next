import Link from 'next/link';

const RecipeDetailedInstructions = ({ data }) => {

  // Helper function to render a child node (handles text, bold, links, etc.)
  const renderChild = (child, cIdx) => {
    // Handle links
    if (child.type === 'link' || child.url) {
      const url = child.url || child.href;
      const isInternal = url?.startsWith('/');
      
      if (isInternal) {
        return (
          <Link 
            key={cIdx} 
            href={url} 
            className="text-secondary underline hover:text-primary transition-colors"
          >
            {child.children ? child.children.map((linkChild, lIdx) => renderChild(linkChild, lIdx)) : child.text}
          </Link>
        );
      }
      
      // External link
      return (
        <a 
          key={cIdx}
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-secondary underline hover:text-primary transition-colors"
        >
          {child.children ? child.children.map((linkChild, lIdx) => renderChild(linkChild, lIdx)) : child.text}
        </a>
      );
    }
    
    // Handle bold text
    if (child.bold) {
      return <strong key={cIdx}>{child.text}</strong>;
    }
    
    // Regular text
    return <span key={cIdx}>{child.text}</span>;
  };

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
                  {p.children.map((child, cIdx) => renderChild(child, cIdx))}
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
