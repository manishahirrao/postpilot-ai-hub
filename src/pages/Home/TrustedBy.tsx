import PageSection from "@/components/Layout/PageSection";
import Animated from "@/components/Layout/Animated";

const clients = [
  "TechCorp", "InnovateLabs", "StartupHub", "GrowthCo", "TalentHive", "WebRecruit"
];

export function TrustedBy() {
  return (
    <PageSection className="py-16 hero-gradient">
      <Animated as="h3" className="text-center text-lg font-semibold text-foreground/80 mb-12">
        Trusted by Top Enterprises Globally
      </Animated>
      
      <Animated className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
        {clients.map((client, index) => (
          <Animated
            key={client}
            className="text-2xl font-bold text-foreground/70 hover:text-foreground transition-colors cursor-pointer backdrop-blur-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg"
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 0.4, scale: 1 }
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, opacity: 0.6 }}
          >
            {client}
          </Animated>
        ))}
      </Animated>
    </PageSection>
  );
}
