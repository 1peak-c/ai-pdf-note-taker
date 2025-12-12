import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function GET(req: Request) {
  // 1、从请求URL中获取pdfUrl参数
  const url = new URL(req.url);
  const pdfUrl = url.searchParams.get('pdfUrl');
  if (!pdfUrl) {
    return NextResponse.json({ error: '缺少pdfUrl参数' }, { status: 400 });
  }
  // 2、加载pdf文件
  const res = await fetch(pdfUrl);
  const pdfBlod = await res.blob();
  const loader = new WebPDFLoader(pdfBlod)
  const docs = await loader.load()
  // 将所有文档内容合并为一个字符串
  const allContent = docs.map(doc => doc.pageContent).join('');

  // 2、将文本分割成小切片
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const splits = await splitter.createDocuments([allContent]);
  // 3、将切片转换为字符串列表再次处理数据
  const splitterList = splits.map(split => split.pageContent);

  return NextResponse.json({ result: splitterList });
}