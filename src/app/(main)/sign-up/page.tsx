import LoginForm from "./_components/SignInForm";

export default function page() {
    return (
        <>
        <div className="container mx-auto px-4">
            <div className="min-h-screen flex items-center justify-center">
               <div className="shadow-[#007BFF2B] shadow-xl border  rounded-2xl p-8  w-full max-w-2xl ">
                    <LoginForm />
               </div>
            </div>
        </div>
        </>
    )
}