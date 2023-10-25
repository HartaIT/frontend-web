import ErrorSVG from "../assets/authentication-4.svg";

export default function ErrorPage() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center space-y-8 p-8">
      <img src={ErrorSVG} alt="Error" className="w-96 md:mr-8" />
      <h1 className="text-5xl font-bold">Oops!</h1>
      <p className="text-xl">Nu am putut gasi pagina pe care o cautai</p>
    </div>
  );
}
