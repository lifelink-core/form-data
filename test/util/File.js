const {Readable} = require("stream")

const test = require("ava")
const Blob = require("fetch-blob")

const File = require("../../lib/util/File")

test("Returns Readable stream for Buffer content", t => {
  const buf = Buffer.from("What time is it?")
  const file = new File(buf, "file.txt", {size: buf.length, type: "text/plain"})

  t.true(file.stream() instanceof Readable)
})

test("Returns Readable stream for Blob content", t => {
  const blob = new Blob(["Some content"])
  const file = new File(blob, "file.txt")

  t.true(file.stream() instanceof Readable)
})

test("Returns Readable stream for Readable content", t => {
  const readable = new Readable({
    read() {
      readable.push(null)
    }
  })

  const file = new File(readable, "file.txt")

  t.true(file.stream() instanceof Readable)
})

test("Return ArrayBuffer for Buffer file's content", async t => {
  const buf = Buffer.from("What time is it?")
  const file = new File(buf, "file.txt", {size: buf.length, type: "text/plain"})

  t.true(await file.arrayBuffer() instanceof ArrayBuffer)
})

test("Return ArrayBuffer for Blob file's content", async t => {
  const blob = new Blob(["Some content"])
  const file = new File(blob, "file.txt")

  t.true(await file.arrayBuffer() instanceof ArrayBuffer)
})

test("Return ArrayBuffer for Readable file's content", async t => {
  const readable = new Readable({
    read() {
      readable.push(null)
    }
  })

  const file = new File(readable, "file.txt")

  t.true(await file.arrayBuffer() instanceof ArrayBuffer)
})

test("File#toString() returns a string", t => {
  const buf = Buffer.from("What time is it?")
  const file = new File(buf, "file.txt", {size: buf.length, type: "text/plain"})

  t.is(typeof file.toString(), "string")
})

test("File#[Symbol.toStringTag]() returns a string", t => {
  const buf = Buffer.from("What time is it?")
  const file = new File(buf, "file.txt", {size: buf.length, type: "text/plain"})

  t.is(typeof file[Symbol.toStringTag], "string")
})
