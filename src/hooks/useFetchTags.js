import { useEffect, useState } from "react";
import storybookData from "../storybook_data/storybookData";

const useFetchTags = () => {
  const [loading, setLoading] = useState(false);
  const [tagsObj, setTagsObj] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      let res = {};
      if (process.env.NODE_ENV) {
        try {
          setLoading(true);
          res = await fetch(
            `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow`
          );
          const resData = await res.json();
          setTagsObj(resData);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
        if (!(200 <= res.status && res.status < 300)) {
          setError("error - status is not 2XX");
        }
      } else {
        setTagsObj(storybookData);
      }
    };
    fetchTags();
  }, []);
  return { loading, tagsObj, error };
};

export default useFetchTags;
