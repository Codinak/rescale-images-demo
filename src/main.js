import sharp from "sharp"
import fs from "fs/promises"
import path from "path"

(async () => {
  const accept = [".png", ".jpg", '.jpeg']
  const cwd = process.cwd()
  const pathInp = path.join(cwd, "input")
  const pathOut = path.join(cwd, "output")

  const dirInp = await fs.opendir(pathInp)

  for await (const node of dirInp) {
    if (!node.isFile()) continue
    
    const file = node
    const fileExt = path.extname(file.name)

    if (!accept.includes(fileExt.toLowerCase())) continue

    const filePathInp = path.join(pathInp, file.name)
    const filePathOut = path.join(pathOut, file.name)

    const buffFileOut = await sharp(filePathInp).resize(256, 256, {kernel: "nearest"}).toBuffer()

    fs.writeFile(filePathOut, buffFileOut)
  }
})()


