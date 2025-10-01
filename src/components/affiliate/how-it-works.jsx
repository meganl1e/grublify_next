export default function HowItWorks() {
  const steps = [
    {
      step: "STEP 1",
      title: "Sign Up",
      description: "Signing up only takes 2 minutes. Approval is quick and easy.",
      icon: "📝"
    },
    {
      step: "STEP 2", 
      title: "Promote",
      description: "Promote Grublify using your unique referral code and get awesome discounts.",
      icon: "📢"
    },
    {
      step: "STEP 3",
      title: "Earn", 
      description: "Earn $15 per new customer, plus 10% commission on their purchases.",
      icon: "💰"
    }
  ]

  return (
    <section className="py-8 md:py-10 bg-primary-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            How It Works
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-primary w-full max-w-sm p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group">
              <div className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 mb-4">
                <span className="text-2xl">{step.icon}</span>
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <div className="text-primary font-bold text-md tracking-widest">{step.step}</div>
                <p className="text-2xl font-extrabold text-secondary group-hover:text-primary transition-colors duration-300">{step.title}</p>
              </div>
              <p className="text-secondary/80 text-base text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
