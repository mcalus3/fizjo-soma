export interface NavigationLink {
  text: string;
  href: string;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  imageAlt: string;
  linkText: string;
  linkHref: string;
  specializations?: string[];
  certificates?: Certificate[];
}

export interface Specialization {
  backgroundImage: string;
  title: string;
  description: string;
  items: Array<{
    name: string;
    price: string;
    description: string;
    backgroundImage: string;
    doctors: string[];
  }>;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface FooterSection {
  title: string;
  links?: NavigationLink[];
  items?: string[];
}

export interface Certificate {
  image: string;
  title: string;
  date?: string;
  issuer?: string;
}

export interface TeamContent {
  sectionLabel: string;
  sectionTitle: string;
  specializationsTitle: string;
  certificationsTitle: string;
  members: TeamMember[];
}

export interface ContentStructure {
  navigation: {
    brand: string;
    links: NavigationLink[];
    contactButton: string;
  };
  images: {
    hero: {
      src: string;
      alt: string;
    };
  };
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  stats: Array<{
    number: number;
    suffix: string;
    text: string;
  }>;
  team: TeamContent;
  specializations: {
    sectionTitle: string;
    items: Specialization[];
  };
  testimonials: {
    sectionTitle: string;
    items: Testimonial[];
  };
  contact: {
    sectionTitle: string;
    address1: string;
    address2: string;
    phone: string;
    email: string;
  };
  footer: {
    brand: {
      name: string;
      tagline: string;
    };
    sections: FooterSection[];
    copyright: string;
  };
  services: {
    title: string;
    description: string;
    bookButton: string;
    specializations: Array<Specialization>;
  };
}
