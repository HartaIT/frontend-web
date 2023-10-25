import InboxSVG from "../assets/clean-inbox-5.svg";

function CTA() {
  return (
    <div className="container relative mx-auto flex items-center justify-between overflow-hidden rounded-md border border-base-300 bg-base-200/60 p-8">
      <div className="flex flex-col justify-center">
        <h1 className="mb-6 text-xl font-bold leading-tight md:leading-normal lg:max-w-3xl lg:text-4xl">
          Inscrie-te aici si vei primi email-uri despre cele mai noi concursuri
          din orasul tau!
        </h1>
        <form action="submit" className="flex justify-start">
          <div className="join">
            <input
              className="input join-item input-bordered w-full"
              placeholder="Email"
            />
            <button type="button" className="btn btn-primary join-item">
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <div className="hidden md:block">
        <img src={InboxSVG} alt="Inbox" className="mr-2 w-48" />
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default CTA;
