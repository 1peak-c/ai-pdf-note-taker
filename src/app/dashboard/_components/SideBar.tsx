import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import UploadPdfDialog from "./UploadPdfDialog";

export default function SideBar() {
  return (
    <div className="w-full h-full shadow-md p-5">
      <Image src={"/logo.svg"} alt="logo" width={170} height={120} loading="eager" />

      <div className="mt-10">
        <UploadPdfDialog>
          <Button className="w-full hover:cursor-pointer">+ 上传 PDF</Button>
        </UploadPdfDialog>
      </div>

      <div className="flex gap-2 items-center p-2 mt-5 hover:bg-slate-100 rounded-md cursor-pointer">
        <Layout className="w-4 h-4" />
        <h2 className="text-sm">工作空间</h2>
      </div>

      <div className="flex gap-2 items-center p-2 mt-1 hover:bg-slate-100 rounded-md cursor-pointer">
        <Shield className="w-4 h-4" />
        <h2 className="text-sm">权益升级</h2>
      </div>

      <div className="absolute bottom-18 w-[70%]">
        <Progress value={75} />
        <p className="text-sm text-slate-500 text-center mt-1">2 / 5 PDF文件</p>
      </div>
    </div>
  );
}