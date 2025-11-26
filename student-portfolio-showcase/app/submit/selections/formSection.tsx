  // Reusable Form Section Component
  type FormSectionProps = {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  };

    // FormSection component to structure form sections
 export function FormSection({ title, subtitle, children }: FormSectionProps) {
    return (
      <section className="mb-10">
        <h2 className="italic text-4xl font-semibold text-black mb-1 text-center">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl font-medium text-gray-600 mb-6 text-center italic">
            {subtitle}
          </p>
        )}
        {children}
      </section>
    );
  }