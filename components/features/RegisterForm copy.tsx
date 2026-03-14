// "use client";

// import { useActionState, useEffect, useRef, useState } from "react";
// import EmailOrPhoneField from "./EmailOrPhone";
// import { Button } from "../ui";
// import { useFormStatus } from "react-dom";
//  import useToast from "@/hooks";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { useCountdown } from "@/hooks/useCountdown";
// import { responseState } from "@/actions";

// const initialState: responseState = {
//   success: false,
//   message: "",
// };

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" className="w-full" disabled={pending}>
//       {pending ? "Generating OTP..." : "Generate OTP"}
//     </Button>
//   );
// }

// export default function RegisterForm() {
//   const [modalOpen, setModalOpen] = useState<boolean>(false);
//   const [otp, setOtp] = useState("");
//   const [submitted, setSubmitted] = useState<boolean>(false);
//   const formRef = useRef<HTMLFormElement>(null);

//   const [state, formAction] = useActionState(generateOtpAction, initialState);
//   const [verifyState, verifyFormAction] = useActionState(verifyOtpAction, initialState);

//   const { showSuccess } = useToast();
//   const { secondsLeft, active, start, reset } = useCountdown(120);

//   const minutes = Math.floor(secondsLeft / 60);
//   const secs = secondsLeft % 60;
//   const formatted = `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
//   // OTP generated successfully → open modal
//   useEffect(() => {
//     if (state.success && state.message) {
//       showSuccess(state.message);
//       start();
//       setTimeout(() => setModalOpen(true), 500);
//     }
//   }, [state.success, state.message]); // ✅ primitives only

//   // Reset OTP input on failed verify
//   useEffect(() => {
//     if (!verifyState.success && verifyState.message) {
//       setTimeout(() => {
//         setOtp("");
//         setSubmitted(false);
//       }, 300);
//     }
//   }, [verifyState.success, verifyState.message]); // ✅ primitives only

//   // OTP verified successfully → close modal / redirect
//   useEffect(() => {
//     if (verifyState.success && verifyState.message) {
//       showSuccess(verifyState.message);
//       setTimeout(() => setModalOpen(false), 300);
//       // TODO: redirect or next step
//     }
//   }, [verifyState.success, verifyState.message]); // ✅ primitives only

//   const handleResend = () => {
//     reset();
//     setOtp("");
//     setSubmitted(false);
//     window.location.reload();
//   };

//   const handleCancel = () => {
//     setModalOpen(false);
//     setOtp("");
//     setSubmitted(false);
//     window.location.reload();
//   };

//   return (
//     <>
//       {/* Step 1: Generate OTP */}
//       <form action={formAction} className="space-y-4 px-4">
//         <EmailOrPhoneField name="emailOrPhone" />
//         <input type="hidden" name="purpose" value="register" />
//         {!state.success && !modalOpen && state.message && (
//           <p className="text-xs text-red-500">{state.message}</p>
//         )}
//         <SubmitButton />
//       </form>

//       {/* Step 2: Verify OTP */}
//       <Dialog
//         open={modalOpen}
//         onOpenChange={(open) => {
//           if (open) setModalOpen(true);
//         }}
//       >
//         <DialogContent
//           showCloseButton={false}
//           onInteractOutside={(e) => e.preventDefault()}
//           onEscapeKeyDown={(e) => e.preventDefault()}
//         >
//           <DialogHeader>
//             <DialogTitle>Verify OTP</DialogTitle>
//             <DialogDescription>
//               Please check your email or phone for the OTP.
//             </DialogDescription>
//           </DialogHeader>

//           <form ref={formRef} action={verifyFormAction} className="space-y-4 px-4">
//             <InputOTP
//               maxLength={6}
//               name="otp"
//               value={otp}
//               onChange={setOtp}
//             >
//               <InputOTPGroup>
//                 <InputOTPSlot index={0} />
//                 <InputOTPSlot index={1} />
//                 <InputOTPSlot index={2} />
//                 <InputOTPSlot index={3} />
//                 <InputOTPSlot index={4} />
//                 <InputOTPSlot index={5} />
//               </InputOTPGroup>
//             </InputOTP>

//             <input type="hidden" name="purpose" value="register" />

//             {/* Verify error */}
//             {!verifyState.success && verifyState.message && (
//               <p className="text-xs text-red-500">{verifyState.message}</p>
//             )}

//             {/* Actions: verify, resend, cancel */}
//             <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground">
//               <Button
//                 type="submit"
//                 className="w-full text-xs"
//                 disabled={otp.length !== 6}
//               >
//                 Verify OTP
//               </Button>
//               <div className="flex items-center justify-between gap-2">
//                 {active ? (
//                   <span>Resend OTP in {formatted}</span>
//                 ) : (
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="text-xs"
//                     onClick={handleResend}
//                   >
//                     Resend OTP
//                   </Button>
//                 )}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="text-xs"
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }