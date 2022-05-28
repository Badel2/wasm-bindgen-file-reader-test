importScripts("wasm_bindgen_file_reader.js");

onmessage = function(e) {
  console.log("Message received from main script", e.data);
  Rust.wasm_bindgen_file_reader.then(
    function(wasm_bindgen_file_reader) {
      /*
            let workerResult = wasm_bindgen_file_reader.read_at_offset_sync(
                e.data.file,
                e.data.offset,
            );
            */
      let workerResult = wasm_bindgen_file_reader.sha256_file_sync(e.data.file);
      console.log("Posting message back to main script");
      postMessage(workerResult);
    },
    function(err) {
      console.error(err);
    }
  );
};
