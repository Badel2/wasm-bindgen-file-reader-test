use std::io::Read;
use std::io::Seek;
use std::io::SeekFrom;
use std::panic;
use wasm_bindgen::prelude::*;
use wasm_bindgen_file_reader::WebSysFile;

thread_local! {
    static FILE_READER_SYNC: web_sys::FileReaderSync = web_sys::FileReaderSync::new().expect("failed to create FileReaderSync. is this a web worker context?");
}

#[wasm_bindgen(start)]
pub fn init() {
    wasm_logger::init(wasm_logger::Config::default());

    // Set panic hook so we get backtrace in console
    let next_hook = panic::take_hook();
    panic::set_hook(Box::new(move |info| {
        log::error!("PANIC: {}", &info.to_string());
        next_hook(info);
    }));

    // Logging
    log::debug!("Logger enabled, hello from Rust!");
}

#[wasm_bindgen]
pub fn read_at_offset_sync(file: web_sys::File, offset: u64) -> u8 {
    let mut wf = WebSysFile::new(file);
    wf.seek(SeekFrom::Start(offset))
        .expect("failed to seek to offset");

    // 1-byte buffer because we only want to read one byte
    let mut buf = [0];

    wf.read_exact(&mut buf).expect("failed to read bytes");

    buf[0]
}

#[wasm_bindgen]
pub fn read_at_offset_sync2(file: web_sys::File, offset: u64) -> u8 {
    let offset_i32 = i32::try_from(offset).expect("offset too large");
    let blob = file
        .slice_with_i32_and_i32(offset_i32, offset_i32 + 1)
        .expect("failed to slice file");
    let file_reader_sync = web_sys::FileReaderSync::new()
        .expect("failed to create FileReaderSync. is this a web worker context?");
    let array_buffer = file_reader_sync
        .read_as_array_buffer(&blob)
        .expect("failed to read as array buffer");
    let array = js_sys::Uint8Array::new(&array_buffer);

    array.get_index(0)
}

#[wasm_bindgen]
pub async fn read_at_offset(file: web_sys::File, offset: u64) -> u8 {
    let offset_i32 = i32::try_from(offset).expect("offset too large");
    let blob = file
        .slice_with_i32_and_i32(offset_i32, offset_i32 + 1)
        .expect("failed to slice file");
    let array_promise = blob.array_buffer();
    let array_js_value = wasm_bindgen_futures::JsFuture::from(array_promise)
        .await
        .expect("awaiting array promise");
    let array_buffer = js_sys::ArrayBuffer::from(array_js_value);
    let array = js_sys::Uint8Array::new(&array_buffer);

    array.get_index(0)
}

#[wasm_bindgen]
pub fn sha256_file_sync(file: web_sys::File) -> String {
    use sha2::{Digest, Sha256};
    const BUF_SIZE: usize = 1024 * 1024;

    let mut wf = WebSysFile::new(file);
    let mut hasher = Sha256::new();

    let mut buffer = vec![0; BUF_SIZE];
    let mut count: u64 = 0;
    while let Ok(n) = wf.read(&mut buffer[..]) {
        if n == 0 {
            // Probably end of file
            break;
        }

        let rest = &buffer[0..n];
        hasher.update(&rest);
        count += n as u64;
    }

    // read hash digest and consume hasher
    let result = hasher.finalize();

    // Return sha256 hash in hex and number of bytes read
    format!("{} ({} bytes)", hex::encode(result), count)
}

#[wasm_bindgen]
pub fn fill_memory() {
    let mut outer_vec = Vec::new();
    loop {
        let mut v = vec![];
        for _ in 0..1_000_000 {
            v.push(0u8);
        }
        outer_vec.push(v);
        log::debug!("{}MB", outer_vec.len());
    }
}
