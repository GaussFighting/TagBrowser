import { useEffect, useState } from "react";
import storybookData from "../storybook_data/storybookData";

const useFetchTags = () => {
  const [loading, setLoading] = useState(false);
  const [tagsObj, setTagsObj] = useState({});
  const [totalObj, setTotalObj] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      let res = {};
      let resTotal = {}
      if (process.env.NODE_ENV) {
        try {
          setLoading(true);
          res = await fetch(
            `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow`
          );
          resTotal = await fetch('https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow&filter=total')
          const resData = await res.json();
          const resDataTotal = await resTotal.json()
          setTagsObj(resData);
          setTotalObj(resDataTotal);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
        if (!(200 <= res.status && res.status < 300)) {
          setError("error - status is not 2XX");
        }
      } else {
        setTagsObj(storybookData);
        setTotalObj({total: 30})
      }
    };
    fetchTags();
  }, []);
  console.log(totalObj)

  return { loading, tagsObj, error, totalObj };
};

export default useFetchTags;
