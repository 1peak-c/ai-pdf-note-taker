"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAction, useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function UploadPdfDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  const { user } = useUser();
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const addFile = useMutation(api.fileStorage.addFile);
  const embedDocument = useAction(api.myAction.ingest);

  // 处理文件上传
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setFile(file);
    // console.log(file, '文件上传成功');
  };

  const handleSubmit = async () => {
    if (!file || !fileName) {
      return;
    }
    setUploadLoading(true);
    // 1、生成文件上传的URL
    const uploadFileUrl = await generateUploadUrl();
    // 2、上传文件
    const result = await fetch(uploadFileUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type || "" },
      body: file,
    });
    const { storageId } = await result.json();
    const fileUrl = await getFileUrl({ storageId })
    console.log(storageId, '文件上传成功');
    // 3、提交文件信息到数据库
    const fileId = uuidv4();
    await addFile({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ?? '无标题PDF',
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress || "",
    });
    // 4、获取到PDF文件内容进行pdf文件切片处理
    const apiRes = await axios.get('/api/pdf-loader?pdfUrl=' + fileUrl);
    // console.log(apiRes.data.result, 'apiRes');
    // 5、调用大模型，矢量处理pdf文件
    embedDocument({
      splitText: apiRes.data.result,
      fileId: fileId,
    });
    setUploadLoading(false);
    setOpen(false);
    setFile(null);
    setFileName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>请上传PDF文件</DialogTitle>
          <DialogDescription>
            上传PDF文件后，我们将提取文件内容并生成笔记。
          </DialogDescription>
          <div className="mt-4 w-full">
            <Input id="picture" type="file" accept="application/pdf" onChange={(e) => onUpload(e)} />
          </div>
          <div className="mt-2 w-full">
            <Label className="block text-sm font-medium text-slate-500 mb-1">*文件名</Label>
            <Input placeholder="请输入文件名" value={fileName} onChange={(e) => setFileName(e.target.value)} />
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            {uploadLoading ? <Loader2Icon className="animate-spin" /> : '确认上传'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}