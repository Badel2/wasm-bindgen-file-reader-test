importScripts("wasm_bindgen_file_reader_test.js");

onmessage = async function(e) {
  console.log("Message received from main script", e.data);
  let wasm_bindgen_file_reader_test = await Rust.wasm_bindgen_file_reader_test;
  /*
    let workerResult = wasm_bindgen_file_reader.read_at_offset_sync(
        e.data.file,
        e.data.offset,
    );
    */
  let workerResult = wasm_bindgen_file_reader_test.sha256_file_sync(e.data.file);
  console.log("Posting message back to main script");
  postMessage(workerResult);
};
