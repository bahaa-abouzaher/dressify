"use client"

import toast from "react-hot-toast";
import { checkoutAction } from "../_lib/actions"
import { redirect } from "next/navigation";
import { useSubmit } from "./SubmitContext";

function CheckoutForm() {
  const { loading, setLoading } = useSubmit();

  async function handleSubmit(e) {
    e.preventDefault();
    if(loading) return;

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await checkoutAction(formData);

    if(res?.ok) {
      toast.success("Purchase Successful");
      redirect(`order-success/${res.order_id}`)
    }
    else {
      toast.error("Purchase wasn't Successful, Please try again or contact our Support")
      setLoading(false);
    }
  }
  
  return (
    <form 
      id="checkout-form"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold">Personal Info</h1>
      <div className="text-base grid gap-2 sm:grid-cols-2 grid-cols-1 mt-3">
        <div className="flex flex-col sm:max-w-90 gap-1">
          <label htmlFor="firstName">First Name <span className="text-[9px]">(required)</span></label>
          <input
            id="firstName"
            name="firstName"
            required
            className="formInput shadow-sm"
          />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-1">
          <label htmlFor="lastName">Last Name <span className="text-[9px]">(required)</span></label>
          <input
            id="lastName"
            name="lastName"
            required
            className="formInput shadow-sm"
          />  
        </div>


        <div className="flex flex-col sm:max-w-90 gap-1">
          <label htmlFor="number">Phone Number</label>
          <input
            id="number"
            name="number"
            type="text"
            inputMode="numeric"
            placeholder="+49 123 4567"
            pattern="^\+?[0-9 ]+$"
            className="formInput shadow-sm"
          />
        </div>
      </div>

      <h1 className="mt-6 font-bold">Address</h1>
      <div className="text-base grid gap-2 sm:grid-cols-2 grid-cols-1 mt-3">
        <div className="flex flex-col sm:max-w-90 gap-1">
          <label htmlFor="street">Street <span className="text-[9px]">(required)</span></label>
          <input
            id="street"
            name="street"
            required
            className="formInput shadow-sm"
          />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-1">
          <label htmlFor="additionalInfo">Additional delivery info</label>
          <input
            id="additionalInfo"
            name="additionalInfo"
            className="formInput shadow-sm"
          />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-1">
          <label htmlFor="postcode">
            Postcode <span className="text-[9px]">(required)</span>
          </label>
          <input
            id="postcode"
            name="postcode"
            required
            type="text"
            inputMode="numeric"
            pattern="[0-9]+$"
            placeholder="54321"
            className="formInput shadow-sm"
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity("Please enter numbers only");
            }}
            onInput={(e) => {
              e.currentTarget.setCustomValidity(""); // reset message on input
            }}
          />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-1">
          <label htmlFor="city">
            City <span className="text-[9px]">(required)</span>
          </label>
          <input
            id="city"
            name="city"
            required
            className="formInput shadow-sm"
          />
        </div>
      </div>

    </form>
  )
}

export default CheckoutForm
