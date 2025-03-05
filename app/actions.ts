"use server"

import { z } from "zod"

const FormSchema = z.object({
  name: z.string().min(1, "Imię i nazwisko jest wymagane"),
  phone: z.string().min(1, "Numer telefonu jest wymagany"),
  email: z.string().email("Nieprawidłowy adres email"),
  date: z.string().min(1, "Data jest wymagana"),
  time: z.string().min(1, "Godzina jest wymagana"),
  projectDetail: z.string().min(1, "Opis problemu jest wymagany"),
  privacyAccepted: z.boolean().refine((val) => val === true, "Musisz zaakceptować politykę prywatności"),
})

export async function submitContactForm(formData: FormData) {
  console.log("Otrzymane dane formularza:", Object.fromEntries(formData))

  try {
    const validatedFields = FormSchema.safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      date: formData.get("date"),
      time: formData.get("time"),
      projectDetail: formData.get("projectDetail"),
      privacyAccepted: formData.get("privacyAccepted") === "on",
    })

    if (!validatedFields.success) {
      console.error("Błąd walidacji:", validatedFields.error.flatten().fieldErrors)
      return { success: false, errors: validatedFields.error.flatten().fieldErrors }
    }

    const { name, phone, email, date, time, projectDetail, privacyAccepted } = validatedFields.data

    console.log("Zwalidowane dane:", { name, phone, email, date, time, projectDetail, privacyAccepted })

    // Symulacja wywołania API (zastąp rzeczywistym wywołaniem API, gdy backend będzie gotowy)
    const response = await new Promise<{ success: boolean; message: string }>((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Formularz został pomyślnie wysłany! Skontaktujemy się z Tobą wkrótce." })
      }, 1000)
    })

    console.log("Odpowiedź API:", response)

    if (response.success) {
      return { success: true, message: response.message }
    } else {
      return { success: false, message: response.message || "Nie udało się wysłać formularza. Spróbuj ponownie." }
    }
  } catch (error) {
    console.error("Nieoczekiwany błąd w submitContactForm:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    }
  }
}

