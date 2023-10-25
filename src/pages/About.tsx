const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function About() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center md:p-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Echipa noastra
      </h1>
      <p className="mt-2 text-center text-lg leading-8 text-gray-600">
        Cu ajutorul acestor oameni minunati am reusit sa facem acest proiect.
      </p>

      <div className="p-6" />

      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-3">
        {people.map((person) => (
          <li key={person.name}>
            <div className="flex items-center gap-x-6">
              <img
                className="h-24 w-24 rounded-full"
                src={person.imageUrl}
                alt=""
              />
              <div>
                <h2 className="text-2xl font-semibold leading-7 tracking-tight text-gray-900">
                  {person.name}
                </h2>
                <p className="text-sm font-semibold leading-6 text-indigo-600">
                  {person.role}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;
