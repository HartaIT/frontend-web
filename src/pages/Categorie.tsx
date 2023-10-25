import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import SadSVG from "../assets/sad-face-1.svg";

import { supabase } from "../supabaseClient";
import Masonry from "react-masonry-css";
import PostCard from "../components/PostCard";

function Categorie() {
  const { categorie } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<object>({});

  const [PAGE_COUNT, setPAGE_COUNT] = useState<number>(1);
  const [countItems, setCountItems] = useState<number>(0);
  const offset = 20;

  const categorii = ["Hackathon", "Workshop", "Internship", "Contest"];

  useEffect(() => {
    const fetchPosts = async (categorie: string) => {
      const from = offset * (PAGE_COUNT - 1);
      const to = from + offset;

      setLoading(true);
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .containedBy("Keywords", [categorie])
        .order("DatePosted", { ascending: false })
        .range(from, to);

      if (error) console.warn(error);
      else if (data) {
        setData(data);
      }

      setLoading(false);
    };
    if (categorie) {
      fetchPosts(categorie);
      window.scrollTo(0, 0);
    }
  }, [categorie, PAGE_COUNT]);

  useEffect(() => {
    const fetchCount = async (categorie: string) => {
      const { error, count } = await supabase
        .from("Posts")
        .select("*", { count: "exact", head: true })
        .containedBy("Keywords", [categorie]);
      if (error) {
        console.error(error);
      }
      if (count) {
        setCountItems(count);
      }
    };

    if (categorie) fetchCount(categorie);
  }, [categorie]);

  if (categorie) {
    if (loading)
      return (
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    if (Object.keys(data).length !== 0)
      return (
        <div className="flex flex-col space-y-4 md:mt-2">
          <div className="flex items-center justify-center gap-4">
            {categorii.map((item) => (
              <a
                href={`/categorie/${item.toLowerCase()}`}
                key={item}
                className="rounded-lg border border-gray-300/60 bg-base-300 px-4 py-2 text-center font-medium capitalize transition-all hover:scale-105 hover:border-base-300 hover:bg-base-200"
              >
                {item}
              </a>
            ))}
          </div>
          <Masonry
            breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
            className="flex w-full justify-center gap-4"
          >
            {Object.values(data).map((item) => (
              <PostCard item={item} key={item?.id} />
            ))}
          </Masonry>

          <div className="flex items-center justify-center space-x-4">
            <button
              className="btn btn-ghost"
              disabled={PAGE_COUNT === 1}
              onClick={() => setPAGE_COUNT(PAGE_COUNT - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <span className="text-xl font-bold">
              Pagina {PAGE_COUNT}/{Math.ceil(countItems / 20)}
            </span>
            <button
              disabled={PAGE_COUNT === Math.ceil(countItems / 20)}
              className="btn btn-ghost"
              onClick={() => setPAGE_COUNT(PAGE_COUNT + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        // item?.id
        // item?.Company
        // item?.Keyword -> array -> (workshop/ hackathon / internship)
        // item?.city -> array
        // item?.DatePosted
        // item?.Link
        // item?.Text
      );
  }
  if (categorie && Object.keys(data).length === 0)
    return (
      <div className="flex h-[100dvh] flex-col items-center justify-center space-y-8 p-8">
        <div>
          <img src={SadSVG} alt="Trist" className="h-96" />
        </div>
        <span className="text-center text-5xl font-bold">
          Nu am putut gasi postari pentru aceasta categorie
        </span>
        <span className="text-center">
          <p className="font-medium">
            Momentan nu avem postari pentru acesta categorie.
          </p>
          <p className="text-sm opacity-80">
            Daca detii detalii despre un workshop, hackathon sau internship,
            contacteaza-ne pentru a adauga postarea!
          </p>
        </span>
      </div>
    );
}

export default Categorie;
