"use client";

import type React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import { submitContactForm } from "./actions";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useContent } from "./hooks/useContent";
import { ImageComponent } from "./components/image-component";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { content } = useContent("pl");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      console.log("Form data before submission:", Object.fromEntries(formData));

      const result = await submitContactForm(formData);
      console.log("Form submission result:", result);

      if (result.success) {
        setDialogMessage(result.message ?? "");
        setDialogOpen(true);
        form.reset();
      } else {
        toast({
          title: "Błąd",
          description: result.message || "Wystąpił błąd. Spróbuj ponownie.",
          variant: "destructive",
          action: (
            <ToastAction altText="Spróbuj ponownie">
              Spróbuj ponownie
            </ToastAction>
          ),
        });
        console.error(
          "Form submission error:",
          result.errors || result.message
        );
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);

      if (error instanceof Error) {
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      } else {
        console.error("Unknown error type:", typeof error);
      }

      toast({
        title: "Błąd",
        description: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
        variant: "destructive",
        action: (
          <ToastAction altText="Spróbuj ponownie">Spróbuj ponownie</ToastAction>
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="font-bold text-xl text-blue-600">
              {content.navigation.brand}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {content.navigation.links.map((link, index) => (
              <a key={index} href={link.href} className="text-sm font-medium">
                {link.text}
              </a>
            ))}
            <Button variant="outline">
              {content.navigation.contactButton}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageComponent
            src={content.images.hero.src || "/placeholder.svg"}
            alt={content.images.hero.alt}
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {content.hero.title}
            </h1>
            <p className="text-xl mb-8">{content.hero.subtitle}</p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-6 text-lg shadow-md"
            >
              {content.hero.buttonText}
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.stats.map((stat, index) => (
              <div key={index}>
                <Card className="bg-blue-600 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold">{stat.number}</div>
                    <div className="text-sm mt-2">{stat.text}</div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-blue-600 mb-2">
            {content.team.sectionLabel}
          </p>
          <h2 className="text-3xl font-bold text-center mb-12">
            {content.team.sectionTitle}
          </h2>

          <div className="space-y-12">
            {content.team.members.map((member, index) => (
              <Card
                key={index}
                className="w-full overflow-hidden border-0 shadow-lg"
              >
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="md:w-1/3 relative h-64 md:h-auto">
                    <ImageComponent
                      src={member.image || "/placeholder.svg"}
                      alt={member.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-navy-blue mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4">
                      {member.title}
                    </p>
                    <p className="text-gray-600 mb-6">{member.bio}</p>
                    <div className="mt-4">
                      <Link
                        href={member.linkHref}
                        className="inline-flex items-center text-blue-600 font-medium hover:underline"
                      >
                        {member.linkText} <span className="ml-1">→</span>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized We Provide Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1e2b5e] mb-12">
            {content.specializations.sectionTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {content.specializations.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-4 border-l-4 border-blue-600 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mr-3">{item.icon}</span>
                <h3 className="font-medium text-navy-blue">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {content.testimonials.sectionTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.testimonials.items.map((testimonial, index) => (
              <div key={index}>
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{testimonial.content}</p>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {content.pricing.sectionTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.pricing.plans.map((plan, index) => (
              <div key={index}>
                <Card className="border-2">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
                    <div className="text-3xl font-bold mb-6">{plan.price}</div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full">{plan.buttonText}</Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageComponent
                src={content.contact.image || "/placeholder.svg"}
                alt={content.contact.imageAlt}
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                {content.contact.sectionTitle}
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder={content.contact.form.namePlaceholder}
                    name="name"
                    required
                  />
                  <Input
                    placeholder={content.contact.form.phonePlaceholder}
                    name="phone"
                    required
                  />
                </div>
                <Input
                  placeholder={content.contact.form.emailPlaceholder}
                  type="email"
                  name="email"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder={content.contact.form.datePlaceholder}
                    type="date"
                    name="date"
                    required
                  />
                  <Input
                    placeholder={content.contact.form.timePlaceholder}
                    type="time"
                    name="time"
                    required
                  />
                </div>
                <Textarea
                  placeholder={content.contact.form.detailsPlaceholder}
                  name="projectDetail"
                  required
                />
                <div className="flex items-center space-x-2">
                  <Checkbox id="privacy" name="privacyAccepted" required />
                  <label htmlFor="privacy" className="text-sm">
                    {content.contact.form.privacyLabel}
                  </label>
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? content.contact.form.submittingButton
                    : content.contact.form.submitButton}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl text-blue-600 mb-4">
                {content.footer.brand.name}
              </div>
              <p className="text-sm text-gray-600">
                {content.footer.brand.tagline}
              </p>
            </div>
            {content.footer.sections.map((section, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links &&
                    section.links.map((link, i) => (
                      <li key={i}>
                        <a href={link.href} className="text-sm">
                          {link.text}
                        </a>
                      </li>
                    ))}
                  {section.items &&
                    section.items.map((item, i) => (
                      <li key={i} className="text-sm">
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            {content.footer.copyright}
          </div>
        </div>
      </footer>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{content.contact.form.successTitle}</DialogTitle>
            <DialogDescription>
              {dialogMessage || content.contact.form.successMessage}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
