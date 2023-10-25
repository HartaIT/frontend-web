import { useEffect, useState } from "react";

import { supabase } from "../supabaseClient";
import Masonry from "react-masonry-css";
import PostCard from "../components/PostCard";

function Orase() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<object>({});

  const [PAGE_COUNT, setPAGE_COUNT] = useState<number>(1);
  const [countItems, setCountItems] = useState<number>(0);
  const offset = 20;

  useEffect(() => {
    const fetchCity = async () => {
      const from = offset * (PAGE_COUNT - 1);
      const to = from + offset;

      setLoading(true);
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .order("DatePosted", { ascending: false })
        .range(from, to);

      if (error) console.warn(error);
      else if (data) {
        setData(data);
        // console.log(data);
      }

      setLoading(false);
    };
    fetchCity();
    window.scrollTo(0, 0);
  }, [PAGE_COUNT]);

  useEffect(() => {
    const fetchCount = async () => {
      const { error, count } = await supabase
        .from("Posts")
        .select("*", { count: "exact", head: true });
      if (error) {
        console.error(error);
      }
      if (count) {
        setCountItems(count);
      }
    };

    fetchCount();
  }, []);

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
          {Object.values(data).map((item) => {
            return <PostCard item={item} key={item?.id} />;
          })}
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
      // item?.City -> array
      // item?.DatePosted
      // item?.Link
      // item?.Text
    );
}

export default Orase;
