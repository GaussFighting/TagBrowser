import { useEffect, useState } from "react";

const useFetchTags = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow`
        );
        const resData = await res.json();
        setTags(resData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchTags();
  }, []);
  return { loading, tags, setTags };
};

export default useFetchTags;
