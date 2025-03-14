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
import { KontaktLink } from "./components/Navigation";
import { usePathname } from "next/navigation";
import CountUp from "react-countup";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Home() {
  const { content } = useContent("pl");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const { toast } = useToast();
  const pathname = usePathname();

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
            <KontaktLink
              pathname={pathname}
              content={content.hero.buttonText}
              className="bg-primary text-white font-bold px-8 py-4 text-lg shadow-sm shadow-white/20 hover:bg-accent hover:text-accent-foreground rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.stats.map((stat, index) => (
              <div key={index}>
                <Card className="bg-primary text-white">
                  <CardContent className="p-6 text-center">
                    <div className=" text-2xl md:text-3xl font-bold">
                      <CountUp
                        end={Number(stat.number)}
                        suffix={stat.suffix}
                        duration={2.5}
                        separator=" "
                        decimal=","
                        decimals={stat.number.toString().includes(".") ? 1 : 0}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                        scrollSpyDelay={100}
                      />
                    </div>
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
          <h2 className="text-3xl font-bold text-center mb-2">
            {content.team.sectionLabel}
          </h2>
          <p className="text-center text-primary mb-12">
            {content.team.sectionTitle}
          </p>
          <div className="flex flex-col gap-12">
            {content.team.members.map((member, index) => (
              <Card
                key={index}
                className={`w-full max-w-4xl overflow-hidden border-0 shadow-lg ${
                  index % 2 === 1 ? "self-end" : ""
                }`}
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
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      {member.title}
                    </p>
                    <p className="text-gray-600 mb-6">{member.bio}</p>
                    <div className="mt-4">
                      <Link
                        href={member.linkHref}
                        className="inline-flex items-center text-primary font-medium hover:underline"
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
            {content.services.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {content.services.specializations.map((item, index) => (
              <Card key={index} className="overflow-hidden max-w-md">
                <div className="relative h-48">
                  <ImageComponent
                    src={item.backgroundImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item.description ||
                      "Odkryj więcej szczegółów na temat naszych specjalistycznych usług."}
                  </p>
                  <Link
                    href="/uslugi"
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Dowiedz się więcej <span className="ml-1">→</span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-10 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {content.testimonials.sectionTitle}
          </h2>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                dragFree: true,
              }}
            >
              <CarouselContent>
                {content.testimonials.items.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/3">
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
                        <p className="text-gray-600 mb-4">
                          {testimonial.content}
                        </p>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">
                          {testimonial.role}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <CarouselPrevious className="relative" />
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <CarouselNext className="relative" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50" id="kontakt">
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
