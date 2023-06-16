import api from "@/config/api";
import { DocumentType } from "@/types";
import { useEffect, useState } from "react";
import { Alert, Button, Stack } from "react-bootstrap";
import Swal from "sweetalert2";

const KelengkapanDokumen = ({ getHistories }: { getHistories: () => void }) => {
  const [data, setData] = useState<DocumentType[]>([]);

  const tableHeaders = ["Kode", "Dokumen", "File", ""];

  const getData = () => {
    api.get("/documents").then((response) => {
      setData(response.data.data);
    });
  };

  const handleUploadDocument = async (id: number) => {
    const { value: file } = await Swal.fire({
      title: "Upload Dokumen",
      input: "file",
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonText: "Upload",
      inputAttributes: {
        accept: "application/pdf",
        "aria-label": "Upload your document",
      },
      showLoaderOnConfirm: true,
      preConfirm: async (value: any) => {
        const file = value as File;
        if (!file)
          return Swal.showValidationMessage("Dokumen tidak boleh kosong");
        if (file.size > 2e6)
          return Swal.showValidationMessage("Ukuran file maksimal 2MB");
        if (file.type !== "application/pdf")
          return Swal.showValidationMessage("File yang didukung hanya PDF");

        const formData = new FormData();
        formData.append("file", file);
        return await api
          .post(`/files/${id}`, formData)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err.response);
            const { data } = err.response;
            return Swal.showValidationMessage(data.message);
          });
      },
    });

    if (file)
      Swal.fire({ title: "Berhasil mengupload dokumen", icon: "success" }).then(
        () => getData()
      );
  };

  const handleDeleteFile = async (id: number) => {
    const { value: response } = await Swal.fire({
      title: "Hapus Dokumen?",
      text: "Anda yakin ingin menghapus dokumen ini?",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonText: "Hapus",
      showLoaderOnConfirm: true,
      icon: "question",
      preConfirm: async () => {
        return await api
          .delete(`/files/${id}`)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err.response);
            const { data } = err.response;
            return Swal.showValidationMessage(data.message);
          });
      },
    });

    if (response)
      Swal.fire({ title: "Berhasil menghapus dokumen", icon: "success" }).then(
        () => getData()
      );
  };

  const handleChangeStatus = async () => {
    const { value: response } = await Swal.fire({
      title: "Proses ke tahap selanjutnya?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonText: "Lanjut",
      input: "textarea",
      inputPlaceholder: "Catatan..",
      preConfirm: async (value: any) => {
        if (!value)
          return Swal.showValidationMessage("Catatan tidak boleh kosong");
        return await api
          .post(`/histories`, {
            notes: value,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err.response);
            const { data } = err.response;
            return Swal.showValidationMessage(data.message);
          });
      },
    });

    if (response) {
      Swal.fire({ title: "Berhasil menambah history", icon: "success" }).then(
        () => getHistories()
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Alert variant="primary">
        <Stack direction="horizontal">
          <svg
            style={{ marginRight: "10px", alignSelf: "flex-start" }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z"
              fill="#2196F3"
            />
          </svg>
          <div>
            <span>Info</span>
            <p style={{ fontSize: "14px", margin: "0" }}>
              Silakan upload dan lengkapi dokumen-dokumen berikut ini. Pastikan
              format file berupa file .pdf dengan ukuran file maksimal 2 MB.{" "}
              <b>PASTIKAN SEMUA DOKUMEN DIUPLOAD, UNTUK PROSES LEBIH LANJUT.</b>
            </p>
          </div>
        </Stack>
      </Alert>
      <table className="table">
        <thead>
          <tr>
            {tableHeaders.map((item, idx) => (
              <th
                key={idx}
                style={{
                  background: "#E8E8E8",
                  color: "#969696",
                  textAlign: "center",
                }}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td style={{ color: "#969696", textAlign: "center" }}>
                {item.kode}
              </td>
              <td>{item.namaDokumen}</td>
              <td>
                <a
                  href={`${import.meta.env.VITE_API_URL}/files/${
                    item.file?.id
                  }`}
                  target="_blank"
                >
                  {item.file?.file}
                </a>
              </td>
              <td>
                <Stack direction="horizontal">
                  <Button
                    style={{ marginRight: "4px" }}
                    variant="success"
                    size="sm"
                    onClick={() => handleUploadDocument(item.id)}
                  >
                    Upload
                  </Button>
                  {item.file !== null && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteFile(item.file.id)}
                    >
                      Hapus
                    </Button>
                  )}
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Stack direction="horizontal" gap={1}>
        <Button variant="danger" className="ms-auto">
          Batal
        </Button>
        <Button variant="primary" onClick={handleChangeStatus}>
          Konfirmasi Dokumen Lengkap
        </Button>
      </Stack>
    </div>
  );
};

export default KelengkapanDokumen;
