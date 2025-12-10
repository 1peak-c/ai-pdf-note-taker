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

export default function UploadPdfDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>请上传PDF文件</DialogTitle>
          <DialogDescription>
            上传PDF文件后，我们将提取文件内容并生成笔记。
          </DialogDescription>
          <div className="mt-4 w-full">
            <Input id="picture" type="file" accept="application/pdf" />
          </div>
          <div className="mt-2 w-full">
            <Label className="block text-sm font-medium text-slate-500 mb-1">*文件名</Label>
            <Input placeholder="请输入文件名" />
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">取消</Button>
          </DialogClose>
          <Button type="submit">确认上传</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}