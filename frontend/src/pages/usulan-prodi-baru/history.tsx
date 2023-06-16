import { HistoryType } from "@/types";
import dayjs from "dayjs";

type Props = {
  events: string[];
  data: HistoryType[];
};

const History = ({ events, data }: Props) => {
  return (
    <div>
      <p style={{ fontWeight: 500, fontSize: "20px", margin: 0 }}>
        Riwayat Proses Tahapan Usulan Prodi
      </p>
      <div className="timeline p-4 block mb-4">
        {data.map((item, idx) => (
          <div key={item.id} className="tl-item">
            <div className="tl-dot dot-success">
              <span className="tl-number">{data.length - idx}</span>
            </div>
            <div className="tl-content">
              <div className="tl-title tl-success">{events[item.type]}</div>
              <div className="tl-subtitle">
                {dayjs(item.timeCreated).format("DD MMMM YYYY")}
              </div>
              <div className="tl-subtitle">{item.notes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
