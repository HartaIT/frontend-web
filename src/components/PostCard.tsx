import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Linkify from "linkify-react";
import { Link } from "react-router-dom";

interface postItem {
  id: number;
  Company: number;
  City: string[];
  Keywords: string[];
  Text: string;
  Link: string;
  DatePosted: string;
}

interface companieObject {
  id: number;
  Name: string;
  Logo: string;
  Category: string;
  Links: string[];
}

function PostCard({ item }: { item: postItem }) {
  const idCompanie = item?.Company;
  const [companie, setCompanie] = useState<companieObject>();
  const [loading, setLoading] = useState<boolean>(false);

  const renderLink = ({
    attributes,
    content,
  }: {
    attributes: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [attr: string]: any;
    };

    content: string;
  }) => {
    const { href, ...props } = attributes;
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 hover:underline"
        {...props}
      >
        {content}
      </a>
    );
  };

  useEffect(() => {
    const fetchCompanie = async (id: number) => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Companies")
        .select()
        .eq("id", id);

      if (error) console.warn(error);
      else if (data) {
        // console.log(data);
        setCompanie(data[0]);
      }

      setLoading(false);
    };

    if (idCompanie) fetchCompanie(idCompanie);
  }, [idCompanie]);

  if (loading)
    return (
      <div className="mb-4 flex w-[412px] flex-col space-y-4 rounded-md border border-base-300 bg-base-200 p-4">
        <div className="flex h-16 w-full rounded-md bg-base-300" />
        <div className="flex h-8 w-1/2 rounded-md bg-base-300" />

        <div className="h-32 w-full bg-base-300" />
      </div>
    );

  return (
    <div
      // href={item?.Link}
      // target="_blank"
      // rel="noreferrer"
      key={item?.id}
      className="mb-4 flex w-full flex-col space-y-4 rounded-md border border-base-300 bg-base-200 p-4"
    >
      <a
        href={companie?.Links[0]}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between"
      >
        <div className="flex flex-col">
          <div className="w-80 text-xl font-bold">{companie?.Name}</div>
          <span className="text-xs opacity-80">{companie?.Category}</span>
        </div>
        <div>
          <img
            src={companie?.Logo}
            alt="logo"
            className="avatar aspect-square h-12 w-12 rounded-md object-cover shadow-md transition-all duration-300 hover:scale-110"
          />
        </div>
      </a>
      <div className="flex flex-wrap gap-2">
        {item?.Keywords.map((keyword) => (
          <Link
            to={`/categorie/${keyword}`}
            key={keyword}
            className="badge badge-primary text-xs font-medium capitalize hover:bg-opacity-80"
          >
            {keyword}
          </Link>
        ))}

        {item?.City?.map((orasel) => (
          <Link
            to={`/orase/${orasel}`}
            key={orasel}
            className="badge badge-secondary text-xs font-medium capitalize hover:bg-opacity-80"
          >
            {orasel}
          </Link>
        ))}
        {item?.City?.length === 0 && (
          <span className="badge badge-error text-xs font-medium capitalize text-white hover:bg-opacity-80">
            Oras Necunoscut
          </span>
        )}
      </div>
      <Linkify as="p" options={{ render: renderLink }} className="pb-2 text-sm">
        {item?.Text}
      </Linkify>
      <span className="text-end text-xs opacity-60">
        Postat pe <b>{item?.DatePosted.split("-").reverse().join(".")}</b>
      </span>
    </div>
  );
  //companie?.Name
  //companie?.Logo
  //companie?.Category
  //companie?.Links[0]
}

export default PostCard;
