import { useState } from "react";
import Button from "../ui/button";
import TextField from "./TextField";
const VodInputs = ({ handleData }) => {
  const [data, setData] = useState({
    keyword: "",
    num: undefined,
    interval: undefined,
  });
  return (
    <>
      <div className="mt-2 flex flex-col items-center gap-4 text-center ">
        <div className="mr-28">
          <TextField
            id="keyword"
            name="keyword"
            variant="center"
            type="text"
            className="w-[100px]"
            value={data.keyword}
            onChange={(e) =>
              setData((prev) => ({ ...prev, keyword: e.target.value }))
            }
            placeholder="Enter a keyword"
          />
          <TextField
            id="num"
            name="num"
            variant="centerNum"
            type="number"
            className="mt-2 w-[100px]"
            value={data.num}
            onChange={(e) =>
              setData((prev) => ({ ...prev, num: e.target.value }))
            }
            placeholder="Number of occurences"
          />
          <TextField
            id="interval"
            name="interval"
            variant="center"
            type="number"
            className="mt-2 w-[100px]"
            value={data.interval}
            onChange={(e) =>
              setData((prev) => ({ ...prev, interval: e.target.value }))
            }
            placeholder="Length of clip in seconds"
          />
        </div>

        <Button
          variant="solid"
          color="purple"
          className="w-[50%] items-center text-center "
          onClick={() => {
            handleData(data);
            setData({ keyword: "", num: 0 });
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default VodInputs;
