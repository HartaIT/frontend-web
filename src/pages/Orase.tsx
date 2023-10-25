import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import LocationSVG from "../assets/global-warming-3.svg";
import SadSVG from "../assets/sad-face-1.svg";

import listaOrase from "../assets/orase.json";

import { supabase } from "../supabaseClient";
import Masonry from "react-masonry-css";
import PostCard from "../components/PostCard";

function Orase() {
  const { oras } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<object>({});

  // check if oras is in listaOrase
  const orasExists = listaOrase.some((item) => item.name === oras);

  //TODO: ADD PAGINATION

  const [PAGE_COUNT, setPAGE_COUNT] = useState<number>(1);
  const [countItems, setCountItems] = useState<number>(0);
  const offset = 20;

  useEffect(() => {
    const fetchCity = async (oras: string) => {
      const from = offset * (PAGE_COUNT - 1);
      const to = from + offset;

      setLoading(true);
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .containedBy("City", [oras])
        .order("DatePosted", { ascending: false })
        .range(from, to);

      if (error) console.warn(error);
      else if (data) {
        setData(data);
      }

      setLoading(false);
    };
    if (oras) {
      fetchCity(oras);
      window.scrollTo(0, 0);
    }
  }, [oras, PAGE_COUNT]);

  useEffect(() => {
    const fetchCount = async (oras: string) => {
      const { error, count } = await supabase
        .from("Posts")
        .select("*", { count: "exact", head: true })
        .containedBy("City", [oras]);
      if (error) {
        console.error(error);
      }
      if (count) {
        setCountItems(count);
      }
    };

    if (oras) fetchCount(oras);
  }, [oras]);

  if (oras && orasExists) {
    if (loading)
      return (
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    if (Object.keys(data).length !== 0)
      return (
        <div className="flex flex-col md:mt-2">
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
  if (orasExists && Object.keys(data).length === 0)
    return (
      <div className="flex h-[100dvh] flex-col items-center justify-center space-y-8 p-8">
        <div>
          <img src={SadSVG} alt="Trist" className="h-96" />
        </div>
        <span className="text-center text-5xl font-bold">
          Nu am putut gasi postari pentru acest oras
        </span>
        <span className="text-center">
          <p className="font-medium">
            Momentan nu avem postari pentru acest oras.
          </p>
          <p className="text-sm opacity-80">
            Daca detii detalii despre un workshop, hackathon sau internship,
            contacteaza-ne pentru a adauga postarea!
          </p>
        </span>
      </div>
    );

  if (oras && !orasExists)
    return (
      <div className="flex h-[100dvh] flex-col items-center justify-center space-y-8 p-8">
        <div>
          <img src={LocationSVG} alt="Locatie" className="h-96" />
        </div>
        <span className="text-center text-5xl font-bold">Orasul nu exista</span>
        <span>
          Daca orasul tau nu este in baza noastra de baza, contacteaza-ne!
        </span>
      </div>
    );
}

export default Orase;
