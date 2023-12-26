import { useState } from "react";
import { json2csv } from "json-2-csv";

function Csv() {
  const [textValue, setTextValue] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleClick = async () => {
    try {
      const data = JSON.parse(textValue).etSvcInfo;
      const csvData = await json2csv(data, {
        keys: [
          { field: "service_order_no", title: "Order No" },
          { field: "LOCAL_PRODUCT", title: "Product Code" },
          { field: "REMARK", title: "Remark" },
          { field: "wty_type", title: "WTY Type" },
          { field: "serial_no", title: "Serial No" },
          { field: "model", title: "Model No" },
          { field: "status_desc", title: "Status" },
          { field: "request_date", title: "Request Date" },
          { field: "anticipated_date", title: "Anticipated Date" },
          { field: "COMPLETE_DT", title: "Completed Date" },
        ],
      });
      const file = new Blob([csvData], { type: "text/csv" });
      const element = document.createElement("a");
      element.href = URL.createObjectURL(file);
      element.download = "rc.csv";
      document.body.appendChild(element);
      element.click();
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="max-w-96 mx-auto flex flex-col basis-full mt-10">
      <textarea
        className="h-48 border border-slate-400 rounded-lg"
        onChange={handleChange}
        value={textValue}
      />
      <button
        className="bg-blue-500 border-blue-600 hover:bg-blue-600 border-b my-2 p-2 rounded text-white shadow-md hover:shadow-xl"
        onClick={handleClick}
      >
        Export to CSV
      </button>
      <p className="text-rose-600">{error && error.message}</p>
    </div>
  );
}

export default Csv;
