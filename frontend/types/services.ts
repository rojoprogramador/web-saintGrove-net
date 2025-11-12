export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  benefits: string[];
  process: {
    title: string;
    description: string;
  }[];
  technologies?: string[];
  pricing?: {
    from: number;
    currency: string;
    period: string;
  };
  cta: {
    text: string;
    link: string;
  };
}
