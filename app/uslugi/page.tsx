"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useContent } from "../hooks/useContent";
import { ImageComponent } from "../components/image-component";
import { KontaktLink } from "../components/Navigation";
import { Specialization } from "../types/content";

interface Procedure {
  name: string;
  price: string;
  description: string;
  backgroundImage: string;
  doctors: string[];
}

export default function ServicesPage() {
  const { content } = useContent();
  const { title, description, specializations, bookButton } = content.services;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <p className="text-lg text-gray-700 mb-8 max-w-prose">{description}</p>
      </section>
      <Accordion type="single" className="space-y-10" collapsible>
        {specializations.map((specialization: Specialization, i) => (
          <div key={i}>
            <div className="text-2xl font-semibold mb-3">
              {specialization.title}
            </div>
            {specialization.items.map((procedure: Procedure, j) => (
              <AccordionItem key={`${i} ${j}`} value={`${i} ${j}`}>
                <AccordionTrigger className="flex justify-between items-center p-4 hover:no-underline hover:bg-black/5">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{procedure.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-primary font-medium">
                        {procedure.price}
                      </p>
                      <span className="text-sm text-gray-500">|</span>
                      <div className="flex gap-2">
                        {procedure.doctors.map((doctor, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-600"
                          >
                            {doctor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="relative pb-0">
                  <ImageComponent
                    src={procedure.backgroundImage}
                    alt={procedure.name}
                    fill
                    className="object-cover"
                  />
                  <div className="flex flex-col z-20 bg-white/80 backdrop-blur-sm pb-4">
                    <div className=" text-black p-4 rounded-md">
                      <p className=" py-1 px-2 mb-4 text-base font-medium rounded max-w-prose text-wrap: pretty">
                        <span>{procedure.description}</span>
                      </p>
                    </div>
                    <KontaktLink
                      pathname={"/#kontakt"}
                      content={bookButton}
                      className="mx-6 shadow-md bg-primary w-fit text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        ))}
      </Accordion>
    </main>
  );
}
