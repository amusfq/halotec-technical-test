import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import KelengkapanDokumen from "@/pages/usulan-prodi-baru/kelengkapanDokumen";
import History from "@/pages/usulan-prodi-baru/history";
import { useEffect, useState } from "react";
import { HistoryType } from "@/types";
import api from "@/config/api";

const Content = ({ events }: { events: string[] }) => {
  const [histories, setHistories] = useState<HistoryType[]>([]);

  const getData = () => {
    api.get("/histories").then((response) => {
      setHistories(response.data.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Tabs defaultActiveKey="document" className="mb-3">
        <Tab eventKey="document" title="Kelengkapan Dokumen">
          <KelengkapanDokumen getHistories={getData} />
        </Tab>
        <Tab eventKey="history" title="Riwayat">
          <History events={events} data={histories} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Content;
