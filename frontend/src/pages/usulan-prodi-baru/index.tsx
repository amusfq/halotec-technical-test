import HorizontalTimeline from "@/components/timeline/horizontal";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import Content from "@/pages/usulan-prodi-baru/content";

const UsulanProdiBaru = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const events = [
    "Konfirmasi Dokumen dan Lengkap",
    "Verval Dokumen oleh Subdit/PTSP",
    "Penilaian Asesor",
    "Validasi BAN PT",
    "Penyiapan SK",
    "SK Terbit",
  ];

  return (
    <div>
      <h3
        style={{
          padding: "10px 65px",
        }}
      >
        Usulan Program Studi Baru
      </h3>
      <div className="bg-white" style={{ padding: "15px" }}>
        <Stack direction="horizontal" gap={3} style={{ marginBottom: "20px" }}>
          <Stack
            direction="vertical"
            style={{
              padding: "20px",
              boxShadow: "0px 2px 10px rgba(58, 53, 65, 0.1)",
              borderRadius: "6px",
              flexGrow: 1,
            }}
          >
            <p style={{ fontSize: "24px", marginBottom: 0 }}>
              KOMUNIKASI DAN PENYIARAN ISLAM (SARJANA)
            </p>
            <span style={{ fontSize: "20px", color: "#969696" }}>
              Sekolah Tinggi Agama Islam Ar Rosyid Surabaya (143357804084)
            </span>
          </Stack>
          <Stack
            direction="vertical"
            style={{
              background: "#006316",
              alignItems: "center",
              padding: "20px",
              boxShadow: "0px 2px 10px rgba(58, 53, 65, 0.1)",
              borderRadius: "6px",
            }}
          >
            <p style={{ fontSize: "20px", marginBottom: 0, color: "white" }}>
              Nomor Registrasi
            </p>
            <span
              style={{ fontSize: "24px", color: "white", fontWeight: "600" }}
            >
              21042101012
            </span>
          </Stack>
        </Stack>
        <div
          style={{
            padding: "15px",
            boxShadow: "0px 2px 10px rgba(58, 53, 65, 0.1)",
            borderRadius: "6px",
            border: "2px solid #0085FF",
            marginBottom: "20px",
          }}
        >
          <HorizontalTimeline events={events} step={currentStep} />
        </div>
        <Content events={events} />
      </div>
    </div>
  );
};

export default UsulanProdiBaru;
