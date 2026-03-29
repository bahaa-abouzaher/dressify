"use client"

import { useState } from "react";
import { sendContactEmail } from "../_lib/actions"
import toast from "react-hot-toast";

function ContactForm() {
  const [sent, setSent] = useState(true);

  async function clientAction(formData) {
    if(sent) return;

    setSent(true);
    const res = await sendContactEmail(formData);

    if(res?.ok) {
      toast.success("Message Sent Successfully")
    }
    else {
      toast.error(res.error)
      setSent(false)
    }
  }

  if(sent) return(
    <div className="flex flex-col items-center gap-4 bg-(--cream-secondary) p-6 rounded-2xl max-w-xs text-center">
      <span className="text-3xl text-(--orange-main)">✓</span>
      <span className="text-lg font-semibold text-(--main-text)">Message sent successfully</span>
      <span className="text-sm text-(--gray-text)">We’ll get back to you soon.</span>
      <button className="mt-2 max-w-42 w-full text-sm font-semibold rounded-lg py-2 px-1 bg-(--orange-main) hover:bg-(--orange-secondary) transition" onClick={() => setSent(false)}>Send another message</button>
    </div>
  )
  
  return (
    <form 
      action={clientAction}
    >
      <p className="mb-2">You can use our Contact Form to reach us:</p>
      <h1 className="font-semibold text-2xl">Contact Us!</h1>
      <div className="text-base grid gap-2 md2:gap-3 grid-cols-1 mt-3">
        <div className="flex flex-col sm:max-w-90 gap-2">
          <label>Full Name *</label>
          <input
              name="name"
              required
              className="formInput shadow-sm"
              />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-2">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            className="formInput shadow-sm"
          />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-2">
          <label>Phone Number</label>
          <input
              name="number"
              type="text"
              inputMode="numeric"
              placeholder="+49 123 4567"
              pattern="^\+?[0-9 ]+$"
              className="formInput shadow-sm"
              />
        </div>
        
        <div className="flex flex-col sm:max-w-90 gap-2 text-sm">
          <label>Message *</label>
          <textarea
              name="message"
              required
              className="formInput shadow-sm min-h-25"
              />
        </div>

        <div className="sm:max-w-90 text-center">
          <button 
            type="submit"
            disabled={sent}
            className={`center max-w-40 w-full text-base font-semibold rounded-lg py-2 px-2 
              ${sent 
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-(--orange-main) hover:bg-(--orange-secondary) cursor-pointer" 
              }`}
          >
            Send
          </button>

        </div>
      </div>

    </form>
  )
}

export default ContactForm
