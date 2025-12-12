"use client"
import { useParams } from "next/navigation";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQueries, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useEffect } from "react";

export default function Workspace() {
  const { fileId } = useParams<{ fileId: string }>();

  const fileInfo = useQuery(api.fileStorage.getFileInfoByFileId, { fileId });
  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);
  return (
    <div>
      <WorkspaceHeader />
      <div className="grid grid-cols-2 gap-2 p-2">
        <div>
          {/* editor */}
        </div>
        <div>
          <PdfViewer pdfUrl={fileInfo?.fileUrl || ''} />
        </div>
      </div>
    </div>
  );
}