import SignInForm from "./_components/SignInForm";

export default function page() {
    return (
        <>
        <div className="container mx-auto px-4">
            <div className="min-h-screen flex items-center justify-center">
               <div className=" w-full max-w-2xl ">

                    <SignInForm />
               </div>
            </div>
        </div>
        </>
    )
}