"use client";

import { useContent } from "../hooks/useContent";
import { ImageComponent } from "../components/image-component";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function NewPage() {
  const { content } = useContent("pl");

  return (
    <main className="py-4">
      <section className="py-4">
        <div className="py-3 bg-gray-50 mb-12">
          <h2 className="text-3xl font-bold text-center mb-2">
            {content.team.sectionLabel}
          </h2>
          <p className="text-center text-sm text-primary">
            {content.team.sectionTitle}
          </p>
        </div>
        <div className="container mx-auto px-8">
          <div className="flex flex-col gap-24">
            {content.team.members.map((member, index) => (
              <motion.section
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                variants={fadeInUp}
                className="scroll-m-20"
                id={`member-${index}`}
              >
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 mb-8`}
                >
                  <div className="md:w-1/3 relative h-96 md:h-[600px]">
                    <ImageComponent
                      src={member.image || "/placeholder.svg"}
                      alt={member.imageAlt}
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className={`md:w-1/2 flex flex-col gap-6`}>
                    <h3 className="text-3xl font-bold text-primary">
                      {member.name}
                    </h3>
                    <p className="text-xl text-primary font-medium">
                      {member.title}
                    </p>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-600">{member.bio}</p>
                    </div>

                    {member.specializations && (
                      <div
                        className={`space-y-4 ${
                          index % 2 === 0 ? "md:self-start" : "md:self-end"
                        }`}
                      >
                        <h4 className="text-xl font-semibold">
                          {content.team.specializationsTitle}
                        </h4>
                        <div className="flex flex-col items-start">
                          <div>
                            {member.specializations.map((spec, i) => (
                              <div
                                key={i}
                                className="border-b py-4 min-w-80 max-w-lg"
                              >
                                <span className="text-left font-medium">
                                  {spec}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Link
                          href={member.linkHref}
                          className="inline-flex items-center text-primary font-medium hover:underline"
                        >
                          {member.linkText} <span className="ml-1">→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {member.certificates && member.certificates.length > 0 && (
                  <div className="mt-12">
                    <h4 className="text-2xl font-semibold mb-6 text-center">
                      {content.team.certificationsTitle}
                    </h4>
                    <div className="relative">
                      <Carousel
                        opts={{
                          align: "start",
                          dragFree: true,
                        }}
                        className="w-full"
                      >
                        <CarouselContent className="py-4">
                          {member.certificates.map((certificate, i) => (
                            <CarouselItem
                              key={i}
                              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                            >
                              <div className="p-1">
                                <Card className="border-white shadow-sm hover:shadow-md transition-shadow">
                                  <CardContent className="flex flex-col items-center p-6">
                                    <div className="relative w-full h-48 mb-4">
                                      <ImageComponent
                                        src={
                                          certificate.image ||
                                          "/certificate-placeholder.svg"
                                        }
                                        alt={certificate.title}
                                        fill
                                        className="object-contain"
                                      />
                                    </div>
                                    <h5 className="font-medium text-center">
                                      {certificate.title}
                                    </h5>
                                    {certificate.issuer && (
                                      <p className="text-sm text-gray-500 text-center mt-1">
                                        {certificate.issuer}
                                      </p>
                                    )}
                                    {certificate.date && (
                                      <p className="text-xs text-gray-400 text-center mt-1">
                                        {certificate.date}
                                      </p>
                                    )}
                                  </CardContent>
                                </Card>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white shadow-md hover:bg-gray-50" />
                        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white shadow-md hover:bg-gray-50" />
                      </Carousel>
                    </div>
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
