export interface NavigationLink {
  text: string
  href: string
}

export interface TeamMember {
  name: string
  title: string
  bio: string
  image: string
  imageAlt: string
  linkText: string
  linkHref: string
}

export interface Specialization {
  icon: string
  title: string
}

export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

export interface PricingPlan {
  title: string
  price: string
  features: string[]
  buttonText: string
}

export interface FooterSection {
  title: string
  links?: NavigationLink[]
  items?: string[]
}

export interface ContentStructure {
  navigation: {
    brand: string
    links: NavigationLink[]
    contactButton: string
  }
  hero: {
    title: string
    subtitle: string
    buttonText: string
  }
  stats: Array<{
    number: string
    text: string
    suffix: string
  }>
  team: {
    sectionLabel: string
    sectionTitle: string
    members: TeamMember[]
  }
  specializations: {
    sectionTitle: string
    items: Specialization[]
  }
  testimonials: {
    sectionTitle: string
    items: Testimonial[]
  }
  pricing: {
    sectionTitle: string
    plans: PricingPlan[]
  }
  contact: {
    sectionTitle: string
    form: {
      namePlaceholder: string
      phonePlaceholder: string
      emailPlaceholder: string
      datePlaceholder: string
      timePlaceholder: string
      detailsPlaceholder: string
      privacyLabel: string
      submitButton: string
      submittingButton: string
      successTitle: string
      successMessage: string
    }
    image: string
    imageAlt: string
  }
  footer: {
    brand: {
      name: string
      tagline: string
    }
    sections: FooterSection[]
    copyright: string
  }
  images: {
    hero: {
      src: string
      alt: string
    }
  }
}

