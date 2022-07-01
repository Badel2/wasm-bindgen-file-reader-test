declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
	/**
	*/
	export function init(): void;
	/**
	* @param {File} file
	* @param {bigint} offset
	* @returns {number}
	*/
	export function read_at_offset_sync(file: File, offset: bigint): number;
	/**
	* @param {File} file
	* @param {bigint} offset
	* @returns {number}
	*/
	export function read_at_offset_sync2(file: File, offset: bigint): number;
	/**
	* @param {File} file
	* @param {bigint} offset
	* @returns {Promise<number>}
	*/
	export function read_at_offset(file: File, offset: bigint): Promise<number>;
	/**
	* @param {File} file
	* @returns {string}
	*/
	export function sha256_file_sync(file: File): string;
	/**
	*/
	export function fill_memory(): void;
	
}

declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly init: () => void;
  readonly read_at_offset_sync: (a: number, b: number, c: number) => number;
  readonly read_at_offset_sync2: (a: number, b: number, c: number) => number;
  readonly read_at_offset: (a: number, b: number, c: number) => number;
  readonly sha256_file_sync: (a: number, b: number) => void;
  readonly fill_memory: () => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h786888506dc7323d: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h197bd08f966f3086: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
declare function wasm_bindgen (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
