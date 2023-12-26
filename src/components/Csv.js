import { useState } from "react";
import { json2csv } from "json-2-csv";

function Csv() {
  const [rcTextValue, setRcTextValue] = useState("");
  const [pendingTextValue, setPendingTextValue] = useState("");
  const [error, setError] = useState(null);

  const handleRcChange = (event) => {
    setRcTextValue(event.target.value);
  };

  const handlePendingChange = (event) => {
    setPendingTextValue(event.target.value);
  };

  const handleClick = async () => {
    try {
      let rc = '{"etSvcInfo": []}';
      let pending = '{"etSvcInfo": []}';
      if (rcTextValue) rc = rcTextValue;
      if (pendingTextValue) pending = pendingTextValue;
      const parsedData = [
        ...JSON.parse(rc).etSvcInfo,
        ...JSON.parse(pending).etSvcInfo,
      ];
      const csvData = await json2csv(parsedData, {
        keys: [
          { field: "service_order_no", title: "CALL NO" },
          { field: "LOCAL_PRODUCT", title: "Product Code" },
          { field: "model", title: "MODEL NO" },
          { field: "serial_no", title: "SERIAL NO" },
          { field: "service_type_desc", title: "SERVICE TYPE" },
          { field: "svc_prcd", title: "SVC PRODUCT" },
          { field: "status_desc", title: "STATUS" },
          { field: "reason_desc", title: "REASON" },
          { field: "wty_type", title: "WTY" },
          { field: "customer_name", title: "CUSTOMER NAME" },
          { field: "REMARK", title: "REMARK" },
          { field: "redo_flag", title: "REDO" },
          { field: "redFlag", title: "RED" },
          { field: "request_date", title: "REQUEST DATE" },
          { field: "ENGINEER_NAME", title: "ENGINEER NAME" },
          { field: "PURCHASING_DT", title: "PURCHASE DATE" },
          { field: "city_name", title: "CITY" },
          { field: "ENGINEER", title: "ENGINEER ID" },
          { field: "b2b_svc", title: "B2B SVC" },
          { field: "CUST_REQ_DT", title: "CUST REQ DATE" },
          { field: "CUST_REQ_TM", title: "CUST REQ TIME" },
          { field: "anticipated_date", title: "ANTICIPATED DATE" },
          { field: "assigned_date", title: "ASSIGNED DATE" },
          { field: "sen_dt", title: "SEN DATE" },
          { field: "CALL_RCV_DT", title: "CALL RECEIVE DATE" },
          { field: "BILLING_DATE", title: "BILLING DATE" },
          { field: "COMPLETE_DT", title: "COMPLETE DATE" },
          { field: "CC_APP_DT", title: "CC APP DATE" },
        ],
      });
      const file = new Blob([csvData], { type: "text/csv" });
      const element = document.createElement("a");
      element.href = URL.createObjectURL(file);
      element.download = "report.csv";
      document.body.appendChild(element);
      element.click();
      setError(null);
      setRcTextValue("");
      setPendingTextValue("");
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-100">
      <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-xl px-8 py-6 mt-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          RC data
        </label>
        <textarea
          className="w-full h-64 border border-slate-400 rounded-lg"
          onChange={handleRcChange}
          value={rcTextValue}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Pending data
        </label>
        <textarea
          className="w-full h-64 border border-slate-400 rounded-lg"
          onChange={handlePendingChange}
          value={pendingTextValue}
        />
        <button
          className="w-full bg-blue-500 border-blue-600 hover:bg-blue-600 border-b my-2 p-2 rounded text-white shadow-md hover:shadow-xl"
          onClick={handleClick}
        >
          Export to CSV
        </button>
        <p className="text-rose-600">{error && error.message}</p>
      </div>
    </div>
  );
}

export default Csv;
