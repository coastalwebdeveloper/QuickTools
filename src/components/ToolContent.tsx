import { ReactNode } from "react";

interface ToolContentProps {
  title: string;
  description: string;
  howToUse: string[];
  benefits: string[];
  useCases: string[];
  faq: { question: string; answer: string }[];
  children?: ReactNode;
}

const ToolContent = ({ title, description, howToUse, benefits, useCases, faq }: ToolContentProps) => {
  return (
    <div className="mt-8 space-y-8 text-sm">
      <section>
        <h2 className="text-2xl font-bold mb-3">What is {title}?</h2>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">How to Use {title}</h2>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          {howToUse.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Key Benefits & Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          {benefits.map((benefit, i) => (
            <li key={i}>{benefit}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Common Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          {useCases.map((useCase, i) => (
            <li key={i}>{useCase}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <div key={i} className="bg-secondary/30 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolContent;
